import requestPromise from "request-promise"
import { currentNodeUrl, networkNodes } from "../app.js"

export const registerNodeAndBroadcastNode = (req, res) => {
  const newNodeUrl = req.body.newNodeUrl
  if (networkNodes.indexOf(newNodeUrl) == -1) networkNodes.push(newNodeUrl)

  const regNodesPromises = []
  networkNodes.forEach(networkNodeUrl => {
    if (networkNodeUrl) {
      const requestOptions = {
        uri: `${networkNodeUrl}/register-node`,
        method: 'POST',
        body: { newNodeUrl: newNodeUrl },
        json: true
      }

      regNodesPromises.push(requestPromise(requestOptions))
    } else {
      console.log('Error: networkNodeUrl is undefined or null')
    }

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
