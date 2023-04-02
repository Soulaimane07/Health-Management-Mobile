import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, ScrollView, StatusBar } from 'react-native'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import Aicon from 'react-native-vector-icons/AntDesign'
import { MyButton } from '../../../Components/Buttons'
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import SheetBody from '../../../Components/sheetBody'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Info({route, navigation}) {
    const data = [
        { 
            "id": 1,
            "title":"Orange",
            "image":require("../../../assets/images/logged/meals/food/orange.png"),
            "cal": 50,
            "carbs": 11.7,
            "protein": 0.5,
            "fat": 0.1,
            "fibre": 2.4
        },
        {
            "id": 2,
            "title":"Pomme",
            "image":require("../../../assets/images/logged/meals/food/apple.png"),
            "cal": 52,
            "carbs": 12,
            "protein": 0.3,
            "fat": 0.3,
            "fibre": 2.4
        },
        {
            "id": 3,
            "title":"Avocat",
            "image":require("../../../assets/images/logged/meals/food/avocado.png"),
            "cal": 167,
            "carbs": 4.7,
            "protein": 2.1,
            "fat": 16.4,
            "fibre": 6.7
        },
        {
            "id": 4,
            "title":"Pain blanc",
            "image":require("../../../assets/images/logged/meals/food/baguette.png"),
            "cal": 265,
            "carbs": 49.1,
            "protein": 9.2,
            "fat": 3.2,
            "fibre": 2.7
        },
        {
            "id": 5,
            "title":"Amande",
            "image":require("../../../assets/images/logged/meals/food/amande.png"),
            "cal": 620,
            "carbs": 17,
            "protein": 20,
            "fat": 0.4,
            "fibre": 12
        },
        {
            "id": 6,
            "title":"Avoine",
            "image":require("../../../assets/images/logged/meals/food/avoine.png"),
            "cal": 389,
            "carbs": 66.3,
            "protein": 16.9,
            "fat": 6.9,
            "fibre": 1.7
        },
        {
            "id": 7,
            "title":"Chocolat au lait",
            "image":require("../../../assets/images/logged/meals/food/barre-de-chocolat.png"),
            "cal": 535,
            "carbs": 59.4,
            "protein": 7.6,
            "fat": 29.7,
            "fibre": 3.4
        },
        {
            "id": 8,
            "title":"Cookies",
            "image":require("../../../assets/images/logged/meals/food/biscuits.png"),
            "cal": 474,
            "carbs": 63.9,
            "protein": 5.1,
            "fat": 23.3,
            "fibre": 6
        },
        {
            "id": 9,
            "title":"Carrot",
            "image":require("../../../assets/images/logged/meals/food/carrot.png"),
            "cal": 33,
            "carbs": 6.7,
            "protein": 0.8,
            "fat": 0.3,
            "fibre": 3
        },
        {
            "id": 10,
            "title":"Chou",
            "image":require("../../../assets/images/logged/meals/food/chou.png"),
            "cal": 22,
            "carbs": 2.8,
            "protein": 2.8,
            "fat": 0,
            "fibre": 3.4
        },
        {
            "id": 11,
            "title":"Chou-Fleur",
            "image":require("../../../assets/images/logged/meals/food/chou-fleur.png"),
            "cal": 24,
            "carbs": 3.5,
            "protein": 2.4,
            "fat": 0,
            "fibre": 2.5
        },
        {
            "id": 12,
            "title":"Couscous aux legumes",
            "image":require("../../../assets/images/logged/meals/food/couscous.png"),
            "cal": 114,
            "carbs": 18,
            "protein": 4.32,
            "fat": 2.25,
            "fibre": 2.8
        },
        {
            "id": 13,
            "title":"Crevette",
            "image":require("../../../assets/images/logged/meals/food/crevette.png"),
            "cal": 119,
            "carbs": 1.5,
            "protein": 22.8,
            "fat": 1.7,
            "fibre": 0
        },
        {
            "id": 14,
            "title":"Cake",
            "image":require("../../../assets/images/logged/meals/food/cup-cake.png"),
            "cal": 371,
            "carbs": 53.4,
            "protein": 5.3,
            "fat": 15.1,
            "fibre": 3.7
        },
        {
            "id": 15,
            "title":"Jus d'orange",
            "image":require("../../../assets/images/logged/meals/food/jus-dorange.png"),
            "cal": 5.7,
            "carbs": 10.4,
            "protein": 0.7,
            "fat": 0.2,
            "fibre": 0.2
        },
        {
            "id": 16,
            "title":"Noix",
            "image":require("../../../assets/images/logged/meals/food/noix.png"),
            "cal": 677,
            "carbs": 14.3,
            "protein": 15,
            "fat": 62.2,
            "fibre": 7
        },
        {
            "id": 17,
            "title":"Oeuf",
            "image":require("../../../assets/images/logged/meals/food/oeuf.png"),
            "cal": 155,
            "carbs": 1.1,
            "protein": 12.6,
            "fat": 10.6,
            "fibre": 0
        },
    ]
    const [selected, setSelected] = useState(0)
    const [taken, setTaken] = useState(false)

    const refB = useRef(null)
    const snapPoints =  useMemo(()=> ["70%", "100%"])
    const OpenModal = () => {
        refB.current?.present()
    }
    const CloseModal = () => {
        refB.current?.close()
    }


    const [mealData, setMealData] = useState([])

    const getMeal = async () => {
        try{
            const Meal = await AsyncStorage.getItem(route.params.meal)
            console.log("==> Meal: ",Meal);
            setMealData(JSON.parse(Meal))
        }
        catch(e) {
            console.log(e);
        }
    }
    useEffect(()=> {
        getMeal()
    }, [mealData])


    // ************ Search Engine

    const [searchData, setSearchData] = useState("")
    console.log(searchData);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
    <BottomSheetModalProvider>
        <View style={styles.container}>
            <StatusBar
                backgroundColor="transparent" 
                translucent={true}
                barStyle="dark-content"
            />
            
            <View>
                <TextInput 
                    placeholder='Search here...'
                    style={styles.textInput}
                    onChangeText={(e)=> setSearchData(e)}
                />
            </View>
            
            <ScrollView vertical style={{paddingTop: 10, paddingHorizontal: 20,}}>
                {data.filter((val)=>{
                    searchData == "" && ""
                    if(val.title.toLowerCase().includes(searchData.toLowerCase())){ return val}
                }).map((val,key)=>(
                    <TouchableOpacity onPress={()=> OpenModal() & setSelected(val.id-1)} style={[styles.item, key+1 == data?.length && {marginBottom: "60%"}]} key={key}>
                        <View style={{alignItems: 'center', flexDirection: 'row'}}>
                            <Image source={val.image} style={[{marginRight: 20, width: 40, height: 40}]} />
                            <Text style={{fontSize: 16}}> {val.title} </Text>
                        </View>
                        {mealData?.find(element => element.title == val.title) ? <Aicon name="checkcircle" color="#3FC495" size={24} /> : <Aicon name="pluscircleo" size={20} />}
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <View style={styles.BtnBox}>
                <TouchableOpacity style={styles.button} onPress={()=> navigation.goBack()}>
                    <Text style={styles.buttonText}> Finish </Text>
                </TouchableOpacity>
            </View>
        </View>

        <BottomSheetModal 
            ref={refB}
            index={0}
            snapPoints={snapPoints}
        >
            <View style={styles.modalView}>
                <SheetBody meal={route.params.meal} data={data[selected]} CloseModal={CloseModal} />
            </View>
        </BottomSheetModal>
    </BottomSheetModalProvider>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 40,
        paddingHorizontal: 20,
        flex: 1,
    },
    textInput: {
        borderWidth: 1.6,  
        borderColor: '#3FC495',
        fontSize: 16,
        borderRadius: 16,
        padding: 10,
        paddingHorizontal: 20,
    },
    item: {
        marginVertical: 4,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 10,
        alignItems: 'center',
    },

    modalView: {
        flex: 1,
        marginHorizontal: 20,
        justifyContent: 'space-between',
        marginVertical: 20,
    },

    button: {
        borderRadius: 16,
        padding: 15,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#3FC495",
        marginBottom: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: "bold",
    },
    
})