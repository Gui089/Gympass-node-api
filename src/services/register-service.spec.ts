import { expect, test, describe, it } from 'vitest';
import { RegisterService } from './register-service';
import { compare } from 'bcryptjs';
import { InMemoryUserRepository } from '../repositories/in-momory/in-memory-users-repository';
import { UserAlreadyExists } from './errors/user-already-exists';

describe('Register Service', () => {

    it('should be able to register', async () => {
        
        const usersRepository = new InMemoryUserRepository()
        const registerService = new RegisterService(usersRepository);

        const {user} = await registerService.execute({
            name:'Jhon doe',
            email:"john@gmail.com",
            password:"23515135"
        });

        expect(user.id).toEqual(expect.any(String));
    });

    it('should hash user password upon registration', async () => {
        
        const usersRepository = new InMemoryUserRepository()
        const registerService = new RegisterService(usersRepository);

        const {user} = await registerService.execute({
            name:'Jhon doe',
            email:"john@gmail.com",
            password:"23515135"
        });

        const isPasswordCorrectlyHashed = await compare(
            "23515135",
            user.password_hash
        );

        expect(isPasswordCorrectlyHashed).toBe(true);
    });

    it('should not be able to register with same email twice', async () => {
        
        const usersRepository = new InMemoryUserRepository()
        const registerService = new RegisterService(usersRepository);

        const email = "john@gmail.com";

        await registerService.execute({
            name:'Jhon doe',
            email,
            password:"23515135"
        });

        await expect(() => 
            registerService.execute({
                name:'Jhon doe',
                email,
                password:"23515135"
            })
        ).rejects.toBeInstanceOf(UserAlreadyExists)
    });
});

