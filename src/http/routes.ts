import  express  from "express";
import { registerController } from "./controllers/register-controller";
import { authenticateController } from "./controllers/authenticate-controller";

export async function appRoutes(app: express.Application) {
    app.post('/users', registerController);
    app.post('/sessions', authenticateController);
}