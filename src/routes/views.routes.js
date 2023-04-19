import { Router } from 'express'
import { findBlock } from '../controller/findRecord.controller.view.js'
import { createNewRecord } from '../controller/createNewRecord.controller.view.js'
import { viewAllRecord } from '../controller/viewAllRecord.controller.view.js'
import { addNewNode, ip } from '../controller/addNewNode.controller.view.js'
const routerViews = Router()

routerViews.get('/find-record', findBlock)
routerViews.get('/create-new-record', createNewRecord)
routerViews.get('/view-all-record', viewAllRecord)
routerViews.get('/add-new-node', addNewNode)
routerViews.get('/ip', ip)







export default routerViews
