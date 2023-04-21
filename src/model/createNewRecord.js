import {v4 as uuidv4} from 'uuid';

export const createNewRecord = (motivo, remitente, destinatario) => {
	if (!motivo||!destinatario||!remitente) {
		throw new Error('parameters are missing in crateNewRecord.js');
	}

	const newRecord = {
		motivo: motivo,
		remitente: remitente,
		destinatario: destinatario,
		timestamp: Date.now(),
		recordId: uuidv4().split('-').join('')
	};
	return newRecord;
};
