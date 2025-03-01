import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Component from './components/Componente';
import Styles from './Style';

//estilo inline
export default function App(){
    return(
    <View style={Styles.container}>
      <Component nome="Juvenal pega no meu pal"/>
      <Text style={Styles.text} >Olá, React Native!!! </Text>
    </View>
  );
}


