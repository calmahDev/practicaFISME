import express from 'express';
import path from 'path'
import bodyParser from "body-parser";
import requestPromise from "request-promise";
import { v4 } from "uuid";
import routerViews from "./routes/views.routes.js";

// se pueden poner las importaciones de módulos y la configuración básica del servidor Express:
import  "../model/blockchain.js"
import { nonceGenesis,hashGenesis,previousHashGenesis } from "../model/blockGenesis.js";
import { createNewBlock } from "../model/createNewBlock.js";
import { getLastBlock } from "../model/getLastBlock.js";
import {createNewTransaction} from "../model/createNewTransaction.js"
import {addTransactionToPendingTransactions} from "../model/addTransactionToPendingTransactions.js"
import { hashBlock } from "../model/hashBlock.js";
import { proofOfWork } from "../model/prooOfWork.js";
import {chainIsValid} from "../model/chainIsValid.js"
import {findBlock} from "../model/findBlock.js"
import {findTransaction} from "../model/findTransaction.js"
import {findAddressData} from "../model/findAddressData.js"

const app = express()

const nodeAddress = v4().split('-').join('');

const port = process.argv[2];
const currentNodeUrl = process.argv[3]
const networkNodes=[]

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'))
app.use('', routerViews)

app.get('/blockchain', function (req, res) {
    if(global.chain.length===0){
        createNewBlock(nonceGenesis,previousHashGenesis,hashGenesis)
    }
    const FISME={
         chain: global.chain,
         pendingTransactions: global.pendingTransactions, 
         currentNodeUrl: currentNodeUrl, 
         networkNodes: networkNodes 
        }
    res.send(FISME);

  });
  
// create a new transaction
app.post('/transaction', function(req, res) {
	const newTransaction = req.body;
	const blockIndex = addTransactionToPendingTransactions(newTransaction);
	res.json({ note: `transaction will add in block  ${blockIndex}.` });
});


// broadcast transaction
app.post('/transaction/broadcast', function(req, res) {
	const newTransaction = createNewTransaction(req.body.amount, req.body.sender, req.body.recipient);
	addTransactionToPendingTransactions(newTransaction);

	const requestPromises = [];
	networkNodes.forEach(networkNodeUrl => {
		const requestOptions = {
			uri: networkNodeUrl + '/transaction',
			method: 'POST',
			body: newTransaction,
			json: true
		};

		requestPromises.push(requestPromise(requestOptions));
	});

	Promise.all(requestPromises)
	.then(data => {
		res.json({ note: 'Transaction created and broadcast successfully.' });
	});
});


// receive new block
app.post('/receive-new-block', function(req, res) {
    const newBlock = req.body.newBlock;
    const lastBlock = getLastBlock();
    const correctHash = lastBlock.hash === newBlock.previousBlockHash; 
    const correctIndex = lastBlock['index'] + 1 === newBlock['index'];

    if (correctHash && correctIndex) {
        global.chain.push(newBlock);
        global.pendingTransactions = [];
        res.json({
            note: 'New block received and accepted.',
            newBlock: newBlock
        });
    } else {
        res.json({
            note: 'New block rejected.',
            newBlock: newBlock
        });
    }
});
// mine a block
app.get('/mine', function(req, res) {
	const lastBlock = getLastBlock();
	const previousBlockHash = lastBlock['hash'];
	const currentBlockData = {
		transactions: global.pendingTransactions,
		index: lastBlock['index'] + 1
	};
	const nonce = proofOfWork(previousBlockHash, currentBlockData);
	const blockHash = hashBlock(previousBlockHash, currentBlockData, nonce);
	const newBlock = createNewBlock(nonce, previousBlockHash, blockHash);

	const requestPromises = [];
	networkNodes.forEach(networkNodeUrl => {
		const requestOptions = {
			uri: networkNodeUrl + '/receive-new-block',
			method: 'POST',
			body: { newBlock: newBlock },
			json: true
		};

		requestPromises.push(requestPromise  (requestOptions));
	});

	Promise.all(requestPromises)
	.then(data => {
		const requestOptions = {
			uri: currentNodeUrl + '/transaction/broadcast',
			method: 'POST',
			body: {
				amount: 12.5,
				sender: "00",
				recipient: nodeAddress
			},
			json: true
		};

		return requestPromise  (requestOptions);
	})
	.then(data => {
		res.json({
			note: "New block mined & broadcast successfully",
			block: newBlock
		});
	});
});




// register a node with the network
app.post('/register-node', function(req, res) {
	const newNodeUrl = req.body.newNodeUrl;
	const nodeNotAlreadyPresent = networkNodes.indexOf(newNodeUrl) == -1;
	const notCurrentNode = currentNodeUrl !== newNodeUrl;
	if (nodeNotAlreadyPresent && notCurrentNode) networkNodes.push(newNodeUrl);
	res.json({ note: 'New node registered successfully.' });
});


// register multiple nodes at once
app.post('/register-nodes-bulk', function(req, res) {
	const allNetworkNodes = req.body.allNetworkNodes;
	allNetworkNodes.forEach(networkNodeUrl => {
		const nodeNotAlreadyPresent = networkNodes.indexOf(networkNodeUrl) == -1;
		const notCurrentNode = currentNodeUrl !== networkNodeUrl;
		if (nodeNotAlreadyPresent && notCurrentNode) networkNodes.push(networkNodeUrl);
	});

	res.json({ note: 'Bulk registration successful.' });
});
// register a node and broadcast it the network
app.post('/register-and-broadcast-node', function(req, res) {
	const newNodeUrl = req.body.newNodeUrl;
	if (networkNodes.indexOf(newNodeUrl) == -1) networkNodes.push(newNodeUrl);

	const regNodesPromises = [];
	networkNodes.forEach(networkNodeUrl => {
		if (networkNodeUrl) {
			const requestOptions = {
			  uri: `${networkNodeUrl}/register-node`,
			  method: 'POST',
			  body: { newNodeUrl: newNodeUrl },
			  json: true
			};
		  
			regNodesPromises.push(requestPromise(requestOptions));
		  } else {
			console.log('Error: networkNodeUrl is undefined or null');
		  }
		  
	});

	Promise.all(regNodesPromises)
	.then(data => {
		const bulkRegisterOptions = {
			uri: newNodeUrl + '/register-nodes-bulk',
			method: 'POST',
			body: { allNetworkNodes: [ ...networkNodes, currentNodeUrl ] },
			json: true
		};

		return requestPromise  (bulkRegisterOptions);
	})
	.then(data => {
		res.json({ note: 'New node registered with network successfully.' });
	});
});







// get block by blockHash
app.get('/block/:blockHash', function(req, res) { 
	const blockHash = req.params.blockHash;
	const correctBlock = findBlock(blockHash);
	res.json({
		block: correctBlock
	});
});


// get transaction by transactionId
app.get('/transaction/:transactionId', function(req, res) {
	const transactionId = req.params.transactionId;
	const trasactionData = findTransaction(transactionId);
	res.json({
		transaction: trasactionData.transaction,
		block: trasactionData.block
	});
});


// get address by address
app.get('/address/:address', function(req, res) {
	const address = req.params.address;
	const addressData = findAddressData(address);
	res.json({
		addressData: addressData
	});
});


// app.use("public",express.static('view'));

// block explorer

app.get('/ruta2', function(req, res) {
	const pathName = path.resolve(path.dirname(''))

	res.sendFile(pathName + '/public/view/caled.html')
})

app.listen(port, function() {
	console.log(`Listening on port ${port}...`);
});

