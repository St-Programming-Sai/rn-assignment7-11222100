import { View, Text, Image, TouchableOpacity, Animated } from "react-native";
import CustomSideBarNavigation from "../SideBar";
import React, { useState, useRef, useEffect } from "react";
import { useFocusEffect } from '@react-navigation/native';


export default function Header({navigation}) {
    const [toggleSideBar, setToggleSideBar] = useState(false);
    const sidebarLeft = useRef(new Animated.Value(-1000)).current; 
    useEffect(() => {
        Animated.timing(sidebarLeft, {
            toValue: toggleSideBar ? -20 : -1000,
            duration: 300,
            useNativeDriver: false,
        }).start();
    }, [toggleSideBar]);

    useFocusEffect( 
        React.useCallback(() => {
            setToggleSideBar(false);
        }, [])
    );
  
    return (
        <View style={{position: "relative", marginTop:-20}}>
            <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 5, marginBottom: 20}}>
                <TouchableOpacity onPress={() => {setToggleSideBar(!toggleSideBar)}} style={{padding:20, marginLeft:-10}}>
                    <Image source={require("../../assets/Menu.png")} />
                </TouchableOpacity>
                <Image source={require("../../assets/Logo.png")} />
                <TouchableOpacity>
                    <Image source={require("../../assets/Search.png")} />
                </TouchableOpacity>
                <TouchableOpacity style={{marginLeft: "-15%", padding:20, marginRight:"-5%"}} onPress={() => {navigation.navigate('Cart')}}>
                    <Image source={require("../../assets/shoppingBag.png")} />
                </TouchableOpacity>
            </View>
            {toggleSideBar && (
                <TouchableOpacity 
                    style={{ position: "absolute", top: "-80%", left: 0, right: 0, bottom: 0, backgroundColor: "rgba(218, 165, 32, 0.3)", width:"200%", height:"30000%", zIndex:5 }} 
                    onPress={() => setToggleSideBar(false)}
                />
            )}
            <Animated.View style={{position: "absolute", top: "-80%", left: sidebarLeft, width:"90%", flex:1, height:"20000%", zIndex:10, backgroundColor:"white", padding:20 }}>
                <CustomSideBarNavigation navigation={navigation} customStyles={{}} toggleSideBar={toggleSideBar} setToggleSideBar={setToggleSideBar} />
            </Animated.View>
        </View>
    );
}
