import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import Micon from "react-native-vector-icons/MaterialIcons"

export default function DeleteAccount(props) {
    const [number, setNumber] = useState(0)
    const [Gnumber, setGnumber] = useState(0)
    
    useEffect(() => {
        setGnumber(Math.floor(Math.random() * 100000000 + 10000000))
    }, []) 
    
    const condition = number != Gnumber

    const Submit = async () => {
        try {
            props.CloseModal()
        } catch (e) {
            console.log("User Profile is not updated!");
        }
    }

    return (
    <>
        <View style={{marginBottom: 20}}>
            <Text style={{textAlign: "center", fontSize: 18, fontWeight: 'bold'}}> Delete your Account </Text>
            <View style={styles.error}>
                <Micon color="red" name="error" size={20} />
                <Text style={styles.errorText}> Are you sure ! </Text>
            </View>
        </View>

        <View>
            <Text style={{fontSize: 22, fontWeight: '', textAlign: 'center'}}> Enter this code to confirm </Text>
            <Text style={{color: "red", fontSize: 22, fontWeight: 'bold', textAlign: 'center', letterSpacing: 1,}}> {Gnumber} </Text>
            <TextInput
                keyboardType="numeric" 
                style={styles.NumInput} 
                onChangeText={e => setNumber(e)}
            />
        </View>

        <TouchableOpacity
            onPress={Submit}
            disabled={condition}
            style={condition ? styles.disabledBtn : styles.button}
        >
            <Text style={condition ? styles.disabledBtnText : styles.buttonText}> Delete </Text>
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
      marginHorizontal: 20,
      marginTop: 20,
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
        marginHorizontal: 20,
    },
    disabledBtnText: {
        color: '#adb5bd',
        fontWeight: 'bold',
        fontSize: 16,
    },

    error: {
      textAlign: "center",
      marginTop: 10,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    },
    errorText: {
      fontWeight: 'bold',
      color: "red",
    },

    NumInput: {
        marginHorizontal: "20%",
        fontSize: 26,
        textAlign: "center",
        borderBottomWidth: 1,
        borderColor: "#3FC495",
        paddingVertical: 6,
        marginTop: 20,
    },
})