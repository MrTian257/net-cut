export default defineEventHandler(async (event) => {
  const params = getQuery(event)
  const reqIp = getRequestIP(event)
  const body = await readBody<{ password: string }>(event)
  console.log('req body: ', body)

  return 'Test post handler'
})