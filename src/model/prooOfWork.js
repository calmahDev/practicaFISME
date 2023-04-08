import { hashBlock } from "./hashBlock.js"

const difficulty = 4;

export function proofOfWork(previousBlockHash, currentBlockData) {
  let nonce = 0;
	let hash = hashBlock(previousBlockHash, currentBlockData, nonce);
	while (hash.substring(0, 4) !== '0000') {
		nonce++;
		hash = hashBlock(previousBlockHash, currentBlockData, nonce);
	}

	return nonce;
};

