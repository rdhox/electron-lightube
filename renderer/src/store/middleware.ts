import {State, SetState} from 'zustand';
import {
  ModelReturn,
  CollectionFunctions,
  Update,
} from './';

// *** MiddleWare Logger
export function stateLogger(oldState: State, newState: State): void {
  const diff = Object.keys(oldState).filter(key => oldState[key] !== newState[key]);
  console.log('%c changing state: ', 'color: orange; font-weight: bold', diff.toString());
  console.log('%c before: ', 'color: lightblue', oldState);
  console.log('%c after: ', 'color: blue', newState);
}

// *** Detection of fetching 
export function loadingDetection(model: ModelReturn<State>, set: SetState<State>){
  const copyEffects = {
    ...model.effects,
  }
  const loadingEffects = Object.keys(model.effects).reduce((acc: CollectionFunctions, effect: string) => {
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

export const update: Update = (set, get) => callback => {
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