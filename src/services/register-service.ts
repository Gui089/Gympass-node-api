import { hash } from "bcryptjs";

import { UsersRepository } from "../repositories/users-repository";
import { UserAlreadyExists } from "./errors/user-already-exists";

interface RegisterServiceRequest {
    name: string;
    email: string;
    password: string
}

export class RegisterService {

    constructor(
        private usersRepository: UsersRepository,
    ) {
        
    }

    async execute({
        name,
        email,
        password
    }:RegisterServiceRequest) {
        const password_hash = await hash(password, 6);

        const userWithEmail = await this.usersRepository.findByEmail(email);

        if(userWithEmail) {
            throw new UserAlreadyExists;
        }
    
        await this.usersRepository.create({
            name,
            email,
            password_hash
        });
    }
}

