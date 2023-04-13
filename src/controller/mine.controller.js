import requestPromise from "request-promise"
import { currentNodeUrl, networkNodes, nodeAddress } from "../app.js"
import { createNewBlock } from "../model/createNewBlock.js"
import { getLastBlock } from "../model/getLastBlock.js"
import { hashBlock } from "../model/hashBlock.js"
import { proofOfWork } from "../model/prooOfWork.js"
import { nonceGenesis,previousHashGenesis,hashGenesis } from "../model/blockGenesis.js"
import "../model/blockchain.js"

export const mine = (req, res) => {
  if (global.chain.length === 0) {
    createNewBlock(nonceGenesis, previousHashGenesis, hashGenesis)
  }

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
    res.redirect('/consensus')
  })
}
