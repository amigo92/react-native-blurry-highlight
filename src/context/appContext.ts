import {createContext} from 'react';
import type Animated from 'react-native-reanimated';
import type {POPUP} from '../utilities/constants';

export interface IAppContext {
  theme: Animated.SharedValue<'light' | 'dark'>;
  state: Animated.SharedValue<POPUP>;
}

export const AppContext = createContext<IAppContext | null>(null);
