import { Checkin, Prisma } from '@prisma/client'

export class PrismaCheckinsRepository implements CheckInsRepository {
  create(data: Prisma.CheckinUncheckedCreateInput): Promise<Checkin> {
    throw new Error('Method not implemented.')
  }
}
