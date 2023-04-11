import requestPromise from "request-promise"
import { currentNodeUrl, networkNodes } from "../app.js"
import { nonceGenesis,hashGenesis,previousHashGenesis } from "../model/blockGenesis.js"
import { createNewBlock } from "../model/createNewBlock.js"

export const registerNodeAndBroadcastNode = (req, res) => {
  if (!req.body.newNodeUrl) {
    return res.status(400).json({ message: 'Faltan parámetros /register-and-broadcast-nodes' })
  }
  if (global.chain.length === 0) {
    createNewBlock(nonceGenesis, previousHashGenesis, hashGenesis)
  }
  

  const newNodeUrl = req.body.newNodeUrl
  if (networkNodes.indexOf(newNodeUrl) == -1) networkNodes.push(newNodeUrl)

  const regNodesPromises = []
  networkNodes.forEach(networkNodeUrl => {
      const requestOptions = {
        uri: `${networkNodeUrl}/register-node`,
        method: 'POST',
        body: { newNodeUrl: newNodeUrl },
        json: true
      }

      regNodesPromises.push(requestPromise(requestOptions))


  })

  Promise.all(regNodesPromises)
    .then(data => {
      const bulkRegisterOptions = {
        uri: newNodeUrl + '/register-nodes-bulk',
        method: 'POST',
        body: { allNetworkNodes: [...networkNodes, currentNodeUrl] },
        json: true
      }

      return requestPromise(bulkRegisterOptions)
    })
    .then(data => {
      res.json({ note: 'New node registered with network successfully.' })
    })
}
