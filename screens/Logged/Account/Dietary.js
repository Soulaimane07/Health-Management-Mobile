import React, { useState } from 'react'
import {StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import BouncyCheckbox from "react-native-bouncy-checkbox";

export default function Dietary() {

    const food = [
        {
            "label":"Vegan",
            "value": true,
            "val":"vegan"
        },
        {
            "label":"Vegetarian",
            "value": false,
            "val":"vegetarian",
        },
        {
            "label":"Pescetarian",
            "value": false,
            "val":"pescetarian",
        }
    ]

    const ALLERGIES = [
        {
            "label":"Allergic to nuts",
            "value": false,
            "val":"nuts",
        },
        {
            "label":"Allergic to fish",
            "value": false,
            "val":"fish",
        },
        {
            "label":"Allergic to shellfish",
            "value": false,
            "val":"shellfish",
        },
        {
            "label":"Allergic to egg",
            "value": false,
            "val":"egg",
        },
        {
            "label":"Allergic to milk",
            "value": true,
            "val":"milk",
        },
        {
            "label":"Allergic to intolerant",
            "value": false,
            "val":"intolerant",
        },
    ]

    let condittion = selected === null

    const [selected, setSelect] = useState(null)

  return (
    <View style={styles.container}>
        <Text style={styles.text}>FOOD PREFERENCES</Text>
        <View style={styles.box}>
            {food.map((item,key)=>(
                <View key={key} style={styles.row}>
                    <Text style={styles.row1key}> {item.label} </Text>
                    <BouncyCheckbox
                        size={24}
                        fillColor="#3FC495"
                        isChecked={item.value}
                        onPress={()=> setSelect(item.val)}
                    />
                </View>    
            ))}
        </View>
        
        <Text style={styles.text}>ALLERGIES</Text>
        <View style={styles.box}>
            {ALLERGIES.map((item,key)=>(
                <View key={key} style={styles.row}>
                    <Text onPress={()=> setSelect(item.val)} style={styles.row1key}> {item.label} </Text>
                    <BouncyCheckbox
                        size={24}
                        fillColor="#3FC495"
                        isChecked={item.value}
                        onPress={()=> setSelect(item.val)}
                    />
                </View>    
            ))}
        </View>

        <Text> {selected} </Text>

        <View style={styles.Btnbox}>
            <TouchableOpacity 
                disabled={condittion ? true : false}
                style={condittion ? styles.disabled : styles.button}
            >
                <Text style={condittion ? styles.disabledtext : styles.buttonText}> SAVE </Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}


const styles = StyleSheet.create({
    container: {
        margin: 20,
        position: 'relative',
        flex: 1,
    },
    box: {
        backgroundColor: "white",
        padding: 20,
        paddingVertical: 10,
        borderRadius: 16,
        marginBottom: 20,
    },
    text: {
        fontSize: 16,
        marginTop: 20,
        marginBottom: 10,
        color: "#6c757d",
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
    },
    row1key: {
        flexDirection: 'row',
        alignItems: 'center',
        fontSize: 16,
    },

    Btnbox: {
        position: "absolute",
        bottom: 0,
        width: "100%",
    },
    button: {
        borderRadius: 16,
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#3FC495",
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    disabled: {
        borderRadius: 16,
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "white",
    },
    disabledtext: {
        color: '#adb5bd',
        fontSize: 16,
        fontWeight: 'bold',
    },
})