// consensus
import "../server.js"

export const consensus = (req, res) =>{
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
		let newPendingTransactions = null;

		blockchains.forEach(blockchain => {
			if (blockchain.chain.length > maxChainLength) {
				maxChainLength = blockchain.chain.length;
				newLongestChain = blockchain.chain;
				newPendingTransactions = blockchain.pendingTransactions;
			};
		});
		if (!newLongestChain || (newLongestChain && !chainIsValid(newLongestChain))) {
			res.json({
				note: 'Current chain has not been replaced.',
				chain: global.chain
			});
		}
		else {
			global.chain = newLongestChain;
			global.pendingTransactions = newPendingTransactions;
			res.json({
				note: 'This chain has been replaced.',
				chain: global.chain
			});
		}
	});
}