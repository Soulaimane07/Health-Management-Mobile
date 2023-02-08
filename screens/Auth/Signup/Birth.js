import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { NavigateBtn } from '../../../Components/Buttons'
import { Progress } from '../../../Components/Headers'

export default function Birth({navigation}) {
  const [date, setDate] = useState(new Date())

  const Submit = async () => {
    try {
      navigation.navigate('height')
    } catch (e) {
      console.log("not stored");
    }
  }

  return (
    <View style={styles.container}>
        {Progress({navigation}, 2)}

        <View style={styles.boxs}>
         
        </View>

        {NavigateBtn({navigation}, "Next", Submit, )}
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'space-between',
    },
    boxs: {
        padding: 20,
    },
    box: {
        margin: 10,
        padding: 40,
        textAlign: 'center',
        fontWeight: 'bold',
        borderRadius: 16,
        backgroundColor: "white",
        color: "#adb5bd"
    },
    active: {
        margin: 10,
        padding: 40,
        textAlign: 'center',
        fontWeight: 'bold',
        borderRadius: 16,
        backgroundColor: "#3FC495",
        color: "white",
    }
})