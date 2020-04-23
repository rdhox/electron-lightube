import create, {State, SetState, GetState} from 'zustand';
// import models
import app from './modelApp';
import settings from './modelSettings';
import themes from './modelThemes';

// ***** Types Model *****
interface CollectionFunctions {
  [key: string]: (action: any) => void;
}
interface ModelReturn<S> {
  state: S;
  reducers: CollectionFunctions;
  effects: CollectionFunctions;
}
export interface Model<S> {
  (update, get: GetState<State>): ModelReturn<S>;
}

function stateLogger(oldState: State, newState: State): void {
  const diff = Object.keys(oldState).filter(key => oldState[key] !== newState[key]);
  console.log('%c changing state: ', 'color: orange; font-weight: bold', diff.toString());
  console.log('%c before: ', 'color: lightblue', oldState);
  console.log('%c after: ', 'color: blue', newState);
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

export const [ useApp, apiApp ] = create((set, get) => app(update(set, get), get));
export const [ useSettings, apiSettings ] = create((set, get) => settings(update(set, get), get));
export const [ useThemes, apiThemes ] = create((set, get) => themes(update(set, get), get));
