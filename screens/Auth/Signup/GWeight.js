import { View, Text, StyleSheet, TextInput } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Progress } from '../../../Components/Headers'
import { NavigateBtn } from '../../../Components/Buttons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Error from '../../../Components/Error'
import { PracticeContext } from '../../../Components/Context'

export default function GWeight({navigation}) {
    const {languageObj} = useContext(PracticeContext)
    let header = languageObj?.signup.Gweight

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

    const InputCondittion = () => {
        let x
        let Statement

        user.goal === "Gain Weight" ?
            <>
                {x= Number(user.weight) < weight}
                {weight <= Number(user?.weight) && weight != 0 ?
                    Statement = <Error text={`Your goal weight must be more than ${user.weight} kg`} />
                : ""}
            </>
        :
            <>
                {x= Number(user.weight) > weight}
                {weight >= Number(user?.weight) && weight != 0 ? 
                    Statement = <Error text={`Your goal weight must be less than ${user.weight} kg`} />
                : ""}
            </>

        return {x,Statement}
    }

    const [weight, setWeight] = useState(0)
    const condittion = weight > 0 && InputCondittion().x

    const weightKey = {
        Gweight: weight >= 0 && weight
    }

    const Submit = async () => {
        try {
          await AsyncStorage.mergeItem('user', JSON.stringify(weightKey))
          console.log("Goal Weight is stored");
          navigation.navigate('active')
        } catch (e) {
          console.log("Goal Weight isn't stored");
        }
    }

  return (
    <View style={styles.container}>
        {Progress({navigation}, header, 6)}

        <View>
            {InputCondittion().Statement}

            <View style={styles.box}>
                <TextInput
                    style={styles.input}
                    value={weight}
                    keyboardType="numeric"
                    maxLength={3}
                    onChangeText={e => setWeight(e)}
                />
                <Text style={{marginLeft: 10, fontSize: 20}}> {user?.system === "eu" ? languageObj?.signup.weight.euUnit : "Lbs"} </Text>
            </View>
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
    error: {
        color: "red",
        textAlign: "center",
        marginBottom: 20,
    },
    BtnBox: {
        marginHorizontal: 20,
        marginBottom: 20
    }
})