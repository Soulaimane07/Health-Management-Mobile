import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { NavigateBtn } from '../../../../Components/Buttons'

import Ficon from 'react-native-vector-icons/FontAwesome'
import Oicon from 'react-native-vector-icons/Octicons'
import Statusbar from '../../../../Components/Statusbar'

export default function Page1({navigation}) {
    const [box, setBox] = useState(0)

    const goals = [
        {
          "title": "No food preference",
          "val":"Lose Weight",
        },
        {
          "title": "Vegetarian",
          "val":"Maintain Weight",
        },
        {
          "title": "Vegan",
          "val":"Gain Weight",
        },
        {
            "title": "Pescetarian",
            "val":"Gain Weight",
          },
    ]

    const Submit = () => {
        navigation.navigate("dietTest2")
    }

  return (
    <View style={{flex: 1, justifyContent: 'space-between', backgroundColor: "white",}}>
        <Statusbar color="#3FC495" style="light" />
        <View>
            <View style={styles.header}>
                <Text style={{marginBottom: 5, fontSize: 12, color: "white"}}> QUESTION 1 OF 7 </Text>
                <Text style={{fontSize: 22, color: "white"}}> What is your food preference? </Text>
            </View>

            <View style={{marginTop: 10, marginLeft: 40, paddingVertical: 20}}>
                {goals.map((item,key)=>(
                    <TouchableOpacity style={[styles.box,  box === key && styles.active]} key={key} onPress={()=> setBox(key)}>
                        {box === key 
                            ?   <Oicon name='check-circle-fill' color="#3FC495" size={24} />
                            :   <Ficon name='circle-thin' color="#adb5bd" size={27} />
                        }
                        
                        <Text style={{marginLeft: 14}}>{item.title}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>

        <View style={{margin: 20}}>
            <Text style={{marginBottom: 10, color: "gray", textAlign: 'center'}}> You can change your preference in settings. </Text>
            {NavigateBtn("Next", Submit, true)}
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    box: {
        marginVertical: 10,
        fontWeight: 'bold',
        borderRadius: 16,
        backgroundColor: "white",
        color: "#adb5bd",
        paddingVertical: 10,
        flexDirection: 'row', 
        alignItems: 'center'
    },
    header: {
        backgroundColor: "#3FC495",
        paddingHorizontal: 20,
        paddingTop: 30,
        paddingBottom: 16
    },
})

