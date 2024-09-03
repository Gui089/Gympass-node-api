import { z } from 'zod';
import { Request, Response } from 'express';
import { RegisterService } from '../../services/register-service';
import { PrismaUserRepository } from '../../repositories/prisma/prisma-users-repository';
import { UserAlreadyExists } from '../../services/errors/user-already-exists';


export async function registerController (req:Request, res:Response){
    const registerBodySchema = z.object({
        name: z.string(),
        email:z.string().email(),
        password: z.string().min(6)
    });

    const { name, email, password } = registerBodySchema.parse(req.body);

    try {
        const prismaUsersRepository = new PrismaUserRepository()
        const RegisterServiceUsers = new RegisterService(prismaUsersRepository)

        RegisterServiceUsers.execute({name, email, password});
    } catch (err) {
        if(err instanceof UserAlreadyExists) {
            return  res.status(409).send();
        }

        return res.status(500).send();
    }

    res.status(201).send();
}