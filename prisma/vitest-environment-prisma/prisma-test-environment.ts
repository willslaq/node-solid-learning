export default {
  async setup() {
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
