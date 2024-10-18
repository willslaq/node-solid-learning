import { CheckInsRepository } from '@/repositories/check-ins.repository'
import { Checkin } from '@prisma/client'

interface CheckinServiceRequest {
  userId: string
  gymId: string
}

interface CheckinServiceResponse {
  checkIn: Checkin
}

export class CheckinService {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
    gymId,
  }: CheckinServiceRequest): Promise<CheckinServiceResponse> {
    const checkIn = await this.checkInsRepository.create({
      gym_id: gymId,
      user_id: userId,
    })

    return { checkIn }
  }
}
