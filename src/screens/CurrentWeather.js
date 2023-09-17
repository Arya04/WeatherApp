import React from "react";
import {View, Text, SafeAreaView, StyleSheet} from "react-native";
import {Feather} from "@expo/vector-icons";
import RowText from "../components/RowText";
import { weatherType } from "../utilities/weatherType";

const CurrentWeather = ({ weatherData}) => {
  const { wrapper, container, tempStyles, feels, highLow, highLowWrapper, bodyWrapper, description, message } = styles
  console.log(weatherData)
  const { main: { temp, feels_like, temp_max, temp_min }, weather} = weatherData 

  const weatherCondition = weather[0].main

  return (
    <SafeAreaView style={[wrapper, {backgroundColor: weatherType[weatherCondition].backgroundColor}]}>
      <View style={container}>
        <Feather name={weatherType[weatherCondition].icon} size={100} color="white"/>
        <Text style={tempStyles}>{temp}</Text>
        <Text style={feels}>{`Feels like ${feels_like}`}</Text>
        <RowText 
          messageOne={`High: ${temp_max} `} 
          messageTwo={`Low: ${temp_min} `} 
          containerStyles={highLowWrapper} 
          messageOneStyles={highLow} 
          messageTwoStyles={highLow} 
        />
      </View>
      <RowText 
          messageOne={weather[0].description} 
          messageTwo={weatherType[weatherCondition].message} 
          containerStyles={bodyWrapper} 
          messageOneStyles={description} 
          messageTwoStyles={message} 
        />
    </SafeAreaView>

  )
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'pink',
    flex: 1
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'

  },
  tempStyles: {
    color: 'black',
    fontSize: 48
  },
  feels: {
    color: 'black',
    fontSize: 30
  },
  highLow: {
    color: 'blue',
    fontSize: 20
  },
  highLowWrapper: {
    flexDirection: 'row'
  },
  bodyWrapper: {
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    paddingLeft: 25,
    marginBottom: 40
  },
  description: {
    fontSize: 48
  },
  message: {
    fontSize: 30
  }

})

export default CurrentWeather