import * as express from "express";
import * as bodyParser from "body-parser";
import * as morgan from "morgan";
import { Routes } from "./routes/index";
import * as mongoose from "mongoose";
import * as dotenv from 'dotenv'
dotenv.load()

class App {

    public app: express.Application;
    public managerRoutes: Routes;
    public mongoUrl: string = `${process.env.DATABASE}`;

    constructor() {
        this.app = express();
        this.config();
        this.managerRoutes = new Routes();
        this.managerRoutes.routes(this.app);
    }

    private config(): void {
        this.app.use(morgan('dev'));
        
        this.app.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE")
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });

        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));

        //Configurando o mongo e iniciando a conexão
        //mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl, { useNewUrlParser: true });
    }
}

export default new App().app;