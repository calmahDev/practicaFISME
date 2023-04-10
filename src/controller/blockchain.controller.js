import { createNewBlock } from "../model/createNewBlock.js"
import { currentNodeUrl, networkNodes } from "../app.js"
import { previousHashGenesis, hashGenesis, nonceGenesis } from "../model/blockGenesis.js"
import "../model/blockchain.js"

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
