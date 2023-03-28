import { View, Text, Image, StatusBar, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React, { useMemo, useRef, useState } from 'react'
import { NavigateBtn } from '../../../../Components/Buttons'
import Octions from "react-native-vector-icons/Octicons"

import { BottomSheetModal, BottomSheetModalProvider, BottomSheetScrollView } from '@gorhom/bottom-sheet'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

export default function Categorie({route}) {

    const benifits = [
        "Promote weight loss.", 
        "Reduce your risk of heart disease by lowering cholesterol levels.", 
        "Lower your chances of getting certain types of cancer, such as colon cancer.",
        "Manage diabetes by lowering A1C levels."
    ]

    const toAvoid = [
        { 
            "id": 1,
            "title":"Orange",
            "image":require("../../../../assets/images/logged/meals/food/orange.png"),
        },
        {
            "id": 2,
            "title":"Pomme",
            "image":require("../../../../assets/images/logged/meals/food/apple.png"),
        },
        {
            "id": 3,
            "title":"Avocat",
            "image":require("../../../../assets/images/logged/meals/food/avocado.png"),
        },
        {
            "id": 4,
            "title":"Pain blanc",
            "image":require("../../../../assets/images/logged/meals/food/baguette.png"),
        },
        {
            "id": 5,
            "title":"Amande",
            "image":require("../../../../assets/images/logged/meals/food/amande.png"),
        },
        {
            "id": 6,
            "title":"Avoine",
            "image":require("../../../../assets/images/logged/meals/food/avoine.png"),
        },
        {
            "id": 7,
            "title":"Chocolat au lait",
            "image":require("../../../../assets/images/logged/meals/food/barre-de-chocolat.png"),
        },
        {
            "id": 8,
            "title":"Cookies",
            "image":require("../../../../assets/images/logged/meals/food/biscuits.png"),
        },
        {
            "id": 9,
            "title":"Carrot",
            "image":require("../../../../assets/images/logged/meals/food/carrot.png"),
        },
        {
            "id": 10,
            "title":"Chou",
            "image":require("../../../../assets/images/logged/meals/food/chou.png"),
        },
    ]
    const toEat = [
        {
            "id": 11,
            "title":"Chou-Fleur",
            "image":require("../../../../assets/images/logged/meals/food/chou-fleur.png"),
        },
        {
            "id": 12,
            "title":"Couscous aux legumes",
            "image":require("../../../../assets/images/logged/meals/food/couscous.png"),
        },
        {
            "id": 13,
            "title":"Crevette",
            "image":require("../../../../assets/images/logged/meals/food/crevette.png"),
        },
        {
            "id": 14,
            "title":"Cake",
            "image":require("../../../../assets/images/logged/meals/food/cup-cake.png"),
        },
        {
            "id": 15,
            "title":"Jus d'orange",
            "image":require("../../../../assets/images/logged/meals/food/jus-dorange.png"),
        },
        {
            "id": 16,
            "title":"Noix",
            "image":require("../../../../assets/images/logged/meals/food/noix.png"),
        },
        {
            "id": 17,
            "title":"Oeuf",
            "image":require("../../../../assets/images/logged/meals/food/oeuf.png"),
        },
        { 
            "id": 1,
            "title":"Orange",
            "image":require("../../../../assets/images/logged/meals/food/orange.png"),
        },
        {
            "id": 2,
            "title":"Pomme",
            "image":require("../../../../assets/images/logged/meals/food/apple.png"),
        },
        {
            "id": 3,
            "title":"Avocat",
            "image":require("../../../../assets/images/logged/meals/food/avocado.png"),
        },
        {
            "id": 4,
            "title":"Pain blanc",
            "image":require("../../../../assets/images/logged/meals/food/baguette.png"),
        },
        {
            "id": 5,
            "title":"Amande",
            "image":require("../../../../assets/images/logged/meals/food/amande.png"),
        },
        {
            "id": 6,
            "title":"Avoine",
            "image":require("../../../../assets/images/logged/meals/food/avoine.png"),
        }
    ]

    const [SheetBody, setSheetBody] = useState(null)
    const refB = useRef(null)
    const snapPoints = useMemo(()=> ["50%", "90%"], [])
    const OpenModal = () => {
        refB.current?.present()
    }

    const data = route.params?.data

    const submit = () => {

    }

    const FoodTo = (title, food) => {
        return (
            <View style={{marginBottom: 30}}>
                <View style={{flexDirection: 'row', alignItems: "baseline", justifyContent: 'space-between'}}>
                    <Text style={{fontWeight: 'bold', marginBottom: 10}}> {title} </Text>
                    <TouchableOpacity onPress={()=> OpenModal() & setSheetBody({"title": title, "data": food})}>
                        <Text style={{fontWeight: 'bold', color: "#3FC495"}}> See All </Text>
                    </TouchableOpacity>
                </View>
                <View style={{marginLeft: 10, flexDirection:'row', flexWrap:'wrap'}}>
                    {food.map((item,key)=>(
                        key < 6 &&
                        <View key={key} style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10, width: "50%"}}>
                            <Octions name="dot-fill" color={"#3FC495"} />
                            <Image source={item.image} style={{width: 30, height: 30, marginLeft: 10}} />
                            <Text style={{marginLeft: 6}}> {item.title} </Text>
                        </View>
                    ))}
                </View>
            </View>
        )
    }

  return (
    <GestureHandlerRootView style={{flex: 1}}>
    <BottomSheetModalProvider>
        <View style={{flex: 1, backgroundColor: "white"}}>
            <StatusBar
                backgroundColor="transparent" 
                translucent={true}
                barStyle="light-content"
            />
            
            <Image style={{height: 240, width: "100%"}} source={data.image} />
            
            <ScrollView style={styles.body}>
                <View style={{}}>
                    <Text style={{fontWeight: 'bold', fontSize: 28}}>{data.title} </Text>
                    <Text style={{fontSize: 16, marginTop: 4, color: "#B2B2B2"}}>{data.text} </Text>
                </View>
                <Text style={{color: "#B2B2B2", marginVertical: 20, fontSize: 16, lineHeight: 22, marginHorizontal: 6}}>
                    It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal.
                </Text>
                
                <View style={{marginBottom: 30}}>
                    <Text style={{fontWeight: 'bold', marginBottom: 10}}> Vegan diet can help do the following: </Text>
                    <View style={{marginLeft: 10}}>
                        {benifits.map((item,key)=>(
                            <View key={key} style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}}>
                                <Octions name="dot-fill" color={"#3FC495"} />
                                <Text style={{marginLeft: 6}}> {item} </Text>
                            </View>
                        ))}
                    </View>
                </View>
                
                {FoodTo("Food to avoid:", toAvoid)}
                {FoodTo("Food to eat:", toEat)}

                <View style={{marginTop: 30}}>
                </View>
            </ScrollView>
            
            <View style={{paddingVertical: 20, paddingHorizontal: 20, backgroundColor: "white"}}>
                {NavigateBtn("Start", submit, true)}
            </View>
        </View>

        <BottomSheetModal
            ref={refB}
            index={0}
            snapPoints={snapPoints}
        >
            <BottomSheetScrollView style={styles.bottomSheet}>
                <Text style={{fontWeight: 'bold', textAlign: 'center', marginBottom: 20, marginTop: 10}}> {SheetBody?.title} </Text>
                {SheetBody?.data.map((item,key)=>(
                    <View key={key} style={{flexDirection: 'row', alignItems: 'center', marginBottom: 20}}>
                        <Image source={item.image} style={{width: 40, height: 40}} />
                        <Text style={{marginLeft: 16, fontSize: 16}}> {item.title} </Text>
                    </View>
                ))}
            </BottomSheetScrollView>
        </BottomSheetModal>
    </BottomSheetModalProvider>
    </GestureHandlerRootView>
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
    }
})