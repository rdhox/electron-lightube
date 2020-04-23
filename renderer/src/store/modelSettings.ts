import { Model } from './index';

interface State {
  hello: string;
}

const settings: Model<State> = (update, get) => ({
  state: {
    hello: "World",
  },
  reducers: {},
  effects: {}
});

export default settings;