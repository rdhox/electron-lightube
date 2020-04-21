import create, {State, SetState, GetState} from 'zustand';
// import models
import global from './modelGlobal';
import settings from './modelSettings';
import themes from './modelThemes';

interface Action {
  [key: string]: any
}

interface CollectionFunctions {
  [key: string]: (action: Action) => void;
}

interface ModelReturn {
  [key: string]: (string | number | boolean | [] | {});
  reducers: CollectionFunctions;
  effects: CollectionFunctions;
}

export interface Model {
  (set: SetState<State>, get: GetState<State>): ModelReturn;
}

export const [ useStore, api ] = create((set, get) => ({
  global: global(set,get),
  settings: settings(set, get),
  themes: themes(set, get),
}));

