import  "./blockchain.js"
export function addRecordToPendingRecords (recordObj) {
	if (!recordObj) {
		throw new Error('parameters are missing in addRecordToPendingRecords.js');
	}

	global.pendingRecords.push(recordObj);
	return global.chain.length ;
};