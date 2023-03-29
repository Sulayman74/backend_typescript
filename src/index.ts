import { Server } from "./server";
import dotenv from "dotenv"
dotenv.config()
const port = process.env.PORT

const server = new Server(parseInt(port))
server.start()