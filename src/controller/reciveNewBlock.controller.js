import { nonceGenesis,hashGenesis,previousHashGenesis } from "../model/blockGenesis.js"
import { createNewBlock } from "../model/createNewBlock.js"
import "../model/blockchain.js"
import { getLastBlock } from "../model/getLastBlock.js"

export const receiveNewBlock = (req, res) => {
  if (!req.body.newBlock) {
    return res.status(400).json({ message: 'Faltan parámetros in /receive-new-block ' })
  }
  if (global.chain.length === 0) {
    createNewBlock(nonceGenesis, previousHashGenesis, hashGenesis)
  }
  const newBlock = req.body.newBlock
  const lastBlock = getLastBlock()
  const correctHash = lastBlock.hash === newBlock.previousBlockHash
  const correctIndex = lastBlock['index'] + 1 === newBlock['index']

  if (correctHash && correctIndex) {
    global.chain.push(newBlock)
    global.pendingRecords = []
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
