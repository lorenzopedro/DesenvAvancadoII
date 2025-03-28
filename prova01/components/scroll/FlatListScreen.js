import React from "react";
import { FlatList, Text, StyleSheet, View } from "react-native";

const data = Array.from({ length: 50 }, (_, i) => ({ id: i, name: `Item ${i + 1}` }));

export default function FlatListScreen(){
  return(
    <FlatList 
      data={data} 
      keyExtractor={(item) => item.id.toString()}
      renderItem = {({ item }) => (

      <View style={style.container}>
        <Text style={style.item}>{item.name}</Text>
      </View>

      )}
      contentContainerStyle={style.container}
    />
  );
}

const style = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 20,
  },
  item:{
    marginBottom: 10,
    padding: 20,
    backgroundColor: 'f0f0fe',
  },
  text:{
    fontSize: 16,
    fontWeight: 'bold',
  },
});