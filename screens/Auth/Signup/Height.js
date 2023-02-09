import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { NavigateBtn } from '../../../Components/Buttons'
import { Progress } from '../../../Components/Headers'

import Ficon from 'react-native-vector-icons/FontAwesome'

export default function Height({navigation}) {
    const heightObj = [
        {
            "title":"ft/in",
            "value":"ft",
        },
        {
            "title":"m",
            "value":"m",
        }
    ]

    const [heightX, setHeightX] = useState(0)
    const [heightY, setHeightY] = useState(0)

    const [obj, setObj] = useState(0)
    const condittion = heightX > 0 && heightY > 0

    const height = {
        x: heightX,
        y: heightY,
        unite: heightObj[obj].title
    }

    const heightkey = {
        height: heightX >= 0 && heightY >= 0 && `${height}`
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
        {Progress({navigation}, 3)}

        <View>
            <View style={styles.box}>
                {obj === 1 ?
                <>
                <TextInput
                    style={[styles.input, {width: 50}]}
                    keyboardType="numeric"
                    value={heightX}
                    onChangeText={e => setHeightX(e)}
                    maxLength={1}
                />
                <Ficon name="circle" style={{marginHorizontal: 10}} size={5} />
                <TextInput
                    style={[styles.input, {width: 100}]}
                    keyboardType="numeric"
                    value={heightY}
                    maxLength={2}
                    onChangeText={e => setHeightY(e)}
                />
                </>
                :
                <>
                <TextInput
                    style={[styles.input, {width: 60}]}
                    keyboardType="numeric"
                    value={height}
                    maxLength={2}
                    onChangeText={e => setHeightX(e)}
                />
                <Text style={{padding: 10, borderBottomWidth: 1, borderBottomColor: "#3FC495", marginLeft: 10, fontSize: 14}}> feet </Text>

                <TextInput
                    style={[styles.input, {width: 60, marginLeft: 20,}]}
                    keyboardType="numeric"
                    value={height}
                    maxLength={2}
                    onChangeText={e => setHeightY(e)}
                />
                <Text style={{padding: 10, borderBottomWidth: 1, borderBottomColor: "#3FC495", marginLeft: 10, fontSize: 14}}> inches </Text>

                </>
                }
            </View>

            <View style={styles.choise}>
                {heightObj.map((item,key)=>(
                    <Text onPress={()=> setObj(key)} key={key} style={obj === key ? styles.active : styles.choose}> {item.title} </Text>
                ))}
            </View>
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