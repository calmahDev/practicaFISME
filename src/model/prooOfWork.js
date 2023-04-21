import { hashBlock } from "./hashBlock.js"


export function proofOfWork(previousBlockHash, currentBlockData) {
	if (!previousBlockHash||!currentBlockData) {
		throw new Error('parameters are missing in prooOfWork.js');
	}
  let nonce = 1;
	let hash = hashBlock(previousBlockHash, currentBlockData, nonce);
	while (hash.substring(0, 4) !== '0000') {
		nonce++;
		hash = hashBlock(previousBlockHash, currentBlockData, nonce);
	}

	return nonce;
};

