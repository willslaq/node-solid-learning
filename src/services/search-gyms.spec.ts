import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { SearchGymsService } from './search-gyms.service'

let gymsRepository: InMemoryGymsRepository
let searchGymsService: SearchGymsService

describe('Search Gyms Service', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    searchGymsService = new SearchGymsService(gymsRepository)
  })

  it('should be able to search gyms', async () => {
    await gymsRepository.create({
      title: 'JavaScript Gym',
      description: null,
      phone: null,
      latitude: -23.7879528,
      longitude: -53.0781424,
    })

    await gymsRepository.create({
      title: 'TypeScript Gym',
      description: null,
      phone: null,
      latitude: -23.7879528,
      longitude: -53.0781424,
    })

    const { gyms } = await searchGymsService.execute({
      query: 'JavaScript',
      page: 1,
    })

    return expect(gyms).toHaveLength(1)
  })

  it('should be able to search paginated gyms', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `JavaScript Gym ${i}`,
        description: null,
        phone: null,
        latitude: -23.7879528,
        longitude: -53.0781424,
      })
    }

    const { gyms } = await searchGymsService.execute({
      query: 'JavaScript',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
  })
})
