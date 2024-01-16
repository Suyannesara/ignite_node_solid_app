import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { RegisterUseCase } from '../register'

export function makeRegisterUseCase() {
  const usersRepository = new PrismaUsersRepository()
  /**
   * D - Dependency Inversoin Principle (from SOLID)
   * The file that needs to use RegisterUseCase should send the dependencies to this
   * */
  return new RegisterUseCase(usersRepository)
}
