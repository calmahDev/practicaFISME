import { Router } from 'express'
import { findBlock } from '../controller/findRecord.controller.js'
import { createNewRecord } from '../controller/createNewRecord.controller.js'
import { viewAllRecord } from '../controller/viewAllRecord.controller.js'
const routerViews = Router()

routerViews.get('/find-block', findBlock)
routerViews.get('/create-new-record', createNewRecord)
routerViews.get('/view-all-record', viewAllRecord)



export default routerViews
