import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { NavigateBtn } from '../../../Components/Buttons'
import { Progress } from '../../../Components/Headers'

export default function Birth({navigation}) {
  const [age, setAge] = useState(0)
  const agevalue={
    age: age > 5 && age
  }
  const condittion = age > 5
  const Submit = async () => {
    try {
      await AsyncStorage.mergeItem("user", JSON.stringify(agevalue))
      console.log("User's age is stored!")
      navigation.navigate('height')
    } catch (e) {
      console.log("not stored");
    }
  }

  return (
    <View style={styles.container}>
        {Progress({navigation}, 2)}
        {!condittion && age !== 0 &&
          <Text style={styles.error}>You should be more than 5 years old</Text>
        }
        <View style={styles.boxs}>
          <TextInput 
            keyboardType="numeric" 
            maxLength={2} 
            style={styles.age} 
            onChangeText={(e)=>setAge(e)}
          />
          
          <Text style={{fontSize:17, marginLeft: 10}}>
            Years old
          </Text>
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
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
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
    },
    age: {
      borderBottomColor: '#3FC495',
      borderBottomWidth: 1,
      width: 70 ,
      fontSize: 26,
        textAlign: "center",
        borderBottomWidth: 1,
        borderColor: "#3FC495",
        paddingVertical: 6,
    },
    error: {
      color: "red",
      textAlign: "center",
      marginBottom: 20,
  }
})