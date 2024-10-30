import { randomUUID } from 'node:crypto'

function generateDatabaseURL(schema: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('Please provide a DATABASE_URL environment variable.')
  }

  const url = new URL(process.env.DATABASE_URL)

  url.searchParams.set('schema', schema)

  return url.toString()
}

export default {
  async setup() {
    const schema = randomUUID()

    console.log(generateDatabaseURL(schema))

    console.log('Setting up Prisma Test Environment...')
    return {
      teardown() {
        console.log('Tearing down Prisma Test Environment...')
      },
    }
  },
  async setupVM() {
    console.log('Setting up Prisma VM Test Environment...')
    return {
      teardown() {
        console.log('Tearing down Prisma VM Test Environment...')
      },
    }
  },
  transformMode: 'ssr',
}
