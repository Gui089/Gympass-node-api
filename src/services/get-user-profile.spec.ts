import { expect, test, describe, it, beforeEach } from 'vitest';
import { InMemoryUserRepository } from '../repositories/in-momory/in-memory-users-repository';
import { hash } from 'bcryptjs';
import { GetUserProfileService } from './get-user-profile-service';
import { ResourceNotFound } from './errors/resource-not-found';

let usersRepository: InMemoryUserRepository
let getUserProfileService: GetUserProfileService;

describe('Get user profile Service', () => {

    beforeEach(() => {
        usersRepository = new InMemoryUserRepository()
        getUserProfileService = new GetUserProfileService(usersRepository);
    });

    it('should be able to get user profile', async () => {
        
    

        const createdUser = await usersRepository.create({
            name:'jhon doe',
            email:"john@gmail.com",
            password_hash: await hash('23515135',6),
        });

        const {user} = await getUserProfileService.execute({
            userId: createdUser.id,
        });

        expect(user.name).toEqual('jhon doe');
    });

    it('should be able to get user profile with wrong id', async () => {
        
        

        await expect(() => 
            getUserProfileService.execute({
                userId: 'non-existing-id'
            })
        ).rejects.toBeInstanceOf(ResourceNotFound)
    });

    
});