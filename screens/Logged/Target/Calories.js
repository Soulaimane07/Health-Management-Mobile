import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'
import { Image } from 'react-native'
import { StyleSheet, Text, View } from 'react-native'
import { Calories } from '../../../Components/Calcules'
import Statusbar from '../../../Components/Statusbar'

export default function CaloriesPage() {

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

  const calorieSTarget = Calories(user?.weight, Number(user?.height?.x) * 100 + Number(user?.height?.y), user?.age, user?.sex, user?.goal, user?.activity)
  const caloriesTaken = 0

  const options = [
    {
      "title":"Taken",
      "val": caloriesTaken
    },
    {
      "title":"Target",
      "val": calorieSTarget?.toFixed(0),
      "unit":"Kcal"
    },
    {
      "title":"Left",
      "val":  calorieSTarget?.toFixed(0)-caloriesTaken,
      "color":"#e71d36"
    },
  ]

  const caloriesFun = Calories(user?.weight, Number(user?.height?.x) * 100 + Number(user?.height?.y), user?.age, user?.sex, user?.goal, user?.activity)

  const calories = [
    {
      "logo": require('../../../assets/calories/carbs1.png'),
      "title":"Carbs",
      "val": (((caloriesFun*50)/100)/4).toFixed(2),
      "unit":"g"
    },
    {
      "logo": require('../../../assets/calories/eggs.png'),
      "title":"Protein",
      "val": (((caloriesFun*20)/100)/4).toFixed(2),
      "unit":"g"
    },
    {
      "logo": require('../../../assets/calories/fat1.png'),
      "title":"Fat",
      "val": (((caloriesFun*30)/100)/9).toFixed(2),
      "unit":"g"
    },
  ]
  

  return (
    <View style={styles.container}>
      <Statusbar color="#e71d36" style="light" />
      <View style={styles.box}>
        <Text style={styles.h1}> Calories </Text>
        <View style={styles.boxContent}>
          {options.map((item,key)=>(
            <View key={key} style={[styles.boxx, key == 1 && {borderLeftWidth: 0.4, borderRightWidth: 0.4,}]}>
              <Text style={{fontWeight: 'bold', marginBottom: 10}}> {item.title} </Text>
              <Text style={{color: item.color}}> {item.val} {item.unit} </Text>
            </View>
          ))}
        </View>
      </View>
      
      <View style={styles.box}>
        <View style={styles.boxContent}>
          {calories.map((item,key)=>(
            <View key={key} style={styles.boxx}>
              <Image source={item.logo} />
              <Text style={{fontWeight: 'bold', marginBottom: 10}}> {item.title} </Text>
              <Text> {item.val} {item.unit} </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
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
    fontSize: 26,
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: "bold",
  },
  boxContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  boxx: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center'
  }
  
})