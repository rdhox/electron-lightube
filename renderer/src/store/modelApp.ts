import { Model } from './index';
import {
  getResultGlobalSearch,
  getVideosFromChannel
} from '../services/apiService';

export interface ModalAlert {
  title?: string;
  text?: string;
  yes?: string;
  no?: string;
  actionYes?: () => void;
  actionNo?: () => void;
  actionDefault?: () => void;
  singleButton?: boolean;
}

export interface Channel {
  author: string;
  authorId: string;
  authorThumbnails: Thumbnail[];
  subCount: number;
  description: string;
  latestVideos: VideoDetails[];
};

export interface Thumbnail {
  url: string;
  quality: string;
  width: number;
  height: number;
};

export interface VideoDetails {
  type: string;
  videoId: string;
  title: string;
  author: string;
  authorUrl: string;
  authorId: string;
  videoThumbnails: Thumbnail[];
  viewCount: number;
  published: number;
  publishedText: string;
  lengthSeconds: number;
  descriptionHtml: string;
  description: string;
  liveNow: boolean;
  paid: boolean;
  premium: boolean;
};

interface State {
  loading: boolean;
  currentSearch: string;
  selectedTheme: string;
  selectedChannel: string;
  selectedVideo: string;
  videosToDisplay: VideoDetails[];
  channelInfos: Channel;
  isDeleteThemeDisplayed: boolean;
  displayModalAlert: ModalAlert;
  isSearchModalDisplayed: boolean;
  showChannel: boolean;
};

const app: Model<State> = (update, get) => ({
  state: {
    loading: false,
    currentSearch:'',
    selectedTheme: "0",
    selectedChannel: "",
    selectedVideo: "",
    videosToDisplay: [],
    channelInfos: {} as Channel,
    isDeleteThemeDisplayed: false,
    displayModalAlert: {},
    isSearchModalDisplayed: false,
    showChannel: false,
  },
  reducers: {
    setCurrentSearch(currentSearch) {
      update(state => ({
        ...state,
        currentSearch
      }));
    },
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
    setIsSearchModalDisplayed(isSearchModalDisplayed) {
      update(state => ({
        ...state,
        isSearchModalDisplayed
      }));
    },
    setVideosToDisplay(videosToDisplay) {
      update(state => ({
        ...state,
        videosToDisplay
      }));
    },
    setChannelInfos(channelInfos) {
      update(state => ({
        ...state,
        channelInfos
      }));
    },
    setShowChannel(showChannel) {
      update(state => ({
        ...state,
        showChannel
      }));
    },
    resetSearch() {
      update(state => ({
        ...state,
        currentSearch: '',
        videosToDisplay: [],
        channelInfos: {},
        isSearchModalDisplayed: false
      }));
    }
  },
  effects: {
    launchSearch: async function(query: string, page: number = 1) {
      const setShowChannel = get().reducers.setShowChannel;
      const showChannel = get().state.showChannel;
      const videosToDisplay = get().state.videosToDisplay;
      if(showChannel) {
        setShowChannel(false);
      }
      if(page < 2) {
        if(videosToDisplay.length > 0) {
          update(state => ({
            ...state,
            videosToDisplay: [],
          }));
        }
      }

      const result: VideoDetails[] = await getResultGlobalSearch(`?q=${query}&page=${page}`);
      if (result) {
        update(state => ({
          ...state,
          currentSearch: query,
          videosToDisplay: [
            ...videosToDisplay,
            ...result
          ],
        }));
      }
    },
    fetchchannelInfos: async function(channel: string) {
      const setShowChannel = get().reducers.setShowChannel;
      setShowChannel(true);

      const result: Channel = await getVideosFromChannel(channel);
      if (result) {
        const {
          author,
          authorId,
          authorThumbnails,
          subCount,
          description,
          latestVideos,
        } = result;

        update(state => ({
          ...state,
          channelInfos: {
            author,
            authorId,
            authorThumbnails,
            subCount,
            description,
            latestVideos,
          },
        }));
      }
    }
  }
});

export default app;