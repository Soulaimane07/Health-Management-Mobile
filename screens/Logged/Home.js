import React, { useEffect, useState } from 'react'
import { Image, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { DateHeader } from '../../Components/Date'
import Statusbar from '../../Components/Statusbar'

import Ficon from 'react-native-vector-icons/Fontisto'
import Foicon from 'react-native-vector-icons/Foundation'
import Micon from 'react-native-vector-icons/MaterialCommunityIcons'
import AsyncStorage from '@react-native-async-storage/async-storage'

import {Calories, Steps, Water} from '../../Components/Calcules'

const months = [
  {
      'title':"Janvier"
  },
  {
      'title':"Fevrier"
  },
  {
      'title':"Mars"
  },
  {
      'title':"Avril"
  },
  {
      'title':"Mai"
  },
  {
      'title':"Juin"
  },
  {
      'title':"Juillet"
  },
  {
      'title':"Aout"
  },
  {
      'title':"Septembre"
  },
  {
      'title':"Octobre"
  },
  {
      'title':"Novembre"
  },
  {
      'title':"Decembre"
  },
]

export default function Home({route, navigation}) {

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

  const header = () => {
    const date = new Date().getHours()
    let datee = 0

    date >= 4 && date < 12 ? datee = "Morning" : ""
    date >= 12 && date < 18 ? datee = "Afternoon" : ""
    date >= 18 && date < 22 ? datee = "Evening" : ""
    date >= 22 || date < 4 ? datee = "Night" : ""

    return datee
  }

  const date = new Date()
  const getMonth = () => {
    let month

    months.map((item,key)=>(
        key === date.getMonth() ? month = item.title : ""
    ))

    return month
  }

  const meals = [
    {
        "image":require(`../../assets/breakfast.webp`),
        "title":"Breakfast",
        "text":"Recommended 830 - 1170Cal",
        "path":""
    },
    {
        "image":require(`../../assets/lunch.webp`),
        "title":"Lunch",
        "text":"Recommended 255 - 370Cal",
        "path":""
    },
    {
        "image":require(`../../assets/snacks.jpg`),
        "title":"Snack",
        "text":"Recommended 830 - 1170Cal",
        "path":""
    },
    {
        "image":require(`../../assets/dinner.jpg`),
        "title":"Dinner",
        "text":"Recommended 255 - 370Cal",
        "path":""
    },
  ]

  const scroll = () => {
    let x
    header() === "Morning" ? x = 0 : ""
    header() === "Afternoon" ? x = 305 : ""
    header() === "Evening" ? x = 625 : ""
    header() === "Night" ? x = 1000 : ""

    return x
  }

  const profileNbr = user?.profile ? user?.profile : 0

  const profiles = [
    {
      image: require("../../assets/profiles/1.png"),
      width: 90,
      height: 90,
    },
    {
      image: require("../../assets/profiles/2.png"),
      width: 88,
      height: 60,
    },
    {
      image: require("../../assets/profiles/3.png"),
      width: 76,
      height: 80,
    },
    {
      image: require("../../assets/profiles/4.png"),
      width: 90,
      height: 80,
    },
    {
      image: require("../../assets/profiles/5.png"),
      width: 90,
      height: 80,
    },
    {
      image: require("../../assets/profiles/6.png"),
      width: 80,
      height: 70,
    },
  ]

  const calories = Calories(user?.weight, Number(user?.height?.x) * 100 + Number(user?.height?.y), user?.age, user?.sex, user?.goal, user?.activity)
  const water = Water(user?.weight)

  const target = [
    {
        "color":"#fff0f3",
        "leftTitle": "Target Calories",
        "leftValue": calories?.toFixed(0),
        "unit":"Kcal",
        "icon": <Ficon name='fire' color="#e71d36" size={40} /> ,
        "rightTitle": "Calories consumed",
        "rightValue": 0,
        "path":"calories"
    },
    {
        "color":"#fff2b2",
        "leftTitle": "Target Steps",
        "leftValue": Steps(user?.goal) ,
        "icon": <Foicon name='foot' color="#fdb833" size={50} />,
        "rightTitle": "Finished Steps",
        "rightValue": user?.steps ? user?.steps : 0,
        "path":"steps"
    },
    {
        "color":"#caf0f8",
        "leftTitle": "Target Water",
        "leftValue": water,
        "unit":"ml",
        "icon": <Micon name='cup-water' color="#5390d9" size={50} />,
        "rightTitle": "Water consumed",
        "rightValue": 0,
        "path":"water"
    }
  ]

  return (
    <View style={styles.container}>
      <Statusbar color="white" style="dark-content" />
      <SafeAreaView style={styles.header}>
        <TouchableOpacity style={styles.profile} onPress={()=> navigation.navigate("account")}>
            <ImageBackground source={profiles[profileNbr].image}  style={[styles.logo ,{ width: profiles[profileNbr].width, height: profiles[profileNbr].height}]}>
            </ImageBackground>
            <Text style={styles.text}>Good {header()} {user && user.fname} </Text>
        </TouchableOpacity>
      </SafeAreaView>

      <ScrollView vertical={true}>
        <View style={styles.callendar}>
          <View style={styles.date}>
              <Text style={styles.today}> Today,</Text>
              <Text style={styles.day}> {date.getDate()} {getMonth()} {date.getFullYear()} </Text>
          </View>
          {DateHeader()}
        </View>

        <View style={styles.target}>
          <Text style={styles.targetText}> Today's Target </Text>
          {target.map((item,key)=>(
              <TouchableOpacity key={key} onPress={()=> navigation.navigate(item.path)} style={{ marginVertical: 6, alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', borderRadius: 16, padding: 20, backgroundColor: item.color}}>
                  <View>
                      <Text style={styles.boxtitle1}> {item.leftTitle} </Text>
                      <Text style={styles.boxtitle2}> {item.leftValue} {item.unit} </Text>
                  </View>
                  {item.icon}
                  <View>
                      <Text style={styles.boxtitle1}> {item.rightTitle} </Text>
                      <Text style={styles.boxtitle2}> {item.rightValue} {item.unit} </Text>
                  </View>
              </TouchableOpacity>
          ))}
        </View>

        <View style={styles.meals}>
          <Text style={styles.Mtext}> Today's Meals </Text>
          <ScrollView contentOffset={{ x: scroll() }}  horizontal={true} style={styles.boxs}>
              {meals.map((item,key)=>(
                  <ImageBackground source={item.image} resizeMode="cover" style={[styles.box, key+1 === meals.length && styles.lastBox]} key={key}>
                      <View style={styles.textBox}>
                          <Text style={styles.title}> {item.title} </Text>
                      </View>
                  </ImageBackground>
              ))}
          </ScrollView>
        </View>

        <View style={[styles.target]}>
            <Text style={styles.targetText}> Today's Workout </Text>
            <ImageBackground style={styles.workout} source={require(`../../assets/workout.webp`)} resizeMode="cover">
                <View style={styles.textBox}>
                    <Text style={styles.title}> Day 01 </Text>
                </View>
            </ImageBackground>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      position: 'relative',
  },
  header: {
      backgroundColor: "white",
      padding: 20,
      paddingVertical: 10,
      flexDirection: "row",
      justifyContent: 'space-between',
      alignItems: 'center',
      borderRadius: 8,
  },
  text: {
      fontSize: 20,
      color: "black",
  },
  logo: {
      width: 50,
      height: 50,
      marginRight: 10,
  },

    profile: {
      flexDirection: "row",
      alignItems: 'center',  
      width: "100%"    
  },

  callendar: {
      backgroundColor: "white",
      marginTop: 10,
      padding: 20,
  },
  date: {
      flexDirection: "row",
  },
  today: {
      color: "#3FC495",
      fontWeight: 'bold',
      fontSize: 16,
  },
  day: {
      fontWeight: 'bold',
      fontSize: 16,
  },

  target: {
      backgroundColor: "white",
      padding: 20,
      marginTop: 10,
  },
  targetText: {
      fontWeight: 'bold',
      fontSize: 16,
      marginBottom: 10,
  },
  boxtitle1: {
      fontSize: 10,
      textAlign: 'center',
      marginBottom: 6,
      color: "#adb5bd",
  },
  boxtitle2: {
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
  },

  meals: {
      backgroundColor: 'white',
      marginTop: 10,
      paddingVertical: 20,
  },
  Mtext: {
      fontWeight: 'bold',
      fontSize: 16,
      marginBottom: 10,
      marginLeft: 20,
  },
  boxs: {
      paddingLeft: 20,
  },
  box: {
      padding: 80,
      borderRadius: 16,
      marginBottom: 10,
      width: 310,
      marginRight: 10,
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
  },
  lastBox: {
      marginRight: 50,
  },
  textBox: {
      backgroundColor: "#f0fff1",
      width: 260,
      borderRadius: 8,
      padding: 10,
      position: 'absolute',
      bottom: 10,
      alignItems: 'center'
  },
  title: {
      fontSize: 20,
      fontWeight: 'bold',
  },

  workout: {
      padding: 100,
      borderRadius: 16,
      overflow: 'hidden',
      alignItems: 'center',
  },


  headd: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
  },
  headText: {
      color: "#3FC495",
  },

})