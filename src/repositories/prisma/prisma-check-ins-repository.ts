import { Checkin, Prisma } from '@prisma/client'
import { CheckInsRepository } from '../check-ins.repository'
import { prisma } from '@/lib/prisma'
import dayjs from 'dayjs'

export class PrismaCheckinsRepository implements CheckInsRepository {
  async save(data: Checkin) {
    const checkInUpdated = await prisma.checkin.update({
      where: {
        id: data.id,
      },
      data,
    })

    return checkInUpdated
  }

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf('date')
    const endOfTheDay = dayjs(date).endOf('date')

    const checkInOnSameDate = await prisma.checkin.findFirst({
      where: {
        user_id: userId,
        created_at: {
          gte: startOfTheDay.toDate(),
          lte: endOfTheDay.toDate(),
        },
      },
    })

    return checkInOnSameDate
  }

  async findManyByUserId(userId: string, page: number) {
    const checkIns = await prisma.checkin.findMany({
      where: {
        user_id: userId,
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return checkIns
  }

  async findById(id: string) {
    const checkIn = await prisma.checkin.findUnique({
      where: {
        id,
      },
    })

    return checkIn
  }

  async countByUserId(userId: string) {
    const count = await prisma.checkin.count({
      where: {
        user_id: userId,
      },
    })

    return count
  }

  async create(data: Prisma.CheckinUncheckedCreateInput) {
    const checkIn = await prisma.checkin.create({
      data,
    })

    return checkIn
  }
}
