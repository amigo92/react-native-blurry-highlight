import React, {memo} from 'react';
import {useColorScheme} from 'react-native';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {
  TapGestureHandler,
  TapGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import {BlurView} from '@react-native-community/blur';

import {styles} from './styles';
import {POPUP, WINDOW_HEIGHT} from '../../utilities/constants';

import {useAppContext} from '../../hooks/useAppContext';

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

const BlurComponent = () => {
  const {state} = useAppContext()!;
  const colorMode = useColorScheme() || 'dark';

  const tapGestureEvent =
    useAnimatedGestureHandler<TapGestureHandlerGestureEvent>(
      {
        onCancel: () => {
          state.value = POPUP.END;
        },
        onEnd: () => {
          const isStateActive = state.value === POPUP.ACTIVE;
          if (isStateActive) {
            state.value = POPUP.END;
          }
        },
      },
      [state],
    );

  const animatedContainerStyle = useAnimatedStyle(() => {
    return {
      top: state.value === POPUP.ACTIVE ? 0 : WINDOW_HEIGHT,
      opacity: state.value === POPUP.ACTIVE ? 1 : 0,
    };
  });
  return (
    <TapGestureHandler
      onGestureEvent={tapGestureEvent}
      onHandlerStateChange={tapGestureEvent}>
      <AnimatedBlurView
        blurAmount={6}
        blurType={colorMode}
        style={[styles.container, animatedContainerStyle]}
      />
    </TapGestureHandler>
  );
};

const Blur = memo(BlurComponent);

export default Blur;
