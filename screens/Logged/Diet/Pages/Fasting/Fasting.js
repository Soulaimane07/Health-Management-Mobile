import { View, Text, StatusBar, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { GoBack, NavigateBtn } from '../../../../../Components/Buttons'
import Modal from "react-native-modal";
import { Video } from 'expo-av';
import { useEffect } from 'react';

export default function Fasting({navigation, route}) {
    const video = React.useRef(null);
    
    const boxs = [
        {
            "title":"YOU NEED TO KNOW",
            "body":"",
            "data": [
                {
                    "image": require("../../../../../assets/images/logged/diets/fasting/page/baby.png"),
                    "text":"Pregnant / Breastfeeding"
                },
                {
                    "image": require("../../../../../assets/images/logged/diets/fasting/page/pill.png"),
                    "text":"Have a history of eating disorders"
                },
                {
                    "image": require("../../../../../assets/images/logged/diets/fasting/page/blood.png"),
                    "text":"Have type 1 diabetes"
                },
            ],
        },
        {
            "title":"HOW TO GET READY",
            "body":"",
            "data": [
                {
                    "image": require("../../../../../assets/images/logged/diets/fasting/page/alarm-clock.png"),
                    "text":"Pick fasting window to fit your lifestyle"
                },
                {
                    "image": require("../../../../../assets/images/logged/diets/fasting/page/meal.png"),
                    "text":"Eat a high-protein meal before starting"
                },
                {
                    "image": require("../../../../../assets/images/logged/diets/fasting/page/water-bottle.png"),
                    "text":"Drink water to avoid dehydration"
                },
                {
                    "image": require("../../../../../assets/images/logged/diets/fasting/page/weightlifting.png"),
                    "text":"Continue your usual activities during fasting"
                },
            ],
        },
        {
            "title":"0 - 8 HOURS",
            "body":"",
            "data": [
                {
                    "image": require("../../../../../assets/images/logged/diets/fasting/page/candy.png"),
                    "text":"Your blood sugar level drops"
                },
                {
                    "image": require("../../../../../assets/images/logged/diets/fasting/page/water-bottle.png"),
                    "text":"Don't forget to drink water"
                },
                {
                    "image": require("../../../../../assets/images/logged/diets/fasting/page/dna.png"),
                    "text":"You're entering letosis: your nerve cells activate to supply brain with energy, your metabolism accelerates"
                }
            ],
        },
        {
            "title":"8 - 16 HOURS",
            "body":"",
            "data": [
                {
                    "text":"Your blood sugar levels are stable"
                },
                {
                    "image": require("../../../../../assets/images/logged/diets/fasting/page/fire.png"),
                    "text":"Your body begins to burn fat"
                },
                {
                    "image": require("../../../../../assets/images/logged/diets/fasting/page/donut.png"),
                    "text":"Glucose in cells and glycogen in the liver and muscles begin to dwindle rapidy"
                }
            ],
        },
        {
            "title":"16+ HOURS",
            "body":"",
            "data": [],
        }
    ]

    const box = (key, title, data) => {
        return(
            <View key={key} style={{marginTop: 30}}>
                <Text style={{fontWeight: 'bold', fontSize: 16, marginBottom: 8}}> {title} </Text>
                <View style={{ backgroundColor: "white", width: "100%", padding: 20, borderRadius: 16}}>
                    {data.map((item,key)=>(
                        <View key={key} style={{width: "100%", marginVertical: 4, flexDirection: 'row', flexWrap: "wrap", alignItems: 'center'}}>
                            <View style={{padding: 10, backgroundColor: "#ECF2FF", width: 40, height: 40, borderRadius: 8}}>
                                <Image source={item.image} style={{width: "100%", height: "100%"}} />
                            </View>
                            <Text style={{marginLeft: 10, width: "80%", fontSize: 14, color: "#73777B"}}>{item.text} </Text>
                        </View>
                    ))}
                </View>
            </View>
        )
    }

    const [Start, setStart] = useState(false)
    const [fasting, setFasting] = useState(false)
    const [End, setEnd] = useState(false)
    
    
    const Submit1 = () => {
        setStart(false)
    }
    
    
    
    
    /*** CountDown ****/
    
    const fastingTime = route.params.time

    const [startH, setStartH] = useState(0)
    const [startM, setStartM] = useState(0)
    
    const [endH, setEndH] = useState(0)
    const [endM, setEndM] = useState(0)
    const [endP, setEndP] = useState("Today")

    const [countH, setCountH] = useState(0)
    const [countM, setCountM] = useState(0)
    const [countS, setCountS] = useState(0)
    

    const StartTask = () => {
        setStart(true)
        setTimeout(() => {
            setFasting(true)

            let NowH = new Date().getHours()
            let NowM = new Date().getMinutes()

            setStartH(NowH === 0 ? 24 : NowH)
            setStartM(NowM)

            NowH+fastingTime > 24 && setEndH((NowH+fastingTime)-24)
            setEndM(NowM)
            NowH+fastingTime > 24 && setEndP("Tomorrow")
        }, 800);
    }

    useEffect(()=> {
        fasting && (
            setTimeout(() => {
                countS >= 59 ? (
                    setCountS(0),
                    countM >= 59 ? (
                        setCountM(0),
                        setCountH(countH+1)
                    )
                    :   setCountM(countM+1)
                )
                : setCountS(countS+1)
            }, 500)
        )
    }, [fasting, countS])
    
    const EndModal = () => {
        setEnd(true)
    }
    
    const EndTask = () => {
        setEnd(false)
        setStart(false)
        setFasting(false)

        setCountH(0)
        setCountM(0)
        setCountS(0)
    }

    

    

  return (
    <View>
        <StatusBar
            backgroundColor="transparent" 
            translucent={true}
            barStyle="dark-content"
        />
        <View style={{backgroundColor: "white", paddingVertical: 20, paddingTop: 40, flexDirection: 'row', alignItems: 'center'}}>
            <View style={{padding: 10, paddingHorizontal: 20}}>
                {GoBack(navigation, "black", 22)}
            </View>

            <View style={{alignSelf: 'center', width: "70%"}}>
                <Text style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold'}}> {route.params.title} </Text>
            </View>
        </View>

        <ScrollView>
            <View style={{ paddingVertical: 30, height: 400, backgroundColor: "white", borderBottomLeftRadius: 40, borderBottomRightRadius: 40, justifyContent: 'space-between'}}>
                <View style={{marginHorizontal: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    {fasting && 
                        <>
                            <View style={{alignItems: 'center'}}>
                                <Text style={{color: "#73777B", marginBottom: 4}}> Started Fasting </Text>
                                <Text style={{fontWeight: 'bold'}}> Today, {startH < 10 ? `0${startH}` : startH}:{startM < 10 ? `0${startM}` : startM} </Text>
                            </View>
                            <View style={{alignItems: 'center'}}>
                                <Text style={{color: "#73777B", marginBottom: 4}}> End Fasting </Text>
                                <Text style={{fontWeight: 'bold'}}> {endP}, {endH < 10 ? `0${endH}` : endH}:{endM < 10 ? `0${endM}` : endM} </Text>
                            </View>
                        </>
                    }
                </View>

                <View style={{alignItems: 'center'}}>
                    {fasting ?
                        <>
                            <Text style={{fontSize: 40, fontWeight:'bold'}}> {countH < 10 ? `0${countH}` : countH}:{countM < 10 ? `0${countM}` : countM}:{countS < 10 ? `0${countS}` : countS} </Text>
                            <Text style={{marginTop: 16}}> Remaining </Text>
                            <Text style={{fontSize: 16, fontWeight:'bold'}}> {fastingTime-1-countH < 10 ? `0${fastingTime-1-countH}` : fastingTime-1-countH}:{59-countM < 10 ? `0${59-countM}` : 59-countM}:{59-countS < 10 ? `0${59-countS}` : 59-countS}</Text>
                        </>
                    :
                        <>
                            <Text style={{fontSize: 18, marginBottom: 6, color: "#73777B"}}> Upcoming Fast </Text>
                            <Text style={{fontSize: 40, fontWeight: 'bold'}}> {fastingTime} hours </Text>
                        </>
                    }
                </View>

                <View style={{width: "60%", alignSelf: 'center'}}>
                    {!fasting 
                        ?   NavigateBtn("START FAST", StartTask, true, "#655DBB")
                        :   NavigateBtn("END FAST", EndModal, true, "#FC2947")
                    }
                </View>
            </View>

            <Modal isVisible={Start} style={{ flex: 1 }}>
                <View style={{alignItems: 'center', paddingVertical: 50, paddingHorizontal: 20, borderRadius: 16, backgroundColor: "white" }}>
                    <View>
                        <Video 
                            source={require("../../../../../assets/videos/timer.mp4")}
                            style={{width: 100, height: 100}}
                            ref={video}
                            resizeMode="contain"
                            isLooping
                            isMuted
                            shouldPlay= {true}
                        />
                    </View>
                    <Text style={{fontSize: 30, fontWeight: 'bold'}}> You started fast </Text>
                    <Text style={{fontSize: 16, paddingHorizontal: 10, marginTop: 16, textAlign: 'center'}}> We will notify you in hours when it ends </Text>

                    <TouchableOpacity style={{backgroundColor: "#3FC495", width: "100%", borderRadius: 16, marginTop: 20}} onPress={Submit1}>
                        <Text style={{textAlign: 'center', color: "white", padding: 10, fontWeight: 'bold', fontSize: 18}}> OK </Text>
                    </TouchableOpacity>
                </View>
            </Modal>

            <Modal isVisible={End} style={{ flex: 1 }}>
                <View style={{alignItems: 'center', paddingVertical: 50, paddingHorizontal: 20, borderRadius: 16, backgroundColor: "white" }}>
                    <Text style={{fontSize: 30, fontWeight: 'bold'}}> End Fast? </Text>
                    <Text style={{fontSize: 16, paddingHorizontal: 10, marginTop: 16, textAlign: 'center'}}> You will lose all current progress </Text>

                    <TouchableOpacity style={{backgroundColor: "#FC2947", width: '100%', borderRadius: 16, marginTop: 20}} onPress={()=> setEnd(false)}>
                        <Text style={{textAlign: 'center', color: "white", padding: 14, fontWeight: 'bold', fontSize: 14}}> NO, CONTINUE FASTING </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{width: '100%', marginTop: 16}} onPress={()=> EndTask()}>
                        <Text style={{textAlign: 'center', padding: 10, fontWeight: 'bold', fontSize: 14}}> YES, I'AM SURE </Text>
                    </TouchableOpacity>
                </View>
            </Modal>

            <View style={{marginHorizontal: 20, flex: 1, marginTop: 10, marginBottom: 200}}>
                {boxs.map((item,key)=>(
                    box(key, item.title, item.data)
                ))}
            </View>
        </ScrollView>
    </View>
  )
}