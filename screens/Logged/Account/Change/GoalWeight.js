import { View, Text, StyleSheet, TextInput } from 'react-native'
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function GoalWeight(props) {
    const [newWeight, setNewweight] = useState(0)
    const condition = newWeight == 0 || newWeight == props.Gweight

    const weight = {
        Gweight: newWeight,
    }

    const Submit = async () => {
        try {
          await AsyncStorage.mergeItem("user", JSON.stringify(weight))
          props.CloseModal()
          props.getUser()
          console.log("User's Goal Weight is Updated!")
        } catch (e) {
          console.log("User Goal Weight is not updated");
        }
    }

  return (
    <>
        <View>
            <Text style={{textAlign: "center", fontSize: 18, fontWeight: 'bold'}}> Change Your Goal Weight </Text>
        </View>

        <View>
            {newWeight == props.Gweight && <Text style={styles.error}> {props.Gweight} is your current Goal Weight </Text>}
            <TextInput 
                keyboardType="numeric" 
                maxLength={3} 
                style={styles.NumInput} 
                onChangeText={e => setNewweight(e)}
                defaultValue={props.Gweight}
            />
        </View>

        <TouchableOpacity
            onPress={Submit}
            disabled={condition ? true : false}
            style={condition ? styles.disabledBtn : styles.button}
        >
            <Text style={condition ? styles.disabledBtnText : styles.buttonText}> SAVE </Text>
        </TouchableOpacity>
    </>
  )
}

const styles = StyleSheet.create({
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
    },
    disabledBtnText: {
        color: '#adb5bd',
        fontWeight: 'bold',
        fontSize: 16,
    },
    

    NumInput: {
        marginHorizontal: "30%",
        fontSize: 26,
        textAlign: "center",
        borderBottomWidth: 1,
        borderColor: "#3FC495",
        paddingVertical: 6,
    },
    error: {
        color: "red",
        textAlign: "center",
        marginBottom: 20,
        fontWeight: 'bold',
    }
})