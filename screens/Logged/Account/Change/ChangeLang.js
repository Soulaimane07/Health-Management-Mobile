import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { NavigateBtn } from '../../../../Components/Buttons'
import { TouchableOpacity } from 'react-native-gesture-handler'

import Oicon from 'react-native-vector-icons/Octicons'
import Ficon from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function ChangeLang(props) {
    const [newLang, setnewlang] = useState(props.lang)
    const [newKey, setNewKey] = useState()

    const languages = [
        {
            "title":"Français",
            "val":"fr",
        },
        {
            "title":"English",
            "val":"en",
        },
        {
            "title":"العربية",
            "val":"ar",
        },
    ]

    const condition = props.lang == newLang

    const Sumbit = async () => {
        try {
            const langobj = {
                lang: languages[newKey].val,
            }
            await AsyncStorage.mergeItem('lang', JSON.stringify(langobj))
            console.log("Language is stored");
        } catch (e) {
            console.log("Language is not stored");
        }
        props.CloseModal()
    }


  return (
    <>
        <View style={{marginBottom: 20}}>
            <Text style={{textAlign: "center", fontSize: 18, fontWeight: 'bold'}}> Change Language display  </Text>
        </View>
        
        <View style={{marginHorizontal: 40}}>
            {languages.map((item,key)=>(
                <TouchableOpacity key={key} onPress={()=> setnewlang(item.title) & setNewKey(key)} style={Goalstyles.box}> 
                    <Text style={[{fontWeight: "bold", fontSize: 16}, item.title == newLang ? {color:'#3FC495'} : {color: "#adb5bd"}]}>
                        {item.title}
                    </Text>
                    {item.title === newLang 
                        ?    <Oicon name='check-circle-fill' color="#3FC495" size={24} />
                        :    <Ficon name='circle-thin' color="#adb5bd" size={27} />
                    }
                </TouchableOpacity>
            ))}
        </View>
        
        <View style={{marginHorizontal: 20}}>
            {NavigateBtn("SAVE", Sumbit, !condition)}
        </View>
    </>
  )
}


const Goalstyles = StyleSheet.create({
    box: {
        justifyContent: 'space-between',
        flexDirection: "row",
        marginVertical: 10,
        paddingVertical: 6,
        marginHorizontal: 20,
        alignItems: 'center',
    }
})