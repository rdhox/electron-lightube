import {State, GetState, SetState} from 'zustand';

// import models
import {useApp, apiApp} from './modelApp';
import {useSettings, apiSettings} from './modelSettings';
import {useThemes, apiThemes} from './modelThemes';

export {
  useApp, apiApp,
  useSettings, apiSettings,
  useThemes, apiThemes
};

// Type State
export interface StateRef<S> {
  current: S;
};

// ***** Types Model *****
export type ReducerEffect<Args extends any[]> = (...args: Args)  => void;
export type ReducerEffectPromise<Args extends any[]> = (...args: Args)  => Promise<any>;

export interface CollectionFunctions {
  [key: string]: ReducerEffect<any> | ReducerEffectPromise<any>;
}
export interface ModelReturn<S> {
  state: S;
  reducers: CollectionFunctions;
  effects: CollectionFunctions;
}

export interface Model<S> {
  (update: UpdateState, get: GetState<State>): ModelReturn<S>;
}

export type Callback = (state: State) => State;
export type UpdateState = (callback: Callback) => void;
export type Update = (set: SetState<State>, get: GetState<State>) => UpdateState;

