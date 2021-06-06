/* eslint-disable react-native/no-inline-styles */
import React, {memo, useMemo} from 'react';
import {ViewProps, Text, Dimensions, View, useColorScheme} from 'react-native';

import {
  LongPressGestureHandler,
  LongPressGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  measure,
  useAnimatedGestureHandler,
  useAnimatedProps,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
  withSpring,
  useAnimatedReaction,
} from 'react-native-reanimated';

import {Portal} from '@gorhom/portal';
import {nanoid} from 'nanoid/non-secure';

import {
  POPUP_TRANSFORM_DURATION,
  POPUP_SCALE_DOWN_DURATION,
  POPUP_SCALE_DOWN_VALUE,
  WINDOW_HEIGHT,
  POPUP,
} from '../../utilities/constants';
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
  const itemScale = useSharedValue<number>(1);

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

  /*Called to unshrink the items from shrink's completion handler, doesn't really show up on the original item,
  this is mainly for item in the popup*/
  const unshrinkItem = () => {
    'worklet';
    itemScale.value = withTiming(1, {
      duration: POPUP_TRANSFORM_DURATION / 2,
    });
  };

  /*Called to unshrink the items and to turn on isActive flag for the popup and it's animations*/
  const onCompletion = (isFinised: boolean) => {
    'worklet';
    if (isFinised) {
      state.value = POPUP.ACTIVE;
      isActive.value = true;
      unshrinkItem();
    }
  };

  /*Shrinks the original list item 5% when long press to show the effect like in touchable opacity*/
  const shrinkItem = () => {
    'worklet';
    itemScale.value = withTiming(
      POPUP_SCALE_DOWN_VALUE,
      {duration: POPUP_SCALE_DOWN_DURATION},
      onCompletion,
    );
  };

  /*For starting the animation and bring up the popup*/
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
        shrinkItem();
      }
    },
    onFinish: (_, context) => {
      context.didMeasureLayout = false;
    },
  });

  /*runs the values edited by shrink and unshrink methods and makes the original item
  in the item list transparent when the popup is on (it's animated style scales to 1 from 0.95 fixed from this method)*/
  const animatedContainerStyle = useAnimatedStyle(() => {
    /*Delay to wait until shrink finishes up*/
    const animateOpacity = () =>
      withDelay(POPUP_TRANSFORM_DURATION, withTiming(1, {duration: 0}));

    return {
      opacity: isActive.value ? 0 : animateOpacity(),
      transform: [
        {
          scale: isActive.value
            ? withTiming(1, {duration: POPUP_TRANSFORM_DURATION})
            : itemScale.value,
        },
      ],
    };
  });
  const containerStyle = React.useMemo(
    () => [containerStyles, animatedContainerStyle],
    [containerStyles, animatedContainerStyle],
  );

  /*brings the popup on the top of the dom tree above the blur view.
    animation on chaning its height(1), make it opaque(2), translating(3) it on the position and scaling(4) it*/
  const animatedPortalStyle = useAnimatedStyle(() => {
    const animateOpacity = () =>
      withDelay(POPUP_TRANSFORM_DURATION, withTiming(0, {duration: 0}));

    let tY = calculateTransformValue();
    const transformAnimation = () =>
      isActive.value
        ? /*using spring configuration to change the spring animation a bit*/
          withSpring(tY, {
            damping: 33,
            mass: 1.03,
            stiffness: 500,
          })
        : withTiming(0, {duration: POPUP_TRANSFORM_DURATION});

    const transformAnimationHeight = () =>
      isActive.value
        ? withTiming(itemRectHeight.value + 300, {duration: 0})
        : withTiming(itemRectHeight.value, {duration: 0});

    return {
      zIndex: 10,
      position: 'absolute',
      top: itemRectY.value,
      left: itemRectX.value,
      width: itemRectWidth.value,
      height: transformAnimationHeight(),
      opacity: isActive.value ? 1 : animateOpacity(),
      backgroundColor: colorPallete.palette[theme.value].backgroundColor,
      transform: [
        {
          translateY: transformAnimation(),
        },
        {
          scale: isActive.value
            ? withTiming(1, {duration: POPUP_TRANSFORM_DURATION})
            : itemScale.value,
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

  /*Tracks state to change shared value of this component based on the state's value which
  is changed on blur view's click to close the popup*/
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
          {children}
          {getTextComponents}
        </Animated.View>
      </Portal>
    </>
  );
};

const ListAnimatedContent = memo(ListAnimatedContentComponent);

export default ListAnimatedContent;
