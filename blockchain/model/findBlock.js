export const findBlock = function(blockHash) {
    if (!blockHash ) {
      throw new Error('Falta el parametro blockHash');
    }
    let correctBlock = null;
    global.chain.forEach(block => {
      if (block.hash === blockHash) correctBlock = block;
    });
  
    if (!correctBlock) {
      throw new Error('No se encontró el bloque con el hash proporcionado.');
    }
  
    return correctBlock;
  };
  