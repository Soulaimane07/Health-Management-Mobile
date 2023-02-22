import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function TargetLeftTaken(props) {
    const options = [
        {
          "title":"Taken",
          "val": props.taken
        },
        {
          "title":"Target",
          "val": props.target?.toFixed(0),
          "unit": props.unit
        },
        {
          "title":"Left",
          "val":  props.target?.toFixed(0)-props.taken,
          "color": props.color
        },
    ]

    return (
        <>
            <Text style={styles.h1}> {props.title} </Text>
            <View style={styles.boxContent}>
                {options.map((item,key)=>(
                    <View key={key} style={[styles.boxx, key == 1 && {borderLeftWidth: 0.4, borderRightWidth: 0.4,}]}>
                        <Text style={{fontWeight: 'bold', marginBottom: 10}}> {item.title} </Text>
                        <Text style={{color: item.color}}> {item.val} {item.unit} </Text>
                    </View>
                ))}
            </View>
        </>
  )
}

const styles = StyleSheet.create({
    h1: {
        fontSize: 26,
        textAlign: 'center',
        marginBottom: 10,
        fontWeight: "bold",
      },
      boxContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
      },
      boxx: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
      }
})
