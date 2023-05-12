import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useContext, useState } from 'react'
import { Progress } from '../../../Components/Headers'
import { NavigateBtn } from '../../../Components/Buttons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { PracticeContext } from '../../../Components/Context'

export default function System({navigation}) {
    const {lang, languageObj} = useContext(PracticeContext)
    let header = languageObj?.signup.system

    const [system, setSystem] = useState(0)
    const condittion = system !== null

    const systems = [
        {
            "title": languageObj?.signup.system.eu,
            "val":"eu",
            "image": require("../../../assets/images/auth/eu.png"),
            "units": languageObj?.signup.system.euUnits
        },
    ]

    const systemobj = {
        system: system !== null && systems[system].val
    }

    const Submit = async () => {
        try {
          await AsyncStorage.mergeItem('user', JSON.stringify(systemobj))
          console.log("system is stored");
          navigation.navigate('birth', {
            system: systemobj.system,
          })
        } catch (e) {
          console.log("system isn't stored");
        }
    }

  return (
    <View style={styles.container}>
        {Progress({navigation}, header, 2)}

        <View style={styles.boxs}>
            {systems.map((item,key)=>(
                <TouchableOpacity onPress={()=> setSystem(key)} style={[system === key ? {backgroundColor: "#3FC495"} : {backgroundColor: "white"}, lang == "ar" && {justifyContent: 'space-between'}, styles.box]} key={key}>
                    <Image source={item.image} style={{width: 70, height: 50, borderRadius: 8}} />
                    <View style={{marginLeft: 10,}}>
                        <Text style={[system === key && {color: "white"}, {fontSize: 18, fontWeight: 'bold'}]}> {item.title} </Text>
                        <Text style={[system === key && {color: "white"}]}> {item.units} </Text>
                    </View>
                </TouchableOpacity>
            ))}
        </View>
        
        <View style={styles.BtnBox}>
            {NavigateBtn(languageObj?.signup.next, Submit, condittion)}
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
        alignItems: 'center',
    },
    BtnBox: {
        marginHorizontal: 20,
        marginBottom: 20
    }
})