import { StatusBar } from 'expo-status-bar';
import React, { useReducer, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const API_KEY = 'ebf45825c1d0ac6c97742d81c9cacb17';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_WEATHER_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_WEATHER_SUCCESS':
      return { ...state, loading: false, weather: action.payload };
    case 'FETCH_WEATHER_FAILURE':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    weather: null,
    error: null,
  });
  const [location, setLocation] = useState('');

  async function fetchWeather() {
    dispatch({ type: 'FETCH_WEATHER_REQUEST' });

    try {
      const geoResponse = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${API_KEY}`
      );
      const [geoData] = await geoResponse.json();

      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${geoData.lat}&lon=${geoData.lon}&exclude={part}&units=metric&appid=${API_KEY}`
      );
      const weatherData = await weatherResponse.json();

      dispatch({ type: 'FETCH_WEATHER_SUCCESS', payload: weatherData });
    } catch (error) {
      dispatch({ type: 'FETCH_WEATHER_FAILURE', payload: error.message });
    }
  }

  const { loading, weather, error } = state;
  let content;

  if (loading) {
    content = <Text>Loading...</Text>;
  } else if (weather) {
    content = (
      <View>
        <Text>Current temperature: {weather.current.temp}°C</Text>
        <Text>Weather description: {weather.current.weather[0].description}</Text>
      </View>
    );
  } else if (error) {
    content = <Text>Error: {error}</Text>;
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter location name"
        onChangeText={(text) => setLocation(text)}
      />
      <TouchableOpacity style={styles.button} onPress={fetchWeather}>
        <Text style={styles.buttonText}>Get Weather</Text>
      </TouchableOpacity>
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    margin: 10,
    width: 200,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});