import { addRecordToPendingRecords } from "../model/addRecordToPendingRecords.js"
import { nonceGenesis,hashGenesis,previousHashGenesis } from "../model/blockGenesis.js"
import { createNewBlock } from "../model/createNewBlock.js"

export const record = (req, res) => {
  if (!req.body) {
    return res.status(400).json({ message: 'parameters are missing in /record' })
  }
  if (global.chain.length === 0) {
    createNewBlock(nonceGenesis, previousHashGenesis, hashGenesis)
  }
  const newRecord = req.body
  const blockIndex = addRecordToPendingRecords(newRecord)
  res.json({ note: `record will add in block  ${blockIndex}.` })
}


