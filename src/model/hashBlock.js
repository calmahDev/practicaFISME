import sha256 from 'sha256';

export const hashBlock = function(previousBlockHash, currentBlockData, nonce) {
	if (!previousBlockHash||!currentBlockData||!nonce) {
		throw new Error('parameters are missing in hashBlock.js');
	}
  const dataAsString = previousBlockHash + nonce.toString() + JSON.stringify(currentBlockData);
	const hash = sha256(dataAsString);
	return hash;
};
