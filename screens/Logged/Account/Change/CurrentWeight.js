import { View, Text, StyleSheet, TextInput } from 'react-native'
import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Error from '../../../../Components/Error'
import { NavigateBtn } from '../../../../Components/Buttons'

export default function CurrentWeight(props) {
    const [newWeight, setNewweight] = useState(0)
    const condition = newWeight == 0 || newWeight == props.weight

    const weight = {
        CWeight: newWeight,
    }

    const Submit = async () => {
        try {
          await AsyncStorage.mergeItem("user", JSON.stringify(weight))
          props.CloseModal()
          console.log("==> User Weight is Updated!")
        } catch (e) {
          console.log("==> User Weight is not updated! "+e);
        }
    }

    console.log(props.weight);

  return (
    <>
        <View>
            <Text style={{textAlign: "center", fontSize: 18, fontWeight: 'bold'}}> Change Your Current Weight </Text>
            {newWeight == props.weight && 
                <View style={{marginTop: 10}}>
                    <Error text={`${props.weight} is your current Weight !`} />
                </View>
            }
        </View>

        <View>
            <TextInput
                keyboardType="numeric" 
                maxLength={3} 
                style={styles.NumInput} 
                onChangeText={e => setNewweight(e)}
                defaultValue={props.weight}
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