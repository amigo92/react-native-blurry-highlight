/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import 'react-native-gesture-handler';

import React, {useEffect, useMemo} from 'react';
import {StatusBar, useColorScheme, SafeAreaView} from 'react-native';

import UserList from './screens/UserList';

import {useSharedValue} from 'react-native-reanimated';
import {PortalProvider} from '@gorhom/portal';
import {Blur} from './components/blur';

import {AppContext} from './context/appContext';
import {POPUP} from './utilities/constants';

const App = () => {
  const colorMode = useColorScheme() || 'dark';

  const state = useSharedValue<POPUP>(POPUP.UNDETERMINED);
  const theme = useSharedValue<'light' | 'dark'>(colorMode || 'light');

  useEffect(() => {
    theme.value = colorMode || 'light';
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colorMode]);

  const appContextVariables = useMemo(
    () => ({
      theme,
      state,
    }),
    [state, theme],
  );
  return (
    <>
      <AppContext.Provider value={appContextVariables}>
        <StatusBar
          barStyle={colorMode === 'light' ? 'dark-content' : 'light-content'}
        />
        <PortalProvider>
          <SafeAreaView>
            <UserList />
          </SafeAreaView>
          <Blur />
        </PortalProvider>
      </AppContext.Provider>
    </>
  );
};

export default App;
