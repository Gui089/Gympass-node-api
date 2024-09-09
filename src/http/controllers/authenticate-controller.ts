import { z } from 'zod';
import { Request, Response } from 'express';
import { PrismaUserRepository } from '../../repositories/prisma/prisma-users-repository';
import { AuthenticateService } from '../../services/authenticate-service';
import { InvalidCredentialsError } from '../../services/errors/invalid-credentials';
import { makeAthenticateService } from '../../services/factories/make-athenticate-service';


export async function authenticateController (req:Request, res:Response){
    const authenticateBodySchema = z.object({
        email:z.string().email(),
        password: z.string().min(6)
    });

    const { email, password } = authenticateBodySchema.parse(req.body);

    try {
        
        const RegisterServiceUsers = makeAthenticateService();

        RegisterServiceUsers.execute({ email, password});
    } catch (err) {
        if(err instanceof InvalidCredentialsError) {
            return  res.status(400).send({message: err.message});
        }

        return res.status(500).send();
    }

    res.status(200).send();
}