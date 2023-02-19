import { View, Text, StyleSheet, TextInput } from 'react-native'
import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { NavigateBtn } from '../../../../Components/Buttons'
import Error from '../../../../Components/Error'

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
          props.getUser()
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
                <View style={{marginTop: 10}}>
                    <Error text={`This name is your current First name !`} />
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

        <View style={{marginHorizontal: 20}}>
            {NavigateBtn("SAVE", Submit, !condition)}
        </View>
    </>
  )
}

const styles = StyleSheet.create({
    NumInput: {
        marginHorizontal: "20%",
        fontSize: 26,
        textAlign: "center",
        borderBottomWidth: 1,
        borderColor: "#3FC495",
        paddingVertical: 6,
    },
})