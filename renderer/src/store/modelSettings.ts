import create from 'zustand';
import {update} from './middleware';

import { Model } from './index';

export interface SettingsState {
  locale: string;
  apiUrl: string,
  autoplay: boolean,
  showRecommended: boolean,
  showComments: boolean,
  codeRegion: string
}

const settings: Model<SettingsState> = (update, get) => ({
  state: {
    locale: 'en',
    apiUrl: 'https://invidio.us',
    autoplay: true,
    showRecommended: true,
    showComments: true,
    codeRegion: 'US'
  },
  reducers: {
    initialize(initialState) {
      const copyInitialState = JSON.parse(JSON.stringify(initialState));
      update(state => ({
        ...copyInitialState
      }));
    },
    setLocale(locale) {
      update(state => ({
        ...state,
        locale
      }));
    },
    setApiUrl(apiUrl) {
      update(state => ({
        ...state,
        apiUrl
      }));
    },
    setAutoPlay(autoplay) {
      update(state => ({
        ...state,
        autoplay
      }));
    },
    setShowRecommended(showRecommended) {
      update(state => ({
        ...state,
        showRecommended
      }));
    },
    setShowComments(showComments) {
      update(state => ({
        ...state,
        showComments
      }));
    },
    setCodeRegion(codeRegion) {
      update(state => ({
        ...state,
        codeRegion
      }));
    },
  },
  effects: {}
});

export const [ useSettings, apiSettings ] = create((set, get) => settings(update(set, get), get));