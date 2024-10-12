import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'

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
  constructor(private usersRepository: any) {}
  async execute({ email, name, password }: RegisterServiceRequest) {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (userWithSameEmail) {
      throw new Error('User already exists.')
    }

    await this.usersRepository.create({
      name,
      email,
      password_hash,
    })
  }
}
