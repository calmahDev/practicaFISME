import requestPromise from "request-promise"
import { networkNodes } from "../app.js"
import { addTransactionToPendingTransactions } from "../model/addTransactionToPendingTransactions.js"
import { createNewTransaction } from "../model/createNewTransaction.js"

export const transactionBroadcast = (req, res) => {
  const newTransaction = createNewTransaction(req.body.amount, req.body.sender, req.body.recipient)
  addTransactionToPendingTransactions(newTransaction)

  const requestPromises = []
  networkNodes.forEach(networkNodeUrl => {
    const requestOptions = {
      uri: networkNodeUrl + '/transaction',
      method: 'POST',
      body: newTransaction,
      json: true
    }
    requestPromises.push(requestPromise(requestOptions))
  })

  Promise.all(requestPromises)
    .then(data => {
      res.json({ note: 'Transaction created and broadcast successfully.' })
    })
}
