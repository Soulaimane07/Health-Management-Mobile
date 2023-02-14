import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { MyButton } from '../../Components/Buttons'

export default function First({navigation}) {
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
    <ImageBackground source={require('../../assets/auth/image3.jpg')} style={styles.container} >
        <StatusBar
            style="dark"
            hidden = {false} 
            backgroundColor = "transparent" 
            translucent = {true}
        />
        <Image 
            style={{width: 240, height: 240, marginTop: 60}}
            source={require('../../assets/logoPng.png')}
        />
        <View style={styles.buttons}>
            {buttons.map((item,key)=>(
                MyButton({navigation}, item.title, item.link)
            ))}
        </View>
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
    buttons: {
        marginBottom: 40,
        width: "90%",
    },
    
})