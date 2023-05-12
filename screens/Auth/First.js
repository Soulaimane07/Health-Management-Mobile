import { View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { StatusBar } from 'expo-status-bar'
import { MyButton, NavigateBtn } from '../../Components/Buttons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { PracticeContext } from '../../Components/Context'

export default function First({route, navigation}) {
    const {lang, setLang, languageObj} = useContext(PracticeContext)
    
    const SelectLang = async (val) => {
        try {
            setLang(val)
            const langobj = {
                lang: val,
            }
            console.log(`language will be stored: ${langobj.lang}`);
            await AsyncStorage.setItem('lang', JSON.stringify(langobj))
            const value = await AsyncStorage.getItem('lang')
            console.log("Language is stored");
            console.log(value);
        } catch (e) {
            console.log("Language is not stored");
        }
    }

    const langs = languageObj

    const buttons = [
        {
            'title': langs?.first.login,
            'link':"login",
        }
    ]

    const langsObj = [
        {
            "title":"English",
            "val":"en"
        },
        {
            "title":"français",
            "val":"fr"
        }
    ]

  return (
    <ImageBackground source={require('../../assets/images/auth/bg/first.jpg')} style={styles.container} >
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
                <View key={key}>
                    {MyButton(navigation, item.title, item.link)}
                </View>
            ))}

            <View style={{marginTop: 10, flexDirection: 'row', justifyContent: 'space-evenly'}}>
                {langsObj.map((item,key)=>(
                    <TouchableOpacity onPress={()=> SelectLang(item.val)} key={key} style={[item.val == lang && {borderBottomColor:"#3FC495", borderBottomWidth: 2}, {padding: 10, paddingHorizontal: 20}]}>
                        <Text style={[item.val == lang && {fontWeight: 'bold'}, {color: "white"}]}> {item.title} </Text>
                    </TouchableOpacity>
                ))}
            </View>
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