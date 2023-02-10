import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import BouncyCheckbox from 'react-native-bouncy-checkbox'

const Header = (text) => {
    return(
        <View>
            <Text style={{textAlign: "center", fontSize: 18, fontWeight: 'bold'}}> {text} </Text>
        </View>
    )
}

export const Goal = (goal) => {
    const [newGaol, setNewGoal] = useState(goal)
    const condition = newGaol === goal

    const goals = [
        {
          "title":"Lose Weight",
          "isCheked": newGaol === "Lose Weight" ? true : false,
        },
        {
          "title":"Maintain Weight",
          "isCheked": newGaol === "Maintain Weight" ? true : false,
        },
        {
          "title":"Gain Weight",
          "isCheked": newGaol === "Gain Weight" ? true : false,
        },
    ]

    return (
        <>
            {Header("Change Your Goal")}
            
            <View>
                {goals.map((item,key)=>(
                    <View key={key} style={Goalstyles.box}> 
                        <Text onPress={()=> setNewGoal(item.title)} style={{fontSize: 16}}>{item.title}</Text>
                        <BouncyCheckbox
                            size={24}
                            fillColor="#3FC495"
                            isCheked={item.isChecked}
                            isChecked={item.isCheked}
                            onPress={()=> setNewGoal(item.title)}
                        />
                    </View>
                ))}
                <Text> {newGaol} </Text>
                <Text> {goal} </Text>
            </View>

            <TouchableOpacity
                disabled={condition ? true : false}
                style={condition ? styles.disabledBtn : styles.button}
            >
                <Text style={condition ? styles.disabledBtnText : styles.buttonText}> SAVE </Text>
            </TouchableOpacity>
        </>
    )
}

const Goalstyles = StyleSheet.create({
    box: {
        justifyContent: 'space-between',
        flexDirection: "row",
        marginVertical: 10,
        paddingLeft: 16,
        paddingVertical: 6,
    }
})

const styles = StyleSheet.create({
    hr1: {
        backgroundColor: "#e9ecef",
        height: 1,
        marginVertical: 10, 
    },


    button: {
        borderRadius: 16,
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#3FC495",
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    disabledBtn: {
        borderRadius: 16,
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "white",
        marginBottom: 10,
        // borderWidth: 1,
        // borderColor: "#adb5bd",
    },
    disabledBtnText: {
        color: '#adb5bd',
        fontSize: 16,
    },
    

    textInput: {
        borderWidth: 1.6,  
        borderColor: '#3FC495',
        fontSize: 16,
        borderRadius: 16,
        padding: 10,
        paddingHorizontal: 20,
        textAlign: 'center',
    },

})