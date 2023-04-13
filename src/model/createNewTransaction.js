import {v4 as uuidv4} from 'uuid';

export const createNewTransaction = (motivo, sender, recipient) => {
	if (!motivo||!recipient||!sender) {
		throw new Error('parameters are missing in crateNewTransaction.js');
	}

	const newTransaction = {
		motivo: motivo,
		sender: sender,
		recipient: recipient,
		transactionId: uuidv4().split('-').join('')
	};
	return newTransaction;
};
