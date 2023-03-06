import { View, Text, StyleSheet, TextInput } from 'react-native'
import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { NavigateBtn } from '../../../../Components/Buttons'
import Error from '../../../../Components/Error'

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
          console.log("==> User's Password is Updated!")
        } catch (e) {
          console.log("==> User Password is not updated! "+e);
        }
    }

    return (
    <>
        <View style={{marginBottom: 20}}>
            <Text style={{textAlign: "center", fontSize: 18, fontWeight: 'bold'}}> Change Your Password </Text>
            {condition1 || oldPass !== "" && 
                <View style={{marginTop: 10}}>
                    <Error text={`The old password is wrong `} />
                </View>
            }
            {newPass.toLowerCase() === props.pass.toLowerCase() && 
                <View style={{marginTop: 10}}>
                    <Error text={`This is your current Password !`} />
                </View>
            }
            {newPass.length < 8 && 
                <View style={{marginTop: 10}}>
                    <Error text={`The Password must be more than 8 letters !`} />
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

        <View style={{marginHorizontal: 20}}>
            {NavigateBtn("SAVE", Submit, condition)}
        </View>
    </>
  )
}

const styles = StyleSheet.create({
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