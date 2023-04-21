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
  if (!req.body.motivo || !req.body.remitente || !req.body.destinatario) {
    return res.status(400).json({ message: 'parameters are missing in /record/broadcast' })
  }
  const motivo =req.body.motivo
  const remitente = req.body.remitente 
  const  destinatario =req.body.destinatario
  const newRecord = createNewRecord(motivo,remitente,destinatario)
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
