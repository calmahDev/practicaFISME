import {hashBlock} from "./hashBlock.js"

export const  chainIsValid= (blockchain)=> {
	if (!Array.isArray(blockchain) || blockchain.length === 0) {
		throw new Error('Invalid blockchain format');
	}

	let validChain = true;
	for (var i = 1; i < blockchain.length; i++) {
		const currentBlock = blockchain[i];
		const prevBlock = blockchain[i - 1];
		const blockHash = hashBlock(prevBlock['hash'], { transactions: currentBlock['transactions'], index: currentBlock['index'] }, currentBlock['nonce']);
		if (blockHash.substring(0, 4) !== '0000') validChain = false;
		if (currentBlock['previousBlockHash'] !== prevBlock['hash']) validChain = false;
	};
	const genesisBlock = blockchain[0];
	const correctNonce = genesisBlock['nonce'] === 100;
	const correctPreviousBlockHash = genesisBlock['previousBlockHash'] === '0';
	const correctHash = genesisBlock['hash'] === '0';
	const correctTransactions = genesisBlock['transactions'].length === 0;
	if (!correctNonce || !correctPreviousBlockHash || !correctHash || !correctTransactions) validChain = false;
	return validChain;
};

