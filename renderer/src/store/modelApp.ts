import { Model } from './index';
import {
  getResultGlobalSearch,
  getInfosFromChannel,
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
  authorThumbnails: string;
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
        isSearchModalDisplayed: false,
        selectedChannel: '',
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
    fetchChannelInfos: async function(channel: string) {
      const setShowChannel = get().reducers.setShowChannel;
      setShowChannel(true);

      const result = await getInfosFromChannel(channel);
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
            authorThumbnails: authorThumbnails[3].url,
            subCount,
            description,
            latestVideos,
          },
        }));
      }
    },
    fetchChannelVideo: async function(
      authorId: string= '',
      page: number = 1,
      image: string = '',
      author: string = '',
      subCount: string = '',
      description: string = ''
      ){
      
      if(page < 2) {
        update(state => ({
          ...state,
          channelInfos: {},
        }));
      }
      const result: VideoDetails[] = await getVideosFromChannel(`${authorId}?page=${page}`);
      if (result) {
        if(page === 1) {
          update(state => ({
            ...state,
            channelInfos: {
              author,
              authorId,
              authorThumbnails: image,
              subCount,
              description,
              latestVideos: result,
            },
          }));
        } else if (page > 1) {
          console.log(result);
          update(state => ({
            ...state,
            channelInfos: {
              ...state.channelInfos,
              latestVideos: [
                ...state.channelInfos.latestVideos,
                ...result
              ],
            },
          }));
        }
      }
    },
  }
});

export default app;