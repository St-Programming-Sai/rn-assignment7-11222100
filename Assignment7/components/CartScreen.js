import React, { useState, useEffect, useContext } from 'react';
import { View, ScrollView, Text } from 'react-native';
import Header from './CartScreenComponents/HeaderSection';
import Footer from './CartScreenComponents/FooterSection';
import Items from './CartScreenComponents/CartItems';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DataContext } from '../components/DataContext';





  
export default function CartScreen({ navigation, route }) {
  const [storedItems, setStoredItems] = useState([]);
  const [estTotal, setEstTotal] = useState(0);
  const { data } = useContext(DataContext);

// ===========================================================================================//
  

  // const clearAsyncStorage = async () => {
  //   try {
  //     await AsyncStorage.clear();
  //     console.log('AsyncStorage successfully cleared!');
  //   } catch (e) {
  //     console.error('Failed to clear AsyncStorage.');
  //   }
  // };
  // clearAsyncStorage()


// ===========================================================================================//



useEffect(() => {
  const fetchStoredItems = async () => {
    try {
      const allKeys = await AsyncStorage.getAllKeys();
      const productKeys = allKeys.filter(key => key.startsWith('@product_'));
      const products = await Promise.all(
        productKeys.map(async key => {
          const jsonProduct = await AsyncStorage.getItem(key);
          return JSON.parse(jsonProduct);
        })
      );
      setStoredItems(products);
      const sum = products.reduce((acc, item) => acc + (item.price || 0), 0);
      setEstTotal(sum);
    } catch (error) {
      console.error('Failed to fetch stored products:', error);
    }
  };

  fetchStoredItems();
}, []);


  
  const removeItem = async (key) => {
    try {
      const start = await AsyncStorage.getAllKeys();
      await AsyncStorage.removeItem(`@product_${key}`);
      const remaining = await AsyncStorage.getAllKeys();

      console.log(start, "-----", remaining);
      const updatedItems = storedItems.filter(item => item.key !== key);
      setStoredItems(updatedItems);
      const sum = updatedItems.reduce((acc, item) => acc + (item.price || 0), 0);
      setEstTotal(sum);
      alert(`${data[key]["name"]} deleted successfully`);
    } catch (e) {
      console.error('Failed to delete product:', e);
    }
  };
  

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View style={{ padding: 20, paddingTop: 50 }}>
          <Header navigation={navigation}/>
          {(storedItems.length == 0) ? <Text style={{textAlign:"center", fontSize:25, textTransform:"uppercase", color:"goldenrod", marginTop:"25%", letterSpacing:3.5}}>No Items In Cart</Text> :
          <Items data={ data } storedItems={storedItems} setStoredItems={setStoredItems} setEstTotal={setEstTotal} navigation={ navigation }/>}
        </View>
      </ScrollView>
      <Footer estTotal={estTotal} />
    </View>
  );
}
