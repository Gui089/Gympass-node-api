import { PrismaUserRepository } from "../../repositories/prisma/prisma-users-repository"
import { AuthenticateService } from "../authenticate-service"


export function makeAthenticateService() {

    const prismaUsersRepository = new PrismaUserRepository()
    const RegisterServiceUsers = new AuthenticateService(prismaUsersRepository);

    return RegisterServiceUsers;
}