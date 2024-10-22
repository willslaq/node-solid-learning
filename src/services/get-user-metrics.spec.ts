import { InMemoryCheckinsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { GetUserMetricsService } from './get-user-metrics.service'

let checkInsRepository: InMemoryCheckinsRepository
let getUserMetricsService: GetUserMetricsService

describe('Get User Metrics Service', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckinsRepository()
    getUserMetricsService = new GetUserMetricsService(checkInsRepository)
  })

  it('should be able to get check-ins count from metrics', async () => {
    await checkInsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    await checkInsRepository.create({
      gym_id: 'gym-02',
      user_id: 'user-01',
    })

    const { checkInsCount } = await getUserMetricsService.execute({
      userId: 'user-01',
    })

    expect(checkInsCount).toEqual(2)
  })
})
