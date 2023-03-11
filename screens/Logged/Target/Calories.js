import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useContext, useEffect, useState } from 'react'
import { Button, Image } from 'react-native'
import { StyleSheet, Text, View } from 'react-native'
import { Calories } from '../../../Components/Calcules'
import Statusbar from '../../../Components/Statusbar'
import TargetLeftTaken from '../../../Components/TargetLeftTaken'
import { PracticeContext } from '../../../Components/Context' 
import { calorie } from '../../../Components/cal'
import { NavigateBtn } from '../../../Components/Buttons'

export default function CaloriesPage() {
  const {user} = useContext(PracticeContext)

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

  const [breakfast, setBreakfast] = useState([])
  const [lunch, setLunch] = useState([])
  const [snacks, setSnacks] = useState([])
  const [dinner, setDinner] = useState([])

  async function getMeals(){
    const breakfast = await AsyncStorage.getItem('breakfast')
    const lunch = await AsyncStorage.getItem('lunch')
    const snacks = await AsyncStorage.getItem('snacks')
    const dinner = await AsyncStorage.getItem('dinner')

    const val = JSON.parse(breakfast)
    const val2 = JSON.parse(lunch)
    const val3 = JSON.parse(snacks)
    const val4 = JSON.parse(dinner)
    
    breakfast !== null ? setBreakfast(val) : setBreakfast([])
    lunch !== null ? setLunch(val2) : setLunch([])
    snacks !== null ? setSnacks(val3) : setSnacks([])
    dinner !== null ? setDinner(val4) : setDinner([])
  }

  useEffect(() => {
      getMeals();
  }, []) 

  const meals = [
    {
      "title":"Breakfast",
      "cal": breakfast !== null ? calorie(breakfast).cal : 0
    },
    {
      "title":"Lunch",
      "cal": lunch !== null ? calorie(lunch).cal : 0
    },
    {
      "title":"Snacks",
      "cal": snacks !== null ? calorie(snacks).cal : 0
    },
    {
      "title":"Dinner",
      "cal": dinner !== null ? calorie(dinner).cal : 0
    },
  ]

  const calorieSTarget = Calories(user?.weight, Number(user?.height?.x) * 100 + Number(user?.height?.y), user?.age, user?.sex, user?.goal, user?.activity)
  const caloriesTaken = calorie(meals).cal

  const Submit = async () => {
    try {
      let calories = {
        calories : 0,
      }

      await AsyncStorage.mergeItem('user', JSON.stringify(calories))

      let keys = ['breakfast', 'lunch', 'snacks', 'dinner'];
      AsyncStorage.multiRemove(keys, err => {
        console.log(err);
      });
      console.log("success");
    } catch(e){
      console.log(e);
    }
  }

  return (
    <View style={styles.container}>
      <Statusbar color="#e71d36" style="light" />
      <View style={styles.box}>
          <TargetLeftTaken title={"Calories"} taken={caloriesTaken} target={calorieSTarget} unit={"Kcal"} color="#e71d36" />
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
      
      <View style={styles.box}>
        <Text style={styles.h1}> Meals </Text>
        {meals.map((item,key)=>(
          <View key={key} style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6, marginHorizontal: 40}}>
            <Text style={{fontWeight: 'bold', fontSize: 16}}> {item.title} </Text>
            <Text> {item.cal} Kcal </Text>
          </View>
        ))}
      </View>

      <View style={styles.btn}>
        {NavigateBtn("Delete", Submit, true, "red")}
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
  },

  h1: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },


  btn: {
    paddingHorizontal: 20,
  }
})