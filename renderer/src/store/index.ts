import create, {State, SetState, GetState} from 'zustand';
// import models
import app from './modelApp';
import settings from './modelSettings';
import themes from './modelThemes';

// ***** Types Model *****
export type ReducerEffect = (...args: any[]) => void;

interface CollectionFunctions {
  [key: string]: ReducerEffect;
}
interface ModelReturn<S> {
  state: S;
  reducers: CollectionFunctions;
  effects: CollectionFunctions;
}
export interface Model<S> {
  (update, get: GetState<State>): ModelReturn<S>;
}

// *** MiddleWare Logger
function stateLogger(oldState: State, newState: State): void {
  const diff = Object.keys(oldState).filter(key => oldState[key] !== newState[key]);
  console.log('%c changing state: ', 'color: orange; font-weight: bold', diff.toString());
  console.log('%c before: ', 'color: lightblue', oldState);
  console.log('%c after: ', 'color: blue', newState);
}

// *** Detection of fetching 
function loadingDetection(model, set){
  const copyEffects = {
    ...model.effects,
  }
  const loadingEffects = Object.keys(model.effects).reduce((acc, effect) => {
    acc[effect] = async function(...args) {
      set(model => ({
        ...model,
        state: {
          ...model.state,
          loading: true
        }
      }));
      await copyEffects[effect](...args);
      set(model => ({
        ...model,
        state: {
          ...model.state,
          loading: false
        }
      }));
    }
    return acc;
  }, {});

  model.effects = loadingEffects;
  return model;
}

// **** Type Update function ****
type Callback = (state: State) => State;
type Update = (set: SetState<State>, get: GetState<State>) => (callback: Callback) => void;

const update: Update = (set, get) => callback => {
  const oldState = get().state;
  const newState = callback(oldState);
  if(process.env.NODE_ENV === 'development') {
    stateLogger(oldState, newState);
  }
  set(model => ({
    ...model,
    state: newState,
  }));
};

export const [ useApp, apiApp ] = create((set, get) => loadingDetection(
  app(update(set, get), get),
  set)
);
export const [ useSettings, apiSettings ] = create((set, get) => settings(update(set, get), get));
export const [ useThemes, apiThemes ] = create((set, get) => themes(update(set, get), get));

