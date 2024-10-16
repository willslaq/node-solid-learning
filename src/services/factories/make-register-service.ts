import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { RegisterService } from '../register.service'

export function makeRegisterService() {
  return new RegisterService(new PrismaUsersRepository())
}
