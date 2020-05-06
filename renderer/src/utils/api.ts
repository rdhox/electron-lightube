import { request, ResponseToModel } from './request';

type apiRequest = <T>(data: any) => Promise<ResponseToModel<T>>;

export interface API {
  url: string;
  getResultGlobalSearch: apiRequest;
  getInfosFromChannel: apiRequest;
  getVideosFromChannel: apiRequest;
  getResultFromChannel: apiRequest;
  getVideo: apiRequest;
  getComments: apiRequest;
  getPlaylist: apiRequest;
}

class tubeApi {
  url: string;
  constructor(baseUrl: string) {
    this.url = baseUrl;
  }
  // search
  getResultGlobalSearch<T>(data){
    return request<T>('/api/v1/search', 'GET', data, this.url);
  }
  // channels
  getInfosFromChannel<T>(data) {
    return request<T>('/api/v1/channels', 'GET', data, this.url);
  }
  getVideosFromChannel<T>(data) {
    return request<T>('/api/v1/channels/videos', 'GET', data, this.url);
  }
  getResultFromChannel<T>(data) {
    return request<T>('/api/v1/channels/search', 'GET', data, this.url);
  }
  // videos
  getVideo<T>(data) {
    return request<T>('/api/v1/videos', 'GET', data, this.url);
  }
  // comments
  getComments<T>(data) {
    return request<T>('/api/v1/comments', 'GET', data, this.url);
  }
  // playlist
  getPlaylist<T>(data) {
    return request<T>('/api/v1/playlists', 'GET', data, this.url);
  }

}

export default tubeApi;




