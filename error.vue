<script setup lang="ts">
import type {NuxtError} from '#app'

const props = defineProps({
  error: Object as () => NuxtError
})
console.log('error: ', props.error)
</script>

<template>
  <div class="container mx-auto">
    <h1>{{ error.statusCode }}</h1>
    <div class="mockup-code p-2">
      <code class="">{{ error.message }}</code>
    </div>
    <div>
      <NuxtLink to="/">Go back home</NuxtLink>
    </div>
  </div>
</template>
