import { nonceGenesis, previousHashGenesis, hashGenesis } from './blockGenesis.js';
import './blockchain.js';

export function createNewBlock(nonce, previousBlockHash, hash) {
    const newBlock = {
      index: global.chain.length,
      timestamp: Date.now(),
      transactions: global.pendingTransactions,
      nonce: nonce,
      hash: hash,
      previousBlockHash: previousBlockHash
    };

    // Limpiar transacciones pendientes y añadir nuevo bloque a la cadena
    global.chain.push(newBlock);
    global.pendingTransactions = [];
    return newBlock;
}
