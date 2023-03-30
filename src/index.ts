import * as dotenv from "dotenv"

import { Server } from "./server";
dotenv.config()
const port = process.env.PORT

const server = new Server(parseInt(port))
server.start()