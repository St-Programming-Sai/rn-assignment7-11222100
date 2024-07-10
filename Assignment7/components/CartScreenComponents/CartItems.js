import React, { useCallback } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

 
 

export default function Items({ data, storedItems, setStoredItems, setEstTotal, navigation }) {

  useFocusEffect(
    useCallback(() => {
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
    }, [setStoredItems, setEstTotal])
  );
  

  
  const calculateTotal = (updatedItems) => {
    const sum = updatedItems.reduce((acc, item) => acc + (item.price || 0), 0);
    setEstTotal(sum);
  };

  const handleRemoveItem = async (key) => {
    try {
      const start = await AsyncStorage.getAllKeys();
      await AsyncStorage.removeItem(`@product_${key}`);
      const remaining = await AsyncStorage.getAllKeys();
      console.log(start, "----", remaining);
      const idx = storedItems.findIndex(item => item.id == (key+1));
      const deletedItemTitle = storedItems[idx].title;
      const updatedItems = storedItems.filter((item, i) => i !== idx);
      setStoredItems(updatedItems);
      calculateTotal(updatedItems);
      console.log(key, idx);


      alert(`${deletedItemTitle} deleted successfully`);

    } catch (e) {
      console.error('Failed to delete product:', e);
    }
  };
  



  return (
    <View style={{ marginVertical: "10%", marginBottom: "50%" }} >
      {storedItems.map((dress) => (
        <TouchableOpacity key={dress.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row", gap: 10, paddingVertical: 10 }} onPress={() => navigation.navigate('Product', { item: dress })}>
          

          <Image 
            source={{uri: dress.image}} 
            style={{ width: "35%", aspectRatio: 3 / 4 }} 
            resizeMethod="contain" 
          />

          <View style={{ width: "60%", marginBottom: "10%" }}>
            <Text style={{ fontSize: 20, maxWidth: "80%" }} numberOfLines={2} ellipsizeMode="tail">{dress.title}</Text>
            <Text style={{ fontSize: 13, maxWidth: "80%" }} numberOfLines={2} ellipsizeMode="tail">{dress.description}</Text>
            <Text style={{ fontSize: 20, maxWidth: "80%", color: "goldenrod" }}>${dress.price}</Text>
          </View>
          <TouchableOpacity style={{ position: "absolute", bottom: 15, right: 0, padding:15, backgroundColor:"rgba(218, 165, 32, 0.4)", borderRadius:50 }} onPress={() => handleRemoveItem(dress.id-1)}>
            <Image source={require("../../assets/remove.png")} />
          </TouchableOpacity>
        </TouchableOpacity>
      ))}
    </View>
  );
}
