import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { RegisterService } from '@/services/register.service'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'

export async function registerController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = registerBodySchema.parse(request.body)

  try {
    const prismaUsersRepository = new PrismaUsersRepository()
    const registerService = new RegisterService(prismaUsersRepository)

    await registerService.execute({ name, email, password })
  } catch (error) {
    if (error instanceof Error && error.name === 'UserAlreadyExistsError') {
      return reply.status(409).send({ message: error.message })
    }

    return reply.status(500).send() // TODO
  }

  return reply.status(201).send()
}
