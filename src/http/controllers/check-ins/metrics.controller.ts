import { makeGetUserMetricsService } from '@/services/factories/make-get-user-metrics-service'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function checkInsMetricsController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const checkInsMetricsService = makeGetUserMetricsService()

  const { checkInsCount } = await checkInsMetricsService.execute({
    userId: request.user.sub,
  })

  return reply.status(200).send({ checkInsCount })
}
