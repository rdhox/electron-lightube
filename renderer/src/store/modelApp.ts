import create from 'zustand';
import {loadingDetection, update} from './middleware';
import { toast } from 'react-toastify';
import { Model, apiSettings, apiThemes } from './index';
import { ChannelsInThemes, ChannelSaved } from './modelThemes';
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
  ChannelFromApi,
  VideoDetails,
  Video,
  IComments,
  Filters,
  Playlist
} from './apiType';
import { ResponseToModel } from '../utils/request';
import { shuffleArray } from '../utils/functions';

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
  homepageVideos: VideoDetails[];
  videosToDisplay: Array<VideoDetails | Playlist>;
  channelInfos: Channel;
  commentsCollection: IComments;
  isDeleteThemeDisplayed: boolean;
  displayModalAlert: ModalAlert;
  isSearchModalDisplayed: boolean;
  isSettingsModalDisplayed: boolean;
  isWatchLaterModalDisplayed: boolean;
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
    homepageVideos: [],
    videosToDisplay: [],
    channelInfos: {} as Channel,
    commentsCollection: {} as IComments,
    isDeleteThemeDisplayed: false,
    displayModalAlert: {} as ModalAlert,
    isSearchModalDisplayed: false,
    isSettingsModalDisplayed: false,
    isWatchLaterModalDisplayed: false,
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
    setIsSettingsModalDisplayed(isSettingsModalDisplayed) {
      update(state => ({
        ...state,
        isSettingsModalDisplayed
      }));
    },
    setIsWatchLaterModalDisplayed(isWatchLaterModalDisplayed) {
      update(state => ({
        ...state,
        isWatchLaterModalDisplayed
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
      const region = apiSettings.getState().state.codeRegion;


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

      const params: string = `?q=${query}&page=${page}${sort_by !== '' ? `&sort_by=${sort_by}`: ''}${date !== '' ? `&date=${date}`: ''}${duration !== '' ? `&duration=${duration}` : ''}${type !== '' ? `&type=${type}`: ''}&region=${region}`;

      const result: ResponseToModel<VideoDetails[]> = await getResultGlobalSearch<VideoDetails[]>(params);
      if (!result.error) {
        update(state => ({
          ...state,
          currentSearch: query,
          videosToDisplay: [
            ...state.videosToDisplay,
            ...result.data
          ],
        }));
      }
    },
    fetchChannelInfos: async function(channel: string) {
      const setShowChannel = get().reducers.setShowChannel;
      setShowChannel(true);

      const result: ResponseToModel<ChannelFromApi> = await getInfosFromChannel<ChannelFromApi>(channel, channel);
      if (!result.error) {
        const {
          author,
          authorId,
          authorThumbnails,
          subCount,
          description,
          latestVideos,
        } = result.data;

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
      subCount: number = 0,
      description: string = ''
      ){
      
      if(page < 2) {
        update(state => ({
          ...state,
          channelInfos: {},
        }));
      }

      let errorInfo = author;
      if (page > 1) {
        const channelInfos = get().state.channelInfos;
        errorInfo = channelInfos.author;
      }

      const result: ResponseToModel<VideoDetails[]> = await getVideosFromChannel<VideoDetails[]>(`${authorId}?page=${page}`, errorInfo);
      if (!result.error) {
        if(page === 1) {
          update(state => ({
            ...state,
            channelInfos: {
              author,
              authorId,
              authorThumbnails: image,
              subCount,
              description,
              latestVideos: result.data,
            },
          }));
        } else if (page > 1) {
          update(state => ({
            ...state,
            channelInfos: {
              ...state.channelInfos,
              latestVideos: [
                ...state.channelInfos.latestVideos,
                ...result.data
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

      const result: ResponseToModel<VideoDetails[]> = await getResultFromChannel<VideoDetails[]>(`${selectedChannel}?q=${queryString}&page=${page}`);
      if (!result.error) {
        update(state => ({
          ...state,
          currentSearch: queryString,
          searchInChannel: true,
          channelInfos: {
            ...state.channelInfos,
            latestVideos: [
              ...state.channelInfos.latestVideos,
              ...result.data
            ],
          },
        }));
      }
    },
    fetchVideo: async function(idVideo: string) {
      const result: ResponseToModel<Video> = await getVideo<Video>(idVideo);
      if (!result.error) {
        update(state => ({
          ...state,
          selectedVideo: result.data
        }))
      }
    },
    fetchComments: async function(idVideo: string) {
      const result: ResponseToModel<IComments> = await getComments<IComments>(idVideo);
      if (!result.error) {
        update(state => ({
          ...state,
          commentsCollection: result.data
        }))
      }
    },
    fetchPlaylist: async function(idPlaylist: string) {
      const result: ResponseToModel<Playlist> = await getPlaylist<Playlist>(idPlaylist);
      if (!result.error) {
        update(state => ({
          ...state,
          playlistSelected: result.data
        }))
      }
    },
    fetchVideosForHomepage : async function() {
      const channels: ChannelsInThemes = apiThemes.getState().state.channels;

      const fetchsCollection: Promise<ResponseToModel<VideoDetails[]>>[] = channels['0'].reduce((acc, channel: ChannelSaved) => {
        const { authorId, author } = channel;
        const promise: Promise<ResponseToModel<VideoDetails[]>> = getInfosFromChannel<VideoDetails[]>(`${authorId}/latest`, author);
        acc.push(promise);
        return acc;
      }, []); 

      try {
        const data = await Promise.allSettled(fetchsCollection);
        const videosTab: VideoDetails[] = data.reduce((acc, res) => {
          if(res.status === 'fulfilled' && !res.value.error) {
            // Only first 5 videos of channel
            acc = [
              ...acc,
              ...res.value.data.slice(0, 5)
            ];
          }
          return acc;
        }, []);
        const shuffledVideosTab: VideoDetails[] = shuffleArray<VideoDetails>(videosTab);
        update(state => ({
          ...state,
          homepageVideos: shuffledVideosTab
        }));
      } catch (error) {
        toast.error(error, {autoClose: 2000});
      }
    }
  }
});

export const [ useApp, apiApp ] = create((set, get) => loadingDetection(
  app(update(set, get), get),
  set)
);