import { PrismaCheckinsRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { ValidateCheckInService } from '../validate-check-in.service'

export function makeValidateCheckInService() {
  const checkInsRepository = new PrismaCheckinsRepository()
  const service = new ValidateCheckInService(checkInsRepository)

  return service
}
