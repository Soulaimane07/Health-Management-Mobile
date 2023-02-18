import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { NavigateBtn } from '../../../Components/Buttons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Statusbar from '../../../Components/Statusbar'

export default function Steps({navigation}) {
  const [steps, setSteps] = useState("null")

  const condittion = steps > 0

  const Steps = {
    steps : steps
  } 

  const Submit = async () => {
    try {
      await AsyncStorage.mergeItem("user", JSON.stringify(Steps))
      console.log("User's steps is stored!")
      navigation.navigate('home')
    } catch (e) {
      console.log("not stored");
    }
  }

  return (
    <View style={styles.container}>
      <Statusbar color="#fdb833" style="light" />
      <View>
        <View style={styles.box}>
        </View>

        <View style={styles.box}>
          <Text style={styles.h1}>Steps number</Text>
          {steps == 0 && <Text style={styles.error}> Steps number can not be null (0) </Text>}
          {steps < 0 && <Text style={styles.error}> Steps number can not be negative </Text>}
          <View style={styles.boxContent}>
            <TextInput 
              keyboardType='numeric'
              selectionColor={'#fdb833'}
              style={[styles.TextInput, {flex: 1}]}
              onChangeText={e=> setSteps(e)}
            />
            <Text style={{fontSize: 20}}> Step </Text>
          </View>
        </View>
      </View>

      <View style={styles.BtnBox}>
        {NavigateBtn({navigation}, "Save", Submit, condittion, "#fdb833")}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    flex: 1,
    justifyContent: 'space-between'
  },
  box: {
    backgroundColor: "white",
    marginHorizontal: 20,
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 16,
    marginBottom: 20,
  },
  h1: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  boxContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginHorizontal: 50,
    alignItems: 'center'
  },
  boxx: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center'
  },
  TextInput: {
    borderBottomColor: '#fdb833',
    borderBottomWidth: 1,
    fontSize: 26,
    textAlign: "center",
    paddingVertical: 6,
  },
  BtnBox: {
    marginHorizontal: 20,
    marginBottom: 20
},
error: {
  color: "red",
  textAlign: "center",
  marginBottom: 20,
  fontWeight: 'bold',
}
  
  
})