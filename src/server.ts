import express, { Request, Response } from "express"

import todoRouter from "./routes/todo-router";
import userRouter from "./routes/users-router";

export class Server {

    readonly port!: number | string
    constructor(port: number | string) {
        this.port = port

    }
    start() {
        const app = express()
        app.use(express.json())
        app.use("/api/v1/todos", todoRouter)
        app.use("/api/v1/users", userRouter)

        app.listen(this.port, () => {
            console.log("le serveur écoute sur le port:", this.port);
        })
    }

}