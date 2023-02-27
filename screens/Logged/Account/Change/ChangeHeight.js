import { View, Text, StyleSheet, TextInput } from 'react-native'
import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Ficon from 'react-native-vector-icons/FontAwesome'
import Micon from 'react-native-vector-icons/MaterialCommunityIcons'
import { NavigateBtn } from '../../../../Components/Buttons'

export default function ChangeHeight(props) {
    const [newHeightX, setNewHeightX] = useState(null)
    const [newHeightY, setNewHeightY] = useState(null)
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
            <Text style={{textAlign: "center", fontSize: 18, fontWeight: 'bold'}}> Change Your Height </Text>
        </View>

        <View style={{flexDirection: "row", justifyContent: 'center', alignItems: 'flex-end'}}>
            <TextInput
                keyboardType="numeric" 
                maxLength={props.system === "eu" ? 1 : 2} 
                style={[styles.NumInput, {width: 50}]}
                onChangeText={e => setNewHeightX(e)}
                defaultValue={JSON.stringify(props.height?.x)}
            />
            {props.system === "eu" 
                ?   <Ficon name="circle" style={{marginHorizontal: 10}} size={5} />
                :   <Micon name="slash-forward" color="#434242" size={40} />
            }
            <TextInput
                keyboardType="numeric" 
                maxLength={2} 
                style={[styles.NumInput, props.system === "eu" ? {width: 100} : {width: 50} ]}
                onChangeText={e => setNewHeightY(e)}
                defaultValue={props.height?.y}
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
        fontSize: 26,
        textAlign: "center",
        borderBottomWidth: 1,
        borderColor: "#3FC495",
        paddingVertical: 6,
    },
})