import  express  from "express";
import { registerController } from "./controllers/register-controller";

export async function appRoutes(app: express.Application) {
    app.post('/users', registerController);
}