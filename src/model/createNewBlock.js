import './blockchain.js';

export function createNewBlock(nonce, previousBlockHash, hash) {
  if (!nonce ||!previousBlockHash ||!hash) {
		throw new Error('parameters are missing in createNewBlock.js');
	}
    const newBlock = {
      index: global.chain.length,
      timestamp: Date.now(),
      records: global.pendingRecords,
      nonce: nonce,
      hash: hash,
      previousBlockHash: previousBlockHash
    };

    global.chain.push(newBlock);
    global.pendingRecords = [];
    return newBlock;
}
