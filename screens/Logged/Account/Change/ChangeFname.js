import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Micon from "react-native-vector-icons/MaterialIcons"
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function ChangeFname(props) {
    const [newFname, setNewfname] = useState(props.fname)
    const condition = newFname.toLowerCase() === props.fname.toLowerCase()

    const Fname = {
        fname: newFname,
    }

    const Submit = async () => {
        try {
          await AsyncStorage.mergeItem("user", JSON.stringify(Fname))
          props.CloseModal()
          console.log("User's First name is Updated!")
        } catch (e) {
          console.log("User First name is not updated");
        }
    }

    return (
    <>
        <View style={{marginBottom: 20}}>
            <Text style={{textAlign: "center", fontSize: 18, fontWeight: 'bold'}}> Change Your First Name </Text>
            {condition && 
                <View style={styles.error}>
                    <Micon color="red" name="error" size={20} />
                    <Text style={styles.errorText}> This nale is your current First name ! </Text>
                </View>
            }
        </View>

        <View>
            <TextInput
                autoComplete="name"
                style={styles.NumInput} 
                onChangeText={e => setNewfname(e)}
                defaultValue={props.fname}
            />
        </View>

        <TouchableOpacity
            onPress={Submit}
            disabled={condition}
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
    },
})