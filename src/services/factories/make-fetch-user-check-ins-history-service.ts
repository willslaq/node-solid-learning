import { PrismaCheckinsRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { FetchUserCheckInsHistoryService } from '../fetch-user-check-ins-history.service'

export function makeFetchUserCheckInsHistoryService() {
  const checkInsRepository = new PrismaCheckinsRepository()
  const service = new FetchUserCheckInsHistoryService(checkInsRepository)

  return service
}
