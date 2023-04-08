import { Router } from 'express'
import { findBlock } from './blockExplorer.routes.js'

const routerViews = Router()

routerViews.get('/ruta', findBlock)

export default routerViews
