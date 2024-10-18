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
    const checkInOnSameDate = await this.checkInsRepository.findByUserIdOnDate(
      userId,
      new Date(),
    )

    if (checkInOnSameDate) {
      throw new Error('User already checked in today')
    }

    const checkIn = await this.checkInsRepository.create({
      gym_id: gymId,
      user_id: userId,
    })

    return { checkIn }
  }
}
