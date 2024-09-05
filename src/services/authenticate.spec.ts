import { expect, test, describe, it, beforeEach } from 'vitest';
import { InMemoryUserRepository } from '../repositories/in-momory/in-memory-users-repository';
import { AuthenticateService } from './authenticate-service';
import { hash } from 'bcryptjs';
import { InvalidCredentialsError } from './errors/invalid-credentials';

let usersRepository: InMemoryUserRepository
let authenticateService: AuthenticateService;

describe('Register Service', () => {

    beforeEach(() => {
        usersRepository = new InMemoryUserRepository()
        authenticateService = new AuthenticateService(usersRepository);
    });

    it('should be able to authenticate', async () => {
        
    

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
        
        

        await expect(() => 
            authenticateService.execute({
                email:"john@gmail.com",
                password:"23515135"
            })
        ).rejects.toBeInstanceOf(InvalidCredentialsError)
    });

    it('should be able to authenticate with wrong password', async () => {
        

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
