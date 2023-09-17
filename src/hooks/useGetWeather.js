import React, {useState, useEffect} from "react"
import * as Location from 'expo-location'
import { WEATHER_API_KEY } from "@env"

export const useGetWeather = () => {

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [weather, setWeather] = useState([])
  const [lat, setLat] = useState([])
  const [long, setLong] = useState([])

  const fetchWeatherData = async () => {
    try {
      console.log(WEATHER_API_KEY)
      const res = await fetch( `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${WEATHER_API_KEY}&units=metric`)
      const data = await res.json()
      setWeather(data)
    } catch (e) {
        console.log("error feting weather data",e)
      setError('Could not fetch weather')
    } finally {
      setLoading(false)
    }
   
  }

  useEffect(() => {
    (async() => {
      let { status } = await Location.requestForegroundPermissionsAsync()

      if(status !== 'granted'){
          console.log(status)
          setError('permission to access location was denied')
          return
      }
      let location = await Location.getCurrentPositionAsync({})
      console.log(location)
      console.log(location.coords.latitude)
      setLat(location.coords.latitude)
      setLong(location.coords.longitude)
      await fetchWeatherData()
    })()
  }, [lat, long])
  return [loading, error, weather]

}