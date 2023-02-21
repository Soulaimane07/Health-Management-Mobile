import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, ScrollView, StatusBar } from 'react-native'
import React from 'react'
import Aicon from 'react-native-vector-icons/AntDesign'
import { MyButton } from '../../../Components/Buttons'

export default function Info({navigation}) {

    const data = [
        {
            "title":"Orange",
            "image":require("../../../assets/breakfast/orange.png"),
            "cal":"50",
            "carbs":"11.7",
            "protein":"0.5",
            "fat":"0.1",
            "fibre":"2.4"
        },
        {
            "title":"Pomme",
            "image":require("../../../assets/breakfast/apple.png"),
            "cal":"52",
            "carbs":"12",
            "protein":"0.3",
            "fat":"0.3",
            "fibre":"2.4"
        },
        {
            "title":"Avocat",
            "image":require("../../../assets/breakfast/avocado.png"),
            "cal":"167",
            "carbs":"4.7",
            "protein":"2.1",
            "fat":"16.4",
            "fibre":"6.7"
        },
        {
            "title":"Pain blanc",
            "image":require("../../../assets/breakfast/baguette.png"),
            "cal":"",
            "carbs":"49.1",
            "protein":"9.2",
            "fat":"3.2",
            "fibre":"2.7"
        },
        {
            "title":"Orange",
            "image":require("../../../assets/breakfast/orange.png"),
            "cal":"50",
            "carbs":"11.7",
            "protein":"0.5",
            "fat":"0.1",
            "fibre":"2.4"
        },
        {
            "title":"Pomme",
            "image":require("../../../assets/breakfast/apple.png"),
            "cal":"52",
            "carbs":"12",
            "protein":"0.3",
            "fat":"0.3",
            "fibre":"2.4"
        },
        {
            "title":"Avocat",
            "image":require("../../../assets/breakfast/avocado.png"),
            "cal":"167",
            "carbs":"4.7",
            "protein":"2.1",
            "fat":"16.4",
            "fibre":"6.7"
        },
        {
            "title":"Pain blanc",
            "image":require("../../../assets/breakfast/baguette.png"),
            "cal":"",
            "carbs":"49.1",
            "protein":"9.2",
            "fat":"3.2",
            "fibre":"2.7"
        },
        {
            "title":"Orange",
            "image":require("../../../assets/breakfast/orange.png"),
            "cal":"50",
            "carbs":"11.7",
            "protein":"0.5",
            "fat":"0.1",
            "fibre":"2.4"
        },
        {
            "title":"Pomme",
            "image":require("../../../assets/breakfast/apple.png"),
            "cal":"52",
            "carbs":"12",
            "protein":"0.3",
            "fat":"0.3",
            "fibre":"2.4"
        },
        {
            "title":"Avocat",
            "image":require("../../../assets/breakfast/avocado.png"),
            "cal":"167",
            "carbs":"4.7",
            "protein":"2.1",
            "fat":"16.4",
            "fibre":"6.7"
        },
        {
            "title":"Pain blanc",
            "image":require("../../../assets/breakfast/baguette.png"),
            "cal":"",
            "carbs":"49.1",
            "protein":"9.2",
            "fat":"3.2",
            "fibre":"2.7"
        },
        {
            "title":"Orange",
            "image":require("../../../assets/breakfast/orange.png"),
            "cal":"50",
            "carbs":"11.7",
            "protein":"0.5",
            "fat":"0.1",
            "fibre":"2.4"
        },
        {
            "title":"Pomme",
            "image":require("../../../assets/breakfast/apple.png"),
            "cal":"52",
            "carbs":"12",
            "protein":"0.3",
            "fat":"0.3",
            "fibre":"2.4"
        },
        {
            "title":"Avocat",
            "image":require("../../../assets/breakfast/avocado.png"),
            "cal":"167",
            "carbs":"4.7",
            "protein":"2.1",
            "fat":"16.4",
            "fibre":"6.7"
        },
        {
            "title":"Pain blanc",
            "image":require("../../../assets/breakfast/baguette.png"),
            "cal":"",
            "carbs":"49.1",
            "protein":"9.2",
            "fat":"3.2",
            "fibre":"2.7"
        }
    ]

  return (
    <View style={styles.container}>
        <StatusBar
            backgroundColor="transparent" 
            translucent={true}
            barStyle="dark-content"
        />
        
        <View>
            <TextInput 
                placeholder='Search here...'
                style={styles.textInput}
            />
        </View>
        
        <ScrollView vertical style={{paddingTop: 10, paddingHorizontal: 20,}}>
            {data.map((item,key)=>(
                <TouchableOpacity style={[styles.item, key+1 == data?.length && {marginBottom: "60%"}]} key={key}>
                    <View style={{alignItems: 'center', flexDirection: 'row'}}>
                        <Image source={item.image} style={[{marginRight: 20, width: 40, height: 40}]} />
                        <Text style={{fontSize: 16}}> {item.title} </Text>
                    </View>
                    <Aicon name="pluscircleo" size={20} />
                </TouchableOpacity>
            ))}
        </ScrollView>

        <View style={styles.BtnBox}>
            {MyButton(navigation, "Finish", 'breakfast', null)}
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 40,
        paddingHorizontal: 20,
        flex: 1,
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
        alignItems: 'center',
    },
    
  })