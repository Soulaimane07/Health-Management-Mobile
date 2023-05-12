import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useContext, useEffect, useState } from 'react'
import { Image, TouchableOpacity } from 'react-native'
import { StyleSheet, Text, View } from 'react-native'
import { Calories } from '../../../Components/Calcules'
import Statusbar from '../../../Components/Statusbar'
import TargetLeftTaken from '../../../Components/TargetLeftTaken'
import { PracticeContext } from '../../../Components/Context' 
import { Nutrition, calorie } from '../../../Components/cal'

export default function CaloriesPage() {
  const {user} = useContext(PracticeContext)

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

  const caloriesFun = Calories(user?.CWeight, Number(user?.height?.X) * 100 + Number(user?.height?.Y), user?.age, user?.sex, user?.goal, user?.activity)

  const calories = [
    {
      "logo": require('../../../assets/calories/carbs1.png'),
      "title":"Carbs",
      "val": Nutrition(caloriesFun)?.carbs,
      "taken": (calorie(breakfast).carbs + calorie(lunch).carbs + calorie(snacks).carbs + calorie(dinner).carbs).toFixed(0),
      "color":"#da8c1a",
      "unit":"g"
    },
    {
      "logo": require('../../../assets/calories/eggs.png'),
      "title":"Protein",
      "val": Nutrition(caloriesFun)?.protein,
      "taken": (calorie(breakfast).protein + calorie(lunch).protein + calorie(snacks).protein + calorie(dinner).protein).toFixed(0),
      "color":"#a29167",
      "unit":"g"
    },
    {
      "logo": require('../../../assets/calories/fat1.png'),
      "title":"Fat",
      "val": Nutrition(caloriesFun)?.fat,
      "taken": (calorie(breakfast).fat + calorie(lunch).fat + calorie(snacks).fat + calorie(dinner).fat).toFixed(0),
      "color":"#25a164",
      "unit":"g"
    },
  ]

  useEffect(() => {
      getMeals();
  }, []) 

  const meals = [
    {
      "title":"Breakfast",
      "calories": breakfast !== null ? calorie(breakfast).cal : 0
    },
    {
      "title":"Lunch",
      "calories": lunch !== null ? calorie(lunch).cal : 0
    },
    {
      "title":"Snacks",
      "calories": snacks !== null ? calorie(snacks).cal : 0
    },
    {
      "title":"Dinner",
      "calories": dinner !== null ? calorie(dinner).cal : 0
    },
  ]

  const calorieSTarget = Calories(user?.CWeight, Number(user?.height?.X) * 100 + Number(user?.height?.Y), user?.age, user?.sex, user?.goal, user?.activity)
  const caloriesTaken = calorie(meals).cal



  const [Diets, setDiets] = useState([])
    
    const getDiet = async () => {
        try{
            const Diet = await AsyncStorage.getItem("Diets")
            console.log("==> Diet: ",Diet);
            setDiets(JSON.parse(Diet))
        }
        catch(e) {
            console.log(e);
        }
    }

    useEffect(()=> {
        getDiet()
    }, [])


    const DeleteDiet = async () => {
      await AsyncStorage.removeItem('Diets')
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
              <Text style={{marginBottom: 6}}> <Text style={{color: item.color}}> {item.taken} </Text> / {item.val} {item.unit} </Text>
            </View>
          ))}
        </View>
      </View>

      {Diets &&
        <View style={styles.box}>
          <Text style={styles.h1}> Diet </Text>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6, marginHorizontal: 40}}>
              <Text style={{fontWeight: 'bold', fontSize: 16}}> {Diets.title} </Text>
              <TouchableOpacity>
                <Text style={styles.button} onPress={DeleteDiet}> Delete </Text>
              </TouchableOpacity>
            </View>
        </View>
      }
      
      <View style={styles.box}>
        <Text style={styles.h1}> Meals </Text>
        {meals.map((item,key)=>(
          <View key={key} style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6, marginHorizontal: 40}}>
            <Text style={{fontWeight: 'bold', fontSize: 16}}> {item.title} </Text>
            <Text> {item.calories} Kcal </Text>
          </View>
        ))}
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
  },
  button: {
   color: "red" 
  }
})