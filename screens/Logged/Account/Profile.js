import React, { useContext, useMemo, useRef, useState } from 'react'
import {Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import ChangeProfile from './Change/ChangeProfile'
import ChangeFname from './Change/ChangeFname'
import ChangeLname from './Change/ChangeLname'
import ChangePass from './Change/ChangePass'
import DeleteAccount from './Change/DeleteAccount'
import Statusbar from '../../../Components/Statusbar'
import FaIcon from 'react-native-vector-icons/FontAwesome'
import { PracticeContext } from '../../../Components/Context'
import ChangeLang from './Change/ChangeLang'
import { GetUser } from '../../../Components/GetData'

export default function Profile({route}) {
  const user = GetUser().user
  const {language} = useContext(PracticeContext)

  /* ************* Bottom Sheet ************* */
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


  /* ************* Profile ************* */

  const profile = [
    {
      "label":"Email",
      "value": user.email
    },
    {
      "label":"First name",
      "value": user.fname,
      "change": <ChangeFname fname={user?.fname} CloseModal={CloseModal} />,
    },
    {
      "label":"Last name",
      "value": user.lname,
      "change": <ChangeLname lname={user?.lname} CloseModal={CloseModal} /> ,
    },
    {
      "label":"Password",
      "value": user?.pass?.replace(/./g, '*'),
      "change": <ChangePass pass={user?.pass} CloseModal={CloseModal} />,
    },
    {
      "label":"Language",
      "value": language,
      "change": <ChangeLang lang={language} CloseModal={CloseModal} />,
    },
  ]
  const profileNbr = user?.profile ? user?.profile : 0
  const profiles = route.params.profiles



  return (
    <GestureHandlerRootView style={{flex: 1}}>
    <Statusbar color="#3FC495" style="light" />
    <BottomSheetModalProvider>
      <View style={[styles.container, IsOpen && {backgroundColor: "#2C3333"}]}>
        <View style={[styles.box, IsOpen ? {backgroundColor: "#374040"} : {backgroundColor:"white"}]}>
          <TouchableOpacity onPress={()=> setSheet(true) & setSheetBody(<ChangeProfile profile={user?.profile} profiles={profiles} CloseModal={CloseModal} />) & OpenModal()} style={styles.profile}>
            <Image source={profiles[profileNbr].image} style={[styles.icon ,{ width: 160, height: 150}]} />
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
                  <View style={{alignItems: 'center', flexDirection: 'row'}}>
                    <Text style={styles.text2}> {item.value} </Text>
                    <FaIcon style={{marginLeft: 10}} name="angle-right" size={26} color="#adb5bd" />
                  </View>
                </View>
              </TouchableOpacity>
          ))}
        </View>

        <View style={styles.Btnbox}>
          <TouchableOpacity 
            onPress={()=> setSheet(false) & setSheetBody(<DeleteAccount user={user} CloseModal={CloseModal} />) & OpenModal()}
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