import { Model } from './index';

const updateState = (key, value) => state => {
  return ({
    ...state,
    global: {
      ...state['global'],
      [key]: value
    }
})};

const global: Model = (set, get) => ({
  selectedTheme: "",
  selectedChannel: "",
  selectedVideo: "",
  search:"",
  reducers: {
    setSelectedTheme(action) {
      set(state => ({
        ...state,
        selectedTheme: action.selectedTheme
      }));
    },
    setSelectedChannel(action) {
      set(state => ({
        ...state,
        selectedChannel: action.selectedChannel
      }));
    },
    setSelectedVideo(action) {
      set(state => ({
        ...state,
        selectedVideo: action.selectedVideo
      }));
    },
    setSearch({search}) {
      set(updateState("search", search));
    },
  },
  effects: {}
});

export default global;