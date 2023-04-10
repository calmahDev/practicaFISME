import  "./blockchain.js"
export function addTransactionToPendingTransactions (transactionObj) {
	if (!transactionObj) {
		throw new Error('parameters are missing in addTransactionToPendingTransactions.js');
	}

	global.pendingTransactions.push(transactionObj);
	return global.chain.length ;
};