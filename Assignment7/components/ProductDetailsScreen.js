
import React from 'react';
import { View, ScrollView, Text, Image, TouchableOpacity, Alert } from 'react-native';
import Header from "./HomeScreenComponents/HeaderSection";
import AsyncStorage from '@react-native-async-storage/async-storage';


const laundryGuide = [
    {"key":0, "image":require("../assets/Do Not Bleach.png"), "text":"Do not use bleach"},
    {"key":1, "image":require("../assets/Do Not Tumble Dry.png"), "text":"Do not tumble dry"},
    {"key":2, "image":require("../assets/Do Not Wash.png"), "text":"Dry clean with tetrachloroethylene"},
    {"key":3, "image":require("../assets/Iron Low Temperature.png"), "text":"Iron at a maximum of 110ºC/230ºF"}
]



      


export default function ProductDetails({ navigation, route }) {
    const { item } = route.params;


    function getSelectedItem(key){
        return item;
    }


    async function saveProduct(key){
        try{
            await AsyncStorage.setItem(`@product_${key}`, JSON.stringify(getSelectedItem(key)));
            Alert.alert(
                'Success',
                `${item.title} Added to Cart successfully.`,
                [
                  {
                        text: 'Ok',
                        onPress: () => {},
                  },
                  {
                    text: 'View in Cart',
                    onPress: () => navigation.navigate('Cart'),
                  },{
                    text: 'Continue Browsing',
                    onPress: () => navigation.navigate('Home'),
                  }
                  
                ],
                { cancelable: false }
              );
          }catch (e) {
              console.error('Failed to save product:', e);
              alert('Sorry, Failed to save product')
            }
    };
        

  return (
    <View >
        <ScrollView>
            <View style={{padding:20, paddingBottom:10}}>
                <Header navigation={navigation} />
            </View>
            <View style={{flex:1, alignItems:"center", padding:20, paddingTop:10 }}>

                <Image source={{ uri: item.image }} resizeMode="contain" style={{width:"100%", height:400, backgroundColor:"white" }}/>

                <View style={{flex:1, flexDirection:"row", justifyContent:"center", alignItems:"flex-start", paddingLeft:10, paddingVertical:30, margin:10, paddingTop:0}}>
                    <View style={{width:"100%", padding:5, gap:10}}>
                        <Text style={{fontSize:17, textTransform:"uppercase", letterSpacing:5}}>{item.title}</Text>
                        <Text style={{fontSize:15, textTransform:"capitalize", fontWeight:"bold"}} numberOfLines={0} ellipsizeMode="tail"><Text style={{fontWeight:"100"}}>Category: </Text>{item.category}</Text>
                        <Text style={{fontSize:13}} numberOfLines={0} ellipsizeMode="tail">{item.description}</Text>
                        <Text style={{fontSize:20, color:"goldenrod"}}>$1{item.price}</Text>
                    </View>
                    <Image source={require(".././assets/Export.png")}/>
                    </View>

                    {item.category.includes("clothing") ? (
                            <View>
                                <Text style={{ fontSize: 17, textTransform: "uppercase", letterSpacing: 5, textAlign: "left" }}>Materials</Text>
                                <Text>
                                    We work with monitoring programmes to
                                    ensure compliance with safety, health and
                                    quality standards for our products.
                                </Text>
                                <View style={{ paddingVertical: 20 }}>
                                    {laundryGuide.map((item) => (
                                        <View key={item.key} style={{ display: "flex", flexDirection: "row", gap: 10, paddingVertical: 5 }}>
                                            <Image source={item.image} />
                                            <Text>{item.text}</Text>
                                        </View>
                                    ))}
                                </View>
                            </View>
                        ) : null}

                    <View>
                    <View style={{ borderBottomWidth: 1, paddingVertical: 20 }}></View>
                    <View style={{paddingTop:20, flex:1, flexDirection:"row", justifyContent:"space-between", alignItems:"flex-start", width:"100%"}}>
                        <Image source={require("../assets/Shipping.png")}/>
                        <View style={{marginLeft:"-5%"}}>
                            <Text style={{fontWeight:"bold"}}>Free Flat Rate Shipping</Text>
                            <Text>Estimated to be delivered on </Text>
                            <Text>09/11/2021 - 12/11/2021.</Text>
                        </View>
                        <Image source={require("../assets/Down.png")}/>
                    </View>
                
                </View>
            </View>
            <View style={{marginTop:60, backgroundColor:"black", width:"100%", padding:30, flex:1, flexDirection:"row", justifyContent:"space-between", alignItems:"flex-start"}}>
                    <TouchableOpacity style={{flex:1, flexDirection:"row", justifyContent:"flex-start", alignItems:"center", gap:10}} onPress={()=>{saveProduct(item.id)}}>
                        <Image source={require("../assets/Plus.png")}/>
                        <Text style={{color:"white", textTransform:"uppercase", letterSpacing:3, fontSize:14}}>Add To Cart</Text>
                    </TouchableOpacity>
                    <Image source={require("../assets/Heart.png")}/>
                </View>
        </ScrollView>
    </View>
   );
}
