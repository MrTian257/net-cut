export default defineEventHandler((event) => {
    // const {pathname} = getRequestURL(event)
    // if (!pathname.startsWith('/api/')) {
    // }

    event.context.auth = {user: 123}
})
