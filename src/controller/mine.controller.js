import requestPromise from "request-promise"
import { currentNodeUrl, networkNodes, nodeAddress } from "../app.js"
import "../model/blockchain.js"
import { createNewBlock } from "../model/createNewBlock.js"
import { getLastBlock } from "../model/getLastBlock.js"
import { hashBlock } from "../model/hashBlock.js"
import { proofOfWork } from "../model/prooOfWork.js"

export const mine = (req, res) => {
  const lastBlock = getLastBlock()
  const previousBlockHash = lastBlock['hash']
  const currentBlockData = {
    transactions: global.pendingTransactions,
    index: lastBlock['index'] + 1
  }
  const nonce = proofOfWork(previousBlockHash, currentBlockData)
  const blockHash = hashBlock(previousBlockHash, currentBlockData, nonce)
  const newBlock = createNewBlock(nonce, previousBlockHash, blockHash)

  const requestPromises = []
  networkNodes.forEach(networkNodeUrl => {
    const requestOptions = {
      uri: networkNodeUrl + '/receive-new-block',
      method: 'POST',
      body: { newBlock: newBlock },
      json: true
    }

    requestPromises.push(requestPromise(requestOptions))
  })

  Promise.all(requestPromises)
    .then(data => {
      const requestOptions = {
        uri: currentNodeUrl + '/transaction/broadcast',
        method: 'POST',
        body: {
          amount: 12.5,
          sender: "00",
          recipient: nodeAddress
        },
        json: true
      }

      return requestPromise(requestOptions)
    })
    .then(data => {
      res.json({
        note: "New block mined & broadcast successfully",
        block: newBlock
      })
    })
}
