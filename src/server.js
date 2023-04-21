import express from 'express'
import bodyParser from "body-parser"
import routerViews from "./routes/views.routes.js"
import routerBlock from './routes/blockchain.routes.js'

const server = express()

const port = process.argv[2]

server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: false }))

server.use(express.static('public'))

server.use('', routerBlock)
server.use('', routerViews)

server.listen(port, function () {
  console.log(`Listening on port ${port}...`)
})

export default server
