import * as express from "express";
import * as bodyParser from "body-parser";
import { Routes } from "./routes/routes";
import * as mongoose from "mongoose";

class App {

    public app: express.Application;
    public managerRoutes: Routes = new Routes();
    public mongoUrl: string = 'mongodb://localhost:27017/sdc';

    constructor() {
        this.app = express();        
        this.config();
        this.managerRoutes.routes(this.app);
    }

    private config(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));

        //Configurando o mongo e iniciando a conexão
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl, { useNewUrlParser: true });
    }
}

export default new App().app;