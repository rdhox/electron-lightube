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

interface State {
  themes: Themes;
  channels: ChannelsInThemes;
};

const themes: Model<State> = (update, get) => ({
  state: {
    themes: {
      "0": {
        id: "0",
        name: "All"
      },
    },
    channels: {
      "0": [
        {
          image: "https://yt3.ggpht.com/a/AATXAJw0Y_zVoHt4IIiI62DKOnJJBPnOl4zN7zH-nQ=s100-c-k-c0xffffffff-no-rj-mo",
          author: "BoxEntertainment",
          authorId: "UCe82Pwam1NggI6pWK8oNbjA",
          subCount: 85900,
          description: "BoxEntertainment - The Boxing Lifestyle"
        },
        {
          image: "https://yt3.ggpht.com/a/AATXAJwHN8rZE_7fXQaBcR9-25hvPVTNSuNaVknZlg=s100-c-k-c0xffffffff-no-rj-mo",
          author: "Boxing Physique",
          authorId: "UC9qVqkzlo_ddKrDTkVKEPAA",
          subCount: 188000,
          description: "Boxing Physique comes with boxing training!↵Contact me at boxingphysique@gmail.com",
        },
        {
          image: "https://yt3.ggpht.com/a/AATXAJzWrGw-jQDhkbu_ayk6-DqQ-HhyV1dJjCB0dA=s100-c-k-c0xffffffff-no-rj-mo",
          author: "GMA Public Affairs",
          authorId: "UCj5RwDivLksanrNvkW0FB4w",
          subCount: 10200000,
          description: "GMA Public Affairs is the home of the Philippines' best documentary, docudrama, news magazine, and lifestyle TV programming. Visit this YouTube channel for daily video clips from your favorite GMA Network and GMA News TV public affairs shows like Kapuso Mo, Jessica Soho, Wish Ko Lang, I-Witness, Imbestigador, Reporter's Notebook, Aha!, Pinoy MD, Tunay na Buhay, Born to be Wild, and Unang Hirit. We've also got videos from GMA News TV programs like Brigada, Pinas Sarap, IJuander, Investigative Documentaries, Biyahe ni Drew, Reel Time, Front Row, Ang Pinaka, and more.",
        },
        {
          image: "https://yt3.ggpht.com/a/AATXAJzpYc5DRYgsgbKE4-BlWCaxAAvVZalPj2eFVA=s100-c-k-c0xffffffff-no-rj-mo",
          author: "SportsTalk PH",
          authorId: "UCzzflHnkC32Z7oOP5GxyZ_Q",
          subCount: 322000,
          description: "Welcome to SportsTalk PH. Usapang sports lang lahat mga idol. Wag kakalimutang subscribe bilang suporta sa channel natin. Maraming salamat!"
        },
        {
          image: "https://yt3.ggpht.com/a/AATXAJwjbUKne9y9VzlFWLMl_1IM7icLEeACFLB24w=s100-c-k-c0xffffffff-no-rj-mo",
          author: "Fight Hub TV",
          authorId: "UCwdVyruxCCqMR4DtPLhtwlg",
          subCount: 773000,
          description: "Fight Hub TV brings to you daily video content from the world of combat sports which includes Boxing interviews, Boxing Videos, MMA videos and MMA interviews with your favorite fighters from MMA to boxing and much more!↵↵Powered by SB Nation and founded by Marcos Villegas"
        }
      ]
    },
  },
  reducers: {},
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
      
      channels[selectedTheme].unshift(channel);

      update(state => ({
        ...state,
        channels
      }));
    },
    removeChannelToTheme(authorId: string) {
      const selectedTheme = apiApp.getState().state.selectedTheme;
      const channels: ChannelsInThemes = JSON.parse(JSON.stringify(get().state.channels));
      
      const indexToDelete = channels[selectedTheme].findIndex(channel => channel.authorId === authorId);
      channels[selectedTheme].splice(indexToDelete, 1);

      update(state => ({
        ...state,
        channels
      }));
    }
  }
});

export default themes;