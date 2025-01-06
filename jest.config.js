/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFiles: ['dotenv/config'],
  forceExit:true,
  setupFilesAfterEnv: ['./test/app.setup.ts'], // Path to your setup file
};