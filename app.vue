<template>
  <div>
    <NuxtWelcome />
  </div>
  <!-- 页面访问量：{{ count }} -->
</template>

<script setup lang="ts">
useSeoMeta({
  ogImage: '/og-image.png'
})

// const { data: count } = await useFetch('/api/count')
const appConfig = useAppConfig()

console.log(appConfig.theme)
</script>