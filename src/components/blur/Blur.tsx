import React, {memo} from 'react';
import {useColorScheme} from 'react-native';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import {
  TapGestureHandler,
  TapGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import {BlurView} from '@react-native-community/blur';
import {styles} from './styles';
import {
  POPUP,
  POPUP_TRANSFORM_DURATION,
  WINDOW_HEIGHT,
} from '../../utilities/constants';

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
          if (state.value === POPUP.ACTIVE) {
            state.value = POPUP.END;
          }
        },
      },
      [state],
    );

  /*changes the opacity and top value depending on the state of the popup.
    If the popup has ended, the top value turns to WINDOW_HEIGHT and the opacity turns to 0. If the
    popup is active, the top value turns to 0 and the opacity turns to 1*/
  const animatedContainerStyle = useAnimatedStyle(() => {
    const topValueAnimation = () =>
      state.value === POPUP.ACTIVE
        ? 0
        : withDelay(
            POPUP_TRANSFORM_DURATION,
            withTiming(WINDOW_HEIGHT, {
              duration: 0,
            }),
          );

    const opacityValueAnimation = () =>
      withTiming(state.value === POPUP.ACTIVE ? 1 : 0, {
        duration: POPUP_TRANSFORM_DURATION,
      });

    return {
      top: topValueAnimation(),
      opacity: opacityValueAnimation(),
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
