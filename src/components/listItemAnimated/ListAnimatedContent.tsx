/* eslint-disable react-native/no-inline-styles */
import React, {memo, useMemo} from 'react';
import {ViewProps, Text, View} from 'react-native';

import {
  TapGestureHandler,
  LongPressGestureHandler,
  TapGestureHandlerGestureEvent,
  LongPressGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  measure,
  useAnimatedGestureHandler,
  useAnimatedProps,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  useAnimatedReaction,
} from 'react-native-reanimated';

import {Portal} from '@gorhom/portal';
import {nanoid} from 'nanoid/non-secure';

import {WINDOW_HEIGHT, POPUP} from '../../utilities/constants';
import styles from './styles';

import type {ListAnimatedContentProps} from './types';
import {useAppContext} from '../../hooks/useAppContext';
import colorPallete from '../../utilities/colorPallete';

type Context = {didMeasureLayout: boolean};

const ListAnimatedContentComponent = ({
  containerStyles,
  children,
  data,
}: ListAnimatedContentProps) => {
  const {state, theme} = useAppContext()!;
  const isActive = useSharedValue(false);

  const itemRectY = useSharedValue<number>(0);
  const itemRectX = useSharedValue<number>(0);
  const itemRectWidth = useSharedValue<number>(0);
  const itemRectHeight = useSharedValue<number>(0);

  const key = useMemo(() => nanoid(), []);
  const heightForPopup = 300;

  const containerRef = useAnimatedRef<Animated.View>();

  /*Collects the original layout of the list item container*/
  const activateAnimation = (ctx: any) => {
    'worklet';
    if (!ctx.didMeasureLayout) {
      const measured = measure(containerRef);

      itemRectY.value = measured.pageY;
      itemRectX.value = measured.pageX;
      itemRectHeight.value = measured.height;
      itemRectWidth.value = measured.width;
    }
  };

  /*Calculates the final y position for the container to be animated*/
  const calculateTransformValue = () => {
    'worklet';

    const height = WINDOW_HEIGHT;

    let tY = 0;
    const topTransform =
      itemRectY.value + itemRectHeight.value + heightForPopup + 8 * 2;
    tY = (height * 3) / 4 - topTransform;

    // console.log(topTransform);
    // console.log('ty');

    return tY;
  };

  const gestureEvent = useAnimatedGestureHandler<
    LongPressGestureHandlerGestureEvent,
    Context
  >({
    onActive: (_, context) => {
      if (!context.didMeasureLayout) {
        activateAnimation(context);

        context.didMeasureLayout = true;
      }

      if (!isActive.value) {
        state.value = POPUP.ACTIVE;
        isActive.value = true;
      }
    },
    onFinish: (_, context) => {
      context.didMeasureLayout = false;
    },
  });

  const overlayGestureEvent = useAnimatedGestureHandler<
    TapGestureHandlerGestureEvent,
    Context
  >({
    onActive: _ => {
      state.value = POPUP.END;
    },
  });

  const animatedContainerStyle = useAnimatedStyle(() => {
    console.log(isActive);
    return {
      opacity: isActive.value ? 0 : 1,
    };
  });
  const containerStyle = React.useMemo(
    () => [containerStyles, animatedContainerStyle],
    [containerStyles, animatedContainerStyle],
  );

  const animatedPortalStyle = useAnimatedStyle(() => {
    let tY = calculateTransformValue();

    return {
      zIndex: 10,
      position: 'absolute',
      top: itemRectY.value,
      left: itemRectX.value,
      width: itemRectWidth.value,
      height: isActive.value
        ? itemRectHeight.value + 300
        : itemRectHeight.value,
      opacity: isActive.value ? 1 : 0,
      backgroundColor: colorPallete.palette[theme.value].backgroundColor,
      transform: [
        {
          translateY: isActive.value ? tY : 0,
        },
      ],
    };
  });
  const portalContainerStyle = useMemo(
    () => [styles.listItem, animatedPortalStyle],
    [animatedPortalStyle],
  );

  const getTextComponents = useMemo(
    () => (
      <View
        style={{
          flex: 1,
          alignItems: 'flex-start',
          justifyContent: 'space-around',
          margin: 20,
        }}>
        <Text style={{color: colorPallete.palette[theme.value].color}}>
          Date Of Birth: {data.dob.date}
        </Text>
        <Text style={{color: colorPallete.palette[theme.value].color}}>
          Location: {data.location.city}
        </Text>
        <Text style={{color: colorPallete.palette[theme.value].color}}>
          Email: {data.email}
        </Text>
        <Text style={{color: colorPallete.palette[theme.value].color}}>
          Gender: {data.gender}
        </Text>
      </View>
    ),
    [data, theme.value],
  );
  const animatedPortalProps = useAnimatedProps<ViewProps>(() => ({
    pointerEvents: isActive.value ? 'auto' : 'none',
  }));
  useAnimatedReaction(
    () => state.value,
    _state => {
      if (_state === POPUP.END) {
        isActive.value = false;
      }
    },
  );

  return (
    <>
      <LongPressGestureHandler
        minDurationMs={150}
        onHandlerStateChange={gestureEvent}>
        <Animated.View ref={containerRef} style={containerStyle}>
          {children}
        </Animated.View>
      </LongPressGestureHandler>

      <Portal key={key} name={key}>
        <Animated.View
          key={key}
          style={portalContainerStyle}
          animatedProps={animatedPortalProps}>
          <TapGestureHandler
            numberOfTaps={1}
            onHandlerStateChange={overlayGestureEvent}>
            <Animated.View style={styles.portalOverlay} />
          </TapGestureHandler>
          <TapGestureHandler
            numberOfTaps={1}
            onHandlerStateChange={overlayGestureEvent}>
            {children}
          </TapGestureHandler>
          <TapGestureHandler
            numberOfTaps={1}
            onHandlerStateChange={overlayGestureEvent}>
            {getTextComponents}
          </TapGestureHandler>
        </Animated.View>
      </Portal>
    </>
  );
};

const ListAnimatedContent = memo(ListAnimatedContentComponent);

export default ListAnimatedContent;
