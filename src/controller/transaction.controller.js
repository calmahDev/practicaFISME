import { addTransactionToPendingTransactions } from "../model/addTransactionToPendingTransactions.js"

export const transaction = (req, res) => {
  const newTransaction = req.body
  const blockIndex = addTransactionToPendingTransactions(newTransaction)
  res.json({ note: `transaction will add in block  ${blockIndex}.` })
}
