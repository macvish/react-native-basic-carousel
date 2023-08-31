import * as React from 'react'
import {
  Animated,
  FlatList,
  FlatListProps,
  ListRenderItem,
  NativeModules,
  View,
  ViewToken,
} from 'react-native'

import Pagination from './pagination'

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)

export interface CarouselProps extends FlatListProps<{}> {
  data: Array<{}>
  renderItem: ListRenderItem<any>
  onSnapToItem?: (item: {}) => void
  itemWidth: number
  bounces?: boolean
  pagination?: boolean
  paginationColor?: string
  paginationType?: 'default' | 'circle'
  autoplay?: boolean
  autoplayDelay?: number
  placeholderContent?: React.ReactNode
  getCurrentIndex?: (value: number) => void
  customPagination?: ({ activeIndex }: { activeIndex: number }) => React.ReactNode
  paginationPosition?: 'top' | 'bottom'
  paginationBackgroundColor?: string
}

export const Carousel: React.FC<CarouselProps> = React.forwardRef(({
  bounces,
  data,
  itemWidth,
  onSnapToItem,
  pagination,
  paginationColor,
  paginationType,
  renderItem,
  autoplay = false,
  autoplayDelay,
  placeholderContent,
  getCurrentIndex,
  customPagination,
  paginationPosition,
  paginationBackgroundColor,
  ...props
}, ref) => {
  const [currentIndex, setCurrentIndex] = React.useState<number>(0)
  const [didReachEnd, setDidReachEnd] = React.useState<boolean>(false)
  const slidesRef = React.useRef<FlatList<{}>>(null)
  const scrollX = React.useRef(new Animated.Value(0)).current
  const viewabilityConfig = React.useRef({
    viewAreaCoveragePercentThreshold: 70,
    waitForInteraction: true,
  }).current

  const onEndReacted = (info: { distanceFromEnd: number }) => {
    setDidReachEnd(true)
    props.onEndReached?.(info)
  }

  const onViewableItemsChanged = React.useCallback(
    ({ viewableItems }: { viewableItems: Array<ViewToken> }) => {
      if (viewableItems && viewableItems.length > 0) {
        const index = viewableItems[0].index as number
        setCurrentIndex(index)
        if (index < data?.length - 1) {
          setDidReachEnd(false)
        }
      }
    },
    [data]
  )

  const viewabilityConfigCallbackPairs = React.useRef([
    { viewabilityConfig, onViewableItemsChanged },
  ])

  const getItemLayout = (_data: any, index: number) => ({
    length: itemWidth,
    offset: itemWidth * index,
    index,
  })

  const renderCustomPagination = () => {
    if (customPagination && !pagination && data?.length > 1) {
      return customPagination({activeIndex: currentIndex})
    }
  }

  const scrollToIndex = ({ index, animated, ...otherProps }: {
    animated?: boolean | null | undefined;
    index: number;
    viewOffset?: number | undefined;
    viewPosition?: number | undefined;
  }) => {
    slidesRef.current?.scrollToIndex({
      animated,
      index,
      ...otherProps
    })
  }

  React.useImperativeHandle(ref, () => ({ 
    scrollToIndex
  }))

  React.useEffect(() => {
    onSnapToItem?.(data[currentIndex])
    getCurrentIndex?.(currentIndex)
  }, [currentIndex, data, onSnapToItem, getCurrentIndex])

  React.useEffect(() => {
    let timer: NodeJS.Timeout
    if (autoplay) {
      timer = setTimeout(() => {
        if (didReachEnd) {
          slidesRef.current?.scrollToIndex({
            index: 0,
            animated: true,
          })
        } else {
          slidesRef.current?.scrollToIndex({
            index: currentIndex + 1,
            animated: true,
          })
        }
      }, autoplayDelay ?? 2500)
    }

    return () => clearTimeout(timer)
  }, [autoplay, autoplayDelay, currentIndex, didReachEnd])

  return (
    <>
      { paginationPosition !== 'top' && renderCustomPagination()}
      {pagination && paginationPosition === 'top' && data?.length > 1 && (
        <Pagination
          data={data}
          activeIndex={scrollX}
          paginationType={paginationType}
          color={paginationColor}
          paginationBackgroundColor={paginationBackgroundColor}
        />
      )}
      <AnimatedFlatList
        {...props}
        ref={slidesRef}
        data={data}
        extraData={data}
        renderItem={(itemProps) => (
          <View style={{ width: itemWidth }} key={itemProps.index}>
            {renderItem(itemProps)}
          </View>
        )}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        ListEmptyComponent={() => (
          <View style={{ width: itemWidth }}>{placeholderContent}</View>
        )}
        getItemLayout={getItemLayout}
        horizontal
        pagingEnabled
        bounces={bounces}
        showsHorizontalScrollIndicator={false}
        snapToInterval={itemWidth}
        snapToAlignment='start'
        renderToHardwareTextureAndroid
        scrollEventThrottle={32}
        decelerationRate={0}
        style={{ width: itemWidth }}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        onEndReached={onEndReacted}
        onEndReachedThreshold={0.5}
        keyExtractor={(_, index) => index.toString()}
        initialScrollIndex={0}
      />
      {pagination && paginationPosition !== 'top' && data?.length > 1 && (
        <Pagination
          data={data}
          activeIndex={scrollX}
          paginationType={paginationType}
          color={paginationColor}
          paginationBackgroundColor={paginationBackgroundColor}
        />
      )}
      { paginationPosition !== 'top' && renderCustomPagination()}
    </>
  )
})

export default NativeModules.RNBasicCarouselModule
