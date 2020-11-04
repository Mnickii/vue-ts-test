<template>
  <div id="app" style="min-height: 100vh; min-width: 100%;" class="bg-gray-200 items-center">
    <div class="max-w-4xl px-4 py-2 mx-auto rounded-lg shadow-2xl">
      <div class="text-black-600 text-lg font-medium mt-6">{{ appName }}</div>
      <p class="text-gray-600 text-sm">Status: {{ readingPrompt }}</p>
      <div class="mt-6 flex">
        <div class="items-center flex-1"
            v-if="toRead.length > 0">
          <h2>Reading list:</h2>
          <Article :article="article" @mark-article-read="addReadSite($event)"
                    @cancel-article="cancelReadingSite($event)"
                    v-for="(article, index) in toRead"
            :key="index" />
        </div>
        <div class="items-center flex-1"
            v-if="alreadyRead.length > 0">
          <h2>Already read list:</h2>
          <Article :article="article"
                    :isRead="true"
                    v-for="(article, index) in alreadyRead"
            :key="index" />
        </div>
      </div>
      <button class="bg-green-500 text-white py-1 px-3 rounded-full font-bold shadow my-3"
              @click.prevent="generateReadingSite">
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
  appName = 'Random website generator'

  alreadyRead = []

  toRead = []

  get readingPrompt() {
    if (this.alreadyRead.length === 0 && this.toRead.length === 0) return 'Add a site to read to get the show started';
    if (this.alreadyRead.length > 0 && this.toRead.length === 0) return 'Was that it? Add more below';
    if (this.toRead.length === 0) return 'Get reading!';
    return '...reading';
  }

  // add a new article to the reading list
  generateReadingSite() {
    // create get call to grab list of potential article sources
    try {
      axios.get('/test-data.json').then((response) => {
        // response
        const sites = response.data.results;
        // make random number
        const r = Math.floor(Math.random() * sites.length);
        // get random article
        const randomSite = sites[r];
        // update the read sites
        const includesRandom = this.toRead.includes(randomSite);
        if (!includesRandom) {
          this.toRead.push(randomSite);
        }
      });
    } catch (error) {
      // eslint-disable-next-line no-alert
      alert(error);
    }
  }

  addReadSite(site: object) {
    this.alreadyRead.push(site);
    const i = this.toRead.findIndex((a) => a.url === site.url);
    this.toRead.splice(i, 1);
  }

  cancelReadingSite(site: object) {
    const i = this.toRead.findIndex((a) => a.url === site.url);
    this.toRead.splice(i, 1);
  }
}
</script>
