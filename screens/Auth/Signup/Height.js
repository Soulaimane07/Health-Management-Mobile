import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { NavigateBtn } from '../../../Components/Buttons'
import { Progress } from '../../../Components/Headers'

import Ficon from 'react-native-vector-icons/FontAwesome'

export default function Height({navigation}) {
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

    const [heightX, setHeightX] = useState(0)
    const [heightY, setHeightY] = useState(0)

    const condittion = heightX > 0 && heightY > 0

    const heightkey = {
        height: {
            x: heightX,
            y: heightY,
        }
    }
    
    const Submit = async () => {
        try {
          await AsyncStorage.mergeItem('user', JSON.stringify(heightkey))
          console.log("Height is stored");
          navigation.navigate('weight')
        } catch (e) {
          console.log("Height isn't stored");
        }
    }

  return (
    <View style={styles.container}>
        {Progress({navigation}, 4)}

        <View style={styles.box}>
            {user?.system === "eu" ?
            <>
                <TextInput
                    style={[styles.input, {width: 50}]}
                    keyboardType="numeric"
                    onChangeText={e => setHeightX(e)}
                    maxLength={1}
                />
                <Ficon name="circle" style={{marginHorizontal: 10}} size={5} />
                <TextInput
                    style={[styles.input, {width: 100}]}
                    keyboardType="numeric"
                    maxLength={2}
                    onChangeText={e => setHeightY(e)}
                />
                <Text style={{marginLeft: 10, fontSize: 20}}> meter </Text>
            </>
            :
            <>
                <TextInput
                    style={[styles.input, {width: 60}]}
                    keyboardType="numeric"
                    maxLength={2}
                    onChangeText={e => setHeightX(e)}
                />
                <Text style={{padding: 10, borderBottomWidth: 1, borderBottomColor: "#3FC495", marginLeft: 10, fontSize: 14}}> feet </Text>

                <TextInput
                    style={[styles.input, {width: 60, marginLeft: 20,}]}
                    keyboardType="numeric"
                    maxLength={2}
                    onChangeText={e => setHeightY(e)}
                />
                <Text style={{padding: 10, borderBottomWidth: 1, borderBottomColor: "#3FC495", marginLeft: 10, fontSize: 14}}> inches </Text>
            </>
            }
        </View>

        {NavigateBtn({navigation}, "Next", Submit, condittion)}
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'space-between',
    },
    choise: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    choose: {
        backgroundColor: "white",
        padding: 14,
        width: 60,
        marginHorizontal: 6,
        textAlign: 'center',
        borderRadius: 16,
        fontWeight: 'bold',
    },
    active: {
        backgroundColor: "#3FC495",
        color: "white",
        padding: 14,
        width: 60,
        marginHorizontal: 6,
        textAlign: 'center',
        borderRadius: 16,
        fontWeight: 'bold',
    },
    input: {
        fontSize: 26,
        textAlign: "center",
        borderBottomWidth: 1,
        borderColor: "#3FC495",
        paddingVertical: 6,
    },
    
    
    box: {
        margin: 10,
        marginBottom: 30,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
})