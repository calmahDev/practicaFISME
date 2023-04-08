import { currentNodeUrl, networkNodes } from "../app.js"

export const registerNode = (req, res) => {
  const newNodeUrl = req.body.newNodeUrl
  const nodeNotAlreadyPresent = networkNodes.indexOf(newNodeUrl) == -1
  const notCurrentNode = currentNodeUrl !== newNodeUrl
  if (nodeNotAlreadyPresent && notCurrentNode) networkNodes.push(newNodeUrl)
  res.json({ note: 'New node registered successfully.' })
}
