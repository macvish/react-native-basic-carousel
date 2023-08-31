import * as React from 'react'
import { Animated, Dimensions, Platform, StyleSheet, View } from 'react-native'

const { width } = Dimensions.get('window')

interface PaginationProps {
  data: {}[]
  activeIndex: Animated.Value
  color?: string
  paginationType?: 'default' | 'circle'
  paginationBackgroundColor?: string
}

const Pagination: React.FC<PaginationProps> = ({
  activeIndex,
  color,
  data,
  paginationType,
  paginationBackgroundColor
}) => {
  const styles = useStyle()

  const renderItems = () => {
    const dotWidthFunc = () => {
      if (paginationType === 'circle') {
        return [8, 10, 8]
      }

      return [20, 35, 20]
    }
    return data.map((_, i) => {
      const inputRange = [(i - 1) * width, i * width, (i + 1) * width]
      const dotWidth = activeIndex.interpolate({
        inputRange,
        outputRange: dotWidthFunc(),
        extrapolate: 'clamp',
      })
      const opacity = activeIndex.interpolate({
        inputRange,
        outputRange: [0.2, 1, 0.2],
        extrapolate: 'clamp',
      })

      return (
        <Animated.View
          style={[
            styles.dot,
            {
              backgroundColor: color ?? '#667085',
              width: dotWidth,
              height: paginationType === 'circle' ? 8 : 4,
              opacity,
            },
          ]}
          key={i.toString()}
        />
      )
    })
  }

  return <View style={[
    styles.dotContainer,
    !!paginationBackgroundColor && { backgroundColor: paginationBackgroundColor }
  ]}>{renderItems()}</View>
}

export default Pagination

const useStyle = () => {
  const styles = StyleSheet.create({
    dotContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      height: 15,
      marginTop: Platform.OS === 'ios' ? 10 : 15,
      marginBottom: Platform.OS === 'ios' ? 15 : 25,
    },
    dot: {
      borderRadius: 7,
      marginHorizontal: 2,
    },
  })

  return styles
}
