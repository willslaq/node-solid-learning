import { makeFetchNearbyGymsService } from '@/services/factories/make-fetch-nearby-gyms-service'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function nearbyGymsController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { latitude, longitude } = z
    .object({
      latitude: z.number().refine((value) => Math.abs(value) <= 90, {
        message: 'Latitude must be between -90 and 90',
      }),
      longitude: z.number().refine((value) => Math.abs(value) <= 180, {
        message: 'Longitude must be between -180 and 180',
      }),
    })
    .parse(request.query)

  const nearbyGymsService = makeFetchNearbyGymsService()

  const { gyms } = await nearbyGymsService.execute({
    userLatitude: latitude,
    userLongitude: longitude,
  })

  return reply.status(200).send({
    gyms,
  })
}
