import tubeApi, { API} from '../utils/api';
import { baseUrl } from '../config/hardData';

const api: API = new tubeApi(baseUrl);

export const getResultGlobalSearch = data => api.getResultGlobalSearch(data);
