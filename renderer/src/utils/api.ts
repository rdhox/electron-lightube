import { request } from './request';

export interface API {
  baseUrl: string
}
type apiRequest = (data: any) => (object | string);

class tubeApi {
  url: string;
  constructor(baseUrl: string) {
    this.url = baseUrl;
  }
  // search
  getFromSearch: apiRequest = data => request('/api/v1/search', 'GET', data, this.url);

}

export default tubeApi;




