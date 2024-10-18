import { Checkin, Prisma } from '@prisma/client'
import { CheckInsRepository } from '../check-ins.repository'
import { prisma } from '@/lib/prisma'

export class PrismaCheckinsRepository implements CheckInsRepository {
  async create(data: Prisma.CheckinUncheckedCreateInput): Promise<Checkin> {
    const checkIn = await prisma.checkin.create({
      data,
    })

    return checkIn
  }
}
