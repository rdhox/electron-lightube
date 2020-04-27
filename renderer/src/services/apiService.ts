import tubeApi, { API} from '../utils/api';
import { baseUrl } from '../config/hardData';

const api: API = new tubeApi(baseUrl);

export const getResultGlobalSearch = data => api.getResultGlobalSearch(data);
export const getInfosFromChannel = data => api.getInfosFromChannel(data);
export const getVideosFromChannel = data => api.getVideosFromChannel(data);
