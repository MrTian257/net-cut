<script setup lang="ts">
import ChatBubble from "~/components/ChatBubble.vue";
import {useMessage} from "~/composables/message";

const route = useRoute()

definePageMeta({
  name: 'dataTheme',
  value: 'cupcake',
  content: 'cupcake'
})

console.log('ruote: ', route)
const message = useMessage(route.path);

const {data} = await useFetch('/api/net_cut/message')
const ip = ref('127.0.0.1')
</script>

<template>
  <div class="absolute size-full">
    <div class=" container  min-h-full mx-auto flex flex-col gap-2">

      <div class=" flex-1 bg-gray-100 p-2 rounded-xl">
        <ClientOnly>
          <ChatBubble/>
        </ClientOnly>
      </div>

      <div class="message-input bg-gray-100 p-2 rounded-xl bottom-0.5">
        <label class="form-control">
          <textarea v-model="ip" class="textarea textarea-bordered textarea-warning h-24"
                    placeholder="message"></textarea>
          <div class="label justify-end">
            <span class="label-text-alt">
            <button class="btn btn-sm btn-warning">send</button>
          </span>
          </div>
        </label>
      </div>
    </div>
  </div>

</template>

<style scoped>

</style>