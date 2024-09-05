import { expect, test, describe, it } from 'vitest';
import { InMemoryUserRepository } from '../repositories/in-momory/in-memory-users-repository';
import { AuthenticateService } from './authenticate-service';
import { hash } from 'bcryptjs';
import { InvalidCredentialsError } from './errors/invalid-credentials';

describe('Register Service', () => {

    it('should be able to authenticate', async () => {
        
        const usersRepository = new InMemoryUserRepository()
        const authenticateService = new AuthenticateService(usersRepository);

        await usersRepository.create({
            name:'jhon doe',
            email:"john@gmail.com",
            password_hash: await hash('23515135',6),
        });

        const {user} = await authenticateService.execute({
            email:"john@gmail.com",
            password:"23515135"
        });

        expect(user.id).toEqual(expect.any(String));
    });

    it('should be able to authenticate with wrong email', async () => {
        
        const usersRepository = new InMemoryUserRepository()
        const authenticateService = new AuthenticateService(usersRepository);


        await expect(() => 
            authenticateService.execute({
                email:"john@gmail.com",
                password:"23515135"
            })
        ).rejects.toBeInstanceOf(InvalidCredentialsError)
    });

    it('should be able to authenticate with wrong password', async () => {
        
        const usersRepository = new InMemoryUserRepository()
        const authenticateService = new AuthenticateService(usersRepository);

        await usersRepository.create({
            name:'jhon doe',
            email:"john@gmail.com",
            password_hash: await hash('23515135',6),
        });

        await expect(() => 
            authenticateService.execute({
                email:"john@gmail.com",
                password:"123456"
            })
        ).rejects.toBeInstanceOf(InvalidCredentialsError)
    });
});
