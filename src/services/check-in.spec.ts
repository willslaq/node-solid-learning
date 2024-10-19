import { InMemoryCheckinsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { CheckinService } from './check-in.service'
import { Decimal } from '@prisma/client/runtime/library'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { MaxDistanceError } from './errors/max-distance-error'
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins'

let checkInsRepository: InMemoryCheckinsRepository
let gymsRepository: InMemoryGymsRepository
let checkInService: CheckinService

describe('Check-in service', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckinsRepository()
    gymsRepository = new InMemoryGymsRepository()
    checkInService = new CheckinService(checkInsRepository, gymsRepository)

    await gymsRepository.create({
      id: 'gym-1',
      title: 'JavaScript Gym',
      description: '',
      phone: '',
      latitude: -23.7879528,
      longitude: -53.0781424,
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await checkInService.execute({
      userId: 'user-1',
      gymId: 'gym-1',
      userLatitude: -23.7879528,
      userLongitude: -53.0781424,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await checkInService.execute({
      userId: 'user-1',
      gymId: 'gym-1',
      userLatitude: -23.7879528,
      userLongitude: -53.0781424,
    })

    await expect(() =>
      checkInService.execute({
        userId: 'user-1',
        gymId: 'gym-1',
        userLatitude: -23.7879528,
        userLongitude: -53.0781424,
      }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
  })

  it('should be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await checkInService.execute({
      userId: 'user-1',
      gymId: 'gym-1',
      userLatitude: -23.7879528,
      userLongitude: -53.0781424,
    })

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

    const { checkIn } = await checkInService.execute({
      userId: 'user-1',
      gymId: 'gym-1',
      userLatitude: -23.7879528,
      userLongitude: -53.0781424,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in on distant gym', async () => {
    gymsRepository.items.push({
      id: 'gym-2',
      title: 'JavaScript Gym',
      description: '',
      phone: '',
      latitude: new Decimal(-23.777513),
      longitude: new Decimal(-53.072388),
    })

    await expect(() =>
      checkInService.execute({
        userId: 'user-1',
        gymId: 'gym-2',
        userLatitude: -23.785251,
        userLongitude: -53.070354,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
