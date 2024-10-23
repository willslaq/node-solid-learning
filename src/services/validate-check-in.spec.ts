import { InMemoryCheckinsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { ValidateCheckInService } from './validate-check-in.service'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let checkInsRepository: InMemoryCheckinsRepository
let validateCheckInService: ValidateCheckInService

describe('Validate Check-in Service', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckinsRepository()
    validateCheckInService = new ValidateCheckInService(checkInsRepository)
  })

  it('should be able to validate check-in', async () => {
    const createdCheckIn = await checkInsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    const { checkIn } = await validateCheckInService.execute({
      checkInId: createdCheckIn.id,
    })

    expect(checkIn.validated_at).toEqual(expect.any(Date))
    expect(checkInsRepository.items[0].validated_at).toEqual(expect.any(Date))
  })

  it('should not be able to validate an inexistent check-in', async () => {
    await expect(() =>
      validateCheckInService.execute({
        checkInId: 'inexistent-check-in-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
