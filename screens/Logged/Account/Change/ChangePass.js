import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Micon from "react-native-vector-icons/MaterialIcons"
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function ChangeFname(props) {
    const [oldPass, setOldPass] = useState("")
    const [newPass, setNewPass] = useState("")

    const condition1 = oldPass.toLowerCase() === props.pass.toLowerCase()
    const condition2 = newPass.length >= 8 && newPass.toLowerCase() !== props.pass.toLowerCase()
    const condition = condition1 && condition2

    const Pass = {
        pass: newPass,
    }

    const Submit = async () => {
        try {
          await AsyncStorage.mergeItem("user", JSON.stringify(Pass))
          props.CloseModal()
          props.getUser()
          console.log("User's Password is Updated!")
        } catch (e) {
          console.log("User Password is not updated");
        }
    }

    return (
    <>
        <View style={{marginBottom: 20}}>
            <Text style={{textAlign: "center", fontSize: 18, fontWeight: 'bold'}}> Change Your Password </Text>
            {condition1 || oldPass !== "" && 
                <View style={styles.error}>
                    <Micon color="red" name="error" size={20} />
                    <Text style={styles.errorText}> The old password is wrong ! </Text>
                </View>
            }
            {newPass.toLowerCase() === props.pass.toLowerCase() && 
                <View style={styles.error}>
                    <Micon color="red" name="error" size={20} />
                    <Text style={styles.errorText}> This is your current Password ! </Text>
                </View>
            }
            {newPass.length < 8 && 
                <View style={styles.error}>
                    <Micon color="red" name="error" size={20} />
                    <Text style={styles.errorText}> The Password must be more than 8 letters ! </Text>
                </View>
            }
        </View>

        <View>
            <TextInput
                autoComplete='password'
                secureTextEntry={true}
                style={styles.NumInput} 
                onChangeText={e => setOldPass(e)}
                placeholder="Your current Password"
            />
            <TextInput
                autoComplete='password'
                secureTextEntry={true}
                style={styles.NumInput} 
                onChangeText={e => setNewPass(e)}
                placeholder="Your New Password"
            />
        </View>

        <TouchableOpacity
            onPress={Submit}
            disabled={condition ? false : true}
            style={condition ? styles.button : styles.disabledBtn}
        >
            <Text style={condition ? styles.buttonText : styles.disabledBtnText}> SAVE </Text>
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
        fontSize: 22,
        textAlign: "center",
        borderBottomWidth: 1,
        borderColor: "#3FC495",
        paddingVertical: 6,
        marginVertical: 10,
    },
})