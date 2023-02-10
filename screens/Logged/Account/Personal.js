import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import {StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import FaIcon from 'react-native-vector-icons/FontAwesome'
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Goal } from '../../../Components/ChangeData'
import GoalChange from '../../../Components/GoalChange'

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

    const Goals = [
        {
            "label":"Goal",
            "value": user.goal,
            "change": <GoalChange goal={user?.goal} />
        },
        {
            "label":"Goal Weight",
            "value": user.Gweight,
            "change":""
        },
    ]

    const Details = [
        {
            "label":"Current Weight",
            "value": user.weight,
        },
        {
            "label":"Height",
            "value": user.height,
        },
        {
            "label":"Age",
            "value": user.age ,
        },
        {
            "label":"Gender",
            "value": user.sex,
        },
    ]

    const refB = useRef(null)
    const snapPoints = useMemo(()=> ["46%"], [])

    const OpenModal = () => {
        refB.current?.present()
    }
    
  return (
    <GestureHandlerRootView style={{flex: 1,}}>
    <BottomSheetModalProvider>
        <View style={styles.container}>
            <Text style={styles.text}> YOUR GOAL </Text>
            <View style={styles.box}>
                {Goals.map((item,key)=>(
                    <TouchableOpacity key={key} onPress={()=> OpenModal() & setSheetBody(item.change) }>
                    <View>
                        <View style={styles.row1}>
                            <Text style={styles.row1key}> {item.label} </Text>
                            <View style={styles.row1value}>
                                <Text style={styles.rowText}> {item.value} </Text>
                                <FaIcon style={styles.rowicon} name="angle-right" size={26} color="#adb5bd" />
                            </View>
                        </View>
                        {key+1 !== Goals.length && <View style={styles.hr1}></View>}
                    </View>
                    </TouchableOpacity>
                ))}
            </View>

            <Text style={styles.text}> DETAILS </Text>
            <View style={styles.box}>
                {Details.map((item,key)=>(
                    <TouchableOpacity key={key} onPress={()=> OpenModal() & setSheetBody(item.change)}>
                    <View style={styles.row1}>
                        <Text style={styles.row1key}> {item.label} </Text>
                        <View style={styles.row1value}>
                            <Text style={styles.rowText}> {item.value} </Text>
                            <FaIcon style={styles.rowicon} name="angle-right" size={26} color="#adb5bd" />
                        </View>
                    </View>
                    {key+1 !== Details.length && <View style={styles.hr1}></View>}
                    </TouchableOpacity>
                ))}
            </View>
        </View>

        <BottomSheetModal
            ref={refB}
            index={0}
            snapPoints={snapPoints}
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
        // backgroundColor: "#6c757d",
        flex: 1,
    },
    text: {
        fontSize: 16,
        marginTop: 20,
        marginBottom: 10,
        color: "#6c757d",
    },
    box: {
        backgroundColor: "white",
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
        backgroundColor: "#e9ecef",
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