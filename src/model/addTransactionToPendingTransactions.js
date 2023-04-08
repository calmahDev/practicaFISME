import  "./blockchain.js"
export function addTransactionToPendingTransactions (transactionObj) {
	if (!transactionObj) {
		throw new Error('Transaction object is required');
	}

	global.pendingTransactions.push(transactionObj);
	return global.chain.length ;
};