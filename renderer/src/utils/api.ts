import i18n from './i18n';
import { request, ResponseToModel } from './request';

export type apiRequest = <T>(data: any, errorInfo?: string) => Promise<ResponseToModel<T>>;

export interface API {
  url: string;
  setUrl: (newUrl: string) => void;
  getUrl: () => string;
  getResultGlobalSearch: apiRequest;
  getInfosFromChannel: apiRequest;
  getVideosFromChannel: apiRequest;
  getResultFromChannel: apiRequest;
  getVideo: apiRequest;
  getComments: apiRequest;
  getPlaylist: apiRequest;
}

export class tubeApi {
  url: string;
  constructor(baseUrl: string) {
    this.url = baseUrl;
  }

 setUrl(newUrl: string) {
    this.url = newUrl;
  }
 getUrl() {
    return this.url;
 }

  // search
  getResultGlobalSearch<T>(data){
    return request<T>('/api/v1/search', 'GET', data, this.url, i18n.t('global.errors.search'));
  }
  // channels
  getInfosFromChannel<T>(data, errorInfo) {
    return request<T>('/api/v1/channels', 'GET', data, this.url, `${i18n.t('global.errors.channel')} ${errorInfo}`);
  }
  getVideosFromChannel<T>(data, errorInfo) {
    return request<T>('/api/v1/channels/videos', 'GET', data, this.url, `${i18n.t('global.errors.channel')} ${errorInfo}`);
  }
  getResultFromChannel<T>(data) {
    return request<T>('/api/v1/channels/search', 'GET', data, this.url, i18n.t('global.errors.search'));
  }
  // videos
  getVideo<T>(data) {
    return request<T>('/api/v1/videos', 'GET', data, this.url, i18n.t('global.errors.informations'));
  }
  // comments
  getComments<T>(data) {
    return request<T>('/api/v1/comments', 'GET', data, this.url, i18n.t('global.errors.comments'));
  }
  // playlist
  getPlaylist<T>(data) {
    return request<T>('/api/v1/playlists', 'GET', data, this.url, i18n.t('global.errors.search'));
  }

}

export default tubeApi;




