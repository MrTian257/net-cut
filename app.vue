<template>
  <div>
    <NuxtWelcome />
  </div>
  页面访问量：{{ count }}
</template>

<script setup lang="ts">
const { data: count } = await useFetch('/api/count')
</script>