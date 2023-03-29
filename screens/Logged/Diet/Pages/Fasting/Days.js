import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { NavigateBtn } from '../../../../../Components/Buttons'

export default function Days() {

    const [day, setDay] = useState(null)

    const Submit = () => {

    }

    const days = [
        {
            "Title":"Monday",
        },
        {
            "Title":"Tusday",
        },
        {
            "Title":"Wednesday",
        },
        {
            "Title":"Thursday",
        },
        {
            "Title":"Friday",
        },
        {
            "Title":"Saturday",
        },
        {
            "Title":"Sunday",
        },
        
    ]

  return (
    <View style={{justifyContent: 'space-between', flex: 1, margin: 20}}>
        <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 20, marginTop: 10}}>Choose 2 Fasting Days</Text>

        <View>
            {days.map((item,key)=>(
                <TouchableOpacity onPress={()=> setDay(key+1)} key={key} style={[{borderRadius: 16, paddingVertical: 16, marginVertical: 4, backgroundColor: "white"}, day == key+1 && {backgroundColor: "#655DBB"}]}>
                    <Text style={[{fontSize: 18, marginLeft: 16}, day == key+1 && {color: "white", fontWeight: 'bold'}]}> {item.Title} </Text>
                </TouchableOpacity>
            ))}
        </View>

        <View>
            {NavigateBtn("Continue", Submit, day !== null, "#655DBB")}
        </View>
    </View>
  )
}