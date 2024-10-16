import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { AuthenticateService } from '../authenticate.service'

export function makeAuthenticateService() {
  return new AuthenticateService(new PrismaUsersRepository())
}
