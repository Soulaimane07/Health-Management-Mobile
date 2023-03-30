import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import Statusbar from '../../../Components/Statusbar'
import DietTemplate from './components/DietTemplate'
import { GetUser } from '../../../Components/GetData'

export default function Diet({navigation}) {
    const user = GetUser().user
    let Diets = []

    let GainDiets
    let MaintainDiet
    let LoseDiet

    user.goal === "Gain Weight" && (
        GainDiets = [
            {
                "title":"BALANCED",
                "color":"#B2B2B2",
                "data": [
                    {
                        "title":"Runner's Diet",
                        "text":"Fuel your run",
                        "image":require("../../../assets/images/logged/diets/balanced1.jpg")

                    },
                    {
                        "title":"Eat, Lift Repeat",
                        "text":"Fuel your muscles",
                        "image":require("../../../assets/images/logged/diets/balanced2.jpg")

                    },
                    {
                        "title":"Clean Eating",
                        "text":"Nutritious, whole foods",
                        "image":require("../../../assets/images/logged/diets/balanced3.jpg")

                    },
                    {
                        "title":"Vegan for a Week",
                        "text":"7-days Meal Plan",
                        "image":require("../../../assets/images/logged/diets/balanced5.jpg")

                    },
                    {
                        "title":"Climatarian",
                        "text":"Sustainable eating",
                        "image":require("../../../assets/images/logged/diets/balanced6.jpg")
                    },
                ],
            }, 
            {
                "title":"HIGH PROTEIN",
                "color":"#1A4D2E",
                "data": [
                    {
                        "title":"Food for strength",
                        "text":"Muscle-building",
                        "image":require("../../../assets/images/logged/diets/protein2.jpg")
                    },
                    {
                        "title":"Scandinavian",
                        "text":"High fiber, healthy fats",
                        "image":require("../../../assets/images/logged/diets/chofan.jpg")
                    },
                ],
            }
        ],

        Diets = Diets.concat(GainDiets)
    )

    user.goal === "Maintain Weight" && (
        MaintainDiet = [
            {
                "title":"BALANCED",
                "color":"#B2B2B2",
                "data": [
                    {
                        "title":"Runner's Diet",
                        "text":"Fuel your run",
                        "image":require("../../../assets/images/logged/diets/balanced1.jpg")

                    },
                    {
                        "title":"Eat, Lift Repeat",
                        "text":"Fuel your muscles",
                        "image":require("../../../assets/images/logged/diets/balanced2.jpg")

                    },
                    {
                        "title":"Clean Eating",
                        "text":"Nutritious, whole foods",
                        "image":require("../../../assets/images/logged/diets/balanced3.jpg")

                    },
                    {
                        "title":"Vegan for a Week",
                        "text":"7-days Meal Plan",
                        "image":require("../../../assets/images/logged/diets/balanced5.jpg")

                    },
                    {
                        "title":"Climatarian",
                        "text":"Sustainable eating",
                        "image":require("../../../assets/images/logged/diets/balanced6.jpg")
                    },
                    {
                        "title":"Mediterranean",
                        "text":"High fiber, healthy fats",
                        "image":require("../../../assets/images/logged/diets/balanced4.jpg")
    
                    },
                ],
            }, 
            {
                "title":"HIGH PROTEIN",
                "color":"#1A4D2E",
                "data": [
                    {
                        "title":"Food for strength",
                        "text":"Muscle-building",
                        "image":require("../../../assets/images/logged/diets/protein2.jpg")
                    },
                    {
                        "title":"Scandinavian",
                        "text":"High fiber, healthy fats",
                        "image":require("../../../assets/images/logged/diets/chofan.jpg")
                    },
                ],
            },
            {
                "title":"KETO / LOW CARBS",
                "color":"#3E54AC",
                "data": [
                    {
                        "title":"Ketogenic Easy",
                        "text":"High fat, 100g carbs/day",
                        "image":require("../../../assets/images/logged/diets/avocado.jpg")
                    },
                    {
                        "title":"Ketogenic Medium",
                        "text":"High fat, 50g carbs/day",
                        "image":require("../../../assets/images/logged/diets/cheese.jpg")
                    },
                ],
            },
            {
                "title":"FASTING",
                "color":"#655DBB",
                "type":"fasting",
                "data": [
                    {
                        "title":"5:2",
                        "text":"Fast 2 days/week",
                        "image":require("../../../assets/images/logged/diets/fasting1.jpg")
                    },
                    {
                        "title":"6:1",
                        "text":"Fast 1 days/week",
                        "image":require("../../../assets/images/logged/diets/fasting3.jpg")
                    },
                ],
            },
        ],

        Diets = Diets.concat(MaintainDiet)
    )

    user.goal === "Lose Weight" && (
        LoseDiet = [
            {
                "title":"BALANCED",
                "color":"#B2B2B2",
                "data": [
                    {
                        "title":"Runner's Diet",
                        "text":"Fuel your run",
                        "image":require("../../../assets/images/logged/diets/balanced1.jpg")

                    },
                    {
                        "title":"Eat, Lift Repeat",
                        "text":"Fuel your muscles",
                        "image":require("../../../assets/images/logged/diets/balanced2.jpg")

                    },
                    {
                        "title":"Clean Eating",
                        "text":"Nutritious, whole foods",
                        "image":require("../../../assets/images/logged/diets/balanced3.jpg")

                    },
                    {
                        "title":"Mediterranean",
                        "text":"High fiber, healthy fats",
                        "image":require("../../../assets/images/logged/diets/balanced4.jpg")

                    },
                    {
                        "title":"Vegan for a Week",
                        "text":"7-days Meal Plan",
                        "image":require("../../../assets/images/logged/diets/balanced5.jpg")

                    },
                    {
                        "title":"Climatarian",
                        "text":"Sustainable eating",
                        "image":require("../../../assets/images/logged/diets/balanced6.jpg")

                    },
                ],
            },
            {
                "title":"FASTING",
                "color":"#655DBB",
                "type":"fasting",
                "color":"#655DBB",
                "data": [
                    {
                        "title":"One day",
                        "type":"one",
                        "image":require("../../../assets/images/logged/diets/fasting1.jpg")
                    },
                    {
                        "title":"Several days",
                        "type":"several",
                        "image":require("../../../assets/images/logged/diets/fasting3.jpg")
                    },
                ],
            },
            {
                "title":"HIGH PROTEIN",
                "color":"#1A4D2E",
                "data": [
                    {
                        "title":"High Protein",
                        "text":"Stay strong",
                        "image":require("../../../assets/images/logged/diets/protein.jpg")
                    },
                    {
                        "title":"Scandinavian",
                        "text":"High fiber, healthy fats",
                        "image":require("../../../assets/images/logged/diets/chofan.jpg")
                    },
                ],
            },
            {
                "title":"KETO / LOW CARBS",
                "color":"#3E54AC",
                "data": [
                    {
                        "title":"Ketogenic Strict",
                        "text":"High fat, 20g carbs/day",
                        "image":require("../../../assets/images/logged/diets/avocado.jpg")
                    },
                    {
                        "title":"Ketogenic Medium",
                        "text":"High fat, 50g carbs/day",
                        "image":require("../../../assets/images/logged/diets/cheese.jpg")
                    },
                    {
                        "title":"Ketogenic Easy",
                        "text":"High fat, 100g carbs/day",
                        "image":require("../../../assets/images/logged/diets/avocado.jpg")
                    },
                ],
            },
        ],

        Diets = Diets.concat(LoseDiet)
    )
    
    // let Diets = [
    //     {
    //         "title":"BALANCED",
    //         "color":"#B2B2B2",
    //         "data": [
    //             {
    //                 "title":"Runner's Diet",
    //                 "text":"Fuel your run",
    //                 "image":require("../../../assets/images/logged/diets/balanced1.jpg")

    //             },
    //             {
    //                 "title":"Eat, Lift Repeat",
    //                 "text":"Fuel your muscles",
    //                 "image":require("../../../assets/images/logged/diets/balanced2.jpg")

    //             },
    //             {
    //                 "title":"Clean Eating",
    //                 "text":"Nutritious, whole foods",
    //                 "image":require("../../../assets/images/logged/diets/balanced3.jpg")

    //             },
    //             {
    //                 "title":"Mediterranean",
    //                 "text":"High fiber, healthy fats",
    //                 "image":require("../../../assets/images/logged/diets/balanced4.jpg")

    //             },
    //             {
    //                 "title":"Vegan for a Week",
    //                 "text":"7-days Meal Plan",
    //                 "image":require("../../../assets/images/logged/diets/balanced5.jpg")

    //             },
    //             {
    //                 "title":"Climatarian",
    //                 "text":"Sustainable eating",
    //                 "image":require("../../../assets/images/logged/diets/balanced6.jpg")

    //             },
    //         ],
    //     },
    //     {
    //         "title":"FASTING",
    //         "color":"#655DBB",
    //         "type":"fasting",
    //         "data": [
    //             {
    //                 "title":"5:2",
    //                 "text":"Fast 2 days/week",
    //                 "image":require("../../../assets/images/logged/diets/fasting1.jpg")
    //             },
    //             {
    //                 "title":"6:1",
    //                 "text":"Fast 1 days/week",
    //                 "image":require("../../../assets/images/logged/diets/fasting3.jpg")
    //             },
    //         ],
    //     },
    //     {
    //         "title":"HIGH PROTEIN",
    //         "color":"#1A4D2E",
    //         "data": [
    //             {
    //                 "title":"High Protein",
    //                 "text":"Stay strong",
    //                 "image":require("../../../assets/images/logged/diets/protein.jpg")
    //             },
    //             {
    //                 "title":"Scandinavian",
    //                 "text":"High fiber, healthy fats",
    //                 "image":require("../../../assets/images/logged/diets/chofan.jpg")
    //             },
    //         ],
    //     },
    //     {
    //         "title":"KETO / LOW CARBS",
    //         "color":"#3E54AC",
    //         "data": [
    //             {
    //                 "title":"Ketogenic Strict",
    //                 "text":"High fat, 20g carbs/day",
    //                 "image":require("../../../assets/images/logged/diets/avocado.jpg")
    //             },
    //             {
    //                 "title":"Ketogenic Medium",
    //                 "text":"High fat, 50g carbs/day",
    //                 "image":require("../../../assets/images/logged/diets/cheese.jpg")
    //             },
    //             {
    //                 "title":"Ketogenic Easy",
    //                 "text":"High fat, 100g carbs/day",
    //                 "image":require("../../../assets/images/logged/diets/avocado.jpg")
    //             },
    //         ],
    //     },
    // ]

    const [test, setTest] = useState(false)
    useEffect(()=> {
        setTest(false)
        setTimeout(() => {
            setTest(true)
        }, 6000);
    }, [])



    const [ScrollY, setScrollY] = useState(0)
    

  return (
    <View style={{flex: 1}}>
        <Statusbar color="#3FC495" style="light" />
        <ScrollView 
            onMomentumScrollEnd={(event) => { 
                setScrollY(event.nativeEvent.contentOffset.y)
                console.log(event.nativeEvent.contentOffset.y);
            }} 
            style={{paddingTop: 20, backgroundColor: "white"}}
        >
            <View style={{flexDirection: 'row', alignItems: 'center', marginHorizontal: 20, marginBottom: 20, borderBottomColor: "#F9F5EB", borderBottomWidth: 1}}>
                <Image source={require("../../../assets/logo.jpg")} style={{width: 40, height: 40, marginBottom: 10}} />
                <Text style={{fontWeight: 'bold', fontSize: 12, marginLeft: 6, marginBottom: 10, color: "#B2B2B2"}}> Curated by Health Manager's nutrition experts </Text>
            </View>

            {Diets.map((item,key)=>(
                <DietTemplate id={key} title={item.title} color={item.color} type={item.type} data={item.data} navigation={navigation} Diets={Diets[key].data} />
            ))}
            
            <View style={{marginHorizontal: 20, backgroundColor: "#F5F5F5", paddingTop: 20, paddingHorizontal: 40, borderRadius: 16, overflow: 'hidden'}}>
                <Image source={require("../../../assets/logo.jpg")} style={{width: 100, height: 100, borderRadius: 16, alignSelf: 'center', marginBottom: 20}} />
                
                <Text style={{textAlign: 'center', fontSize: 20, marginBottom: 10}}> Need recommendations ? </Text>
                <Text style={{textAlign: 'center', marginBottom: 20, fontSize: 12}}> Get help choosing a Meal Plan or Diet </Text>

                <TouchableOpacity onPress={()=> navigation.navigate("dietStack", {screen: "dietTest"})} style={{paddingVertical: 14, borderTopWidth: 1, borderTopColor: "#d8d7d7"}}>
                    <Text style={{textAlign: 'center', color: "#3FC495", fontWeight: 'bold', fontSize: 16}}> TAKE THE TEST </Text>
                </TouchableOpacity>
            </View>

            <View style={{marginTop: 150}}></View>
        </ScrollView>

        {test && ScrollY < 700 &&
            <View style={{position: 'absolute', left: 0, right: 0, bottom: 0, marginHorizontal: 20, marginVertical: 10,}}>
                <TouchableOpacity onPress={()=> navigation.navigate("dietStack", {screen: "dietTest"})} style={{backgroundColor: "#3FC495", width: "100%", flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 14, borderRadius: 16}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Image source={require("../../../assets/logo.jpg")} style={{width: 50, height: 50, marginRight: 10, borderRadius: 8}} />
                        <View>
                            <Text style={{fontSize: 20, color: "white"}}> Take the test </Text>
                            <Text style={{color: "white"}}> To get help choosing a plan </Text>
                        </View>
                    </View>
                    <MaterialIcons name="arrow-forward-ios" color={"white"} size={20} />
                </TouchableOpacity>
            </View>
        }
    </View>
  )
}

const styles = StyleSheet.create({
    box: {
        marginBottom: 20,
    },
    head: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between',
        marginRight: 30,
        marginLeft: 20
    },
    body: {
        marginTop: 20,
        paddingLeft: 20,
    },
    boxx: {
        marginRight: 10,
        borderRadius: 16,
        width: 300,
        overflow: 'hidden',
        marginBottom: 10
    },
    boxx1: {
        marginRight: 10,
        borderRadius: 16,
        width: 220,
        overflow: 'hidden',
        height: 270,
        marginBottom: 10,
    }
})