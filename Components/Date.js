import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export const DateHeader = () => {
    const date = new Date()
    const [active, setActive] = useState(2)

    const days = [
        {
            "title":"",
            "day":date.getDate()-2,
        },
        {
            "title":"",
            "day":date.getDate()-1,
        },
        {
            "title":"",
            "day":date.getDate(),
        },
        {
            "title":"",
            "day": date.getDate() === 31 ? 1 : date.getDate()+1,
        },
        {
            "title":"",
            "day":date.getDate() === 31 ? 2 : date.getDate()+2,
        },
    ]

    return (
        <View style={styles.callendar}>
            {days.map((item,key)=>(
                <TouchableOpacity onPress={()=> setActive(key)} key={key} style={active === key ? styles.active : styles.day}> 
                    <Text style={active === key ? styles.activeText : styles.text}> {item.day} </Text>
                </TouchableOpacity>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    callendar: {
        flexDirection: 'row',
        marginTop: 14,
    },
    active: {
        backgroundColor: "#3FC495",
        borderRadius: 18,
        flex: 2,
        padding: 2,
        marginHorizontal: 4,
    },
    day: {
        borderWidth: 1,
        borderColor: "#adb5bd",
        borderRadius: 18,
        flex: 1,
        padding: 2,
        marginHorizontal: 4,
    },
    text: {
        textAlign: 'center',
        backgroundColor: "white",
        marginHorizontal: 2,
        borderRadius: 16,
        fontWeight: 'bold',
        padding: 2,
        paddingVertical: 12,
        color: "#adb5bd"
    },
    activeText: {
        textAlign: 'center',
        backgroundColor: "white",
        marginHorizontal: 2,
        borderRadius: 16,
        fontWeight: 'bold',
        padding: 2,
        paddingVertical: 12,
        color: "#3FC495",
    }
})