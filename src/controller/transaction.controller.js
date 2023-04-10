import { addTransactionToPendingTransactions } from "../model/addTransactionToPendingTransactions.js"
import { nonceGenesis,hashGenesis,previousHashGenesis } from "../model/blockGenesis.js"
import { createNewBlock } from "../model/createNewBlock.js"

export const transaction = (req, res) => {
  if (!req.body) {
    return res.status(400).json({ message: 'parameters are missing in /transaction' })
  }
  if (global.chain.length === 0) {
    createNewBlock(nonceGenesis, previousHashGenesis, hashGenesis)
  }
  const newTransaction = req.body
  const blockIndex = addTransactionToPendingTransactions(newTransaction)
  res.json({ note: `transaction will add in block  ${blockIndex}.` })
}


