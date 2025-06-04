import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import store from './src/components/redux/store';
import LoginScreen from './src/components/pages/Login';
import ProductListScreen from './src/components/pages/Productlist';
import ProductDetailScreen from './src/components/pages/Productdetails';
import CartScreen from './src/components/pages/Cart';



const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen}  options={{ headerShown: false }} />
          <Stack.Screen name="ProductList" component={ProductListScreen}  options={{ headerShown: false }}  />
          <Stack.Screen name="ProductDetail" component={ProductDetailScreen}  options={{ headerShown: false }} />
            <Stack.Screen name="cart" component={CartScreen}  options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
