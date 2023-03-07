import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useContext, useState } from 'react'
import { ScrollView, StyleSheet, Text, View} from 'react-native';
import { NavigateBtn } from '../../../Components/Buttons';
import { PracticeContext } from '../../../Components/Context';
import { Progress } from '../../../Components/Headers';
import Statusbar from '../../../Components/Statusbar';

export default function Goal({navigation}) {
  const {languageObj} = useContext(PracticeContext)
  let header = languageObj?.signup.active

  const [box, setBox] = useState(null)
  const condittion = box !== null

  const goals = [
    {
      "title": header.sedentary,
      "val":"Sédentaire",
    },
    {
      "title": header.slightly,
      "val":"Légèrement actif",
    },
    {
      "title": header.moderately,
      "val":"Modérément actif",
    },
    {
      "title": header.very,
      "val":"Très actif",
    },
  ]

  const goal = {
    activity: box !== null && goals[box].val
  }

  const Submit = async () => {
    try {
      await AsyncStorage.mergeItem('user', JSON.stringify(goal))
      console.log("Activity is stored");
      navigation.navigate('finish')
    } catch (e) {
      console.log("Activity isn't stored");
    }
  }

  return (
    <View style={styles.container}>
      <Statusbar color="#f2f2f2" />

      {Progress({navigation}, header, 7)}
      
      <ScrollView vertical style={styles.boxs}>
        {goals.map((item,key)=>(
          <Text onPress={()=> setBox(key)} style={[key+1 == goals.length && {marginBottom: 40} ,box === key ? styles.active : styles.box]} key={key}>{item.title}</Text>
        ))}
      </ScrollView>

      <View style={styles.BtnBox}>
        {NavigateBtn(header.finish, Submit, condittion)}
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