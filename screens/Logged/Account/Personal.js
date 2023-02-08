import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import FaIcon from 'react-native-vector-icons/FontAwesome'

export function Personal() {
    const [user, setUser] = useState("null")

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
        },
        {
            "label":"Goal Weight",
            "value": user.Gweight,
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
            "label":"Date of birth",
            "value": "",
        },
        {
            "label":"Gender",
            "value": user.sex,
        },
    ]

  return (
    <View style={styles.container}>
        <Text style={styles.text}> YOUR GOAL </Text>
        <View style={styles.box}>
            {Goals.map((item,key)=>(
                <View key={key}>
                    <View style={styles.row1}>
                        <Text style={styles.row1key}> {item.label} </Text>
                        <View style={styles.row1value}>
                            <Text style={styles.rowText}> {item.value} </Text>
                            <FaIcon style={styles.rowicon} name="angle-right" size={26} color="#adb5bd" />
                        </View>
                    </View>
                    {key+1 !== Goals.length && <View style={styles.hr1}></View>}
                </View>
            ))}
        </View>

        <Text style={styles.text}> DETAILS </Text>
        <View style={styles.box}>
            {Details.map((item,key)=>(
                <>
                <View key={key} style={styles.row1}>
                    <Text style={styles.row1key}> {item.label} </Text>
                    <View style={styles.row1value}>
                        <Text style={styles.rowText}> {item.value} </Text>
                        <FaIcon style={styles.rowicon} name="angle-right" size={26} color="#adb5bd" />
                    </View>
                </View>
                {key+1 !== Details.length && <View style={styles.hr1}></View>}
                </>
            ))}
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
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
})