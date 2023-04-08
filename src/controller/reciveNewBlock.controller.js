import "../model/blockchain.js"
import { getLastBlock } from "../model/getLastBlock.js"

export const receiveNewBlock = (req, res) => {
  const newBlock = req.body.newBlock
  const lastBlock = getLastBlock()
  const correctHash = lastBlock.hash === newBlock.previousBlockHash
  const correctIndex = lastBlock['index'] + 1 === newBlock['index']

  if (correctHash && correctIndex) {
    global.chain.push(newBlock)
    global.pendingTransactions = []
    res.json({
      note: 'New block received and accepted.',
      newBlock: newBlock
    })
  } else {
    res.json({
      note: 'New block rejected.',
      newBlock: newBlock
    })
  }
}
