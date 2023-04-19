import { networkNodes } from "../app.js";
import {chainIsValid} from "../model/chainIsValid.js"
import requestPromise from "request-promise";
import { previousHashGenesis, hashGenesis, nonceGenesis } from "../model/blockGenesis.js"
import "../model/blockchain.js"

export const consensus = (req, res) =>{
	if (global.chain.length === 0) {
		createNewBlock(nonceGenesis, previousHashGenesis, hashGenesis)
	  }
	const requestPromises = [];
	networkNodes.forEach(networkNodeUrl => {
		const requestOptions = {
			uri: networkNodeUrl + '/blockchain',
			method: 'GET',
			json: true
		};

		requestPromises.push(requestPromise  (requestOptions));
	});

	Promise.all(requestPromises)
	.then(blockchains => {
		const currentChainLength = global.chain.length;
		let maxChainLength = currentChainLength;
		let newLongestChain = null;
		let newPendingRecords = null;

		blockchains.forEach(blockchain => {
			if (blockchain.chain.length > maxChainLength) {
				maxChainLength = blockchain.chain.length;
				newLongestChain = blockchain.chain;
				newPendingRecords = blockchain.pendingRecords;
			};
		});
		if (!newLongestChain || (newLongestChain && !chainIsValid(newLongestChain))) {
			res.redirect('/create-new-record');
		}
		else {
			bitcoin.chain = newLongestChain;
			bitcoin.pendingRecords = newPendingRecords;
			res.json({
				note: 'This chain has been replaced.',
				chain: bitcoin.chain
			});
		}
	});
}