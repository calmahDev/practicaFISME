import { findBlock } from "../model/findBlock.js"

export const getBlock = (req, res) => {
  const blockHash = req.params.blockHash
  const correctBlock = findBlock(blockHash)
  res.json({
    block: correctBlock
  })
}
