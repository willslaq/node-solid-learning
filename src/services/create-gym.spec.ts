import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { CreateGymService } from './create-gym.service'
import { beforeEach, describe, expect, it } from 'vitest'

let gymsRepository = new InMemoryGymsRepository()
let createGymService = new CreateGymService(gymsRepository)

describe('Create Gym Service', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    createGymService = new CreateGymService(gymsRepository)
  })

  it('should be able to create gym', async () => {
    const { gym } = await createGymService.execute({
      title: 'JavaScript Gym',
      description: null,
      phone: null,
      latitude: -23.7879528,
      longitude: -53.0781424,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
