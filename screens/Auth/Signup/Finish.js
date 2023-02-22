import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon1 from 'react-native-vector-icons/Feather';
import * as Progress from 'react-native-progress';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Calories, IMC} from '../../../Components/Calcules';
import { Video } from 'expo-av';
import StatusBar from '../../../Components/Statusbar';

export default function Finish({route, navigation}) {
    const [show, setShow] = useState(false)
    const [user, setUser] = useState("null")

    const unit = user?.system === "eu" ? "Kg" : "Lbs"

    useEffect(() => {
        setTimeout(() => {
            setShow(true)
        }, 3000)

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

    const Reachs = [
        {
            "image":require('../../../assets/finish/1.webp'),
            "text":"Track your food"
        },
        {
            "image":require('../../../assets/finish/2.png'),
            "text":"Follow your daily calorie recommendation"
        },
        {
            "image":require('../../../assets/finish/3.png'),
            "text":"Balance your intake of carbs, protein, fat, and dietary fiber"
        },
        {
            "image":require('../../../assets/finish/4.jpg'),
            "text":"Stay hydrated and track water intake"
        },
        {
            "image":require('../../../assets/finish/5.jpg'),
            "text":"Log your progress by updating your weight or body measurements"
        },
    ]

    const calories = Calories(user?.weight, Number(user?.height?.x) * 100 + Number(user?.height?.y), user?.age, user?.sex, user?.goal, user?.activity)

    const recommendations = [
        {
            "title":"Calories",
            "val": calories?.toFixed(2) ,
            "mesure":"Kcal",
            "proVal":1,
            "color":"#3FC495",
        },
        {
            "title":"Carbs",
            "val": (((calories*50)/100)/4).toFixed(2) ,
            "mesure":"g",
            "proVal":0.5,
            "color":"#F99417",
        },
        {
            "title":"Fat",
            "val": (((calories*30)/100)/9).toFixed(2),
            "mesure":"g",
            "proVal":0.3,
            "color":"#645CBB",
        },
        {
            "title":"Protein",
            "val": (((calories*20)/100)/4).toFixed(2),
            "mesure":"g",
            "proVal":0.2,
            "color":"#F48484",
        }
    ]

    const Login = () => {
        console.log("User Logged in");
        route.params.setLogged(true)
        navigation.navigate('home')
    }

    const video = React.useRef(null);

  return (
    !show 
    ?
        <ImageBackground source={require("../../../assets/finish/image1.jpg")} style={styles.container}>
            <StatusBar color="transparent" style="dark-content" />
            <Text style={styles.text1}>We're setting everything up for you</Text>
            <Text style={styles.text2}>Creating your personal recommendations...</Text>
            <ActivityIndicator style={styles.spinner} size="large" color="#3FC495" />
        </ImageBackground>
    :
        <>
            <ScrollView vertical={true} style={styles.started}>
                <View style={styles.header}>
                    <Video
                        ref={video}
                        style={styles.video}
                        source={require('../../../assets/finish/verification.mp4')}
                        resizeMode="contain"
                        shouldPlay= {true}
                        isMuted
                    />
                </View>

                <View style={styles.box}>
                    <Text style={styles.text3}> {user.fname}, your personalized health plan is ready! </Text>
                    <View style={styles.box1}>
                        {user.goal === "Maintain Weight" ?
                            <Text style={styles.text4}> {user.weight} </Text>
                        :
                            <>
                                <Text style={styles.text4}> {user.weight} {unit} </Text>
                                <Icon1 style={styles.icon1} name={user.goal === "Lose Weight" ? "trending-down" : "trending-up"} size={34} color="#3FC495" />
                                <Text style={styles.text4}> {user.Gweight} {unit} </Text>
                            </>
                        }
                    </View>
                    <Text style={styles.text5}> Follow your recommendations and you will reach your goal. </Text>
                </View>

                <View style={styles.box}>
                    <Text style={styles.boxHeader}>Indice de masse corporelle (IMC)  </Text>
                    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                        <Text style={{color: IMC(user).color, marginRight: 10, fontWeight: 'bold'}}>{IMC(user).imc}</Text>
                        <Text style={{color: IMC(user).color, fontWeight: 'bold'}}> {IMC(user).title} </Text>
                    </View>
                </View>
                
                <View style={styles.box}>
                    <Text style={styles.boxHeader}> Daily nutritional recommendations </Text>
                    <Text style={styles.boxHeader1}> You can edit this anytime in the app </Text>
                    {recommendations.map((item,key)=>(
                        <View style={styles.row1} key={key}>
                            <View style={styles.box2}>
                                <Text> {item.title} </Text>
                                <Text> {item.val} {item.mesure} </Text>
                            </View>
                            <Progress.Bar 
                                progress={item.proVal} 
                                unfilledColor="#f2f2f2" 
                                color={item.color} 
                                animated={true} 
                                width={300}
                                height={10}
                                borderWidth={0}
                            />
                        </View>
                    ))}
                </View>

                <View style={[styles.box, {marginBottom: 160}]}>
                    <Text style={styles.boxHeader}> How to reach your goals </Text>
                    {Reachs.map((item,key)=>(
                        <View key={key}>
                        <View style={styles.row}>
                            <Image style={{width: 80, height: 80, marginRight: 20,}} source={item.image} />
                            <Text style={{width: "70%"}}> {item.text} </Text>
                        </View>
                        {key+1 !== Reachs.length && <View style={styles.hairline} /> }
                        </View>
                    ))}
                </View>
            </ScrollView>

            <View style={styles.btn}>
                <TouchableOpacity style={styles.button} onPress={()=> Login()}>
                    <Text style={styles.buttonText}> GET STARTED </Text>
                </TouchableOpacity>
            </View>
        </>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-end",
        paddingBottom: 60,  
    },
    text1: {
        fontSize: 28,
        paddingHorizontal: 50, 
        textAlign: 'center',
        color: "white",
    },
    text2: {
        textAlign: 'center',
        marginVertical: 20,
        marginBottom: 30,
        color: "white",
    },

    started: {
        flex: 1,
        paddingTop: 60,
        paddingBottom: 100,
        paddingVertical: 100,
    },
    iconbtn: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        backgroundColor: "#3FC495",
        padding: 10,
        borderRadius: 100,
    },
    text3: {
        marginBottom: 30,
        fontSize: 20,
        textAlign: 'center'
    },


    box: {
        backgroundColor: "white",
        marginHorizontal: 20,
        marginVertical: 10,
        borderRadius: 16,
        padding: 20,
    },
    box1: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 20,
    },
    icon1: {
        marginHorizontal: 10,
    },
    text4: {
        fontSize: 30,
    },
    text5: {
        marginTop: 20,
        fontSize: 13,
        textAlign: 'center',
    },

    btn: {
        position: 'absolute',
        bottom: 0,
        width: "100%",
        backgroundColor: '#f2f2f2',
    },  
    button: {
        borderRadius: 16,
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#3FC495",
        margin: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    },


    boxHeader: {
        textAlign: 'center',
        fontSize: 22,
        marginBottom: 10,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        overflow: "hidden",
    },

    hairline: {
        backgroundColor: '#E8E2E2',
        height: 1,
        marginVertical: 10,
    },
    row1: {
        marginVertical: 8,
    },
    box2: {
        justifyContent: 'space-between',
        flexDirection: "row",
        marginBottom: 2,
    },
    boxHeader1: {
        textAlign: 'center',
        marginBottom: 20,
    },

    header: {
        backgroundColor: "white",
        marginHorizontal: 20,
        borderRadius: 16
    },
    video: {
        width: "100%",
        height: 100,
      }
})