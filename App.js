import React, {useState, useEffect} from "react"
import { View, ActivityIndicator, StyleSheet } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Tabs from "./src/components/Tabs"
import { useGetWeather } from "./src/hooks/useGetWeather"
import ErrorItem from "./src/components/ErrorItem"

import * as Location from 'expo-location'

const App = () => {

  const [loading, error, weather] = useGetWeather()
  console.log(loading, error, weather)

  if(weather && weather.list) {
    return (
      <NavigationContainer>
        <Tabs weather={weather}/>
      </NavigationContainer>
  
    )
  }

  return (
    <View style={styles.container}>
      {loading ? <ActivityIndicator size={'large'} color={'blue'}/> : <ErrorItem /> }
    </View>
  )
  

}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1
  }
})


export default App