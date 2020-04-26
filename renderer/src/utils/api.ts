import { request } from './request';

type apiRequest = (data: any) => any;

export interface API {
  url: string;
  getResultGlobalSearch: apiRequest;
  getVideosFromChannel: apiRequest;
}

class tubeApi implements API {
  url: string;
  constructor(baseUrl: string) {
    this.url = baseUrl;
  }
  // search
  getResultGlobalSearch = data => request('/api/v1/search', 'GET', data, this.url);
  // channels
  getVideosFromChannel = data => request('/api/v1/channels', 'GET', data, this.url);

}

export default tubeApi;




