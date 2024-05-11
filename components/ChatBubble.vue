<script setup lang="ts">
import {type  Message, useMessage} from "~/composables/message";
import {format, fromNow} from "~/utils/datatimeUtils";

defineProps({})

const message = useMessage();

const isSender = (message: Message) => {
  return message.sender === 'message' ? 'chat-end' : 'chat-start';
}

</script>

<template>
  <div class="my-chat-bubble">

    <div v-for="item in message" :key="`${item.sender}-${item.timestamp}`" class="chat"
         :class="isSender(item)">
      <div class="chat-image avatar">
        <div class="w-10 rounded-full">
          <img alt="Tailwind CSS chat bubble component"
               src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"/>
        </div>
      </div>
      <div class="chat-header">
        {{ item.sender }}
        <!-- <time class="text-xs opacity-50">{{ format(item.timestamp) }}</time> -->
      </div>
      <div class="chat-bubble">{{ item.message }}</div>
      <div class="chat-footer text-xs opacity-50">
        at
        <time class="text-xs opacity-50">{{ fromNow(item.timestamp) }}</time>
      </div>
    </div>

  </div>

</template>

<style scoped>

</style>