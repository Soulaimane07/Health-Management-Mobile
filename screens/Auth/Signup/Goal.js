import React, { useState } from 'react'
import { StyleSheet, Text, View} from 'react-native';
import { NavigateBtn } from '../../../Components/Buttons';
import { Progress } from '../../../Components/Headers';

export default function Goal({navigation}) {
  const [box, setBox] = useState(null)
  const condittion = box === null

  const goal = [
    {
      "title":"Lose Weight",
      "value":"l"
    },
    {
      "title":"Maintain Weight",
      "value":"m"
    },
    {
      "title":"Gain Weight",
      "value":"g"
    },
  ]

  return (
    <View style={styles.container}>
      {Progress({navigation}, 0)}
      
      <View style={styles.boxs}>
        {goal.map((item,key)=>(
          <Text onPress={()=> setBox(key)} style={box === key ? styles.active : styles.box} key={key}>{item.title}</Text>
        ))}
      </View>

      {NavigateBtn({navigation}, "Next", "sex", condittion)}
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