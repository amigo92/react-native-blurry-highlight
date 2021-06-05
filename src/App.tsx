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

import React from 'react';
import {StatusBar, useColorScheme, SafeAreaView} from 'react-native';

import UserList from './screens/UserList';

const App = () => {
  const colorMode = useColorScheme() || 'dark';

  return (
    <>
      <StatusBar
        barStyle={colorMode === 'light' ? 'dark-content' : 'light-content'}
      />
      <SafeAreaView>
        <UserList />
      </SafeAreaView>
    </>
  );
};

export default App;
