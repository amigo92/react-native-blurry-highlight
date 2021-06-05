import {ViewStyle} from 'react-native';

export type ListAnimatedContentProps = {
  data?: any;

  children: React.ReactElement | React.ReactElement[];

  containerStyles?: ViewStyle | ViewStyle[];
};

export type GestureHandlerProps = {
  children: React.ReactElement | React.ReactElement[];
};
