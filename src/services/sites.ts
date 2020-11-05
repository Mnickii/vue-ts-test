import axios, { AxiosResponse } from 'axios';
import config from '../config';

class SitesService {
  async fetchSite(): Promise<AxiosResponse> {
    return axios.get(config.apiBaseUrl);
  }
}

export default new SitesService();
