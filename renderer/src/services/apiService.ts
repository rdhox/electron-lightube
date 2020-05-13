import tubeApi, { API } from '../utils/api';
import { ResponseToModel } from '../utils/request';

export type ServiceApi = <T>(data: any, errorInfo?: string) => Promise<ResponseToModel<T>>;

export const apiInstance: API = new tubeApi('');

export const getResultGlobalSearch: ServiceApi = <T>(data) => apiInstance.getResultGlobalSearch<T>(data);
export const getInfosFromChannel: ServiceApi = <T>(data, errorInfo) => apiInstance.getInfosFromChannel<T>(data, errorInfo);
export const getVideosFromChannel: ServiceApi = <T>(data, errorInfo) => apiInstance.getVideosFromChannel<T>(data, errorInfo);
export const getResultFromChannel: ServiceApi = <T>(data) => apiInstance.getResultFromChannel<T>(data);
export const getVideo: ServiceApi = <T>(data) => apiInstance.getVideo<T>(data);
export const getComments: ServiceApi = <T>(data) => apiInstance.getComments<T>(data);
export const getPlaylist: ServiceApi = <T>(data) => apiInstance.getPlaylist<T>(data);
