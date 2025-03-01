import React from "react"
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';

function CustomButton({ title, onPress }) {
  return (
    <TouchableOpacity style={styles.button} >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

export default function App() {
  return (
    <View style={styles.view}>
    <CustomButton
      title="Reseba a inteligência"
      onPress={() => alert('Recebeu a Inteligência')}
    />
    </View >
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#4caf50',
    padding: 15,
    borderRadius: 30,
    alignItemns: 'center'
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});