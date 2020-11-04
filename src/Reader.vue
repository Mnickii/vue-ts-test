<template>
  <div id="app" class="w-full h-full bg-gray-200 p-8" style="min-height: 100vh; min-width: 100%;">
    <div class="article max-w-md bg-white px-4 py-2 mx-auto rounded shadow">
      <h1 class="text-xl font-bold py-4">{{ appName }}</h1>
      <div class="text-gray-500">
        Status: <span class="font-bold text-gray-800">{{ readingStatus }}</span>
      </div>
      <div v-if="toRead.length > 0">
      <h2>Reading list:</h2>
      <div
        v-for="(article, index) in toRead"
        :key="index"
        class="bg-gray-200 px-4 py-2 my-2 rounded shadow">
        <Article :article="article" @mark-article-read="func3($event)" />
      </div>
    </div>
      <button class="bg-red-400 text-white py-1 px-3 rounded-full font-bold shadow my-3 "
      @click.prevent="func6">
      Add reading
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import { Vue, Component } from 'vue-property-decorator';
import Article from './components/Article.vue';

@Component({
  components: {
    Article,
  },
})
export default class Reader extends Vue {
  appName = 'Random news site generator'

  alreadyRead = []

  toRead = []

  get readingStatus() {
    if (this.alreadyRead.length === 0 && this.toRead.length === 0) return 'Add something to read to get the show started';
    if (this.alreadyRead.length > 0 && this.toRead.length === 0) return 'Was that it? Add more below';
    if (this.toRead.length === 0) return 'Get reading!';
    return 'hmm - this is strange';
  }

  // add a new article to the reading list
  func6() {
    // create get call to grab list of potential article soruces
    try {
      axios.get('/test-data.json').then((response) => {
        // response
        const res = response;
        // data from response
        const { data } = res;
        // make random number
        const r = Math.max(Math.floor(Math.random() * 5) - 1, 0);
        // get random article
        const ra = data.results[r];
        // update the state
        this.toRead.push(ra);
      });
    } catch (error) {
      // eslint-disable-next-line no-alert
      alert(error);
    }
  }

  func3(ar) {
    this.alreadyRead.push(ar);
    const i = this.toRead.findIndex((a) => {
      console.log(a);
      return a.url === ar.url;
    });
    this.toRead.splice(i, 1);
  }
}
</script>
