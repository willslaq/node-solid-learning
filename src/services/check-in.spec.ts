import { InMemoryCheckinsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CheckinService } from './check-in.service'

let checkInsRepository: InMemoryCheckinsRepository
let checkInService: CheckinService

describe('Check-in service', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckinsRepository()
    checkInService = new CheckinService(checkInsRepository)
  })

  it('should be able to check in', async () => {
    const { checkIn } = await checkInService.execute({
      userId: 'user-1',
      gymId: 'gym-1',
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
