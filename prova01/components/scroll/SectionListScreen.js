import React from "react";
import { SectionList, Text, StyleSheet, View } from 'react-native';

const sections = [
  {title: 'Seção 1', data: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5']},
  {title: 'Seção 2', data: ['Item 6', 'Item 6', 'Item 8', 'Item 9', 'Item 10']},
  {title: 'Seção 2', data: ['Item 11', 'Item 12', 'Item 13', 'Item 14', 'Item 15']},
]

export default function SectionListScreen(){
  return(
    <SectionList 
      sections = {sections}
      keyExtractor={(item,index) => item +index}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text style={styles.text}>{item}</Text>
        </View>
      )}
      renderSectionHeader={({ section }) =>(
        <Text>{section.title}</Text>
      )}
      contentContainerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create ({
  container: {
    padding: 20,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: '#d0d0d0',
    padding: 10,
    borderRadius: 8,
  },
  item:{
    marginBottom: 10, 
    padding: 10,
    backgroundColor: '#f9fbe7',
    borderRadius: 8,
  },
  text: {
    fontSize: 16,
  }
});
