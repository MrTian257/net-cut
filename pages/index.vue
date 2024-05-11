<script setup lang="ts">
// definePageMeta({
//   layout: false,
// })
const { data } = await useFetch('/api/net_cut')
</script>

<template>
  <div>
    The rest of the page
    <pre>{{ data }}</pre>
    <div>
      <!-- <NuxtWelcome /> -->
    </div>
  </div>
</template>
