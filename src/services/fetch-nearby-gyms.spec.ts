import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { FetchNearbyGymsService } from './fetch-nearby-gyms.service'

let gymsRepository: InMemoryGymsRepository
let fetchNearbyGymsService: FetchNearbyGymsService

describe('Search Nearby Gyms Service', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    fetchNearbyGymsService = new FetchNearbyGymsService(gymsRepository)
  })

  it('should be able to search nearby gyms', async () => {
    await gymsRepository.create({
      title: 'Near Gym',
      description: null,
      phone: null,
      latitude: -23.7879528,
      longitude: -53.0781424,
    })

    await gymsRepository.create({
      title: 'Far Gym',
      description: null,
      phone: null,
      latitude: -24.7879528,
      longitude: -54.0781424,
    })

    const { gyms } = await fetchNearbyGymsService.execute({
      userLatitude: -23.7879528,
      userLongitude: -53.0781424,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })])
  })
})
