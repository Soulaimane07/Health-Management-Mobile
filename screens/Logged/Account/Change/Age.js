import { View, Text, StyleSheet, TextInput } from 'react-native'
import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Error from '../../../../Components/Error'
import { NavigateBtn } from '../../../../Components/Buttons'

export default function Age(props) {
    const [newAge, setNewAge] = useState(null)
    const condition = newAge <= Number(props.age)

    const age = {
        age: newAge,
    }

    const Submit = async () => {
        try {
          await AsyncStorage.mergeItem("user", JSON.stringify(age))
          props.CloseModal()
          props.getUser()
          console.log("==> User age is Updated!")
        } catch (e) {
          console.log("==> User age is not updated! "+e);
        }
    }

  return (
    <>
        <View>
            <Text style={{textAlign: "center", fontSize: 18, fontWeight: 'bold'}}> Change Your Age </Text>
            {newAge == props.age && 
                <View style={{marginTop: 10}}>
                    <Error text={`${props.age} is your current Age`} />
                </View>
            }
        </View>

        <View>
            <TextInput
                keyboardType="numeric" 
                maxLength={3} 
                style={styles.NumInput} 
                onChangeText={e => setNewAge(e)}
                defaultValue={props.age}
            />
        </View>

        <View>
            {NavigateBtn("SAVE", Submit, !condition)}
        </View>
    </>
  )
}

const styles = StyleSheet.create({
    NumInput: {
        marginHorizontal: "30%",
        fontSize: 26,
        textAlign: "center",
        borderBottomWidth: 1,
        borderColor: "#3FC495",
        paddingVertical: 6,
        marginTop: 20,
    },
})