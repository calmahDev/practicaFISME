import {v4 as uuidv4} from 'uuid';

export const createNewRecord = (motivo, sender, recipient) => {
	if (!motivo||!recipient||!sender) {
		throw new Error('parameters are missing in crateNewRecord.js');
	}

	const newRecord = {
		motivo: motivo,
		sender: sender,
		recipient: recipient,
		timestamp: Date.now(),
		recordId: uuidv4().split('-').join('')
	};
	return newRecord;
};
