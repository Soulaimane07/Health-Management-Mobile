import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { Progress } from '../../../Components/Headers'
import { NavigateBtn } from '../../../Components/Buttons'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function System({navigation}) {
    const [system, setSystem] = useState(null)
    const condittion = system !== null

    const systems = [
        {
            "title": "US system",
            "val":"us",
            "image": require("../../../assets/auth/us.png"),
            "units": "feet, inches, pounds, calories"
        },
        {
            "title": "European system",
            "val":"eu",
            "image": require("../../../assets/auth/eu.png"),
            "units": "m, kg, calories"
        },
    ]

    const systemobj = {
        system: system !== null && systems[system].val
    }

    const Submit = async () => {
        try {
          await AsyncStorage.mergeItem('user', JSON.stringify(systemobj))
          console.log("system is stored");
          navigation.navigate('birth')
        } catch (e) {
          console.log("system isn't stored");
        }
    }

  return (
    <View style={styles.container}>
        {Progress({navigation}, 2)}

        <View style={styles.boxs}>
            {systems.map((item,key)=>(
                <TouchableOpacity onPress={()=> setSystem(key)} style={[system === key ? {backgroundColor: "#3FC495"} : {backgroundColor: "white"}, styles.box]} key={key}>
                    <Image source={item.image} style={{width: 70, height: 50, borderRadius: 8}} />
                    <View style={{marginLeft: 10,}}>
                        <Text style={[system === key && {color: "white"}, {fontSize: 18, fontWeight: 'bold'}]}> {item.title} </Text>
                        <Text style={[system === key && {color: "white"}]}> {item.units} </Text>
                    </View>
                </TouchableOpacity>
            ))}
        </View>
        
        <View style={styles.BtnBox}>
            {NavigateBtn("Next", Submit, condittion)}
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'space-between',
    },
    boxs: {
        padding: 30,
    },
    box: {
        marginVertical: 10,
        padding: 20,
        borderRadius: 16,
        flexDirection: 'row',
        alignItems: 'center'
    },
    BtnBox: {
        marginHorizontal: 20,
        marginBottom: 20
    }
})