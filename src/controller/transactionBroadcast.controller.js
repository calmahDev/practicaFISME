import requestPromise from "request-promise"
import { networkNodes } from "../app.js"
import { addTransactionToPendingTransactions } from "../model/addTransactionToPendingTransactions.js"
import { createNewTransaction } from "../model/createNewTransaction.js"
import { nonceGenesis,hashGenesis,previousHashGenesis } from "../model/blockGenesis.js"
import { createNewBlock } from "../model/createNewBlock.js"

export const transactionBroadcast = (req, res) => {
  if (global.chain.length === 0) {
    createNewBlock(nonceGenesis, previousHashGenesis, hashGenesis)
  }
  if (!req.body.amount || !req.body.sender || !req.body.recipient) {
    return res.status(400).json({ message: 'parameters are missing in /transaction/broadcast' })
  }
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
      res.redirect('/mine')
    })
}
