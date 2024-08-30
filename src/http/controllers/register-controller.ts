import { z } from 'zod';
import { Request, Response } from 'express';
import { registerService } from '../../services/register-service';


export async function registerController (req:Request, res:Response){
    const registerBodySchema = z.object({
        name: z.string(),
        email:z.string().email(),
        password: z.string().min(6)
    });

    const { name, email, password } = registerBodySchema.parse(req.body);

    try {
        await registerService({
            name,
            email,
            password
        });
    } catch (err) {
        return res.status(409).send();
    }

    res.status(201).send();
}