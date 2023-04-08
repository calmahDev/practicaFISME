import { Router } from 'express'
import { blockchain } from '../controller/blockchain.controller.js'
import { transaction } from '../controller/transaction.controller.js'
import { transactionBroadcast } from '../controller/transactionBroadcast.controller.js'
import { receiveNewBlock } from '../controller/reciveNewBlock.controller.js'
import { mine } from '../controller/mine.controller.js'
import { registerNode } from '../controller/registerNode.controller.js'
import { registerNodesBulk } from '../controller/registerNodesBulk.controller.js'
import { registerNodeAndBroadcastNode } from '../controller/registerAndBroadcastNode.controller.js'
import { getBlock } from '../controller/findBlock.controller.js'
import { getAddressDatas } from '../controller/findTransaction.controller.js'

const routerBlock = Router()

routerBlock.get('/blockchain', blockchain)
routerBlock.post('/transaction', transaction)
routerBlock.post('/transaction/broadcast', transactionBroadcast)
routerBlock.post('/receive-new-block', receiveNewBlock)
routerBlock.get('/mine', mine)
routerBlock.post('/register-node', registerNode)
routerBlock.post('/register-nodes-bulk', registerNodesBulk)
routerBlock.post('/register-and-broadcast-node', registerNodeAndBroadcastNode)
routerBlock.get('/block/:blockHash', getBlock)
routerBlock.get('/address/:address', getAddressDatas)

export default routerBlock
