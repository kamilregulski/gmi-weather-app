import { StatusBar } from 'expo-status-bar';
import { withExpoSnack } from 'nativewind';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { MagnifyingGlassIcon, XMarkIcon } from 'react-native-heroicons/outline';
import { MapPinIcon } from 'react-native-heroicons/solid';

import { weatherImages } from './constants';
import { theme } from './theme';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [showSearch, toggleSearch] = useState(false);
  const [locations] = useState([
    {
      name: 'Warsaw',
      country: 'Poland',
    },
  ]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const handleTextDebounce = () => undefined;
  const handleLocation = (loc: any) => undefined;

  const location = {
    name: 'Warsaw',
    country: 'Poland',
  };

  const current = {
    condition: {
      text: 'Good weather',
    },
    wind_kph: 20,
    humidity: 10,
    temp_c: 30,
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
            <View
              className="flex-row justify-end items-center rounded-full"
              style={{
                backgroundColor: showSearch ? theme.bgWhite(0.2) : 'transparent',
              }}>
              {showSearch ? (
                <TextInput
                  onChangeText={handleTextDebounce}
                  placeholder="Search city"
                  placeholderTextColor="lightgray"
                  className="pl-6 h-10 pb-1 flex-1 text-base text-white"
                />
              ) : null}
              <TouchableOpacity
                onPress={() => toggleSearch(!showSearch)}
                className="rounded-full p-3 m-1"
                style={{ backgroundColor: theme.bgWhite(0.3) }}>
                {showSearch ? (
                  <XMarkIcon size="25" color="white" />
                ) : (
                  <MagnifyingGlassIcon size="25" color="white" />
                )}
              </TouchableOpacity>
            </View>
            {locations.length > 0 && showSearch ? (
              <View className="absolute w-full bg-gray-300 top-16 rounded-3xl ">
                {locations.map((loc, index) => {
                  const showBorder = index + 1 !== locations.length;
                  const borderClass = showBorder ? ' border-b-2 border-b-gray-400' : '';
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => handleLocation(loc)}
                      className={'flex-row items-center border-0 p-3 px-4 mb-1 ' + borderClass}>
                      <MapPinIcon size="20" color="gray" />
                      <Text className="text-black text-lg ml-2">
                        {loc?.name}, {loc?.country}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            ) : null}
          </View>
          <View className="mx-4 flex justify-around flex-1 mb-2">
            <Text className="text-white text-center text-2xl font-bold">
              {location?.name}
              <Text className="text-lg font-semibold text-gray-300">, {location?.country}</Text>
            </Text>
            <View className="flex-row justify-center">
              <Image source={weatherImages['Sunny']} className="w-52 h-52" />
            </View>
            <View className="space-y-2">
              <View className="flex-row justify-between mx-4">
                <View className="flex-row space-x-2 items-center">
                  <Image source={require('./assets/icons/wind.png')} className="w-6 h-6" />
                  <Text className="text-white font-semibold text-base">{current?.wind_kph}km</Text>
                </View>
                <View className="flex-row space-x-2 items-center">
                  <Text className="text-center font-bold text-white text-6xl ml-5">
                    {current?.temp_c}&#176;
                  </Text>
                </View>
                <View className="flex-row space-x-2 items-center">
                  <Image source={require('./assets/icons/drop.png')} className="w-6 h-6" />
                  <Text className="text-white font-semibold text-base">{current?.humidity}%</Text>
                </View>
              </View>
              <Text className="text-center text-white text-xl tracking-widest">
                {current?.condition?.text}
              </Text>
            </View>
          </View>
        </SafeAreaView>
      )}
    </View>
  );
};

export default withExpoSnack(App);
