import { hashBlock } from "./hashBlock.js";

export function chainIsValid(blockchainObj) {

  // Verificar el bloque génesis
  const genesisBlock = blockchainObj[0];
  const isGenesisBlockValid =
    genesisBlock.index === 0 &&
    genesisBlock.previousBlockHash === "Block Genesis" &&
    genesisBlock.hash === "Block Genesis" &&
    genesisBlock.nonce === 1 &&
    genesisBlock.records.length === 0;
  if (!isGenesisBlockValid) {
    // Si el bloque génesis no es válido, la cadena no es válida
    return false;
  }
  // Verificar los bloques siguientes
  for (let i = 1; i < blockchainObj.length; i++) {
    const block = blockchainObj[i];
    const previousBlock = blockchainObj[i - 1];

    // Verificar el índice y el hash previo del bloque actual
    if (
      block.index !== previousBlock.index + 1 ||
      block.previousBlockHash !== previousBlock.hash
    ) {
      return false;
    }
  }
  return true;
}
