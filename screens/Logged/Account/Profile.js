import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import {Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetScrollView } from '@gorhom/bottom-sheet'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

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






  /* *********** */

  const [click, setClick] = useState(user.profile)

  const condittion1 = click === user?.profile

  const val = {
    profile: click,
  }

  const Submit = async () => {
    try {
      await AsyncStorage.mergeItem('user', JSON.stringify(val))
      console.log("User Profile is updated!");
      CloseModal()
    } catch (e) {
      console.log("User Profile is not updated!");
    }
  }

  const refB = useRef(null)
  const snapPoints = useMemo(()=> ["60%", "100%"], [])

  const [IsOpen, setIsOpen] = useState(false)
  const OpenModal = () => {
      refB.current?.present()
      setTimeout(() => {
          setIsOpen(true)
      }, 120);
  }
  const CloseModal = () => {
    refB.current?.close()
    setTimeout(() => {
        setIsOpen(false)
    }, 120);
  }
  
  return (
    <GestureHandlerRootView style={{flex: 1}}>
    <BottomSheetModalProvider>
    <View style={[styles.container, IsOpen && {backgroundColor: "gray"}]}>
      <View style={[styles.box, IsOpen ? {backgroundColor: "gray"} : {backgroundColor:"white"}]}>
        <TouchableOpacity onPress={OpenModal} style={styles.profile}>
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
        <TouchableOpacity 
            style={styles.delete}
        >
            <Text style={styles.DeleteText}> Delete account </Text>
        </TouchableOpacity>
      </View>

      <BottomSheetModal 
        ref={refB}
        index={0}
        snapPoints={snapPoints}
        onDismiss={()=> setIsOpen(false)}
      >
        <View style={styles.modalView}>
          <View style={{marginBottom: 20}}>
            <Text style={{textAlign: "center", fontSize: 18, fontWeight: 'bold'}}> Change Your Avatar </Text>
            {click == user?.profile && <Text style={styles.error}> This avatar is your current avatar ! </Text>}
          </View>

          <BottomSheetScrollView contentContainerStyle={{paddingBottom: "60%", justifyContent: 'center', flexDirection:'row', flexWrap:'wrap', alignItems: 'flex-start'}}> 
           {profiles.map((profile,key)=>( 
              <TouchableOpacity key={key} onPress={()=> setClick(key)} style={[key == click && {backgroundColor: "#3FC495"}, styles.profile1]}>
                <Image source={profile.image} style={{width: "100%", height: "100%"}} />
              </TouchableOpacity>
           ))}
          </BottomSheetScrollView>

          {click !== user?.profile &&
            <TouchableOpacity
              onPress={Submit}
              disabled={condittion1 ? true : false}
              style={condittion1 ? styles.disabledBtn : styles.button}
            >
              <Text style={condittion1 ? styles.disabledBtnText : styles.buttonText}> SAVE </Text>
            </TouchableOpacity>
          }
        </View>
      </BottomSheetModal>
    </View>
    </BottomSheetModalProvider>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  box: {
    padding: 20,
    borderRadius: 16,
  },

  profile: {
    width: "100%",
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

  delete: {
    borderRadius: 16,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#fff0f3",
    marginHorizontal: 20,
    borderWidth: 1,
    marginBottom: 20,
    width: "100%",
    borderColor: "#e5383b",
  },
  DeleteText: {
    color: '#e5383b',
    fontSize: 16,
    fontWeight: 'bold',
  },





  modalView: {
    justifyContent: 'space-between',
    flex: 1,
    marginBottom: 20,
  },
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
    color: "red",
    textAlign: "center",
    marginTop: 10,
    fontWeight: 'bold',
}

})