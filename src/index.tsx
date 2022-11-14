import * as React from 'react'
import {
  Animated,
  Dimensions,
  FlatList,
  FlatListProps,
  ListRenderItem,
  NativeModules,
  NativeScrollEvent,
  NativeSyntheticEvent,
  View,
  ViewToken,
} from 'react-native'

import Pagination from './pagination'

const { width } = Dimensions.get('window')
export interface CarouselProps extends FlatListProps<{}> {
  data: Array<{}>
  renderItem: ListRenderItem<{
    [x: string]: any
  }>
  onSnapToItem?: (item: {}) => void
  itemWidth: number
  bounces?: boolean
  pagination?: boolean
  paginationColor?: string
}

export const Carousel: React.FC<CarouselProps> = ({
  bounces,
  data,
  itemWidth,
  onSnapToItem,
  pagination,
  paginationColor,
  renderItem,
  ...props
}) => {
  const [currentIndex, setCurrentIndex] = React.useState<number>(0)
  const slidesRef = React.useRef<FlatList<{}>>(null)
  const scrollX = React.useRef(new Animated.Value(0)).current
  const indexRef = React.useRef<number>(0)
  const viewabilityConfig = React.useRef({
    viewAreaCoveragePercentThreshold: 50,
  }).current

  const onViewableItemsChanged = React.useCallback(
    ({ viewableItems }: { viewableItems: Array<ViewToken> }) => {
      if (viewableItems && viewableItems.length > 0) {
        indexRef.current = (viewableItems[0].index as number) - 1
        setCurrentIndex((viewableItems[0].index as number) - 1)
      }
    },
    []
  )

  const viewabilityConfigCallbackPairs = React.useRef([
    { viewabilityConfig, onViewableItemsChanged },
  ])

  const getItemLayout = (_data: any, index: number) => ({
    length: itemWidth,
    offset: itemWidth * (index - 1),
    index,
  })

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = event.nativeEvent.contentOffset.x / width
    const roundIndex = Math.round(index)
    indexRef.current = roundIndex
  }

  React.useEffect(
    () => onSnapToItem?.(data[currentIndex]),
    [currentIndex, data, onSnapToItem]
  )

  return (
    <>
      <FlatList
        {...props}
        ref={slidesRef}
        getItemLayout={getItemLayout}
        data={data}
        horizontal
        pagingEnabled
        bounces={bounces}
        showsHorizontalScrollIndicator={false}
        snapToInterval={itemWidth}
        snapToAlignment='start'
        renderItem={(itemProps) => (
          <View style={{ width: itemWidth }}>{renderItem(itemProps)}</View>
        )}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        renderToHardwareTextureAndroid
        onScrollEndDrag={onScroll}
        scrollEventThrottle={32}
        decelerationRate={0}
        style={{ width: itemWidth }}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
      />
      {pagination && (
        <Pagination data={data} activeIndex={scrollX} color={paginationColor} />
      )}
    </>
  )
}

export default NativeModules.RNSimpleCarouselModule
