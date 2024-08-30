import { z } from 'zod';
import { Request, Response } from 'express';
import { prisma } from '../../lib/prisma';


export async function registerController (req:Request, res:Response){
    const registerBodySchema = z.object({
        name: z.string(),
        email:z.string().email(),
        password: z.string().min(6)
    });

    const { name, email, password } = registerBodySchema.parse(req.body);

    await prisma.user.create({
        data : {
            name,
            email,
            password_hash:password
        }
    });

    res.status(201).send();
}