import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { NavigateBtn } from '../../../../Components/Buttons'

import Ficon from 'react-native-vector-icons/FontAwesome'
import Oicon from 'react-native-vector-icons/Octicons'
import Statusbar from '../../../../Components/Statusbar'

export default function Page1({navigation}) {
    const [box, setBox] = useState(null)
    const condittion = box != null

    const goals = [
        {
            "title": "Keto - Ultra low carb",
        },
        {
            "title": "Fasting - Skipping meals",
        },
        {
            "title": "Low carb - Slightly less carbs & more fat",
        },
        {
            "title": "Clean eating - Nutritious & fresh food",
        },
        {
            "title": "Classic - Just plain, healthy food",
        },
        {
            "title": "High protein - Extra protein boost for muscle building",
        },
        {
            "title": "Paleo - Only whole, unprocessed foods",
        },
        {
            "title": "No requirements",
        },
    ]

    const Submit = () => {
        navigation.navigate("dietTest3")
    }

  return (
    <View style={{flex: 1, justifyContent: 'space-between', backgroundColor: "white",}}>
        <Statusbar color="#3FC495" style="light" />
        <View>
            <View style={styles.header}>
                <Text style={{marginBottom: 5, fontSize: 12, color: "white"}}> QUESTION 2 OF 7 </Text>
                <Text style={{fontSize: 22, color: "white"}}>Do you have any specific dietary requirement? </Text>
            </View>

            <ScrollView style={{marginTop: 10, marginLeft: 40, paddingVertical: 20}}>
                {goals.map((item,key)=>(
                    <TouchableOpacity style={[styles.box,  box === key && styles.active]} key={key} onPress={()=> setBox(key)}>
                        {box === key 
                            ?   <Oicon name='check-circle-fill' color="#3FC495" size={24} />
                            :   <Ficon name='circle-thin' color="#adb5bd" size={27} />
                        }
                        
                        <Text style={{marginLeft: 14}}>{item.title}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>

        <View style={{margin: 20}}>
            {NavigateBtn("Next", Submit, condittion)}
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