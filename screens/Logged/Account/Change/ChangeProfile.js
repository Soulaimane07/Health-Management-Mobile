import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { BottomSheetScrollView } from '@gorhom/bottom-sheet'
import { NavigateBtn } from '../../../../Components/Buttons'
import Error from '../../../../Components/Error'

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
        props.getUser()
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
          <View style={{marginTop: 10}}>
            <Error text={"This avatar is your current avatar !"} />
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
        <View style={{marginHorizontal: 20}}>
            {NavigateBtn("SAVE", Submit, !condittion1)}
        </View>
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
})