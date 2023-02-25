import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { NavigateBtn } from '../../../Components/Buttons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Statusbar from '../../../Components/Statusbar'
import { Video } from 'expo-av';
import TargetLeftTaken from '../../../Components/TargetLeftTaken'
import { Water } from '../../../Components/Calcules'
import VerrifiedModal from '../../../Components/VerrifiedModal'

export default function Steps() {
  const [steps, setSteps] = useState(null)
  const [user, setUser] = useState("null")
  const [visible, setVisible] = useState(false)

  async function getUser(){
    const value = await AsyncStorage.getItem('user')
    const val = JSON.parse(value)
    if(value !== null) {
        console.log(value);
        setUser(val)
    }
  }

  useEffect(() => {
    getUser();
  }, []) 

  const condittion = steps > 0
  const oldWater = user?.water ? Number(user?.water) : 0

  const Steps = {
    water : Number(steps) + oldWater
  } 

  const Submit = async () => {
    try {
      await AsyncStorage.mergeItem("user", JSON.stringify(Steps))
      console.log("User's steps is stored!")
      setVisible(true)
      setSteps(null)
      getUser()
    } catch (e) {
      console.log("not stored");
    }
  }

  const video = React.useRef(null);

  return (
    <View style={styles.container}>
      <Statusbar color="#5390d9" style="light" />
      <View>
        <View style={styles.box}>
          <Video
            ref={video}
            style={styles.video}
            source={require('../../../assets/videos/water.mp4')}
            resizeMode="contain"
            isLooping
            isMuted
            shouldPlay= {true}
          />
          <TargetLeftTaken title={"Water"} target={Water(user?.weight)} taken={user?.water ? user?.water : 0} unit={"ml"} color="#5390d9" />
        </View>

        <View style={styles.box}>
          <Text style={styles.h1}>Water consumption</Text>
          {steps == 0 && <Text style={styles.error}> Water number can not be null (0) </Text>}
          {steps < 0 && <Text style={styles.error}> Water number can not be negative </Text>}
          {steps !== null && steps > 0 && <Text style={styles.good}> Taken Steps will be {oldWater + Number(steps)} </Text>}

          <View style={styles.boxContent}>
            <TextInput 
              keyboardType='numeric'
              selectionColor={'#5390d9'}
              style={[styles.TextInput, {flex: 1}]}
              onChangeText={e=> setSteps(e)}
              value={steps}
            />
            <Text style={{fontSize: 20}}> ml </Text>
          </View>
          <Text style={styles.h2}>the number you will enter will be added to your taken Water !</Text>
        </View>
      </View>

      <VerrifiedModal visible={visible} setVisible={setVisible} />

      <View style={styles.BtnBox}>
        {NavigateBtn("Save", Submit, condittion, "#5390d9")}
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
    alignItems: 'center',
    marginVertical: 30,
  },
  boxx: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center'
  },
  TextInput: {
    borderBottomColor: '#5390d9',
    borderBottomWidth: 1,
    fontSize: 26,
    textAlign: "center",
    paddingVertical: 6,
  },
  BtnBox: {
    marginHorizontal: 20,
  },
  error: {
    color: "red",
    textAlign: "center",
    marginBottom: 20,
    fontWeight: 'bold',
  },
  good: {
    color: "#5390d9",
    textAlign: "center",
    marginBottom: 20,
    fontWeight: 'bold',
  },
  video: {
    width: "100%",
    height: 160,
    marginBottom: 20,
  },
  h2: {
    textAlign: 'center',
    fontSize: 12,
    color: "#686D76"
  }
  
  
})