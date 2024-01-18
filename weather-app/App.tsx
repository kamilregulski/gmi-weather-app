import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { withExpoSnack } from 'nativewind';

const App = () => {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text>WeatherApp</Text>
      <StatusBar style="auto" />
    </View>
  )
}

export default withExpoSnack(App);