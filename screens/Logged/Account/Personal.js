import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import {StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import FaIcon from 'react-native-vector-icons/FontAwesome'
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import GoalChange from './Change/GoalChange'
import GoalWeight from './Change/GoalWeight'
import CurrentWeight from './Change/CurrentWeight'
import Age from './Change/Age'
import Gender from './Change/Gender'
import ChangeHeight from './Change/ChangeHeight'

export function Personal() {
    const [user, setUser] = useState("null")
    const [SheetBody, setSheetBody] = useState(null)

    useEffect(() => {
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

    const Hunit = user?.system === "eu" ? "m" : "f/in"
    const Wunit = user?.system === "eu" ? "Kg" : "Lbs"

    const Goals = [
        {
            "label":"Goal",
            "value": user.goal,
            "change": <GoalChange goal={user?.goal} />
        },
        {
            "label":"Goal Weight",
            "value": `${user.Gweight} ${Wunit}`,
            "change": <GoalWeight Gweight={user?.Gweight} />
        },
    ]

    const Details = [
        {
            "label":"Current Weight",
            "value": `${user.weight} ${Wunit}`,
            "change": <CurrentWeight weight={user?.weight} />,
        },
        {
            "label":"Height",
            "value": `${user?.height?.x}.${user?.height?.y} ${Hunit}`,
            "change": <ChangeHeight height={user?.height} />,
        },
        {
            "label":"Age",
            "value": user.age ,
            "change": <Age age={user?.age} />,
        },
        {
            "label":"Gender",
            "value": user.sex,
            "change": <Gender sex={user?.sex} /> ,
        },
    ]

    const refB = useRef(null)
    const snapPoints = useMemo(()=> ["50%"], [])
    const [IsOpen, setIsOpen] = useState(false)
    const OpenModal = () => {
        refB.current?.present()
        setTimeout(() => {
            setIsOpen(true)
        }, 120);
    }
    
  return (
    <GestureHandlerRootView style={{flex: 1}}>
    <BottomSheetModalProvider>
        <View style={[styles.container, IsOpen && {backgroundColor: "#2C3333"}]}>
            <Text style={styles.text}> YOUR GOAL </Text>
            <View style={[styles.box, IsOpen ? {backgroundColor:"#374040"} : {backgroundColor: "white"}]}>
                {Goals.map((item,key)=>(
                    <TouchableOpacity key={key} onPress={()=> OpenModal() & setSheetBody(item.change) }>
                        <View style={styles.row1}>
                            <Text style={[styles.row1key, IsOpen && {color: "#adb5bd"}]}> {item.label} </Text>
                            <View style={styles.row1value}>
                                <Text style={styles.rowText}> {item.value} </Text>
                                <FaIcon style={styles.rowicon} name="angle-right" size={26} color="#adb5bd" />
                            </View>
                        </View>
                        {key+1 !== Goals.length && <View style={[styles.hr1, IsOpen ? {backgroundColor: "#4F5C5C"} : {backgroundColor: "#e9ecef",}]}></View>}
                    </TouchableOpacity>
                ))}
            </View>

            <Text style={styles.text}> DETAILS </Text>
            <View style={[styles.box, IsOpen ? {backgroundColor:"#374040"} : {backgroundColor: "white"}]}>
                {Details.map((item,key)=>(
                    <TouchableOpacity key={key} onPress={()=> OpenModal() & setSheetBody(item.change)}>
                        <View style={styles.row1}>
                            <Text style={[styles.row1key, IsOpen && {color: "#adb5bd"}]}> {item.label} </Text>
                            <View style={styles.row1value}>
                                <Text style={styles.rowText}> {item.value} </Text>
                                <FaIcon style={styles.rowicon} name="angle-right" size={26} color="#adb5bd" />
                            </View>
                        </View>
                    {key+1 !== Details.length && <View style={[styles.hr1, IsOpen ? {backgroundColor: "#4F5C5C"} : {backgroundColor: "#e9ecef",}]}></View>}
                    </TouchableOpacity>
                ))}
            </View>
        </View>


        <BottomSheetModal
            ref={refB}
            index={0}
            snapPoints={snapPoints}
            onDismiss={()=> setIsOpen(false)}
        >
            <View style={styles.bottomSheet}>
                {SheetBody}
            </View>
        </BottomSheetModal>
    </BottomSheetModalProvider>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        flex: 1,
    },
    text: {
        fontSize: 16,
        marginTop: 20,
        marginBottom: 10,
        color: "#6c757d",
    },
    box: {
        padding: 20,
        paddingVertical: 10,
        borderRadius: 16,
        overflow: 'hidden',
    },
    row1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
    },
    row1key: {
        flexDirection: 'row',
        alignItems: 'center',
        fontSize: 16,
    },
    row1value: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rowText: {
        color: "#adb5bd",
    },
    rowicon: {
        marginLeft: 8,
        color: "#ced4da",
    },



    hr1: {
        height: 1,
        marginVertical: 10, 
    },
    bottomSheet: {
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        flex: 1,
        marginBottom: 20,
    },
})