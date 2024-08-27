import { app } from "./app";
import cors from 'cors';
import { env } from "./env";

app.use(cors());

app.listen({
    host: '0.0.0.0',
    port:env.PORT,
}, () => {
    console.log("server running");
});