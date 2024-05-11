<script setup lang="ts">
useServerSeoMeta({
  robots: 'index, follow'
})

definePageMeta({
  middleware: "auth"
})

</script>
<template>
  <div class="absolute min-h-screen min-w-[100vw] overflow-auto bg-gray-200 dark:bg-gray-800 p-2 flex flex-col gap-2">
    <!-- 头？ -->
    <div class="flex flex-row items-center justify-center mx-auto h-14 bg-gray-100 rounded-xl">
      <div class="w-fit mx-auto flex flex-row items-center gap-2  px-3">
        <div class="menu-item menu-active">聊天框</div>
        <div class="menu-item">文本</div>
        <div class="menu-item">文件</div>
        <div class="menu-item">超大文件</div>
      </div>
    </div>

    <!-- 这里 -->
    <div class="relative flex-1">
      <slot name="default"/>
    </div>
  </div>
</template>

<style scoped>
.menu-item {
  @apply text-gray-600 no-underline hover:cursor-pointer hover:underline;
}

.menu-active {
  @apply text-cyan-700;
}
</style>
