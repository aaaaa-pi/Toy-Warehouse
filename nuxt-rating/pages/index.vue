<template>
  <div id="app">
    <div class="emoji-wrapper overflow-hidden row-span-2 p-1" ref="emojiWrapper">
      <div class="emoji w-18 h-18 flex justify-center items-center mb-2 text-7xl"
        v-for="emoji in emojis"
        :key="emoji">
          {{ emoji }}
      </div>
    </div>
    <div class="text-center">
      Your vote: {{ myRate || '🤔️' }}
    </div>
    <div class="rating flex-row-reverse justify-center items-center">
      <input class="mask mask-star-2 w-10 h-10"
        v-for="item in 5"
        type="radio"
        name="rating"
        :key="item"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const emojis = ['🤔️', '💩', '👎', '😄', '😍', '🎉'];
const emojiWrapper = ref<HTMLDivElement>();
const myRate = ref<number>(0);
</script>

<style scoped></style>
