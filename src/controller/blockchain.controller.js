import "../model/blockchain.js"
import { createNewBlock } from "../model/createNewBlock.js"
import { previousHashGenesis, hashGenesis, nonceGenesis } from "../model/blockGenesis.js"
import { currentNodeUrl, networkNodes } from "../app.js"

export const blockchain = (req, res) => {
  if (global.chain.length === 0) {
    createNewBlock(nonceGenesis, previousHashGenesis, hashGenesis)
  }
  const FISME = {
    chain: global.chain,
    pendingTransactions: global.pendingTransactions,
    currentNodeUrl: currentNodeUrl,
    networkNodes: networkNodes
  }
  res.send(FISME)
}
