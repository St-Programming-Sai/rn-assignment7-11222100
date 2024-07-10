import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import Home from "./components/HomeScreen";
import Cart from "./components/CartScreen";
import ProductDetails from './components/ProductDetailsScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';    
import { DataProvider } from './components/DataContext';

const Stack = createStackNavigator();
 
export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar backgroundColor="goldenrod" barStyle="light-content" />
        <DataProvider>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
              name="Home"
              component={Home}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Cart"
              component={Cart}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Product"
              component={ProductDetails}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </DataProvider>
      </SafeAreaView>
    </NavigationContainer>
  );
}
