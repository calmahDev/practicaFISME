import {v4 as uuidv4} from 'uuid';

export const createNewTransaction = (amount, sender, recipient) => {
	if (!amount||!recipient||!sender) {
		throw new Error('parameters are missing in crateNewTransaction.js');
	}

	const newTransaction = {
		amount: amount,
		sender: sender,
		recipient: recipient,
		transactionId: uuidv4().split('-').join('')
	};
	return newTransaction;
};
