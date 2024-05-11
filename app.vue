<template>
  <template>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </template>
</template>

<script setup lang="ts">
useSeoMeta({
  ogImage: '/og-image.png'
})

const appConfig = useAppConfig()

// console.log(appConfig.theme)
</script>