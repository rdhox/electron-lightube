import { Model } from './index';

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

interface State {
  selectedTheme: string;
  selectedChannel: string;
  selectedVideo: string;
  isDeleteThemeDisplayed: boolean;
  displayModalAlert: ModalAlert;
};

const app: Model<State> = (update, get) => ({
  state: {
    selectedTheme: "0",
    selectedChannel: "",
    selectedVideo: "",
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
  effects: {}
});

export default app;