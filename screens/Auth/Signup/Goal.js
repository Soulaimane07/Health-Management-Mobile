import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react'
import { StyleSheet, Text, View} from 'react-native';
import { NavigateBtn } from '../../../Components/Buttons';
import { Progress } from '../../../Components/Headers';
import Statusbar from '../../../Components/Statusbar';

export default function Goal({navigation}) {
  const [box, setBox] = useState(null)
  const condittion = box !== null

  const goals = [
    {
      "title":"Lose Weight",
    },
    {
      "title":"Maintain Weight",
    },
    {
      "title":"Gain Weight",
    },
  ]

  const goal = {
    goal: box !== null && goals[box].title
  }

  const Submit = async () => {
    try {
      await AsyncStorage.mergeItem('user', JSON.stringify(goal))
      console.log("goal is stored");
      navigation.navigate('sex')
    } catch (e) {
      console.log("goal isn't stored");
    }
  }

  return (
    <View style={styles.container}>
      <Statusbar color="#f2f2f2" />

      {Progress({navigation}, 0)}
      
      <View style={styles.boxs}>
        {goals.map((item,key)=>(
          <Text onPress={()=> setBox(key)} style={box === key ? styles.active : styles.box} key={key}>{item.title}</Text>
        ))}
      </View>

      <View style={styles.BtnBox}>
        {NavigateBtn({navigation}, "Next", Submit, condittion)}
      </View>
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
  },
  BtnBox: {
    marginHorizontal: 20,
    marginBottom: 20
  }
})