import {useAuth} from "~/composables/auth";

export default defineNuxtRouteMiddleware((to, from) => {

  const auth = useAuth()
  console.log('auth: ', auth.value)
  console.log('to: ', to.path)

  if (!auth.value.isAuthenticated && to.path !== '/login') {
    console.log('from to ================>')
    auth.value.hash = 'asdasdasdxxxxxxxxxxxxxx'
    auth.value.navigateTo = to.path
    return navigateTo('/login')
  }

  // if (to.path !== '/dashboard') {
  //     return navigateTo('/dashboard')
  // }
})
