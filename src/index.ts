import { Server } from "./server";
import dotenv from "dotenv"
dotenv.config()
const server = new Server(8080)
server.start()