import { Model } from './index';
import {
  getResultGlobalSearch,
  getInfosFromChannel,
  getVideosFromChannel,
  getResultFromChannel,
  getVideo,
  getComments,
  getPlaylist
} from '../services/apiService';
import {
  Channel,
  VideoDetails,
  Video,
  IComments,
  Filters,
  Playlist
} from './apiType';

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

interface State {
  loading: boolean;
  currentSearch: string;
  selectedTheme: string;
  selectedChannel: string;
  selectedVideo: Video;
  videosToDisplay: Array<VideoDetails | Playlist>;
  channelInfos: Channel;
  commentsCollection: IComments;
  isDeleteThemeDisplayed: boolean;
  displayModalAlert: ModalAlert;
  isSearchModalDisplayed: boolean;
  showChannel: boolean;
  searchInChannel: boolean;
  backToSearch: boolean;
  isFiltersOn: boolean;
  filters: Filters;
  playlistSelected: Playlist;
};

const app: Model<State> = (update, get) => ({
  state: {
    loading: false,
    currentSearch:'',
    selectedTheme: "0",
    selectedChannel: "",
    selectedVideo: {} as Video,
    videosToDisplay: [],
    channelInfos: {} as Channel,
    commentsCollection: {} as IComments,
    isDeleteThemeDisplayed: false,
    displayModalAlert: {},
    isSearchModalDisplayed: false,
    showChannel: false,
    searchInChannel: false,
    backToSearch: false,
    isFiltersOn: false,
    filters: {
      sort_by: "",
      date: '',
      duration: '',
      type: '',
    },
    playlistSelected: {} as Playlist
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
    setCommentsCollection(commentsCollection) {
      update(state => ({
        ...state,
        commentsCollection
      }));
    },
    setShowChannel(showChannel) {
      update(state => ({
        ...state,
        showChannel
      }));
    },
    setSearchInChannel(searchInChannel) {
      update(state => ({
        ...state,
        searchInChannel
      }));
    },
    setBackToSearch(backToSearch) {
      update(state => ({
        ...state,
        backToSearch
      }));
    },
    setIsFiltersOn(isFiltersOn) {
      update(state => ({
        ...state,
        isFiltersOn
      }));
    },
    setFilters(filters) {
      update(state => ({
        ...state,
        filters
      }));
    },
    setPlaylistSelected(playlistSelected) {
      update(state => ({
        ...state,
        playlistSelected
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
        searchInChannel: false,
        backToSearch: false,
      }));
    }
  },
  effects: {
    launchSearch: async function(query: string, page: number = 1) {
      const setShowChannel = get().reducers.setShowChannel;
      const showChannel = get().state.showChannel;
      const videosToDisplay = get().state.videosToDisplay;
      const {
        sort_by,
        date,
        duration,
        type
      } = get().state.filters;


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

      const params: string = `?q=${query}&page=${page}${sort_by !== '' ? `&sort_by=${sort_by}`: ''}${date !== '' ? `&date=${date}`: ''}${duration !== '' ? `&duration=${duration}` : ''}${type !== '' ? `&type=${type}`: ''}`;

      const result: VideoDetails[] = await getResultGlobalSearch(params);
      if (result) {
        update(state => ({
          ...state,
          currentSearch: query,
          videosToDisplay: [
            ...state.videosToDisplay,
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
          selectedChannel: authorId,
          backToSearch: true,
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
      authorId: string = '',
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
    launchSearchOnChannel: async function(query: string = '', page: number = 1){
      const selectedChannel = get().state.selectedChannel;
      const currentSearch = get().state.currentSearch;
      
      if(page < 2) {
        update(state => ({
          ...state,
          channelInfos: {
            ...state.channelInfos,
            latestVideos: []
          },
        }));
      }

      const queryString: string = query !== '' ? query : currentSearch;

      const result: VideoDetails[] = await getResultFromChannel(`${selectedChannel}?q=${queryString}&page=${page}`);
      if (result) {
        update(state => ({
          ...state,
          currentSearch: queryString,
          searchInChannel: true,
          channelInfos: {
            ...state.channelInfos,
            latestVideos: [
              ...state.channelInfos.latestVideos,
              ...result
            ],
          },
        }));
      }
    },
    fetchVideo: async function(idVideo: string) {
      const result: Video = await getVideo(idVideo);
      if (result) {
        update(state => ({
          ...state,
          selectedVideo: result
        }))
      }
    },
    fetchComments: async function(idVideo: string) {
      const result: IComments = await getComments(idVideo);
      if (result) {
        update(state => ({
          ...state,
          commentsCollection: result
        }))
      }
    },
    fetchPlaylist: async function(idPlaylist: string) {
      const result: Playlist = await getPlaylist(idPlaylist);
      if (result) {
        update(state => ({
          ...state,
          playlistSelected: result
        }))
      }
    }
  }
});

export default app;