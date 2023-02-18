import React, { useState } from 'react'
import {StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Ficon from 'react-native-vector-icons/FontAwesome'
import Oicon from 'react-native-vector-icons/Octicons'
import Statusbar from '../../../Components/Statusbar'

export default function Dietary() {
    const [selected, setSelect] = useState(null)

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

  return (
    <View style={styles.container}>
        <Statusbar color="#3FC495" style="light" />
        <Text style={styles.text}>FOOD PREFERENCES</Text>
        <View style={styles.box}>
            {food.map((item,key)=>(
                <TouchableOpacity onPress={()=> setSelect(item.val)} key={key} style={styles.row}>
                    <Text style={styles.row1key}> {item.label} </Text>
                    {item.value 
                        ?    <Oicon name='check-circle-fill' color="#3FC495" size={24} />
                        :    <Ficon name='circle-thin' color="#adb5bd" size={27} />
                    }
                </TouchableOpacity>    
            ))}
        </View>
        
        <Text style={styles.text}>ALLERGIES</Text>
        <View style={styles.box}>
            {ALLERGIES.map((item,key)=>(
                <TouchableOpacity onPress={()=> setSelect(item.val)} key={key} style={styles.row}>
                    <Text style={styles.row1key}> {item.label} </Text>
                    {item.value 
                        ?    <Oicon name='check-circle-fill' color="#3FC495" size={24} />
                        :    <Ficon name='circle-thin' color="#adb5bd" size={27} />
                    }
                </TouchableOpacity>    
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