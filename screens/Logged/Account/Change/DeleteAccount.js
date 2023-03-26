import { View, Text, StyleSheet, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NavigateBtn } from '../../../../Components/Buttons'
import Error from '../../../../Components/Error'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

export default function DeleteAccount(props) {
    const [number, setNumber] = useState(0)
    const [Gnumber, setGnumber] = useState(0)
    
    useEffect(() => {
        setGnumber(Math.floor(Math.random() * 100000000 + 10000000))
    }, []) 
    
    const condition = number != Gnumber

    console.log(props.user);

    const Submit = async () => {
        try {
            axios.delete(`http://192.168.1.36:3001/users/${props.user.userId}`)
                .then(res => {
                    console.log(res.data);
                    console.log("==> User is deleted!");
                    
                    axios.delete(`http://192.168.1.36:3001/usersDetails/${props.user._id}`)
                        .then(res => {
                            console.log(res.data);
                            console.log("==> User Details is deleted!");
                            console.log("==> User account is deleted!"),
                            props.CloseModal()
                            
                            AsyncStorage.clear(),
                            props.setLogged(false)
                            props.navigation.navigate("first")
                        })
                })
        } catch (e) {
            console.log("==> User Logout fun is not working! "+e);
        }
    }

    return (
    <>
        <View style={{marginBottom: 20}}>
            <Text style={{textAlign: "center", fontSize: 18, fontWeight: 'bold'}}> Delete your Account </Text>
            <View style={{marginTop: 10}}>
                <Error text={"Are you sure !"} />
            </View>
        </View>

        <View>
            <Text style={{fontSize: 22, fontWeight: '', textAlign: 'center'}}> Enter this code to confirm </Text>
            <Text style={{color: "red", fontSize: 22, fontWeight: 'bold', textAlign: 'center', letterSpacing: 1,}}> {Gnumber} </Text>
            <TextInput
                keyboardType="numeric" 
                style={styles.NumInput} 
                onChangeText={e => setNumber(e)}
            />
        </View>

        <View style={{marginHorizontal: 20}}>
            {NavigateBtn("Delete", Submit, !condition)}
        </View>
    </>
  )
}

const styles = StyleSheet.create({
    NumInput: {
        marginHorizontal: "20%",
        fontSize: 26,
        textAlign: "center",
        borderBottomWidth: 1,
        borderColor: "#3FC495",
        paddingVertical: 6,
        marginTop: 20,
    },
})