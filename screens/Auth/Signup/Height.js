import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useContext, useState } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { NavigateBtn } from '../../../Components/Buttons'
import { Progress } from '../../../Components/Headers'
import { PracticeContext } from '../../../Components/Context'

import Ficon from 'react-native-vector-icons/FontAwesome'

export default function Height({route, navigation}) {
    const {languageObj} = useContext(PracticeContext)
    let header = languageObj?.signup.height

    const system = route.params.system

    const [heightX, setHeightX] = useState(1)
    const [heightY, setHeightY] = useState(0)
    
    const [feetX, setfeetX] = useState(3)
    const [feetY, setfeetY] = useState(0)
    
    let condittion
    system == "eu" 
        ? condittion = heightX > 0 && heightY > 0
        : condittion = feetX >= 3 && feetY >= 0
    
    const heightkey = {
        height: {
            X: heightX,
            Y: Number(heightY),
        }
    }

    const feetKey = {
        height: {
            X: feetX,
            Y: feetY,
        }
    }
    
    const Submit = async () => {
        try {
          system == "eu" 
            ?   await AsyncStorage.mergeItem('user', JSON.stringify(heightkey))
            :   await AsyncStorage.mergeItem('user', JSON.stringify(feetKey))
          console.log("Height is stored");
          navigation.navigate('weight', {system: system})
        } catch (e) {
          console.log("Height isn't stored");
        }
    }



  return (
    <View style={styles.container}>
        {Progress({navigation}, header, 4)}

        <View style={styles.box}>
            {system === "eu" ?
            <>
                <TextInput
                    style={[styles.input, {width: 50}]}
                    keyboardType="numeric"
                    onChangeText={e => setHeightX(e)}
                    maxLength={1}
                    defaultValue={"1"}
                />
                <Ficon name="circle" style={{marginHorizontal: 10}} size={5} />
                <TextInput
                    style={[styles.input, {width: 100}]}
                    keyboardType="numeric"
                    maxLength={2}
                    onChangeText={e => setHeightY(e)}
                    defaultValue={"00"}
                />
                <Text style={{marginLeft: 10, fontSize: 20}}> {header.euUnit} </Text>
            </>
            :
            <>
                <TextInput
                    style={[styles.input, {width: 60}]}
                    keyboardType="numeric"
                    maxLength={1}
                    value={feetX}
                    defaultValue={"3"}
                    onChangeText={e => setfeetX(e)}
                />
                <Text style={{padding: 10, borderBottomWidth: 1, borderBottomColor: "#3FC495", marginLeft: 10, fontSize: 14}}> feet </Text>

                <TextInput
                    style={[styles.input, {width: 60, marginLeft: 20,}]}
                    keyboardType="numeric"
                    maxLength={4}
                    defaultValue={"00"}
                    onChangeText={e => setfeetY(e)}
                />
                <Text style={{padding: 10, borderBottomWidth: 1, borderBottomColor: "#3FC495", marginLeft: 10, fontSize: 14}}> inches </Text>
            </>
            }
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
    BtnBox: {
        marginHorizontal: 20,
        marginBottom: 20
    }
})