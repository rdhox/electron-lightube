import { Model } from './index';

export interface SettingsState {
  locale: string;
}

const settings: Model<SettingsState> = (update, get) => ({
  state: {
    locale: 'en',
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
  },
  effects: {}
});

export default settings;