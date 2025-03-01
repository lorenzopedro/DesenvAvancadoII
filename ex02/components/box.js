import React from "react";
import { Text, View, StyleSheet } from 'react-native';

const Box = (props) => {
    return(
        <View style={StyleSheet.box}>
            <Text style={StyleSheet.text}>{props.nome}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    box: {
        width: 100,
        height: 100,
        backgroundColor: '0000',
        justifyContent: 'flex-end',
        alignItems: 'center',
      },
      text: {
        color: 'fff',
        fontSize: 18,
      }
})

export default Box;