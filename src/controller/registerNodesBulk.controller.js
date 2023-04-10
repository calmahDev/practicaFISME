import { currentNodeUrl, networkNodes } from "../app.js"
import { nonceGenesis,hashGenesis,previousHashGenesis } from "../model/blockGenesis.js"
import { createNewBlock } from "../model/createNewBlock.js"

export const registerNodesBulk = (req, res) => {
  if (!req.body.allNetworkNodes) {
    return res.status(400).json({ message: 'Faltan parámetros' })
  }
  if (global.chain.length === 0) {
    createNewBlock(nonceGenesis, previousHashGenesis, hashGenesis)
  }
  const allNetworkNodes = req.body.allNetworkNodes
  allNetworkNodes.forEach(networkNodeUrl => {
    const nodeNotAlreadyPresent = networkNodes.indexOf(networkNodeUrl) == -1
    const notCurrentNode = currentNodeUrl !== networkNodeUrl
    if (nodeNotAlreadyPresent && notCurrentNode) networkNodes.push(networkNodeUrl)
  })

  res.json({ note: 'Bulk registration successful.' })
}
