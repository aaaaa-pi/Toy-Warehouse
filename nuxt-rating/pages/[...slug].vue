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
    <div class="rating flex-row-reverse justify-center items-center" @change="onChange">
      <input class="mask mask-star-2 w-10 h-10"
        v-for="item in 5"
        type="radio"
        name="rating"
        :key="item"
        :class="{active: 6 - item === myRate}"
        :value="6 - item"
        v-model="myRate"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const path = route.path;
const emojis = ['🤔️', '💩', '👎', '😄', '😍', '🎉'];
const emojiWrapper = ref<HTMLDivElement>();
const myRate = ref<number>(0);
const {data:rateData,pending} = await useFetch('/api/rate',{
  query:{
    uid: path,
  },
  default() {
    return { r1: 0, r2: 0, r3: 0, r4: 0, r5: 0 };
  }
})
const onChange = ():void => {
  if(!emojiWrapper.value) return 

  emojiWrapper.value.scrollTo({
    top: myRate.value * emojiWrapper.value.clientHeight,
    behavior: "smooth"
  })
}
</script>

<style scoped></style>
