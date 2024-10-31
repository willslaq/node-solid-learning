import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { searchGymsController } from './search-controller'
import { nearbyGymsController } from './nearby.controller'
import { createGymController } from './create.controller'

export async function gymRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.get('/gyms/search', searchGymsController)
  app.get('/gyms/nearby', nearbyGymsController)

  app.post('/gyms', createGymController)
}
