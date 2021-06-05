/* eslint-disable react-native/no-inline-styles */
import React, {memo, useMemo} from 'react';
import {View, Text, useColorScheme} from 'react-native';

import colorPallete from '../../utilities/colorPallete';

import {itemThemedStyle, styles} from './style';

import FastImage from 'react-native-fast-image';

import ListAnimatedContent from '../../components/listItemAnimated/ListAnimatedContent';
import {IS_IOS} from '../../utilities/constants';

const UserComp = ({data}: {data: any}) => {
  const colorMode = useColorScheme() || 'dark';

  const themeStyles = useMemo(() => {
    return {
      itemContainer: [styles.itemContainer],
      item: [styles.item],
      listItemTextColor: [
        styles.listItemTextColor,
        {color: colorPallete.palette.list[colorMode].listItemTextColor},
      ],
    };
  }, [colorMode]);
  return (
    <View style={[themeStyles.itemContainer, {alignItems: 'flex-start'}]}>
      <ListAnimatedContent
        containerStyles={{
          position: 'relative',
          maxWidth: '100%',
        }}
        data={data}>
        <View
          style={[
            themeStyles.item,
            IS_IOS && styles.shadow,
            {...itemThemedStyle(colorMode)},
          ]}>
          <FastImage
            style={{width: 30, height: 30, borderRadius: 15, margin: 8}}
            source={{
              uri: data.picture.thumbnail,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.contain}
          />
          <View style={{flexDirection: 'column'}}>
            <Text style={[themeStyles.listItemTextColor]}>
              {data.name.first}
            </Text>
            <Text style={themeStyles.listItemTextColor}>{data.phone}</Text>
          </View>
        </View>
      </ListAnimatedContent>
    </View>
  );
};

const User = memo(UserComp);

export default User;
