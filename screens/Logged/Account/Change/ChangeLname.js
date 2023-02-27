import { View, Text, StyleSheet, TextInput } from 'react-native'
import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { NavigateBtn } from '../../../../Components/Buttons'
import Error from '../../../../Components/Error'

export default function ChangeFname(props) {
    const [newLname, setNewLname] = useState(props.lname)
    const condition = newLname.toLowerCase() === props.lname.toLowerCase()

    const Lname = {
        lname: newLname,
    }

    const Submit = async () => {
        try {
          await AsyncStorage.mergeItem("user", JSON.stringify(Lname))
          props.CloseModal()
          props.getUser()
          console.log("==> User's Last name is Updated!")
        } catch (e) {
          console.log("==> User Last name is not updated! "+e);
        }
    }

    return (
    <>
        <View style={{marginBottom: 20}}>
            <Text style={{textAlign: "center", fontSize: 18, fontWeight: 'bold'}}> Change Your Last Name </Text>
            {condition && 
                <View style={{marginTop: 10}}>
                    <Error text={`This name is your current Last name !`} />
                </View>
            }
        </View>

        <View>
            <TextInput
                autoComplete='name-family'
                style={styles.NumInput} 
                onChangeText={e => setNewLname(e)}
                defaultValue={props.lname}
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