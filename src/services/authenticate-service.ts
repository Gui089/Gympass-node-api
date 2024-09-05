import { compare } from "bcryptjs";
import { UsersRepository } from "../repositories/users-repository";
import { InvalidCredentialsError } from "./errors/invalid-credentials";
import { User } from "@prisma/client";

interface AuthenticateServiceRequest {
    email: string;
    password: string;
}

interface AuthenticateServiceResponse {
    user: User
}


export class AuthenticateService {
    constructor(
        private usersRepository: UsersRepository
    ) {

    }

    async execute({
        email,
        password
    }: AuthenticateServiceRequest):Promise<AuthenticateServiceResponse> {
        const user = await this.usersRepository.findByEmail(email);

        if(!user) {
            throw new InvalidCredentialsError();
        }

        const doePasswordMatches = await compare(password, user.password_hash);

        if(!doePasswordMatches) {
            throw new InvalidCredentialsError();
        }

        return {
            user,
        }
    }
}