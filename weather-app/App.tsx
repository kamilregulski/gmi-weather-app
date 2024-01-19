import { StatusBar } from 'expo-status-bar';
import { withExpoSnack } from 'nativewind';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { StarIcon } from 'react-native-heroicons/outline';
import { MapPinIcon, StarIcon as StarIconSolid } from 'react-native-heroicons/solid';

import { fetchLocations, fetchWeatherForecast } from './api';
import SearchBar from './components/SearchBar';
import { FAVORITES_KEY, defaultCityName, weatherImages } from './constants';
import { theme } from './theme';
import { getData, storeData } from './utils/asyncStorage';

interface WeatherLocation {
  name: string;
  country: string;
}

interface WeatherCurrent {
  condition: {
    text: string;
  };
  humidity: string;
  temp_c: string;
  wind_kph: string;
}

interface Weather {
  location: WeatherLocation;
  current: WeatherCurrent;
}

interface Favorite {
  name: string;
}

const App = () => {
  const [loading, setLoading] = useState(true);
  const [showSearch, toggleSearch] = useState(false);
  const [locations, setLocations] = useState([]);
  const [weather, setWeather] = useState<Weather>();
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [isFavorite, setIsFavorite] = useState<boolean>();

  useEffect(() => {
    getLocationWeather(defaultCityName);
  }, []);

  useEffect(() => {
    getFavorites();
  }, [weather]);

  useEffect(() => {
    checkFavorite();
  }, [favorites]);

  const errorAlert = () => {
    Alert.alert(
      'Something went wrong...',
      'We are sorry, but we cannot fetch data from our API right now. Please try again later...',
      [
        {
          text: 'OK',
          style: 'cancel',
        },
      ],
    );
  };

  function getLocationWeather(cityName: string) {
    setLoading(true);
    toggleSearch(false);
    setLocations([]);
    fetchWeatherForecast({
      cityName,
    })
      .then((data) => {
        if (data?.location?.name) {
          setLoading(false);
          setWeather(data);
        } else {
          throw new Error();
        }
      })
      .catch(errorAlert);
  }

  const onChangeSearchText = (cityName: string) => {
    if (cityName && cityName.length > 2)
      fetchLocations({ cityName })
        .then((data) => {
          setLocations(data);
        })
        .catch(errorAlert);
  };

  const getFavorites = async () => {
    const stringified = await getData(FAVORITES_KEY);
    if (stringified) {
      const parsed = JSON.parse(stringified);
      setFavorites(parsed);
    }
  };

  const checkFavorite = () => {
    setIsFavorite(!!favorites.find((f: Favorite) => f.name === weather?.location.name));
  };

  const updateFavorite = async () => {
    let updated: Favorite[] = [];
    updated = isFavorite
      ? favorites.filter(({ name }: Favorite) => name !== weather?.location?.name)
      : [...favorites, { name: weather?.location.name } as Favorite];
    setFavorites(updated);
    storeData(FAVORITES_KEY, JSON.stringify(updated));
  };

  return (
    <View className="flex-1 relative">
      <StatusBar style="light" />
      <Image
        blurRadius={50}
        className="absolute w-full h-full"
        source={require('./assets/images/bg.png')}
      />
      {loading ? (
        <View className="flex-1 flex-row justify-center items-center">
          <ActivityIndicator size="large" color="white" />
        </View>
      ) : (
        <SafeAreaView className="flex flex-1">
          <View style={{ height: '7%' }} className="mx-4 relative z-50">
            <SearchBar
              showSearch={showSearch}
              toggleSearch={toggleSearch}
              onChangeSearchText={onChangeSearchText}
            />
            {locations.length > 0 && showSearch ? (
              <View className="absolute w-full bg-gray-300 top-16 rounded-3xl ">
                {locations.map((location: Weather['location'], index: number) => {
                  const showBorder = index + 1 !== locations.length;
                  const borderClass = showBorder ? ' border-b-2 border-b-gray-400' : '';
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => getLocationWeather(location.name)}
                      className={'flex-row items-center border-0 p-3 px-4 mb-1 ' + borderClass}>
                      <MapPinIcon size="20" color="gray" />
                      <Text className="text-black text-lg ml-2">
                        {location?.name}, {location?.country}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            ) : null}
          </View>
          <View className="mx-4 flex justify-around flex-1 mb-2">
            <View className="flex-row justify-center">
              <Text className="text-white text-center text-2xl font-bold">
                {`${weather?.location?.name}, `}
                <Text className="text-lg font-semibold text-gray-300">
                  {weather?.location?.country}
                </Text>
              </Text>
            </View>
            <View className="flex-row justify-center">
              <TouchableOpacity
                onPress={updateFavorite}
                className="rounded-full p-1 m-1"
                style={{ backgroundColor: theme.bgWhite(0.1) }}>
                {isFavorite ? (
                  <StarIconSolid size="40" color="gold" />
                ) : (
                  <StarIcon size="40" color="white" />
                )}
              </TouchableOpacity>
            </View>
            <View className="flex-row justify-center">
              <Image
                source={weatherImages[weather?.current?.condition?.text || 'other']}
                className="w-52 h-52"
              />
            </View>
            <View className="space-y-2">
              <View className="flex-row justify-between mx-4">
                <View className="flex-row space-x-2 items-center">
                  <Image source={require('./assets/icons/wind.png')} className="w-6 h-6" />
                  <Text className="text-white font-semibold text-base">
                    {`${weather?.current?.wind_kph} km`}
                  </Text>
                </View>
                <View className="flex-row space-x-2 items-center">
                  <Text className="text-center font-bold text-white text-6xl ml-5">
                    {weather?.current?.temp_c}&#176;
                  </Text>
                </View>
                <View className="flex-row space-x-2 items-center">
                  <Image source={require('./assets/icons/drop.png')} className="w-6 h-6" />
                  <Text className="text-white font-semibold text-base">
                    {`${weather?.current?.humidity} %`}
                  </Text>
                </View>
              </View>
              <Text className="text-center text-white text-xl tracking-widest">
                {weather?.current?.condition?.text}
              </Text>
            </View>
          </View>
          <View className="mb-2 space-y-3">
            <View className="flex-row items-center mx-5 space-x-2">
              <StarIconSolid size="22" color="gold" />
              <Text className="text-gray-200 text-base">Favorite cities ({favorites?.length})</Text>
            </View>
            <ScrollView
              horizontal
              contentContainerStyle={{ paddingHorizontal: 15 }}
              showsHorizontalScrollIndicator={false}>
              {favorites?.map(({ name }: Favorite, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => getLocationWeather(name)}
                    className="rounded-full p-3 m-1"
                    style={{ backgroundColor: theme.bgWhite(0.1) }}>
                    <Text className="text-white text-lg">{name}</Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </SafeAreaView>
      )}
    </View>
  );
};

export default withExpoSnack(App);
