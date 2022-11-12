import React, { useEffect } from 'react'
import RNSimpleCarouselModule, { Counter } from 'react-native-simple-carousel'

const App = () => {
  useEffect(() => {
    console.log(RNSimpleCarouselModule)
  })

  return <Counter />
}

export default App
