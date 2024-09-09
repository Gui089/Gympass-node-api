import { PrismaUserRepository } from "../../repositories/prisma/prisma-users-repository"
import { RegisterService } from "../register-service"

export function MakeRegisterSerive() {
    const prismaUsersRepository = new PrismaUserRepository()
    const RegisterServiceUsers = new RegisterService(prismaUsersRepository)

    return RegisterServiceUsers;
} 