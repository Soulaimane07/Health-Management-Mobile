import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Age(props) {
    const [newAge, setNewAge] = useState(0)
    const condition = newAge <= Number(props.age)

    const age = {
        age: newAge,
    }

    const Submit = async () => {
        try {
          await AsyncStorage.mergeItem("user", JSON.stringify(age))
          console.log("User's age is Updated!")
        } catch (e) {
          console.log("User age is not updated");
        }
    }

  return (
    <>
        <View>
            <Text style={{textAlign: "center", fontSize: 18, fontWeight: 'bold'}}> Change Your Age </Text>
        </View>

        <View>
            {newAge == props.age && <Text style={styles.error}> {props.age} is your current Age </Text>}
            <TextInput
                keyboardType="numeric" 
                maxLength={3} 
                style={styles.NumInput} 
                onChangeText={e => setNewAge(e)}
                defaultValue={props.age}
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