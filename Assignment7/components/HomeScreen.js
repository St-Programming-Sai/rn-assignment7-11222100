import { View, ScrollView } from 'react-native';
import Header from "./HomeScreenComponents/HeaderSection";
import Products from "./HomeScreenComponents/ProductSection";
import Options from './HomeScreenComponents/OptionsSection';
import { DataContext } from '../components/DataContext';
import React, { useContext } from 'react';


export default function Home({ navigation }) {
  const { data } = useContext(DataContext);

  return (
    <ScrollView>
      <View style={{ padding: 20, paddingTop: 50 }}>
        <Header navigation={navigation} />
        <Options />
        <Products data={data} navigation={navigation} />
      </View>
    </ScrollView>
  );
}
 