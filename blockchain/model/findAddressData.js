export const findAddressData = function(address) {
    // Verificar si se han proporcionado los parámetros de entrada adecuados
    if (!address ) {
      throw new Error('Invalid input parameters');
    }
  
    const addressTransactions = [];
  
    try {
      glocal.chain.forEach(block => {
        if (!block.transactions || !Array.isArray(block.transactions)) {
          throw new Error('Invalid block structure');
        }
  
        block.transactions.forEach(transaction => {
          if (!transaction.sender || !transaction.recipient || !transaction.amount) {
            throw new Error('Invalid transaction structure');
          }
  
          if (transaction.sender === address || transaction.recipient === address) {
            addressTransactions.push(transaction);
          }
        });
      });
  
      let balance = 0;
  
      addressTransactions.forEach(transaction => {
        if (transaction.recipient === address) balance += transaction.amount;
        else if (transaction.sender === address) balance -= transaction.amount;
      });
  
      return {
        addressTransactions: addressTransactions,
        addressBalance: balance
      };
    } catch (error) {
      throw new Error(`Error calculating address data: ${error.message}`);
    }
  };
  