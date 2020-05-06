import uniqid from 'uniqid';
import { Model } from './index';
import { apiApp } from './index';
import { Thumbnail } from './apiType';

export interface Theme {
  id: keyof Themes;
  name: string;
};

export interface Themes {
  [key: string]: Theme;
};

export interface ChannelSaved {
  image: string;
  author: string;
  authorId: string;
  subCount: number;
  description: string;
};

export interface ChannelsInThemes {
  [key: string]: ChannelSaved[];
};

export interface SeeLaterVideo {
  videoId: string;
  title: string;
  videoThumbnails: Thumbnail[];
  author: string;
  authorId: string;
  lengthSeconds: number;
  viewCountText?: number | string;
}

export interface ThemesState {
  themes: Themes;
  channels: ChannelsInThemes;
  watchlater: SeeLaterVideo[];
};

const themes: Model<ThemesState> = (update, get) => ({
  state: {
    themes: {
      "0": {
        id: "0",
        name: "All"
      },
    },
    channels: {
      "0": []
    },
    watchlater: [] as SeeLaterVideo[],
  },
  reducers: {
    initialize(initialState) {
      const copyInitialState = JSON.parse(JSON.stringify(initialState));
      update(state => ({
        ...copyInitialState
      }));
    },
  },
  effects: {
    addTheme(name: string) {
      const setSelectedTheme = apiApp.getState().reducers.setSelectedTheme;
      const themes: Themes = JSON.parse(JSON.stringify(get().state.themes));
      const channels: ChannelsInThemes = JSON.parse(JSON.stringify(get().state.channels));

      const id: string = uniqid();
      const newTheme: Theme = {
        id,
        name
      };
      themes[id] = newTheme;
      channels[id] = [];

      update(state => ({
        ...state,
        themes,
        channels
      }));
      
      setSelectedTheme(id);
    },
    deleteTheme(id: string) {
      const setSelectedTheme = apiApp.getState().reducers.setSelectedTheme;
      setSelectedTheme("0");

      const themes: Themes = JSON.parse(JSON.stringify(get().state.themes));
      const channels: ChannelsInThemes = JSON.parse(JSON.stringify(get().state.channels));
      delete channels[id];
      delete themes[id];

      update(state => ({
        ...state,
        themes,
        channels
      }));
    },
    addChannelToTheme(channel: ChannelSaved) {
      const selectedTheme = apiApp.getState().state.selectedTheme;
      const channels: ChannelsInThemes = JSON.parse(JSON.stringify(get().state.channels));
      // we add the channel in the ALL themes
      channels["0"].unshift(channel);
      // we add the channel in the selected theme
      if (selectedTheme !== "0") {
        channels[selectedTheme].unshift(channel);
      }

      update(state => ({
        ...state,
        channels
      }));
    },
    removeChannelToTheme(authorId: string) {
      const selectedTheme = apiApp.getState().state.selectedTheme;
      const channels: ChannelsInThemes = JSON.parse(JSON.stringify(get().state.channels));
      // we remove the channel from the ALL theme
      const indexToDeleteALL = channels["0"].findIndex(channel => channel.authorId === authorId);
      channels["0"].splice(indexToDeleteALL, 1);
      // we remove the channel from the selected theme if needed
      if (selectedTheme !== "0") {
        const indexToDelete = channels[selectedTheme].findIndex(channel => channel.authorId === authorId);
        channels[selectedTheme].splice(indexToDelete, 1);
      }

      update(state => ({
        ...state,
        channels
      }));
    },
    addVideoOnWatchLater(video: SeeLaterVideo) {
      const watchlater: SeeLaterVideo[] = JSON.parse(JSON.stringify(get().state.watchlater));
      watchlater.push(video);
      update(state => ({
        ...state,
        watchlater
      }));
    },
    removeVideoOnWatchLater(idVideo: string) {
      const watchlater = JSON.parse(JSON.stringify(get().state.watchlater));
      const indexToDelete = watchlater.findIndex(video => video.videoId === idVideo);

      if(indexToDelete !== -1) {
        watchlater.splice(indexToDelete, 1);
        update(state => ({
          ...state,
          watchlater
        }));
      }
    },
  }
});

export default themes;