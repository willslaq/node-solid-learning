import { PrismaCheckinsRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { CheckinService } from '../check-in.service'

export function makeCheckInService() {
  const checkInsRepository = new PrismaCheckinsRepository()
  const gymsRepository = new PrismaGymsRepository()

  const checkInService = new CheckinService(checkInsRepository, gymsRepository)

  return checkInService
}
