import React, { useEffect } from 'react'
import { Text, View } from 'react-native'
import RNSimpleCarouselModule, { Carousel } from 'react-native-simple-carousel'

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
  }
]

const App = () => {
  const renderItem = ({ item, index }: { item: Data, index: number }) => {
    return <View key={index} style={{  }}>
      <Text>{item?.text}</Text>
    </View>
  }
  useEffect(() => {
    console.log(RNSimpleCarouselModule)
  })

  return <Carousel data={data} renderItem={renderItem} pagination />
}

export default App
