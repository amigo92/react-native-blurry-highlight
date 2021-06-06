# react-native-blurry-highlight
## An experiment showing blurry highlight of a FlatList item using react-native-reanimated 2

### Demo
![](DEMO.gif)

### Instructions To Run
Commands to be run in your terminal - 
1. `git clone https://github.com/amigo92/react-native-blurry-highlight`
2. `yarn`
3. `npx pod-install`
4. `npx react-native run-ios` for running in iOS simulator
5. `npx react-native run-android` for running in Android emulator

### TitBits
Here are some key points that makes the example work - 
1. Get's data from randomuser API
2. Uses [Portal](https://reactjs.org/docs/portals.html) to bring up the FlatList's item to the top of the DOM
3. There are 2 copies of the same FlatList item, the one which is supposed to be sent on to the PortalProvider is hidden till the long-press is observed on an original FlatList item, one on top of the other.
4. As soon as the long-press is observed, the original item is shrinked (scaled to 0.95 for animating like TouchableOpacity) and made transparent, and the Portal copy of item is made opaque and translated to a Y position. As soon as a click is observed on BlurView, the Portal copy is translated back to the original position and made transparent, and the original item is made opaque.
5. The BlurView is below the window height(by making `top: WINDOW_HEIGHT`) and transparent, as soon as long-press is observed, and the state of the animation changes, which is a [Shared Value](https://docs.swmansion.com/react-native-reanimated/docs/api/useSharedValue), the BlurView is animated to `top: 0` and made opaque.
