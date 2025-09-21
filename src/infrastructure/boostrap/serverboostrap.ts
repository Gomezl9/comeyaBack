import { promises } from "dns";
import express from "express";
import http from 'http';
export class serverBootstrap{
    private app: express.Application;
    constructor(app:express.Application) {
        this.app = app;
    }
    init():Promise<boolean>{
        return new Promise((resolve,reject)=>{
            const server = http.createServer(this.app);
            const PORT = process.env.PORT || 3000;
            server.listen(PORT)
            .on("listening",()=>{
                console.log (`Server is running on port ${PORT}`);
                resolve(true);
            })
            .on("error",(err)=>{
                console.error (`Error starting server on port ${err}`);
                resolve(false);
            })
        })
    }
}