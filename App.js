import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './screens/Login';
import Home from './screens/Home';
import Register from './screens/Register';
import { Provider } from 'react-redux';
import store from'./reducers/index';

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='home'>
          <Stack.Screen name='login' component={Login} options={{ headerShown:false }}></Stack.Screen>
          <Stack.Screen name='register' component={Register} options={{ headerShown:false }}></Stack.Screen>
          <Stack.Screen name='home' component={Home} options={{ headerShown:false }}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
