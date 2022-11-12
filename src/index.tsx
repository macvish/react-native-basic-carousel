import * as React from 'react'
import {
  Animated,
  FlatList,
  FlatListProps,
  ListRenderItem,
  NativeModules,
  ViewToken,
} from 'react-native'

import Pagination from './pagination'

export interface CarouselProps extends FlatListProps<{}> {
  data: Array<{}>
  renderItem: ListRenderItem<{
    [x: string]: any
  }>
  onSnapToItem?: (item: {}) => void
  bounces?: boolean
  pagination?: boolean
  paginationColor?: string
}

export const Carousel: React.FC<CarouselProps> = ({
  bounces,
  data,
  onSnapToItem,
  pagination,
  paginationColor,
  renderItem,
  ...props
}) => {
  const slidesRef = React.useRef<FlatList<{}>>(null)
  const scrollX = React.useRef(new Animated.Value(0)).current
  const indexRef = React.useRef(0)
  const viewconfig = React.useRef({
    viewAreaCoveragePercentThreshold: 50,
  }).current

  const viewableItemschanged = React.useRef(
    ({ viewableItems }: { viewableItems: Array<ViewToken> }) => {
      if (viewableItems && viewableItems.length > 0) {
      }
    }
  ).current

  // const onScroll = (event) => {
  //   const index = event.nativeEvent.contentOffset.x / metrics.screenWidth
  //   const roundIndex = Math.round(index)
  //   indexRef.current = roundIndex
  // }

  React.useEffect(
    () => onSnapToItem?.(data[indexRef.current]),
    [indexRef, data, onSnapToItem]
  )

  return (
    <>
      <FlatList
        {...props}
        ref={slidesRef}
        data={data}
        horizontal
        pagingEnabled
        bounces={bounces}
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        scrollX={scrollX}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        // onScrollEndDrag={onScroll}
        scrollEventThrottle={32}
        onViewableItemsChanged={viewableItemschanged}
        viewabilityConfig={viewconfig}
      />
      {!!pagination && (
        <Pagination data={data} activeIndex={scrollX} color={paginationColor} />
      )}
    </>
  )
}

export default NativeModules.RNSimpleCarouselModule
