import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import Micon from "react-native-vector-icons/MaterialIcons"
import AsyncStorage from '@react-native-async-storage/async-storage'
import { BottomSheetScrollView } from '@gorhom/bottom-sheet'

export default function ChangeProfile(props) {
    const [click, setClick] = useState(props.profile)
    const condittion1 = click === props.profile
    const val = {
        profile: click,
    }

    const Submit = async () => {
        try {
        await AsyncStorage.mergeItem('user', JSON.stringify(val))
        props.CloseModal()
        console.log("User Profile is updated!");
        } catch (e) {
        console.log("User Profile is not updated!");
        }
    }

  return (
    <>
      <View style={{marginBottom: 20}}>
          <Text style={{textAlign: "center", fontSize: 18, fontWeight: 'bold'}}> Change Your Avatar </Text>
          {click == props.profile && 
            <View style={styles.error}>
              <Micon color="red" name="error" size={20} />
              <Text style={styles.errorText}> This avatar is your current avatar ! </Text>
            </View>
          }
      </View>

      <BottomSheetScrollView contentContainerStyle={{paddingBottom: "60%", justifyContent: 'center', flexDirection:'row', flexWrap:'wrap', alignItems: 'flex-start'}}> 
          {props.profiles?.map((item,key)=>( 
              <TouchableOpacity key={key} onPress={()=> setClick(key)} style={[key == click && {backgroundColor: "#3FC495"}, styles.profile1]}>
                  <Image source={item.image} style={{width: "100%", height: "100%"}} />
              </TouchableOpacity>
          ))}
      </BottomSheetScrollView>

      {click !== props.profile &&
          <TouchableOpacity
              onPress={Submit}
              disabled={condittion1 ? true : false}
              style={condittion1 ? styles.disabledBtn : styles.button}
          >
              <Text style={condittion1 ? styles.disabledBtnText : styles.buttonText}> SAVE </Text>
          </TouchableOpacity>
      }
    </>
  )
}

const styles = StyleSheet.create({
  profile1: {
    borderRadius: 16,
    padding:10, 
    margin: 10, 
    width: 150, 
    height: 150,
  },
  button: {
    borderRadius: 16,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#3FC495",
    marginHorizontal: 20,
    marginTop: 20,
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
      marginHorizontal: 20,
  },
  disabledBtnText: {
      color: '#adb5bd',
      fontWeight: 'bold',
      fontSize: 16,
  },
  error: {
    textAlign: "center",
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  errorText: {
    fontWeight: 'bold',
    color: "red",
  }
})