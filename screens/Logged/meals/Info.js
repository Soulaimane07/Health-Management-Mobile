import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, ScrollView, StatusBar } from 'react-native'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import Aicon from 'react-native-vector-icons/AntDesign'
import { MyButton } from '../../../Components/Buttons'
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import SheetBody from '../../../Components/sheetBody'

export default function Info({navigation}) {
    const data = [
       { 
            "title":"Orange",
            "image":require("../../../assets/meals/food/orange.png"),
            "cal": 50,
            "carbs": 11.7,
            "protein": 0.5,
            "fat": 0.1,
            "fibre": 2.4
        },
        {
            "title":"Pomme",
            "image":require("../../../assets/meals/food/apple.png"),
            "cal": 52,
            "carbs": 12,
            "protein": 0.3,
            "fat": 0.3,
            "fibre": 2.4
        },
        {
            "title":"Avocat",
            "image":require("../../../assets/meals/food/avocado.png"),
            "cal": 167,
            "carbs": 4.7,
            "protein": 2.1,
            "fat": 16.4,
            "fibre": 6.7
        },
        {
            "title":"Pain blanc",
            "image":require("../../../assets/meals/food/baguette.png"),
            "cal": 0,
            "carbs": 49.1,
            "protein": 9.2,
            "fat": 3.2,
            "fibre": 2.7
        },
        {
            "title":"Amande",
            "image":require("../../../assets/meals/food/amande.png"),
            "cal": 620,
            "carbs": 17,
            "protein": 20,
            "fat": 0.4,
            "fibre": 12
        },
        {
            "title":"Avoine",
            "image":require("../../../assets/meals/food/avoine.png"),
            "cal": 389,
            "carbs": 66.3,
            "protein": 16.9,
            "fat": 6.9,
            "fibre": 1.7
        },
        {
            "title":"Chocolat au lait",
            "image":require("../../../assets/meals/food/barre-de-chocolat.png"),
            "cal": 535,
            "carbs": 59.4,
            "protein": 7.6,
            "fat": 29.7,
            "fibre": 3.4
        },
        {
            "title":"Cookies",
            "image":require("../../../assets/meals/food/biscuits.png"),
            "cal": 474,
            "carbs": 63.9,
            "protein": 5.1,
            "fat": 23.3,
            "fibre": 6
        },
        {
            "title":"Carrot",
            "image":require("../../../assets/meals/food/carrot.png"),
            "cal": 33,
            "carbs": 6.7,
            "protein": 0.8,
            "fat": 0.3,
            "fibre": 3
        },
        {
            "title":"Chou",
            "image":require("../../../assets/meals/food/chou.png"),
            "cal": 22,
            "carbs": 2.8,
            "protein": 2.8,
            "fat": 0,
            "fibre": 3.4
        },
        {
            "title":"Chou-Fleur",
            "image":require("../../../assets/meals/food/chou-fleur.png"),
            "cal": 24,
            "carbs": 3.5,
            "protein": 2.4,
            "fat": 0,
            "fibre": 2.5
        },
        {
            "title":"Couscous aux legumes",
            "image":require("../../../assets/meals/food/couscous.png"),
            "cal": 114,
            "carbs": 18,
            "protein": 4.32,
            "fat": 2.25,
            "fibre": 2.8
        },
        {
            "title":"Crevette",
            "image":require("../../../assets/meals/food/crevette.png"),
            "cal": 119,
            "carbs": 1.5,
            "protein": 22.8,
            "fat": 1.7,
            "fibre": 0
        },
        {
            "title":"Cake",
            "image":require("../../../assets/meals/food/cup-cake.png"),
            "cal": 371,
            "carbs": 53.4,
            "protein": 5.3,
            "fat": 15.1,
            "fibre": 3.7
        },
        {
            "title":"Jus d'orange",
            "image":require("../../../assets/meals/food/jus-dorange.png"),
            "cal": 5.7,
            "carbs": 10.4,
            "protein": 0.7,
            "fat": 0.2,
            "fibre": 0.2
        },
        {
            "title":"Noix",
            "image":require("../../../assets/meals/food/noix.png"),
            "cal": 677,
            "carbs": 14.3,
            "protein": 15,
            "fat": 62.2,
            "fibre": 7
        },
        {
            "title":"Oeuf",
            "image":require("../../../assets/meals/food/oeuf.png"),
            "cal": 155,
            "carbs": 1.1,
            "protein": 12.6,
            "fat": 10.6,
            "fibre": 0
        },
    ]
    const [selected, setSelected] = useState(0)

    const refB = useRef(null)
    const snapPoints =  useMemo(()=> ["70%"])
    const [IsOpen, setIsOpen] = useState(false)

    const OpenModal = () => {
        refB.current?.present()
        setTimeout(() => {
            setIsOpen(true)
        }, 120);
    }
    const CloseModal = () => {
        refB.current?.close()
        setTimeout(() => {
            setIsOpen(false)
        }, 120);
    }


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
                />
            </View>
            
            <ScrollView vertical style={{paddingTop: 10, paddingHorizontal: 20,}}>
                {data.map((item,key)=>(
                    <TouchableOpacity onPress={()=> OpenModal() & setSelected(key)} style={[styles.item, key+1 == data?.length && {marginBottom: "60%"}]} key={key}>
                        <View style={{alignItems: 'center', flexDirection: 'row'}}>
                            <Image source={item.image} style={[{marginRight: 20, width: 40, height: 40}]} />
                            <Text style={{fontSize: 16}}> {item.title} </Text>
                        </View>
                        <Aicon name="pluscircleo" size={20} />
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <View style={styles.BtnBox}>
                {MyButton(navigation, "Finish", 'breakfast', null)}
            </View>
        </View>

        <BottomSheetModal 
            ref={refB}
            index={0}
            snapPoints={snapPoints}
            onDismiss={()=> setIsOpen(false)}
        >
            <View style={styles.modalView}>
            <SheetBody data={data[selected]} CloseModal={CloseModal} />
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
    }
    
})