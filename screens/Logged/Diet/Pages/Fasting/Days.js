import { View, Text, TouchableOpacity, Image, ScrollView, StatusBar } from 'react-native'
import React, { useState } from 'react'
import { GoBack } from '../../../../../Components/Buttons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

export default function Days({navigation}) {

    const plans = [
        {
            "title":"13:11",
            "text1":"13-hour fast",
            "text2":"11-hour eating",
            "fasting": 13,
            "status":"BEGINNER-FRIENDLY",
            "color":"#3FC495",
            "pageTitle":"Fasting 13:11",
            "image":require('../../../../../assets/images/logged/diets/fasting/0.png'),
        },
        {
            "title":"16:8",
            "text1":"16-hour fast",
            "text2":"8-hour eating",
            "fasting": 16,
            "status":"MOST POPULAR",
            "color":"#FFD523",
            "pageTitle":"Fasting 16:8",
            "image":require('../../../../../assets/images/logged/diets/fasting/1.png'),
        },
        {
            "title":"18:6",
            "text1":"18-hour fast",
            "text2":"6-hour eating",
            "fasting": 18,
            "pageTitle":"Fasting 18:6",
            "image":require('../../../../../assets/images/logged/diets/fasting/2.png'),
        },
        {
            "title":"20:4",
            "text1":"20-hour fast",
            "text2":"4-hour eating",
            "fasting": 20,
            "pageTitle":"Fasting 20:4",
            "image":require('../../../../../assets/images/logged/diets/fasting/3.png'),
        },
    ]

    const morePlans = [
        {
            "title":"14:10",
            "text1":"14-hour fast",
            "text2":"10-hour eating",
            "pageTitle":"Fasting 14:10",
            "image":require('../../../../../assets/images/logged/diets/fasting/0.png'),
        },
        {
            "title":"15:9",
            "text1":"15-hour fast",
            "text2":"9-hour eating",
            "pageTitle":"Fasting 15:9",
            "image":require('../../../../../assets/images/logged/diets/fasting/1.png'),
        },
        {
            "title":"17:7",
            "text1":"17-hour fast",
            "text2":"7-hour eating",
            "pageTitle":"Fasting 17:7",
            "image":require('../../../../../assets/images/logged/diets/fasting/2.png'),
        },
        {
            "title":"19:5",
            "text1":"19-hour fast",
            "text2":"5-hour eating",
            "pageTitle":"Fasting 19:5",
            "image":require('../../../../../assets/images/logged/diets/fasting/3.png'),
        },
    ]

    const [more, setMore] = useState(false)

  return (
    <View style={{marginTop: 40}}>
        <StatusBar
            backgroundColor="transparent" 
            translucent={true}
            barStyle="dark-content"
        />

        <View style={{marginLeft: 10, width: "20%", padding: 10}}>
            {GoBack(navigation, "black")}
        </View>
        
        <ScrollView style={{paddingTop: 20, paddingHorizontal: 20}}>
            <Text style={{fontWeight: 'bold', marginBottom: 20, fontSize: 25}}> Fasting plans </Text>
            <View>
                {plans.map((item,key)=>(
                    <TouchableOpacity 
                        key={key} 
                        onPress={()=> navigation.navigate("fasting", {title: item.pageTitle, time: item.fasting})} 
                        style={{width: "100%", marginBottom: 10, paddingHorizontal: 20, paddingVertical: 26, backgroundColor: "white", borderRadius: 10, flexDirection: 'row', alignItems: 'center', position: "relative"}}
                    >
                        <Image source={item.image} style={{width: 40, height: 40, marginRight: 14}} />
                        <View>
                            <Text style={{fontSize: 18, fontWeight: 'bold'}}> {item.title} </Text>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <FontAwesome name="circle" size={6} color="#FFD523" />
                                <Text style={{fontSize: 14, color:"#B2B1B9", marginLeft: 4}}> {item.text1} </Text>
                            </View>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <FontAwesome name="circle" size={6} color="#FBFFB1" />
                                <Text style={{fontSize: 14, color:"#B2B1B9", marginLeft: 4}}> {item.text2} </Text>
                            </View>
                        </View>
                        <Text style={{position: 'absolute', top: 10, right: 10, backgroundColor: item.color, padding: 6, color: "white", borderRadius: 8, fontSize: 12}}> {item.status} </Text>
                    </TouchableOpacity>
                ))}

                {!more &&
                    <TouchableOpacity style={{marginTop: 16}} onPress={()=> setMore(true)}>
                        <Text style={{textAlign: 'center', color: "#B2B1B9"}}> More fasting plans </Text>
                    </TouchableOpacity>
                }

                {more && 
                    <View style={{marginTop: 40}}>
                        <Text style={{fontWeight: 'bold', marginBottom: 20, fontSize: 25}}> More fasting Plans </Text>
                        {morePlans.map((item,key)=>(
                            <TouchableOpacity
                                onPress={()=> navigation.navigate("fasting", {title: item.pageTitle})} 
                                key={key} 
                                style={{width: "100%", marginBottom: 10, paddingHorizontal: 20, paddingVertical: 26, backgroundColor: "white", borderRadius: 10, flexDirection: 'row', alignItems: 'center', position: "relative"}}
                            >
                                <Image source={item.image} style={{width: 40, height: 40, marginRight: 14}} />
                                <View>
                                    <Text style={{fontSize: 18, fontWeight: 'bold'}}> {item.title} </Text>
                                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                        <FontAwesome name="circle" size={6} color="#FFD523" />
                                        <Text style={{fontSize: 14, color:"#B2B1B9", marginLeft: 4}}> {item.text1} </Text>
                                    </View>
                                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                        <FontAwesome name="circle" size={6} color="#FBFFB1" />
                                        <Text style={{fontSize: 14, color:"#B2B1B9", marginLeft: 4}}> {item.text2} </Text>
                                    </View>
                                </View>
                                <Text style={{position: 'absolute', top: 10, right: 10, backgroundColor: item.color, padding: 6, color: "white", borderRadius: 8, fontSize: 12}}> {item.status} </Text>
                            </TouchableOpacity>
                        ))}
                        <TouchableOpacity style={{marginTop: 16, marginBottom: 150}} onPress={()=> setMore(false)}>
                            <Text style={{textAlign: 'center', color: "#B2B1B9"}}> Hide </Text>
                        </TouchableOpacity>
                    </View>
                }
            </View>
        </ScrollView>
    </View>
  )
}