import {v4 as uuidv4} from 'uuid';

export const createNewTransaction = (amount, sender, recipient) => {
	if (amount <= 0) {
		throw new Error('Transaction amount must be greater than 0');
	}

	if (!recipient) {
		throw new Error('Transaction recipient address is required');
	}

	if (!sender) {
		throw new Error('Transaction sender address is required');
	}

	const newTransaction = {
		amount: amount,
		sender: sender,
		recipient: recipient,
		transactionId: uuidv4().split('-').join('')
	};
	return newTransaction;
};
