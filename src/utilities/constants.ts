import {Dimensions, Platform} from 'react-native';

const POPUP_TRANSFORM_DURATION = 200;
const POPUP_SCALE_DOWN_VALUE = 0.95;
const POPUP_SCALE_DOWN_DURATION = 300;

enum POPUP {
  UNDETERMINED = 0,
  ACTIVE,
  END,
}

const {height: WINDOW_HEIGHT, width: WINDOW_WIDTH} = Dimensions.get('screen');

const IS_IOS = Platform.OS === 'ios';

export {
  POPUP,
  WINDOW_HEIGHT,
  WINDOW_WIDTH,
  POPUP_TRANSFORM_DURATION,
  POPUP_SCALE_DOWN_VALUE,
  POPUP_SCALE_DOWN_DURATION,
  IS_IOS,
};
