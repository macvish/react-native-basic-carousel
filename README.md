# react-native-basic-carousel
This is a basic React Native carousel which features a pagination.

![alt-tag](https://github.com/macvish/react-native-basic-carousel/blob/develop/example/example.gif)

## Installation

1. Download package with npm or yarn
```
npm install react-native-basic-carousel
```
```
yarn add react-native-basic-carousel
```
2. Install pods

```
cd ios && pod install
```

3. Rebuild the project

```
npx react-native run-android
npx react-native run-ios
```

## Example

```jsx
import Carousel from 'react-native-basic-carousel'

<Carousel 
  data={data} 
  renderItem={({item, index}) => <View>{...}</View>}
  itemWidth={width}
  onSnapItem={(item) => console.log(item)}
/>
```

## Props
| Props | Description  | Type | Default |
| ----- | ------------ | ---- | ------- |
| `data`  | Array of items to loop on | Array | **Required** |
| `renderItem` | Takes an item from data and renders it into the list. The function receives one argument {item, index} Array | Function | **Required** |
| `itemWidth` | Width of carousel's item and carousel itself | Number | **Required** |
| `onSnapToItem` | Callback fired after snapping to an item | Function | `undefined`|
| `bounces` | When true, the carousel bounces when it reaches the end (only available on `ios`) | Boolean | `false` |
| `pagination` | When true, pagination is displayed under the carousel item | Boolean | `false` |
| `paginationColor` | Takes a color code for the pagination dots | String |  `undefined` |

### Inherited props

The component is built on top of the `FlatList` component, meaning it inherits from [`FlatList`](https://facebook.github.io/react-native/docs/flatlist.html), [`VirtualizedList`](https://facebook.github.io/react-native/docs/virtualizedlist.html), and [`ScrollView`](https://facebook.github.io/react-native/docs/scrollview.html).

You can use almost all props from this three components, but some of them can't be overriden because it would mess with our implementation's logic.

Here are a few useful props regarding carousel's **style and "feeling"**: `scrollEnabled` (if you want to disable user scrolling while still being able to use `Carousel`'s methods), `showsHorizontalScrollIndicator`, `overScrollMode` (android), `decelerationRate` (ios), `scrollEventThrottle` (ios).

And here are some useful ones for **performance optimizations and rendering**: `initialNumToRender`, `maxToRenderPerBatch`, `windowSize`, `updateCellsBatchingPeriod`, `extraData`, `removeClippedSubviews` (the latter may have bugs, as stated in [RN's doc](https://facebook.github.io/react-native/docs/flatlist.html#removeclippedsubviews)). The first three are already implemented with default parameters, but you can override them if they don't suit your needs.
