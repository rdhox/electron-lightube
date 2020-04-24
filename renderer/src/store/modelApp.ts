import { Model } from './index';
import { getResultGlobalSearch } from '../services/apiService';

interface ModalAlert {
  title?: string;
  text?: string;
  yes?: string;
  no?: string;
  actionYes?: (any) => void;
  actionNo?: (any) => void;
  actionDefault?: (any) => void;
  singleButton?: boolean;
}

interface VideoDetails {
  type: string;
  videoId: string;
  title: string;
  author: string;
  authorUrl: string;
  videoThumbnails: object[];
  viewCount: number;
  published: number;
  publishedText: string;
  lengthSeconds: number;
  descriptionHtml: string;
  liveNow: boolean;
  paid: boolean;
  premium: boolean;
};

interface State {
  selectedTheme: string;
  selectedChannel: string;
  selectedVideo: string;
  videosToDisplay: VideoDetails[];
  isDeleteThemeDisplayed: boolean;
  displayModalAlert: ModalAlert;
};

const app: Model<State> = (update, get) => ({
  state: {
    selectedTheme: "0",
    selectedChannel: "",
    selectedVideo: "",
    videosToDisplay: [],
    isDeleteThemeDisplayed: false,
    displayModalAlert: {}
  },
  reducers: {
    setSelectedTheme(selectedTheme) {
      update(state => ({
        ...state,
        selectedTheme
      }));
    },
    setSelectedChannel(selectedChannel) {
      update(state => ({
        ...state,
        selectedChannel
      }));
    },
    setSelectedVideo(selectedVideo) {
      update(state => ({
        ...state,
        selectedVideo
      }));
    },
    setIsDeleteThemeDisplayed(isDeleteThemeDisplayed) {
      update(state => ({
        ...state,
        isDeleteThemeDisplayed
      }));
    },
    setDisplayModalAlert(displayModalAlert) {
      update(state => ({
        ...state,
        displayModalAlert
      }));
    },
  },
  effects: {
    launchSearch: async function(query) {
      const result = await getResultGlobalSearch(query);
      if (result) {
        update(state => ({
          ...state,
          videosToDisplay: result,
        }));
      }
    }
  }
});

export default app;