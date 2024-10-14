import { describe, expect, it } from 'vitest'
import { RegisterService } from './register.service'
import bcrypt from 'bcryptjs'

describe('Register service', () => {
  it('should hash user password upon registration', async () => {
    const registerService = new RegisterService({
      async findByEmail() {
        return null
      },
      async create(data) {
        return {
          id: 'user-id',
          name: data.name,
          email: data.email,
          password_hash: data.password_hash,
          created_at: new Date(),
        }
      },
    })

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
})
