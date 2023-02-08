import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { NavigateBtn } from '../../../Components/Buttons'
import { Progress } from '../../../Components/Headers'

export default function Sex({navigation}) {
    const [box, setBox] = useState(null)
    const condittion = box !== null

    const sexObj = [
        {
            "title":"Female",
            "value":"f",
        },
        {
            "title":"Male",
            "value":"m",
        }
    ]

    const sex = {
        sex: box && sexObj[box].title
    }
    
    const Submit = async () => {
        try {
          await AsyncStorage.mergeItem('user', JSON.stringify(sex))
          console.log("Sex is stored");
          navigation.navigate('birth')
        } catch (e) {
          console.log("Sex isn't stored");
        }
    }

  return (
    <View style={styles.container}>
        {Progress({navigation}, 1)}
        
        <View style={styles.boxs}>
            {sexObj.map((item,key)=>(
                <Text onPress={()=> setBox(key)} style={box === key ? styles.active : styles.box} key={key}> {item.title} </Text>
            ))}
        </View>

        {NavigateBtn({navigation}, "Next", Submit, condittion)}
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