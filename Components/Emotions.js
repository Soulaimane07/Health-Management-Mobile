import { View, Text, StyleSheet, Image } from 'react-native'
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { NavigateBtn } from './Buttons'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Emotions(props) {
    const emotions = [
        {
            "title":"Bad",
            "image": require('../assets/images/logged/emotions/angry.png'),
        },
        {
            "title":"Nice",
            "image": require('../assets/images/logged/emotions/smile.png'),
        },
        {
            "title":"Very Good",
            "image": require('../assets/images/logged/emotions/happy.png'),
        },
    ]
    const [emotion, setEmotion] = useState(null)

    const Submit = async () => {
        try {
            AsyncStorage.mergeItem('user', JSON.stringify({emotion: emotion}))
            props.CloseModal()
        }
        catch(e) {
            console.log(e);
        }
    }

  return (
    <View style={[{width: "100%", flex: 1, justifyContent: 'space-between', marginVertical: 10}]}>
        <View>
            <Text style={{textAlign: 'center', fontSize: 18, fontWeight: 'bold', marginBottom: 10}}> Are you happy with our app? </Text>
            {emotion !== null && <Text style={{textAlign: 'center', fontSize: 18, fontWeight: 'bold', color:"#3FC495"}}> Thank you for your time </Text>}
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
            {emotions.map((item,key)=>(
                <TouchableOpacity onPress={()=> setEmotion(item.title)} key={key} style={[styles.emotion, item.title === emotion && styles.active]}>
                    <Image source={item.image} style={{width: 50, height: 50, marginBottom: 14}} />
                    <Text style={item.title === emotion && {color: "white"}}> {item.title} </Text>
                </TouchableOpacity>
            ))}
        </View>

        <View style={{marginHorizontal: 20}}>
            { NavigateBtn("Send", Submit, emotion !== null)}
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    emotion: {
        alignItems: 'center', 
        borderRadius: 16, 
        paddingVertical: 10, 
        width: 100,
    },
    active: {
        backgroundColor: "#3FC495",
    },
})