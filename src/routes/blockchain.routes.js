import { Router } from 'express'
import { blockchain } from '../controller/blockchain.controller.js'
import { transaction } from '../controller/transaction.controller.js'
import { transactionBroadcast } from '../controller/transactionBroadcast.controller.js'
import { receiveNewBlock } from '../controller/reciveNewBlock.controller.js'
import { mine } from '../controller/mine.controller.js'
import { registerNode } from '../controller/registerNode.controller.js'
import { registerNodesBulk } from '../controller/registerNodesBulk.controller.js'
import { registerNodeAndBroadcastNode } from '../controller/registerAndBroadcastNode.controller.js' 
import { consensus } from '../controller/consensus.controller.js'
import { ip } from '../controller/addNewNode.controller.js'

const routerBlock = Router()

routerBlock.get('/blockchain', blockchain)
routerBlock.post('/transaction', transaction)
routerBlock.post('/transaction/broadcast', transactionBroadcast)
routerBlock.post('/receive-new-block', receiveNewBlock)
routerBlock.get('/mine', mine)
routerBlock.post('/register-node', registerNode)
routerBlock.post('/register-nodes-bulk', registerNodesBulk)
routerBlock.post('/register-and-broadcast-node', registerNodeAndBroadcastNode)
routerBlock.get('/consensus', consensus)
routerBlock.get('/ip', ip)


export default routerBlock
