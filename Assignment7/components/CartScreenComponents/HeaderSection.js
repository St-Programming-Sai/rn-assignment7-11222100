import { View, Image, Text, TouchableOpacity } from "react-native";

export default function Header({navigation}) {
  return (
    <View>
        <View  style={{display:"flex", flexDirection:"row", justifyContent:"space-between", alignItems:"center", paddingVertical:5, marginBottom:20, marginTop:-30}}>
           <TouchableOpacity onPress={()=>navigation.navigate("Home")} style={{padding:10, marginLeft:-15}}>
                <Image source={require("../../assets/home.png")} style={{width:50, height:50, padding:-100}}/>
           </TouchableOpacity>
            <Image source={require("../../assets/Logo.png")} style={{marginLeft:-30}}/>
            <TouchableOpacity>
                <Image source={require("../../assets/Search.png")} />
            </TouchableOpacity>
        </View>
        <View  style={{textAlign:"center", display:"flex", ustifyContent:"center", alignItems:"center", }}>
            <Text style={{textAlign:"center", letterSpacing:5, fontSize:20 , paddingBottom:10}}>
                CHECKOUT
            </Text>
            <View style={{borderBottomWidth:0.25, width:"50%", textAlign:"center"}}></View>
            <View style={{width:15, height:15, borderWidth:0.5, marginTop:-8, backgroundColor:"white", transform:[{rotate:"45deg"}]}}></View>
        </View>
    </View>
    
  );
}
 