import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterService } from './register.service'
import bcrypt from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists'

let usersRepository: InMemoryUsersRepository
let registerService: RegisterService

describe('Register service', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    registerService = new RegisterService(usersRepository)
  })

  it('should be able to register', async () => {
    const { user } = await registerService.execute({
      name: 'John Doe',
      email: 'WzXZ3@example.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const { user } = await registerService.execute({
      name: 'John Doe',
      email: 'WzXZ3@example.com',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await bcrypt.compare(
      '123456',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with an existing email', async () => {
    const email = 'WzXZ3@example.com'

    await registerService.execute({
      name: 'John Doe',
      email,
      password: '123456',
    })

    await expect(() =>
      registerService.execute({
        name: 'John Doe',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
