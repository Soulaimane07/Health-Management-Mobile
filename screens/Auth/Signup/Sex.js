import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useContext, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { NavigateBtn } from '../../../Components/Buttons'
import { PracticeContext } from '../../../Components/Context'
import { Progress } from '../../../Components/Headers'

export default function Sex({navigation}) {
    const {languageObj} = useContext(PracticeContext)
    let header = languageObj?.signup.sex

    const [box, setBox] = useState(null)
    const condittion = box !== null

    const sexObj = [
        {
            "title": languageObj?.signup.sex.female,
            "val": "Female",
        },
        {
            "title": languageObj?.signup.sex.male,
            "val": "Male",
        }
    ]

    const sex = {
        sex: box != null && sexObj[box].val
    }

    const Submit = async () => {
        try {
          await AsyncStorage.mergeItem('user', JSON.stringify(sex))
          console.log("Sex is stored");

            let profile = {
                profile: box === 0 ? 0 : 1
            }

          await AsyncStorage.mergeItem('user', JSON.stringify(profile))
          console.log("Profile is stored");
          navigation.navigate('system')
        } catch (e) {
          console.log("Sex isn't stored");
        }
    }

  return (
    <View style={styles.container}>
        {Progress({navigation}, header, 1)}
        
        <View style={styles.boxs}>
            {sexObj.map((item,key)=>(
                <Text onPress={()=> setBox(key)} style={box === key ? styles.active : styles.box} key={key}> {item.title} </Text>
            ))}
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
    boxs: {
        padding: 20,
    },
    box: {
        margin: 10,
        padding: 40,
        textAlign: 'center',
        fontWeight: 'bold',
        borderRadius: 16,
        backgroundColor: "white",
        color: "#adb5bd"
    },
    active: {
        margin: 10,
        padding: 40,
        textAlign: 'center',
        fontWeight: 'bold',
        borderRadius: 16,
        backgroundColor: "#3FC495",
        color: "white",
    },
    BtnBox: {
        marginHorizontal: 20,
        marginBottom: 20
    }
})