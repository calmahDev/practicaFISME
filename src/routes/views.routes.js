import { Router } from 'express'
import { findBlock } from '../controller/blockExplorer.controller.js'

const routerViews = Router()

routerViews.get('/ruta', findBlock)

export default routerViews
