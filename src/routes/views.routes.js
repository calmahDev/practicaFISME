import { Router } from 'express'
import { findBlock } from '../controller/findRecord.controller.js'
import { createNewRecord } from '../controller/createNewRecord.controller.js'
import { viewAllRecord } from '../controller/viewAllRecord.controller.js'
import { addNewNode } from '../controller/addNewNode.controller.js'
const routerViews = Router()

routerViews.get('/find-record', findBlock)
routerViews.get('/create-new-record', createNewRecord)
routerViews.get('/view-all-record', viewAllRecord)
routerViews.get('/add-new-node', addNewNode)






export default routerViews
