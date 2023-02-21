import { View, Text, TextInput, StyleSheet, Image } from 'react-native'
import React from 'react'
import data from '../../../Data/Breakfast.json'
import Aicon from 'react-native-vector-icons/AntDesign'

export default function Info() {
  return (
    <View style={styles.container}>
        <View>
            <TextInput 
                placeholder='Search here...'
                style={styles.textInput}
            />
        </View>
        <View style={{marginTop: 20, marginHorizontal: 20,}}>
            {data.map((item,key)=>(
                <View style={styles.item} key={key}>
                    <View>
                        {/* <Image source={require('../../../assets/breakfast/orange.png')} style={[{width:100, height: 100}]} /> */}
                        <Text> {item.title} </Text>
                    </View>
                    <Aicon name="pluscircleo" size={20} />
                </View>
            ))}
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 60,
      marginVertical: 20,
      paddingHorizontal: 20,
    },
    textInput: {
        borderWidth: 1.6,  
        borderColor: '#3FC495',
        fontSize: 16,
        borderRadius: 16,
        padding: 10,
        paddingHorizontal: 20,
    },
    item: {
        marginVertical: 4,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 10,
    }
    
  })