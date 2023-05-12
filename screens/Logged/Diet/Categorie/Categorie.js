import { View, Text, Image, StatusBar, StyleSheet, TouchableOpacity, ScrollView, ImageBackground } from 'react-native'
import React, {useState } from 'react'
import { NavigateBtn } from '../../../../Components/Buttons'
import AntDesign from "react-native-vector-icons/AntDesign"
import { ServerLink } from '../../../../Components/API'
import Modal from "react-native-modal";
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Categorie({navigation, route}) {
    const mainColor = route.params.color

    const data = route.params?.data

    const title = {
        title: data?.title,
        carbs: data?.carbs,
        protein: data?.protein,
        fat: data?.fat,
    }

    const submit = async () => {
        try {
            setStart(true)
            await AsyncStorage.setItem("Diets", JSON.stringify(title))
            const diets = await AsyncStorage.getItem("Diets")
            console.log("Diets",diets);
        }
        catch {
            console.log("no");
        }
    }

    const ok = () => {
        navigation.navigate("home")
    }

    const calories = [
        {
          "logo": require('../../../../assets/calories/carbs1.png'),
          "title":"Carbs",
          "val": data?.carbs,
          "unit":"%"
        },
        {
          "logo": require('../../../../assets/calories/eggs.png'),
          "title":"Protein",
          "val": data?.protein,
          "unit":"%"
        },
        {
          "logo": require('../../../../assets/calories/fat1.png'),
          "title":"Fat",
          "val": data?.fat,
          "unit":"%"
        },
    ]
    const [read, setRead] = useState(400)
    const [start, setStart] = useState(false)

  return (
    <View style={{flex: 1}}>
        <View style={{flex: 1, backgroundColor: "white"}}>
            <StatusBar
                backgroundColor="transparent" 
                translucent={true}
                barStyle="light-content"
            />

            <ImageBackground source={{uri: `${ServerLink}/${data.image}`}} style={{height: 240, width: "100%"}}>
                <TouchableOpacity onPress={()=> navigation.goBack()} style={{marginHorizontal: 15, paddingHorizontal: 15, marginVertical: 20, paddingVertical: 14, width: "20%", borderRadius: 16}}>
                    <AntDesign name='arrowleft' size={26} color="white" />
                </TouchableOpacity>
            </ImageBackground>
            
            <ScrollView style={styles.body}>
                <View style={{}}>
                    <Text style={{fontWeight: 'bold', fontSize: 30}}>{data.title} </Text>
                    <Text style={{marginBottom: 10}}> Duration {data?.duree} Hours </Text>
                    {data.desc && <Text style={{fontSize: 16, marginTop: 4, color: "#B2B2B2"}}> {data?.desc.substring(0, read)}</Text>}
                    {read !== data?.desc?.length &&
                        <TouchableOpacity onPress={()=> setRead(data?.desc?.length)}>
                            <Text> Read more... </Text>
                        </TouchableOpacity>
                    }
                </View>

                <View style={[styles.boxContent, {marginTop: 30, backgroundColor: "#E8F6EF", borderRadius: 16, paddingVertical: 20, justifyContent: 'space-evenly'}]}>
                    {calories.map((item,key)=>(
                        <View key={key} style={styles.boxx}>
                            <Image source={item.logo} />
                            <Text style={{fontWeight: 'bold', marginBottom: 10}}> {item.title} </Text>
                            <Text> {item.val} {item.unit} </Text>
                        </View>
                    ))}
                </View>

                <View style={{marginTop: 60}}>
                </View>
            </ScrollView>

            <Modal isVisible={start} style={{ flex: 1 }}>
                <View style={{alignItems: 'center', paddingVertical: 50, paddingHorizontal: 20, borderRadius: 16, backgroundColor: "white" }}>
                    <Text style={{fontSize: 30, fontWeight: 'bold'}}> You started {data?.title} Diet </Text>

                    <TouchableOpacity style={{backgroundColor: "#3FC495", width: "100%", borderRadius: 16, marginTop: 20}} onPress={ok}>
                        <Text style={{textAlign: 'center', color: "white", padding: 10, fontWeight: 'bold', fontSize: 18}}> OK </Text>
                    </TouchableOpacity>
                </View>
            </Modal>
            
            <View style={{paddingVertical: 20, paddingHorizontal: 20, backgroundColor: "white"}}>
                {NavigateBtn("Start", submit, true, mainColor)}
            </View>
        </View>

        
    </View>
  )
}

const styles = StyleSheet.create({
    body: {
        backgroundColor: "white",
        borderRadius: 30,
        bottom: 40,
        paddingHorizontal: 30,
        paddingVertical: 26,
        marginBottom: -40
    },
    bottomSheet: {
        paddingHorizontal: 30
    },


    boxContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
})