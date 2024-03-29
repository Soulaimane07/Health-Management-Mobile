import { AppState, Button, Image, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { DateHeader } from '../../Components/Date'
import Statusbar from '../../Components/Statusbar'

import Ficon from 'react-native-vector-icons/Fontisto'
import Foicon from 'react-native-vector-icons/Foundation'
import Micon from 'react-native-vector-icons/MaterialCommunityIcons'

import {Calories, Steps, Water} from '../../Components/Calcules'
import { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { PracticeContext } from '../../Components/Context'
import { GetUser } from '../../Components/GetData'

import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Emotions from '../../Components/Emotions'
import AsyncStorage from '@react-native-async-storage/async-storage'

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
    const user = GetUser().user
    const {languageObj} = useContext(PracticeContext)

    const header = () => {
        const date = new Date().getHours()
        let datee = 0

        date >= 4 && date < 12 && ( datee = languageObj.home.header.morning )
        date >= 12 && date < 18 && ( datee = languageObj.home.header.afternoon )
        date >= 18 && date < 22 && ( datee = languageObj.home.header.evening )
        date >= 22  && ( datee = languageObj.home.header.night )

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
            "image":require(`../../assets/images/logged/meals/breakfast.webp`),
            "title": languageObj.home.box2.breakfast,
            "text":"Recommended 830 - 1170Cal",
            "path":"breakfast"
        },
        {
            "image":require(`../../assets/images/logged/meals/lunch.webp`),
            "title": languageObj.home.box2.lunch,
            "text":"Recommended 255 - 370Cal",
            "path":"lunch"
        },
        {
            "image":require(`../../assets/images/logged/meals/snacks.jpg`),
            "title": languageObj.home.box2.snacks,
            "text":"Recommended 830 - 1170Cal",
            "path":"snack"
        },
        {
            "image":require(`../../assets/images/logged/meals/dinner.jpg`),
            "title": languageObj.home.box2.dinner,
            "text":"Recommended 255 - 370Cal",
            "path":"dinner"
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

    let profile = 0

    const profiles = [
        {
          image: require("../../assets/images/logged/profiles/1.png"),
          width: 90,
          height: 90,
        },
        {
          image: require("../../assets/images/logged/profiles/2.png"),
          width: 88,
          height: 60,
        },
        {
          image: require("../../assets/images/logged/profiles/3.png"),
          width: 76,
          height: 80,
        },
        {
          image: require("../../assets/images/logged/profiles/4.png"),
          width: 90,
          height: 80,
        },
        {
          image: require("../../assets/images/logged/profiles/5.png"),
          width: 90,
          height: 80,
        },
        {
          image: require("../../assets/images/logged/profiles/6.png"),
          width: 80,
          height: 70,
        },
    ]

    let calories = 0
    let water

    user && (
        calories = Calories(Number(user?.CWeight), Number(user?.height?.X) * 100 + Number(user?.height?.Y), user?.age, user?.sex, user?.goal, user?.activity),
        water = Water(user?.CWeight),
        profile = user?.profile
    )


    const target = [
        {
            "color":"#fff0f3",
            "leftTitle": languageObj.home.box1.target1.target,
            "leftValue": calories?.toFixed(0),
            "unit":"Kcal",
            "icon": <Ficon name='fire' color="#e71d36" size={40} /> ,
            "rightTitle": languageObj.home.box1.target1.remaining,
            "rightValue": calories?.toFixed(0) - user?.calories,
            "path":"calories"
        },
        {
            "color":"#fff2b2",
            "leftTitle": languageObj.home.box1.target2.target,
            "leftValue": Steps(user?.goal),
            "icon": <Foicon name='foot' color="#fdb833" size={50} />,
            "rightTitle": languageObj.home.box1.target2.remaining,
            "rightValue": user?.steps ? Steps(user?.goal) - user?.steps : Steps(user?.goal),
            "path":"steps"
        },
        {
            "color":"#caf0f8",
            "leftTitle": languageObj.home.box1.target3.target,
            "leftValue": water,
            "unit":"ml",
            "icon": <Micon name='cup-water' color="#5390d9" size={50} />,
            "rightTitle": languageObj.home.box1.target3.remaining,
            "rightValue": user?.water ? water - user?.water  : water,
            "path":"water"
        }
    ]



    const refB = useRef(null)
    const snapPoints = useMemo(()=> ["46%"], [])
    const OpenModal = () => {
        refB.current?.present()
    }
    const CloseModal = () => {
        refB.current?.close()
        times = 0
    }


    let appState = useRef(AppState.currentState)
    const [appStateVisible, setAppStateVisible] = useState(appState.current)
    let times = 0

    useEffect(() => {
        const subscription = AppState.addEventListener('change', nextAppState => {
            if (
                appState.current.match(/inactive|background/) && nextAppState === 'active'
                ) {
                    console.log('App has come to the foreground!')
                    user.emotion == undefined && (times = times + 1)
            }
        
            appState.current = nextAppState;
            setAppStateVisible(appState.current);
            console.log('AppState', appState.current);
            console.log(times);
            times == 1 && user.emotion == undefined && OpenModal()
        });
        
        return () => {
            subscription.remove();
        };
    }, []);
    
    


  return (
    <GestureHandlerRootView style={{flex: 1}}>
    <BottomSheetModalProvider>
        <View style={styles.container}>
            <Statusbar color="white" style="dark-content" />
            <SafeAreaView style={styles.header}>
                <TouchableOpacity style={styles.profile} onPress={()=> navigation.navigate("accountStack", {screen: 'account'})}>
                    {user && <Image source={profiles[profile]?.image} style={[styles.logo ,{ width: profiles[profile]?.width, height: profiles[profile]?.height}]} />}
                    <Text style={styles.text}>{header()} {user && user.fname} </Text>
                </TouchableOpacity>
            </SafeAreaView>

            <ScrollView vertical={true}>
                <View style={styles.callendar}>
                <View style={styles.date}>
                    <Text style={styles.today}> Today,</Text>
                    <Text style={styles.day}> {date.getDate()} {getMonth()} {date.getFullYear()} </Text>
                </View>
                </View>

                <View style={styles.target}>
                <Text style={styles.targetText}> {languageObj.home.box1.title} </Text>
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
                <Text style={styles.Mtext}> {languageObj.home.box2?.title} </Text>
                <ScrollView contentOffset={{ x: scroll() }} horizontal={true} style={styles.boxs}>
                    {meals.map((item,key)=>(
                        <TouchableOpacity key={key} onPress={()=> navigation.navigate(item.path)}>
                        <ImageBackground source={item.image} resizeMode="cover" style={[styles.box, key+1 === meals.length && styles.lastBox]}>
                            <View style={styles.textBox}>
                                <Text style={styles.title}> {item.title} </Text>
                            </View>
                        </ImageBackground>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
                </View>


                <View style={{marginBottom: 50}}></View>
            </ScrollView>
        </View>

        <BottomSheetModal
            ref={refB}
            index={0}
            snapPoints={snapPoints}
        >
            <Emotions CloseModal={CloseModal} />
        </BottomSheetModal>
    </BottomSheetModalProvider>
    </GestureHandlerRootView>
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
      marginHorizontal: 20,
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



  state: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "red"
  },
  
})