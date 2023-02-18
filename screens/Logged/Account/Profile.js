import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import {Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import ChangeProfile from './Change/ChangeProfile'
import ChangeFname from './Change/ChangeFname'
import ChangeLname from './Change/ChangeLname'
import ChangePass from './Change/ChangePass'
import DeleteAccount from './Change/DeleteAccount'
import Statusbar from '../../../Components/Statusbar'

export default function Profile() {
  const [user, setUser] = useState("null")

  async function getUser(){
    const value = await AsyncStorage.getItem('user')
    const val = JSON.parse(value)
    if(value !== null) {
        console.log(value);
        setUser(val)
    }
  }

  useEffect(() => {
    getUser();
  }, []) 


  const [SheetBody, setSheetBody] = useState(null)
  const [sheet, setSheet] = useState(false)
  
  const refB = useRef(null)
  const snapPoints =  useMemo(()=> [sheet ? "100%" : "70%"], [sheet])
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


  /* ******************* */

  const profile = [
    {
      "label":"Email",
      "value": user.email
    },
    {
      "label":"First name",
      "value": user.fname,
      "change": <ChangeFname getUser={getUser} fname={user?.fname} CloseModal={CloseModal} />,
    },
    {
      "label":"Last name",
      "value": user.lname,
      "change": <ChangeLname getUser={getUser} lname={user?.lname} CloseModal={CloseModal} /> ,
    },
    {
      "label":"Password",
      "value": user.pass,
      "change": <ChangePass getUser={getUser} pass={user?.pass} CloseModal={CloseModal} />,
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
  ]



  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Statusbar color="#3FC495" style="light" />
    <BottomSheetModalProvider>
    <View style={[styles.container, IsOpen && {backgroundColor: "#2C3333"}]}>
      <View style={[styles.box, IsOpen ? {backgroundColor: "#374040"} : {backgroundColor:"white"}]}>
        <TouchableOpacity onPress={()=> setSheet(true) & setSheetBody(<ChangeProfile getUser={getUser} profile={user?.profile} profiles={profiles} CloseModal={CloseModal} />) & OpenModal()} style={styles.profile}>
          <Image source={profiles[profileNbr].image} style={[styles.icon ,{ width: profiles[profileNbr].width, height: profiles[profileNbr].height}]} />
          <Text style={{marginTop: 20, color: "#E8E2E2"}}> Click to Change Profile Image ? </Text>
        </TouchableOpacity>

        {profile.map((item,key)=>(
          key === 0 ?
            <View key={key} style={styles.row}>
              <Text style={styles.text1}> {item.label} </Text>
              <Text style={styles.text2}> {item.value} </Text>
            </View>
          :
            <TouchableOpacity onPress={()=> setSheet(false) & setSheetBody(item.change) & OpenModal()} key={key}>
              <View style={styles.row}>
                <Text style={styles.text1}> {item.label} </Text>
                <Text style={styles.text2}> {item.value} </Text>
              </View>
            </TouchableOpacity>
        ))}
      </View>

      <View style={styles.Btnbox}>
        <TouchableOpacity 
          onPress={()=> setSheet(false) & setSheetBody(<DeleteAccount CloseModal={CloseModal} />) & OpenModal()}
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
          {SheetBody}
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
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
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
})