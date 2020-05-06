import tubeApi, { API} from '../utils/api';
import { baseUrl } from '../config/hardData';

const api: API = new tubeApi(baseUrl);

export const getResultGlobalSearch = <T>(data) => api.getResultGlobalSearch<T>(data);
export const getInfosFromChannel = <T>(data) => api.getInfosFromChannel<T>(data);
export const getVideosFromChannel = <T>(data) => api.getVideosFromChannel<T>(data);
export const getResultFromChannel = <T>(data) => api.getResultFromChannel<T>(data);
export const getVideo = <T>(data) => api.getVideo<T>(data);
export const getComments = <T>(data) => api.getComments<T>(data);
export const getPlaylist = <T>(data) => api.getPlaylist<T>(data);
