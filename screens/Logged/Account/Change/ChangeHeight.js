import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Ficon from 'react-native-vector-icons/FontAwesome'

export default function ChangeHeight(props) {
    const [newHeightX, setNewHeightX] = useState(props.height?.x)
    const [newHeightY, setNewHeightY] = useState(props.height?.y)
    const condition = newHeightX < Number(props.height?.x) | newHeightY == Number(props.height?.y)

    const height = {
        height: {
            x: newHeightX,
            y: newHeightY,
        }
    }

    const Submit = async () => {
        try {
          await AsyncStorage.mergeItem("user", JSON.stringify(height))
          console.log("User's age is Updated!")
        } catch (e) {
          console.log("User age is not updated");
        }
    }

  return (
    <>
        <View>
            <Text style={{textAlign: "center", fontSize: 18, fontWeight: 'bold'}}> Change Your Height </Text>
        </View>


        <View style={{flexDirection: "row", justifyContent: 'center', alignItems: 'flex-end'}}>
            
            <TextInput
                keyboardType="numeric" 
                maxLength={1} 
                style={[styles.NumInput, {width: 50}]}
                onChangeText={e => setNewHeightX(e)}
                defaultValue={props.height?.x}
            />
            <Ficon name="circle" style={{marginHorizontal: 10}} size={5} />
            <TextInput
                keyboardType="numeric" 
                maxLength={2} 
                style={[styles.NumInput, {width: 100}]}
                onChangeText={e => setNewHeightY(e)}
                defaultValue={props.height?.y}
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