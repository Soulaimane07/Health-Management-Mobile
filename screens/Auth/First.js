import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'

export default function First({navigation}) {
    const [show, setShow] = useState(false)
    
    useEffect(() => {
        setTimeout(() => {
            setShow(true)
        }, 3000)
    }, [])

    const buttons = [
        {
            'title':"Login",
            'link':"login",
        },
        {
            'title':"Continue Without Account",
            'link':"home",
        },
    ]

  return (
    <SafeAreaView style={!show ? {backgroundColor: "white", flex: 1, justifyContent: 'center', alignItems: 'center'} : styles.container}>
        <StatusBar
            style="dark"
            hidden = {false} 
            backgroundColor = "white" 
            translucent = {true}
        />
        <Image 
            style={!show ? {width: 300, height: 300} : {width: 240, height: 240, marginTop: 60}}
            source={require('../../assets/logo.jpg')}
        />
        {show &&
            <View style={styles.buttons}>
                {buttons.map((item,key)=>(
                    <TouchableOpacity
                        key={key}
                        style={styles.button}
                        onPress={() => navigation.navigate(item.link)}
                    >
                        <Text style={styles.buttonText}> {item.title} </Text>
                    </TouchableOpacity>
                ))}
            </View>
        }
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    logo: {
        width: 200,
        height: 200,
        marginTop: 60,
    },
    buttons: {
        marginBottom: 40,
        width: "90%",
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
    },
})