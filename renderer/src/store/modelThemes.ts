import uniqid from 'uniqid';
import { Model } from './index';
import { apiApp } from './index';

export interface Theme {
  id: keyof Themes;
  name: string;
};

export interface Themes {
  [key: string]: Theme;
};

interface State {
  themes: Themes;
};

const themes: Model<State> = (update, get) => ({
  state: {
    themes: {
      "0": {
        id: "0",
        name: "All"
      },
    }
  },
  reducers: {},
  effects: {
    addTheme(name: string) {
      const setSelectedTheme = apiApp.getState().reducers.setSelectedTheme;
      const themes: Themes = JSON.parse(JSON.stringify(get().state.themes));
      const id: string = uniqid();
      const newTheme: Theme = {
        id,
        name
      };
      themes[id] = newTheme;
      update(state => ({
        ...state,
        themes
      }));
      
      setSelectedTheme(id);
    },
    deleteTheme(id: string) {
      const setSelectedTheme = apiApp.getState().reducers.setSelectedTheme;
      setSelectedTheme("0");

      const themes: Themes = JSON.parse(JSON.stringify(get().state.themes));
      delete themes[id];
      update(state => ({
        ...state,
        themes
      }));
    }
  }
});

export default themes;