import React, { useContext, useMemo, useRef, useState } from 'react'
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
import Statusbar from '../../../Components/Statusbar'
import { PracticeContext } from '../../../Components/Context'

export function Personal() {
    const {user} = useContext(PracticeContext)


    let Hunit, Wunit, separator, height, Cweight, Gweight
    user?.system === "eu" && (Hunit= "m", separator=".", Wunit="Kg")
    user?.system === "us" && (Hunit= "f/in", separator="/", Wunit="Lbs")

    user?.height && (height = `${user?.height?.x}${separator}${user?.height?.y} ${Hunit}`)
    user?.weight && (Cweight = `${user?.weight} ${Wunit}`)
    user?.Gweight && (Gweight = `${user?.Gweight} ${Wunit}`)

    const [SheetBody, setSheetBody] = useState(null)
    const refB = useRef(null)
    const snapPoints = useMemo(()=> ["50%"], [])
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

    const Goals = [
        {
            "label":"Goal",
            "value": user?.goal,
            "change": <GoalChange goal={user?.goal} CloseModal={CloseModal} />
        },
        {
            "label":"Goal Weight",
            "value": Gweight,
            "change": <GoalWeight Gweight={user?.Gweight} CloseModal={CloseModal} />
        },
    ]

    const Details = [
        {
            "label":"Current Weight",
            "value": Cweight,
            "change": <CurrentWeight weight={user?.weight} CloseModal={CloseModal} />,
        },
        {
            "label":"Height",
            "value": height,
            "change": <ChangeHeight height={user?.height} system={user?.system} CloseModal={CloseModal} />,
        },
        {
            "label":"Age",
            "value": user?.age && `${user?.age} years`,
            "change": <Age age={user?.age} CloseModal={CloseModal} />,
        },
        {
            "label":"Gender",
            "value": user?.sex,
            // "change": <Gender sex={user?.sex} CloseModal={CloseModal} /> ,
        },
    ]

    user?.goal === "Maintain Weight" && Goals.splice(1, 1);
    
  return (
    <GestureHandlerRootView style={{flex: 1}}>
    <Statusbar color="#3FC495" style="light" />
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
                    item.change ?
                        <TouchableOpacity key={key} onPress={()=> OpenModal() & setSheetBody(item.change)}>
                            <View style={styles.row1}>
                                <Text style={[styles.row1key, IsOpen && {color: "#adb5bd"}]}> {item.label} </Text>
                                <View style={styles.row1value}>
                                    <Text style={styles.rowText}> {item.value} </Text>
                                    <FaIcon style={styles.rowicon} name="angle-right" size={26} color="#adb5bd" />
                                </View>
                            </View>
                            <View style={[styles.hr1, IsOpen ? {backgroundColor: "#4F5C5C"} : {backgroundColor: "#e9ecef",}]}></View>
                        </TouchableOpacity>
                    :
                        <View key={key}>
                            <View style={styles.row1}>
                                <Text style={[styles.row1key, IsOpen && {color: "#adb5bd"}]}> {item.label} </Text>
                                <View style={styles.row1value}>
                                    <Text style={styles.rowText}> {item.value} </Text>
                                </View>
                            </View>
                        </View>
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