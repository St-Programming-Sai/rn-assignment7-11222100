import React from 'react';
import { View, Image, Text } from "react-native";

export default function Footer({ estTotal }) {
  return (
    <View style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", position: "absolute", bottom: "0%", paddingHorizontal: 20, backgroundColor: "white" }}>
      <View style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row", width: "100%", paddingBottom: 5 }}>
        <Text style={{ letterSpacing: 5, fontSize: 15.5 }}>EST. TOTAL</Text>
        <Text style={{ fontSize: 25, color: "goldenrod" }}>${estTotal.toFixed(2)}</Text>
      </View>
      <View style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "row", width: "120%", gap: 20, padding: 15, backgroundColor: "black" }}>
        <Image source={require("../../assets/shoppingBagWhite.png")} />
        <Text style={{ letterSpacing: 2, fontSize: 20, color: "white" }}>CHECKOUT</Text>
      </View>
    </View>
  );
}
