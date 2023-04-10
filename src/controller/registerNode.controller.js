import { currentNodeUrl, networkNodes } from "../app.js"
import { nonceGenesis,hashGenesis,previousHashGenesis } from "../model/blockGenesis.js"
import { createNewBlock } from "../model/createNewBlock.js"

export const registerNode = (req, res) => {
  if (!req.body.newNodeUrl) {
    return res.status(400).json({ message: 'Faltan parámetros in /register-node' })
  }
  if (global.chain.length === 0) {
    createNewBlock(nonceGenesis, previousHashGenesis, hashGenesis)
  }
  const newNodeUrl = req.body.newNodeUrl
  const nodeNotAlreadyPresent = networkNodes.indexOf(newNodeUrl) == -1
  const notCurrentNode = currentNodeUrl !== newNodeUrl
  if (nodeNotAlreadyPresent && notCurrentNode) networkNodes.push(newNodeUrl)
  res.json({ note: 'New node registered successfully.' })
}
