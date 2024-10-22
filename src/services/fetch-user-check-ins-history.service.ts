import { CheckInsRepository } from '@/repositories/check-ins.repository'
import { Checkin } from '@prisma/client'

interface fetchUserCheckInsHistoryServiceRequest {
  userId: string
  page: number
}

interface fetchUserCheckInsHistoryServiceResponse {
  checkIns: Checkin[]
}

export class FetchUserCheckInsHistoryService {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
    page,
  }: fetchUserCheckInsHistoryServiceRequest): Promise<fetchUserCheckInsHistoryServiceResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(
      userId,
      page,
    )

    return { checkIns }
  }
}
