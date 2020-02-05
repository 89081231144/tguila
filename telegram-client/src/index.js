const { Airgram, Auth, prompt, toObject } = require('airgram')
const airgram = new Airgram({
  apiId: Number(process.env.APP_ID),
  apiHash: process.env.APP_HASH,
  command: process.env.TDLIB_COMMAND,
  databaseDirectory: process.env.DATABASE_DIRECTORY,
  useChatInfoDatabase: true,
  useFileDatabase: true,
  useMessageDatabase: true,
  enableStorageOptimizer: Boolean(process.env.ENABLE_STORAGE_OPTIMIZER),
  logVerbosityLevel: 2
})
airgram.use(new Auth({
  code: () => prompt('Please enter the secret code:\n'),
  phoneNumber: () => prompt('Please enter your phone number:\n')
}))
exports.airgram = airgram;
