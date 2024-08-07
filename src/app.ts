import express from 'express';
import http from 'http';
import cors from 'cors';
import encurtadorRoutes from "./routes/EncurtadorRoutes";

import * as dotenv from 'dotenv';
import * as mongoose from "mongoose";

class App {
    public express: express.Application;
    public serverHttp: http.Server;

    public constructor() {
        dotenv.config();
        this.express = express();
        this.serverHttp = http.createServer(this.express);
        this.middlewares();
        this.database();
        this.routes();
    }

    private middlewares(): void {
        this.express.use(express.json());
        this.express.use(cors({
            origin: '*'
        }));
    }

    database(): void {
        if (!process.env?.MONGO_URL) {
            console.log('Variaveis de ambiente não configuradas');
            return;
        }
        mongoose.connect(`${process.env.MONGO_URL}`)
            .then()
            .catch(err => console.error(err));

    }

    private routes(): void {
        this.express.use([
            encurtadorRoutes
        ]);
    }
}

const app = new App();

export {app};
