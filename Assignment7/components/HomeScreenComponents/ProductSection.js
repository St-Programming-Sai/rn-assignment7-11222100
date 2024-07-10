import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

  


export default function Products({ data, refresh, navigation }) {
    const [refreshing, setRefreshing] = useState(false);
    const [products, setProducts] = useState(data);

    if (!data || data.length === 0) {
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',height:300 }}>
            <Text style={{fontSize:30, letterSpacing:3, color:"goldenrod", textTransform:"uppercase", textAlign:"center"}}>Sorry Out Of Stock</Text>
          </View>
        );
      }
    


    const onRefresh = () => {
      setRefreshing(true);
      refresh().then(() => setRefreshing(false));
    };



    function getSelectedItem(key){
        return data[key]
    }
    
    
    async function saveProduct(key){
    try{
        await AsyncStorage.setItem(`@product_${key}`, JSON.stringify(getSelectedItem(key)));
        Alert.alert(
          'Success',
          `${data[key].title} Added to Cart successfully.`,
          [
            {
              text: 'Continue Browsing',
              onPress: () => {},
            },
            {
              text: 'View in Cart',
              onPress: () => navigation.navigate('Cart'),
            },
          ],
          { cancelable: false }
        );
    }catch (e) {
        console.error('Failed to save product:', e);
        alert('Sorry, Failed to save product')
      }
    };
    


    return (
    <View>
       <View>
            <FlatList 
                data={data}
                numColumns={2}
                columnWrapperStyle={{gap:10, paddingVertical:12}}
                contentContainerStyle={{gap:10 , paddingBottom:12}}
                showsVerticalScrollIndicator={false}
                scrollEnabled={false}
                keyExtractor={(item) => item.id}
                renderItem={({item})=>{
                    return(
                        <TouchableOpacity style={{height:300, width:"49%", borderRadius:20 }} onPress={() => navigation.navigate('Product', { item })}>
                            <View >
                                <Image
                                    source={{ uri: item.image }}
                                    style={{ width: '100%', height: 200, borderRadius: 10, backgroundColor:"white" }}
                                    resizeMode="contain"
                                />      
                               <TouchableOpacity style={{position:"absolute", bottom:0, right:5, backgroundColor:"goldenrod", padding:10, borderRadius:50}} onPress={()=>{saveProduct(item.id-1)}}>
                                    <Image source={require("../../assets/add_circle.png")}/>
                                </TouchableOpacity>

                            </View>
                            <View style={{width:"100%", padding:5}}>
                                <Text style={{fontSize:17}} numberOfLines={2} ellipsizeMode="tail">{item.title}</Text>
                                <Text style={{fontSize:13}} numberOfLines={1} ellipsizeMode="tail">{item.category}</Text>
                                <Text style={{fontSize:20, color:"goldenrod"}}>${item.price}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                }}
            />
       </View>
    </View>
    
  );
}
