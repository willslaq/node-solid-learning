import { InMemoryCheckinsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { FetchUserCheckInsHistoryService } from './fetch-user-check-ins-history.service'

let checkInsRepository: InMemoryCheckinsRepository
let fetchUserCheckInsHistoryService: FetchUserCheckInsHistoryService

describe('Fetch user check-ins history service', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckinsRepository()
    fetchUserCheckInsHistoryService = new FetchUserCheckInsHistoryService(
      checkInsRepository,
    )
  })

  it('should be able to fetch user check-ins history', async () => {
    await checkInsRepository.create({
      gym_id: 'gym-1',
      user_id: 'user-1',
    })

    await checkInsRepository.create({
      gym_id: 'gym-2',
      user_id: 'user-1',
    })

    const { checkIns } = await fetchUserCheckInsHistoryService.execute({
      userId: 'user-1',
      page: 1,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ gym_id: 'gym-1' }),
        expect.objectContaining({ gym_id: 'gym-2' }),
      ]),
    )
  })

  it('should be able to fetch paginated check-ins history', async () => {
    for (let i = 1; i <= 22; i++) {
      await checkInsRepository.create({
        gym_id: `gym-${i}`,
        user_id: 'user-1',
      })
    }

    const { checkIns } = await fetchUserCheckInsHistoryService.execute({
      userId: 'user-1',
      page: 2,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ gym_id: 'gym-21' }),
        expect.objectContaining({ gym_id: 'gym-22' }),
      ]),
    )
  })
})
