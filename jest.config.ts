import nextJest from 'next/jest'

const createJestConfig = nextJest({
  dir: './',
})

const config = {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'], // Nếu bạn có file setup
}

export default createJestConfig(config)