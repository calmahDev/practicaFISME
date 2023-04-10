import { Router } from 'express'
import { findBlock } from '../controller/findRecord.controller.js'
import { createNewRecord } from '../controller/createNewRecord.controller.js'

const routerViews = Router()

routerViews.get('/find-block', findBlock)
routerViews.get('/create-new-record', createNewRecord)



export default routerViews
