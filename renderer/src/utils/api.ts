import { request } from './request';

type apiRequest = (data: any) => (object | string);

export interface API {
  url: string,
  getResultGlobalSearch: apiRequest
}

class tubeApi implements API {
  url: string;
  constructor(baseUrl: string) {
    this.url = baseUrl;
  }
  // search
  getResultGlobalSearch = data => request('/api/v1/search', 'GET', data, this.url);

}

export default tubeApi;




