import { currentNodeUrl, networkNodes } from "../app.js"

export const registerNodesBulk = (req, res) => {
  const allNetworkNodes = req.body.allNetworkNodes
  allNetworkNodes.forEach(networkNodeUrl => {
    const nodeNotAlreadyPresent = networkNodes.indexOf(networkNodeUrl) == -1
    const notCurrentNode = currentNodeUrl !== networkNodeUrl
    if (nodeNotAlreadyPresent && notCurrentNode) networkNodes.push(networkNodeUrl)
  })

  res.json({ note: 'Bulk registration successful.' })
}
