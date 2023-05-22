import { View, Text, StyleSheet, TextInput } from 'react-native'
import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { NavigateBtn } from '../../../../Components/Buttons'
import Error from '../../../../Components/Error'

export default function GoalWeight(props) {
    const [newWeight, setNewweight] = useState(0)
    const condition = newWeight == 0 || newWeight == props.Gweight

    const weight = {
        GWeight: newWeight,
    }

    const Submit = async () => {
        try {
          await AsyncStorage.mergeItem("user", JSON.stringify(weight))
          props.CloseModal()
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
            {newWeight == props.Gweight && <Error text={`${props.Gweight} is your current Goal Weight`} />}
            <TextInput 
                keyboardType="numeric" 
                maxLength={3} 
                style={styles.NumInput} 
                onChangeText={e => setNewweight(e)}
                defaultValue={props.Gweight}
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