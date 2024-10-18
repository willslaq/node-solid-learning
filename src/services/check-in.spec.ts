import { InMemoryCheckinsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { CheckinService } from './check-in.service'

let checkInsRepository: InMemoryCheckinsRepository
let checkInService: CheckinService

describe('Check-in service', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckinsRepository()
    checkInService = new CheckinService(checkInsRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await checkInService.execute({
      userId: 'user-1',
      gymId: 'gym-1',
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await checkInService.execute({
      userId: 'user-1',
      gymId: 'gym-1',
    })

    await expect(() =>
      checkInService.execute({
        userId: 'user-1',
        gymId: 'gym-1',
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await checkInService.execute({
      userId: 'user-1',
      gymId: 'gym-1',
    })

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

    const { checkIn } = await checkInService.execute({
      userId: 'user-1',
      gymId: 'gym-2',
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
