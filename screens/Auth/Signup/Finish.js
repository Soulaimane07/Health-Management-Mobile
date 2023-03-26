import React, { useContext, useEffect, useState } from 'react'
import { ActivityIndicator, Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon1 from 'react-native-vector-icons/Feather';
import * as Progress from 'react-native-progress';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Calories, IMC} from '../../../Components/Calcules';
import { Video } from 'expo-av';
import StatusBar from '../../../Components/Statusbar';
import { PracticeContext } from '../../../Components/Context';
import axios from 'axios';

export default function Finish({route, navigation}) {
    const {languageObj} = useContext(PracticeContext)

    const [show, setShow] = useState(false)
    const [user, setUser] = useState("null")

    const unit = user?.system === "eu" ? "Kg" : "Lb"

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
            "image":require('../../../assets/images/auth/finish/1.webp'),
            "text": languageObj?.signup.finish.getStarted.box4.details.text1
        },
        {
            "image":require('../../../assets/images/auth/finish/2.png'),
            "text": languageObj?.signup.finish.getStarted.box4.details.text2
        },
        {
            "image":require('../../../assets/images/auth/finish/3.png'),
            "text": languageObj?.signup.finish.getStarted.box4.details.text3
        },
        {
            "image":require('../../../assets/images/auth/finish/4.jpg'),
            "text": languageObj?.signup.finish.getStarted.box4.details.text4
        },
        {
            "image":require('../../../assets/images/auth/finish/5.jpg'),
            "text": languageObj?.signup.finish.getStarted.box4.details.text5
        },
    ]

    const calories = Calories(user?.CWeight, Number(user?.height?.X) * 100 + Number(user?.height?.Y), user?.age, user?.sex, user?.goal, user?.activity)

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
        try {
            axios.post('https://health-manager.onrender.com/usersDetails', {
                userId: user._id,
                goal: user.goal,
                sex: user.sex,
                profile: user.profile,
                system: user.system,
                age: Number(user.age),
                height: user.height,
                CWeight: user.CWeight,
                GWeight: user.GWeight,
                activity: user.activity
            })
            .then(function (response) {
                console.log("==> UserDetails Created: ", response.data);
                
                const otherData = {
                    userId: user._id,
                    calories: 0,
                    steps: 0,
                    water: 0
                }

                AsyncStorage.mergeItem('user', JSON.stringify(otherData))

                console.log("User Logged in");
                route.params.setLogged(true)
                navigation.navigate("homeStack", {screen: 'home'})
            })
            .catch(function (error) {
                console.log("==> Error: ",error);
            });
        } catch (e) {
            console.log("User info isn't stored: ", e);
        }
    }

    const video = React.useRef(null);

    const IMCData = [
        {
            "title": languageObj?.signup.finish.getStarted.box2.imc.maigreur,
            "from": 0,
            "to": 18.5,
            "color":"#219ebc"
        },
        {
            "title": languageObj?.signup.finish.getStarted.box2.imc.normal,
            "from": 18.5,
            "to": 25.5,
            "color":"#25a244"
        },
        {
            "title": languageObj?.signup.finish.getStarted.box2.imc.surpoids,
            "from": 25,
            "to": 30,
            "color":"#ff9914"
        },
        {
            "title": languageObj?.signup.finish.getStarted.box2.imc.obisiteM,
            "from": 30,
            "to": 40,
            "color":"#fb6107"
        },
        {
            "title": languageObj?.signup.finish.getStarted.box2.imc.obisiteS,
            "from": 40,
            "to": 100,
            "color":"red"
        },
    ]


  return (
    !show ?
        <ImageBackground source={require("../../../assets/images/auth/finish/finish.jpg")} style={styles.container}>
            <StatusBar color="transparent" style="dark-content" />
            <Text style={styles.text1}> {languageObj?.signup.finish.settingUp.title} </Text>
            <Text style={styles.text2}> {languageObj?.signup.finish.settingUp.text} </Text>
            <ActivityIndicator style={styles.spinner} size="large" color="#3FC495" />
        </ImageBackground>
    :
        <>
            <ScrollView vertical={true} style={styles.started}>
                <View style={styles.header}>
                    <Video
                        ref={video}
                        style={styles.video}
                        source={require('../../../assets/videos/verification.mp4')}
                        resizeMode="contain"
                        shouldPlay= {true}
                        isMuted
                    />
                    <Text style={styles.text3}> {user.fname} {languageObj?.signup.finish.getStarted.box1.title} </Text>
                    <View style={styles.box1}>
                        {user.goal === "Maintain Weight" ?
                            <Text style={styles.text4}> {user.CWeight} </Text>
                        :
                            <>
                                <Text style={styles.text4}> {user.CWeight} {unit} </Text>
                                <Icon1 style={styles.icon1} name={user.goal === "Lose Weight" ? "trending-down" : "trending-up"} size={34} color="#3FC495" />
                                <Text style={styles.text4}> {user.GWeight} {unit} </Text>
                            </>
                        }
                    </View>
                    <Text style={styles.text5}> {languageObj?.signup.finish.getStarted.box1.text} </Text>
                </View>

                <View style={styles.box}>
                    <Text style={styles.boxHeader}> {languageObj?.signup.finish.getStarted.box2.title} </Text>
                    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                        <Text style={{color: IMC(user, IMCData).color, marginRight: 10, fontWeight: 'bold'}}>{IMC(user, IMCData).imc}</Text>
                        <Text style={{color: IMC(user, IMCData).color, fontWeight: 'bold'}}> {IMC(user, IMCData).title} </Text>
                    </View>
                </View>
                
                <View style={styles.box}>
                    <Text style={styles.boxHeader}> {languageObj?.signup.finish.getStarted.box3.title} </Text>
                    <Text style={styles.boxHeader1}> {languageObj?.signup.finish.getStarted.box3.text} </Text>
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
                    <Text style={styles.boxHeader}> {languageObj?.signup.finish.getStarted.box4.title} </Text>
                    {Reachs.map((item,key)=>(
                        <View key={key} style={[styles.row, key+1 !== Reachs.length && {borderBottomWidth: 1,}]}>
                            <Image style={{width: 80, height: 80, marginLeft: 10}} source={item.image} />
                            <Text style={{marginHorizontal: 10, flex: 1}}> {item.text} </Text>
                        </View>
                    ))}
                </View>
            </ScrollView>

            <View style={styles.btn}>
                <TouchableOpacity style={styles.button} onPress={()=> Login()}>
                    <Text style={styles.buttonText}> {languageObj?.signup.finish.getStarted.button} </Text>
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
        paddingTop: 40,
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
        justifyContent: 'space-between', 
        borderBottomColor: "#B2B2B2",
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
        borderRadius: 16,
        paddingVertical: 20,
    },
    video: {
        width: "100%",
        height: 100,
      }
})