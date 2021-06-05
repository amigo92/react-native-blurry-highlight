import {Dimensions, Platform} from 'react-native';

enum POPUP {
  UNDETERMINED = 0,
  ACTIVE,
  END,
}

const {height: WINDOW_HEIGHT, width: WINDOW_WIDTH} = Dimensions.get('screen');

const IS_IOS = Platform.OS === 'ios';

export {POPUP, WINDOW_HEIGHT, WINDOW_WIDTH, IS_IOS};
