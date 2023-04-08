export const findTransaction = function(transactionId) {
    if (!transactionId ) {
        throw new Error('Falta el parametro transactionId');
      }
    let correctTransaction = null;
    let correctBlock = null;
    global.chain.forEach(block => {
      block.transactions.forEach(transaction => {
        if (transaction.transactionId === transactionId) {
          correctTransaction = transaction;
          correctBlock = block;
        };
      });
    });
  
    if (!correctTransaction) {
      throw new Error('No se encontró la transacción con el ID proporcionado.');
    }
  
    return {
      transaction: correctTransaction,
      block: correctBlock
    };
  };
  