import { v4 } from "uuid"
import server from "./server.js"

export const currentNodeUrl = process.argv[3]
export const networkNodes = []
export const nodeAddress = v4().split('-').join('')

const app = server
