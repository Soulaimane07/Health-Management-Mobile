import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground } from 'react-native'
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
    <ImageBackground source={require('../../assets/auth/image1.jpg')} style={!show ? {backgroundColor: "white", flex: 1, justifyContent: 'center', alignItems: 'center'} : styles.container} >
        <StatusBar
            style="dark"
            hidden = {false} 
            backgroundColor = "transparent" 
            translucent = {true}
        />
        <Image 
            style={!show ? {width: 300, height: 300} : {width: 240, height: 240, marginTop: 60}}
            source={require('../../assets/logoPng.png')}
        />
        {show &&
            <View style={styles.buttons}>
                <View style={styles.para}>
                    <Text style={styles.text}> Healthy eating. </Text>
                    <Text style={styles.text}> Simplified. </Text>
                </View>
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
    </ImageBackground>
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

    para: {
        marginBottom: 40,
        paddingHorizontal: 20,
        color: "white"
    },
    text: {
        textAlign: 'center',
        fontSize: 30,
        color: "white"
    },
})