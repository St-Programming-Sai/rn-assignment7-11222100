import { View, Text, Image, TouchableOpacity } from "react-native";

const menuOptions = ["Home", "Cart", "Store", "Clothing", "Jewelery", "Electronic"];
    
    
    
    
    
    
export default function CustomSideBarNavigation({navigation, customStyles, toggleSideBar, setToggleSideBar}) {
  return (
    <View style={[customStyles, {}]}>
       <TouchableOpacity style={{marginTop:80}} onPress={() => {setToggleSideBar(!toggleSideBar)}}>
        <Image source={require("../assets/Close.png")} style={{width:40}} />
       </TouchableOpacity>
       <Text style={{textTransform:"uppercase", fontSize:20, letterSpacing:3, marginTop:30 }}>Eric Atsu</Text>
       <View style={{borderBottomColor:"goldenrod", borderBottomWidth:2, width:"50%", marginLeft:15, marginTop:10, marginBottom:50}}></View>


       {menuOptions.map((item, i) => {
        return (
          <TouchableOpacity style={{padding:10}} key={i} onPress={()=>{(i===0  || i===1) ? navigation.navigate(item) : ""; setToggleSideBar(!toggleSideBar)}}>
            <Text style={{fontSize:18, letterSpacing:2}}>{item}</Text>
          </TouchableOpacity>  
        );
       })}
    </View>
    
  );
}
