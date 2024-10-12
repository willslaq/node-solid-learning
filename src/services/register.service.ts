import { UsersRepository } from '@/repositories/users.repository'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists'

interface RegisterServiceRequest {
  name: string
  email: string
  password: string
}

// SOLID
// D - Dependency Inversion Principle
// I - Interface Segregation Principle
// L - Liskov Substitution Principle
// O - Open Close Principle
// S - Single Responsability Principle

export class RegisterService {
  constructor(private usersRepository: UsersRepository) {}
  async execute({ email, name, password }: RegisterServiceRequest) {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    await this.usersRepository.create({
      name,
      email,
      password_hash,
    })
  }
}
