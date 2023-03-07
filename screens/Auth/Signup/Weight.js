import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { NavigateBtn } from '../../../Components/Buttons'
import { PracticeContext } from '../../../Components/Context'
import { Progress } from '../../../Components/Headers'

export default function Weight({navigation}) {
    const {languageObj} = useContext(PracticeContext)
    let header = languageObj?.signup.weight

    const [user, setUser] = useState("null")

    useEffect(() => {
        async function getUser(){
          const value = await AsyncStorage.getItem('user')
          const val = JSON.parse(value)
          if(value !== null) {
              console.log(value);
              setUser(val)
          }
        }
        getUser();
    }, []) 
    
    const [weight, setWeight] = useState(0)
    const condittion = weight > 0

    const weightKey = {
        weight: weight >= 0 && weight
    }
    
    const Submit = async () => {
        try {
          await AsyncStorage.mergeItem('user', JSON.stringify(weightKey))
          console.log("Weight is stored");
          const user = await AsyncStorage.getItem('user')
          const val = JSON.parse(user)
          navigation.navigate(val.goal !== "Maintain Weight" ? 'gweight' : 'active')
        } catch (e) {
          console.log("Weight isn't stored");
        }
    }

  return (
    <View style={styles.container}>
        {Progress({navigation}, header, 5)}

        <View style={styles.box}>
            <TextInput
                style={styles.input}
                value={weight}
                keyboardType="numeric"
                onChangeText={e => setWeight(e)}
            />
            <Text style={{marginLeft: 10, fontSize: 20}}> {header.euUnit} </Text>
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
    input: {
        fontSize: 26,
        width: 100,
        textAlign: "center",
        borderBottomWidth: 1,
        borderColor: "#3FC495",
        paddingVertical: 6,
    },
    box: {
        margin: 10,
        marginBottom: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    BtnBox: {
        marginHorizontal: 20,
        marginBottom: 20
    }
})