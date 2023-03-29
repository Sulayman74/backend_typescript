import express, { Request, Response } from "express"

export class Server {

    readonly port!: number
    constructor(port: number) {
        this.port = port

    }
    start() {
        const app = express()

        app.get('/', (req: Request, res: Response) => {

            res.send("Hello World")

        });

        app.listen(this.port, () => {
            console.log("le serveur écoute sur le port:", this.port);
        })
    }

}