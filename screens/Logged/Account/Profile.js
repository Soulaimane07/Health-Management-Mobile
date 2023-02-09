import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'
import {Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export default function Profile() {
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

  const profile = [
    {
      "label":"First name",
      "value": user.fname
    },
    {
      "label":"Last name",
      "value": user.lname
    },
    {
      "label":"Email",
      "value": user.email
    },
    {
      "label":"Password",
      "value": user.pass
    },
  ]
  const condittion = false

  const profileNbr = user?.profile ? user?.profile : 0

  const profiles = [
    {
      image: require("../../../assets/profiles/1.png"),
      width: 200,
      height: 200,
    },
    {
      image: require("../../../assets/profiles/2.png"),
      width: 240,
      height: 170,
    },
    {
      image: require("../../../assets/profiles/3.png"),
      width: 186,
      height: 190,
    },
    {
      image: require("../../../assets/profiles/4.png"),
      width: 200,
      height: 190,
    },
    {
      image: require("../../../assets/profiles/5.png"),
      width: 210,
      height: 180,
    },
    {
      image: require("../../../assets/profiles/6.png"),
      width: 210,
      height: 180,
    },
  ]

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <TouchableOpacity style={styles.profile}>
          <Image source={profiles[profileNbr].image} style={[styles.icon ,{ width: profiles[profileNbr].width, height: profiles[profileNbr].height}]} />
          <Text style={{marginTop: 20, color: "#E8E2E2"}}> Click to Change Profile Image ? </Text>
        </TouchableOpacity>

         {profile.map((item,key)=>(
          <View style={styles.row} key={key}>
            <Text style={styles.text1}> {item.label} </Text>
            <Text style={styles.text2}> {item.value} </Text>
          </View>
         ))}
      </View>

      <View style={styles.Btnbox}>
        {condittion === true && 
          <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}> SAVE </Text>
          </TouchableOpacity>
        }
        <TouchableOpacity 
            style={styles.delete}
        >
            <Text style={styles.DeleteText}> Delete account </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
    flex: 1,
  },
  box: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 16,
  },


  profile: {
    width: "100%",
    // height: "100%",
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  text1: {
    fontSize: 18,
  },
  text2: {
    color: "#6c757d",
  },


  Btnbox: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  button: {
      borderRadius: 16,
      padding: 15,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: "#3FC495",
      margin: 10,
  },
  buttonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
  },
  disabled: {
      borderRadius: 16,
      padding: 15,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: "white",
      margin: 10,
  },
  disabledtext: {
      color: '#adb5bd',
      fontSize: 16,
      fontWeight: 'bold',
  },


  delete: {
    borderRadius: 16,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#fff0f3",
    margin: 10,
    borderWidth: 1,
    borderColor: "#e5383b",
  },
  DeleteText: {
    color: '#e5383b',
    fontSize: 16,
    fontWeight: 'bold',
  },

})