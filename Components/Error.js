import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Micon from "react-native-vector-icons/MaterialIcons"

export default function Error(props) {
  return (
    <View style={{alignItems: 'center', flexDirection: 'row', justifyContent: 'center'}}>
        <Micon color="red" name="error" size={20} />
        <Text style={styles.error}> {props.text} </Text>
    </View>
  )
}

const styles = StyleSheet.create({
    error: {
        color: "red",
        textAlign: "center",
        fontWeight: 'bold',
    }
})