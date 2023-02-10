import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import Oicon from 'react-native-vector-icons/Octicons'
import Ficon from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Gender(props) {
    const [newSex, setNewSex] = useState(props.sex)
    const condition = newSex === props.sex

    const sexObj = [
        {
            "title":"Female",
        },
        {
            "title":"Male",
        }
    ]

    const sex = {
        sex: newSex,
    }

    const Submit = async () => {
        try {
          await AsyncStorage.mergeItem("user", JSON.stringify(sex))
          console.log("User's Sex is Updated!")
        } catch (e) {
          console.log("User Sex is not updated");
        }
    }

  return (
    <>
        <View>
            <Text style={{textAlign: "center", fontSize: 18, fontWeight: 'bold'}}> Change Your Sex </Text>
        </View>
        
        <View>
            {sexObj.map((item,key)=>(
                <TouchableOpacity 
                    key={key} 
                    onPress={()=> setNewSex(item.title)} 
                    style={Goalstyles.box}
                > 
                    <Text style={[{fontWeight: "bold", fontSize: 16}, item.title === newSex ? {color:'#3FC495'} : {color: "#adb5bd"}]}>
                        {item.title}
                    </Text>
                    {item.title === newSex 
                        ?    <Oicon name='check-circle-fill' color="#3FC495" size={24} />
                        :    <Ficon name='circle-thin' color="#adb5bd" size={27} />
                    }
                </TouchableOpacity>
            ))}
        </View>

        <TouchableOpacity
            onPress={Submit}
            disabled={condition ? true : false}
            style={condition ? styles.disabledBtn : styles.button}
        >
            <Text style={condition ? styles.disabledBtnText : styles.buttonText}> SAVE </Text>
        </TouchableOpacity>
    </>
  )
}

const Goalstyles = StyleSheet.create({
    box: {
        justifyContent: 'space-between',
        flexDirection: "row",
        marginVertical: 10,
        paddingVertical: 6,
        marginHorizontal: 20,
        alignItems: 'center',
    }
})

const styles = StyleSheet.create({
    button: {
        borderRadius: 16,
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#3FC495",
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    disabledBtn: {
        borderRadius: 16,
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "white",
    },
    disabledBtnText: {
        color: '#adb5bd',
        fontWeight: 'bold',
        fontSize: 16,
    },
    

    NumInput: {
        marginHorizontal: "30%",
        fontSize: 26,
        textAlign: "center",
        borderBottomWidth: 1,
        borderColor: "#3FC495",
        paddingVertical: 6,
    },
    error: {
        color: "red",
        textAlign: "center",
        marginBottom: 20,
        fontWeight: 'bold',
    }
})