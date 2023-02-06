import React from 'react'
import {StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export default function Profile() {

  const profile = [
    {
      "label":"First name",
      "value":"Said"
    },
    {
      "label":"Last name",
      "value":""
    },
    {
      "label":"Password",
      "value":"******"
    },
  ]
  const condittion = false

  return (
    <View style={styles.container}>
      <View style={styles.box}>
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