import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Oicon from 'react-native-vector-icons/Octicons'
import Ficon from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { NavigateBtn } from '../../../../Components/Buttons'

export default function GoalChange(props) {
    const [newGaol, setNewGoal] = useState(props.goal)
    const condition = newGaol === props.goal

    const goals = [
        {
          "title":"Lose Weight",
        },
        {
          "title":"Maintain Weight",
        },
        {
          "title":"Gain Weight",
        },
    ]

    const goal = {
        goal: newGaol,
    }

    const Submit = async () => {
        try {
          await AsyncStorage.mergeItem("user", JSON.stringify(goal))
          props.CloseModal()
          console.log("User's Goal is Updated!")
        } catch (e) {
          console.log("User goal is not updated");
        }
    }

  return (
    <>
        <View>
            <Text style={{textAlign: "center", fontSize: 18, fontWeight: 'bold'}}> Change Your Goal </Text>
        </View>

        <View>
            {goals.map((item,key)=>(
                <TouchableOpacity key={key} onPress={()=> setNewGoal(item.title)} style={Goalstyles.box}> 
                    <Text style={[{fontWeight: "bold", fontSize: 16}, item.title === newGaol ? {color:'#3FC495'} : {color: "#adb5bd"}]}>
                        {item.title}
                    </Text>
                    {item.title === newGaol 
                        ?    <Oicon name='check-circle-fill' color="#3FC495" size={24} />
                        :    <Ficon name='circle-thin' color="#adb5bd" size={27} />
                    }
                </TouchableOpacity>
            ))}
        </View>

        <View>
            {NavigateBtn("SAVE", Submit, !condition)}
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