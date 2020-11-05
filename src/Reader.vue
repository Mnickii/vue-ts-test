<template>
  <div id="app" style="min-height: 100vh; min-width: 100%;" class="bg-gray-200 items-center">
    <div class="max-w-4xl px-4 py-2 mx-auto rounded-lg shadow-2xl">
      <div class="text-black-600 text-lg font-medium mt-6">{{ appName }}</div>
      <p class="text-gray-600 text-sm">Status: {{ readingPrompt }}</p>
      <div class="mt-6 flex">
        <div class="items-center flex-1">
          <h2>Reading list:</h2>
          <Article :article="article" @mark-article-read="addReadSite($event)"
                    @cancel-article="cancelReadingSite($event)"
                    v-for="(article, index) in toRead"
            :key="index" />
        </div>
        <div class="items-center flex-1">
          <h2>Already read list:
            {{ alreadyRead.length ? alreadyRead.length + ' read.' : 'No read sites' }}
          </h2>
          <Article :article="article"
                    :isRead="true"
                    @remove-article="removeReadSite($event)"
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
import { Vue, Component } from 'vue-property-decorator';
import Article from './components/Article.vue';
import SitesService from './services/sites';
import ArticleType from './interfaces/ArticleType';
import ArticleResponse from './interfaces/ArticleResponse';

@Component({
  components: {
    Article,
  },
})
export default class Reader extends Vue {
  appName = 'Random website generator'

  alreadyRead: Array<ArticleType> = [];

  toRead: Array<ArticleType> = [];

  articleRead = false;

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
      const response = SitesService.fetchSite();
      response.then((res: ArticleResponse) => {
        // response
        // make random number
        const randomNumber: number = Math.max(Math.floor(Math.random() * 5) - 1, 0);
        // get random article
        const sites = res.data.results;
        const randomSite: ArticleType = sites[randomNumber];
        // update the read sites
        this.toRead.push(randomSite);
      });
    } catch (error) {
      // eslint-disable-next-line no-alert
      alert(error);
    }
  }

  addReadSite(site: ArticleType) {
    this.alreadyRead.push(site);
    const i = this.toRead.findIndex((a) => a.url === site.url);
    this.toRead.splice(i, 1);
  }

  cancelReadingSite(site: ArticleType) {
    const i = this.toRead.findIndex((a) => a.url === site.url);
    this.toRead.splice(i, 1);
    return this.toRead;
  }

  removeReadSite(site: ArticleType) {
    const i = this.alreadyRead.findIndex((a) => a.url === site.url);
    this.alreadyRead.splice(i, 1);
    return this.alreadyRead;
  }
}
</script>
