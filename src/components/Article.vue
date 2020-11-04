<template>
  <div class="article">
    <div
          @mouseenter="hover = true"
          @mouseleave="hover = false">
      <div class="flex">
        <span class="text-grey-600">
          Name:</span>
        <span class="font-bold text-gray-900">
          {{ article.title}} - <a :href="article.url">Link</a>
          </span>
      </div>
      <div>
        <button class="bg-red-400 text-white py-1 px-3 rounded-full font-bold shadow my-3"
                @click="markArticleRead(article)">Mark Read</button>
        <a class="bg-red-400 text-white py-1 px-3 rounded-full font-bold shadow my-3"
          target="_"
          :href="article.url">Open</a>
      </div>
      <div v-if="hover" class="bg-gray-400 p-4">
        Abstract: {{article.abstract}}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  Vue, Component, Prop, Emit,
} from 'vue-property-decorator';

@Component
export default class Article extends Vue {
  @Prop() private article!: object;

  markedRead = {}

  hover = false

  @Emit()
  markArticleRead(a: object) {
    this.markedRead = a;
  }
}
</script>
