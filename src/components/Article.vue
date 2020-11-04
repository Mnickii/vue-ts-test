<template>
  <div class="article mb-6 rounded-lg mt-6 hover:bg-indigo-100"
      @mouseenter="hover = true"
      @mouseleave="hover = false">
    <h2 class="font-medium text-sm">
      {{ article.title}}</h2>
    <h3 class="text-blue-500 text-sm">
      <a :href="article.url">{{article.url}}</a>
    </h3>
    <div class="mt-6 flex">
      <button class=" read border border-green-500 text-black py-2 text-sm px-3
      hover:bg-green-500 rounded-full hover:text-black"
              v-if="!isRead"
              @click="markArticleRead(article)">Mark Read</button>
      <a class="ml-4 text-black-600 py-2 text-sm px-3
      rounded-full border border-green-500 hover:bg-green-500 hover:text-black"
        target="_"
        :href="article.url">Open</a>
      <button class="bg-red-500 text-white py-2 text-sm px-3 ml-24 rounded-full hover:text-black"
              @click="cancelArticle(article)">Cancel</button>
    </div>
    <p v-if="hover" class="text-gray-600 text-sm mt-6">
      {{article.abstract}}
    </p>
  </div>
</template>

<script lang="ts">
import {
  Vue, Component, Prop, Emit,
} from 'vue-property-decorator';

@Component
export default class Article extends Vue {
  @Prop() private article!: object;

  @Prop() private isRead!: boolean;

  markedRead = {}

  canceledArticle = {}

  hover = false

  @Emit()
  markArticleRead(a: object) {
    this.markedRead = a;
  }

  @Emit()
  cancelArticle(a: object) {
    this.canceledArticle = a;
  }
}
</script>

<style>

</style>
