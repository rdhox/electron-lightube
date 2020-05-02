import { request } from './request';

type apiRequest = (data: any) => any;

export interface API {
  url: string;
  getResultGlobalSearch: apiRequest;
  getInfosFromChannel: apiRequest;
  getVideosFromChannel: apiRequest;
  getVideo: apiRequest;
  getComments: apiRequest;
}

class tubeApi implements API {
  url: string;
  constructor(baseUrl: string) {
    this.url = baseUrl;
  }
  // search
  getResultGlobalSearch = data => request('/api/v1/search', 'GET', data, this.url);
  // channels
  getInfosFromChannel = data => request('/api/v1/channels', 'GET', data, this.url);
  getVideosFromChannel = data => request('/api/v1/channels/videos', 'GET', data, this.url);
  // videos
  getVideo = data => request('/api/v1/videos', 'GET', data, this.url);
  // comments
  getComments = data => request('/api/v1/comments', 'GET', data, this.url);

}

export default tubeApi;




