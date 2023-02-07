import { View, Text, StyleSheet, TextInput } from 'react-native'
import React, { useState } from 'react'
import { Progress } from '../../../Components/Headers'
import { NavigateBtn } from '../../../Components/Buttons'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function GWeight({navigation}) {
    const weightObj = [
        {
            "title":"Lbs",
            "value":"lbs",
        },
        {
            "title":"Kg",
            "value":"kg",
        },
        {
            "title":"St",
            "value":"st",
        }
    ]

    const [obj, setObj] = useState(0)
    const [weight, setWeight] = useState(0)
    const condittion = weight <= 0

    const weightKey = {
        Gweight: weight >= 0 && `${weight} ${weightObj[obj].title}`
    }

    const Submit = async () => {
        try {
          await AsyncStorage.mergeItem('user', JSON.stringify(weightKey))
          console.log("stored");
          navigation.navigate('finish')
        } catch (e) {
          console.log("not stored");
        }
    }

  return (
    <View style={styles.container}>
        {Progress({navigation}, 5)}

        <View>
            <View style={styles.box}>
                <TextInput
                    style={styles.input}
                    value={weight}
                    keyboardType="numeric"
                    onChangeText={e => setWeight(e)}
                />
                <Text> {weightObj[obj].title} </Text>
            </View>

            <View style={styles.choise}>
                {weightObj.map((item,key)=>(
                    <Text onPress={()=> setObj(key)} key={key} style={obj === key ? styles.active : styles.choose}> {item.title} </Text>
                ))}
            </View>
        </View>

      {NavigateBtn({navigation}, "Finish", Submit, condittion)}
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
    },
    choise: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    choose: {
        backgroundColor: "white",
        padding: 14,
        width: 60,
        marginHorizontal: 6,
        textAlign: 'center',
        borderRadius: 16,
        fontWeight: 'bold',
    },
    active: {
        backgroundColor: "#3FC495",
        color: "white",
        padding: 14,
        width: 60,
        marginHorizontal: 6,
        textAlign: 'center',
        borderRadius: 16,
        fontWeight: 'bold',
    },
    input: {
        fontSize: 26,
        width: 100,
        textAlign: "center",
        borderBottomWidth: 1,
        borderColor: "#3FC495",
        paddingVertical: 6,
    },
    
    
    box: {
        margin: 10,
        marginBottom: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
})