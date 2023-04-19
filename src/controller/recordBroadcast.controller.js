import requestPromise from "request-promise"
import { networkNodes } from "../app.js"
import { addRecordToPendingRecords } from "../model/addRecordToPendingRecords.js"
import { createNewRecord } from "../model/createNewRecord.js"
import { nonceGenesis,hashGenesis,previousHashGenesis } from "../model/blockGenesis.js"
import { createNewBlock } from "../model/createNewBlock.js"

export const recordBroadcast = (req, res) => {
  if (global.chain.length === 0) {
    createNewBlock(nonceGenesis, previousHashGenesis, hashGenesis)
  }
  if (!req.body.motivo || !req.body.sender || !req.body.recipient) {
    return res.status(400).json({ message: 'parameters are missing in /record/broadcast' })
  }
  const newRecord = createNewRecord(req.body.motivo, req.body.sender, req.body.recipient)
  addRecordToPendingRecords(newRecord)

  const requestPromises = []
  networkNodes.forEach(networkNodeUrl => {
    const requestOptions = {
      uri: networkNodeUrl + '/record',
      method: 'POST',
      body: newRecord,
      json: true
    }
    requestPromises.push(requestPromise(requestOptions))
  })

  Promise.all(requestPromises)
    .then(data => {
      res.redirect('/mine')
    })
}
