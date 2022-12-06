import React, { useEffect } from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import RNBasicCarouselModule, { Carousel } from 'react-native-basic-carousel'

const { width } = Dimensions.get('window')
interface Data {
  id?: number
  text?: string
}

const data: Data[] = [
  {
    id: 1,
    text: 'Carousel 1' 
  },
  {
    id: 2,
    text: 'Carousel 2' 
  },
  {
    id: 3,
    text: 'Carousel 3' 
  }
]

const App = () => {
  const styles = useStyle()

  const renderItem = ({ item, index }: { item: Data, index: number }) => {
    return <View key={index} style={styles.container}>
      <Text style={styles.text}>{item?.text}</Text>
    </View>
  }

  const getItem = (item: Data) => {
    // console.log(item)
  }

  useEffect(() => {
    console.log(RNBasicCarouselModule)
  })

  return <Carousel
    data={data}
    renderItem={renderItem}
    onSnapToItem={getItem}
    itemWidth={width}
    pagination
    paginationType='circle'
  />
}

export default App

const useStyle = () => {
  const style = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'blue',
      justifyContent: 'center',
      margin: 20
    },
    text: {
      color: 'white',
      fontSize: 20,
      textAlign: 'center'
    }
  })

  return style
}
