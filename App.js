import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, Text, View } from 'react-native';
import { TailwindProvider } from 'tailwindcss-react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import Discover from './screens/Discover';
import ItemScreen from './screens/ItemScreen';
import LoginScreen from './screens/LoginScreen';
import CadastroScreen from './screens/CadastroScreen';
import AdicionarLocalScreen from './screens/addLocationScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <TailwindProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Discover" component={Discover} />
          <Stack.Screen name="ItemScreen" component={ItemScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Cadastro" component={CadastroScreen} />
          <Stack.Screen name="Local" component={AdicionarLocalScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </TailwindProvider>
  );
}
