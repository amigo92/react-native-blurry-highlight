import {Dimensions, StyleSheet, ViewStyle} from 'react-native';

import colorPallete from '../../utilities/colorPallete';

export const itemThemedStyle: (theme: 'light' | 'dark') => ViewStyle =
  theme => {
    return {
      left: 0,
      borderRadius: 1,
      backgroundColor: colorPallete.palette.list[theme].listItemBackgroundColor,
      flexDirection: 'row',
    };
  };

export const styles = StyleSheet.create({
  listItemTextColor: {
    fontSize: 18,
    lineHeight: 18,
    textAlign: 'left',
    width: '100%',
  },
  item: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    width: Dimensions.get('window').width - 32,
    alignSelf: 'stretch',
    paddingVertical: 8,
    borderRadius: 8,
  },
  itemContainer: {
    position: 'relative',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    margin: 8,
    marginRight: 8,
  },
  shadow: {
    shadowColor: 'rgba(0, 0, 0, .5)',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 4,
  },
});
