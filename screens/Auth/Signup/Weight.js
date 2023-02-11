import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { NavigateBtn } from '../../../Components/Buttons'
import { Progress } from '../../../Components/Headers'

export default function Weight({navigation}) {
    const [user, setUser] = useState("null")

    useEffect(() => {
        async function getUser(){
          const value = await AsyncStorage.getItem('user')
          const val = JSON.parse(value)
          if(value !== null) {
              console.log(value);
              setUser(val)
          }
        }
        getUser();
    }, []) 
    
    const [weight, setWeight] = useState(0)
    const condittion = weight > 0

    const weightKey = {
        weight: weight >= 0 && weight
    }
    
    const Submit = async () => {
        try {
          await AsyncStorage.mergeItem('user', JSON.stringify(weightKey))
          console.log("Weight is stored");
          const user = await AsyncStorage.getItem('user')
          const val = JSON.parse(user)
          navigation.navigate(val.goal !== "Maintain Weight" ? 'gweight' : 'finish')
        } catch (e) {
          console.log("Weight isn't stored");
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
                <Text> {user?.system === "eu" ? "kg" : "Lbs"} </Text>
            </View>
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