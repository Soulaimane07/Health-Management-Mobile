import { View, Text, StyleSheet } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { NavigateBtn } from '../../../Components/Buttons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Statusbar from '../../../Components/Statusbar'
import { Video } from 'expo-av';
import TargetLeftTaken from '../../../Components/TargetLeftTaken'
import {Steps} from '../../../Components/Calcules'
import VerrifiedModal from '../../../Components/VerrifiedModal'
import { PracticeContext } from '../../../Components/Context'

// import ActivityRings from "react-native-activity-rings";  
// import { ProgressChart } from 'react-native-chart-kit'

export default function StepsPage() {
  const [steps, setSteps] = useState(null)
  const [visible, setVisible] = useState(false)

  const {user} = useContext(PracticeContext) 

  const condittion = steps > 0
  const oldStep = user?.steps ? Number(user?.steps) : 0

  const Stepsobj = {
    steps : Number(steps) + oldStep
  } 

  const Submit = async () => {
    try {
      await AsyncStorage.mergeItem("user", JSON.stringify(Stepsobj))
      console.log("User's steps is stored!")
      setVisible(true)
      setSteps(null)
      getUser()
    } catch (e) {
      console.log("not stored");
    }
  }
  const video = React.useRef(null);

  
  
  const data = {
    labels: ["Swim", "Bike", "Run"], // optional
    data: [0.4, 0.6, 0.8]
  };

  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
  };

  return (
    <View style={styles.container}>
      <Statusbar color="#fdb833" style="light" />
      <View>
        <View style={styles.box}>
          <Video
            ref={video}
            style={styles.video}
            source={require('../../../assets/videos/steps.mp4')}
            resizeMode="contain"
            isLooping
            isMuted
            shouldPlay= {true}
          />
          <TargetLeftTaken title={"Steps"} target={Steps(user?.goal)} taken={user?.steps ? user?.steps : 0} unit={"Step"} color="#fdb833" />
        </View>

        {/* <ActivityRings data={activityData} config={activityConfig} /> */}

        <View style={styles.box}>
          <Text style={styles.h1}>Steps number</Text>
          
          {steps == 0 && <Text style={styles.error}> Steps number can not be null (0) </Text>}
          {steps < 0 && <Text style={styles.error}> Steps number can not be negative </Text>}
          {steps !== null && steps > 0 && <Text style={styles.good}> Taken Steps will be {oldStep + Number(steps)} </Text>}
          
          <View style={styles.boxContent}>
            <TextInput 
              keyboardType='numeric'
              selectionColor={'#fdb833'}
              style={[styles.TextInput, {flex: 1}]}
              onChangeText={e=> setSteps(e)}
              value={steps}
            />
            <Text style={{fontSize: 20}}> Step </Text>
          </View>
          <Text style={styles.h2}>the number you will enter will be added to your taken steps!</Text>
        </View>
      </View>

      {/* <ProgressChart
  data={data}
  width={200}
  height={220}
  strokeWidth={16}
  radius={32}
  chartConfig={chartConfig}
  hideLegend={false}
/> */}

      <View style={styles.BtnBox}>
        {NavigateBtn("Save", Submit, condittion, "#fdb833")}
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
    borderBottomColor: '#fdb833',
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
    color: "#fdb833",
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