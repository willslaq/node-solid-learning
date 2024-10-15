import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { describe, expect, it } from 'vitest'
import { AuthenticateService } from './authenticate.service'
import bcrypt from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

describe('Authenticate service', () => {
  it('should be able to authenticate', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const authenticateService = new AuthenticateService(usersRepository)

    await usersRepository.create({
      name: 'John Doe',
      email: 'WzXZ3@example.com',
      password_hash: await bcrypt.hash('123456', 6),
    })

    const { user } = await authenticateService.execute({
      email: 'WzXZ3@example.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const authenticateService = new AuthenticateService(usersRepository)

    expect(() =>
      authenticateService.execute({
        email: 'WzXZ3@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const authenticateService = new AuthenticateService(usersRepository)

    await usersRepository.create({
      name: 'John Doe',
      email: 'WzXZ3@example.com',
      password_hash: await bcrypt.hash('123456', 6),
    })

    expect(() =>
      authenticateService.execute({
        email: 'WzXZ3@example.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
