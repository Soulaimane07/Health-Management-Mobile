import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/Feather';
import * as Progress from 'react-native-progress';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

    const recommendations = [
        {
            "title":"Calories",
            "val":1062,
            "mesure":"Kcal",
            "proVal":1,
            "color":"#3FC495",
        },
        {
            "title":"Carbs",
            "val":50,
            "mesure":"%",
            "proVal":0.5,
            "color":"#F99417",
        },
        {
            "title":"Fat",
            "val":30,
            "mesure":"%",
            "proVal":0.3,
            "color":"#645CBB",
        },
        {
            "title":"Protein",
            "val":20,
            "mesure":"%",
            "proVal":0.2,
            "color":"#F48484",
        }
    ]

    const Login = () => {
        console.log("User Logged in");
        route.params.setLogged(true)
        navigation.navigate('home')
    }

  return (
    !show 
    ?
        <ImageBackground source={require("../../../assets/finish/finish.png")} style={styles.container}>
            <Text style={styles.text1}>We're setting everything up for you</Text>
            <Text style={styles.text2}>Creating your personal recommendations...</Text>
            <ActivityIndicator style={styles.spinner} size="large" color="#3FC495" />
        </ImageBackground>
    :
        <>
            <ScrollView vertical={true} style={styles.started}>
                <View style={styles.header}>
                    <View style={styles.iconbtn}>
                        <Icon style={styles.icon} name="check" size={24} color="white" />
                    </View>
                </View>
                <Text style={styles.text3}> {user.fname}, your personalized health plan is ready! </Text>

                <View style={styles.box}>
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
        bottom: 60,  
    },
    text1: {
        fontSize: 28,
        paddingHorizontal: 50, 
        textAlign: 'center'
    },
    text2: {
        textAlign: 'center',
        marginVertical: 20,
        marginBottom: 30,
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
        marginVertical: 10,
        marginBottom: 20,
        paddingHorizontal: 40,
        fontSize: 24,
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
    }
})