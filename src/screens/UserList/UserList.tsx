import React, {memo, useCallback} from 'react';
import {StyleSheet, FlatList, useColorScheme} from 'react-native';

import colorPallete from '../../utilities/colorPallete';

import User from './ListItem';

import {useRandomUserData} from '../../hooks/useRandomUserData';

const UserList = () => {
  const colorMode = useColorScheme() || 'dark';

  const randomUserData = useRandomUserData();

  const renderUser = useCallback(({item}) => <User data={item} />, []);

  const keyExtractor = useCallback(item => item.id.toString(), []);

  return (
    randomUserData && (
      <FlatList
        data={randomUserData}
        keyExtractor={keyExtractor}
        renderItem={renderUser}
        style={{
          backgroundColor:
            colorPallete.palette.list[colorMode].listBackgroundColor,
        }}
        contentContainerStyle={styles.contentContainer}
        windowSize={5}
        maxToRenderPerBatch={10}
      />
    )
  );
};

export default memo(UserList);

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 8,
  },
});
