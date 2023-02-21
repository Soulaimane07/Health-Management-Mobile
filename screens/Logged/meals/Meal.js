import { View, Text, Image, StatusBar, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native'
import { MyButton } from '../../../Components/Buttons'
import Aicon from 'react-native-vector-icons/AntDesign'

export default function Breakfast(props) {

    const calories = [
        {
          "logo": require('../../../assets/calories/carbs1.png'),
          "title":"Carbs",
          "val": props.carbs,
          "unit":"g"
        },
        {
          "logo": require('../../../assets/calories/eggs.png'),
          "title":"Protein",
          "val": props.protein,
          "unit":"g"
        },
        {
          "logo": require('../../../assets/calories/fat1.png'),
          "title":"Fat",
          "val": props.fat,
          "unit":"g"
        },
    ]

      const icon = <Aicon name="pluscircleo" size={20} style={{marginRight: 40}} />

  return (
    <SafeAreaView style={{flex: 1}}>
        <StatusBar
            style="light-content"
            hidden = {false} 
            backgroundColor="transparent" 
            translucent={true}
        />
        <Image resizeMode="cover" source={props.image} style={[styles.image, {width:"100%", height: 240}]}>
        </Image>

        <ScrollView vertival style={{flex: 1}}>
            <View style={styles.container}>
                <View style={styles.box}>
                    <Text style={styles.h1}> Calories </Text>
                    <Text style={styles.h2}> {props.kal} Kcal </Text>
                </View>

                <View style={styles.box}>
                    <View style={styles.boxContent}>
                    {calories.map((item,key)=>(
                        <View key={key} style={styles.boxx}>
                            <Image source={item.logo} />
                            <Text style={{fontWeight: 'bold', marginBottom: 10}}> {item.title} </Text>
                            <Text> {item.val} {item.unit} </Text>
                        </View>
                    ))}
                </View>
                </View>
                
                <View style={styles.box}>
                    <Text style={{marginHorizontal:20, fontSize:17, marginBottom: 20, fontWeight: 'bold'}}>{props.title} :</Text>
                    <View style={styles.list}>
                        {calories.map((item,key)=>(
                            <View key={key} style={styles.row}>
                                <View style={{flexDirection: 'row', alignItems: 'center',}}>
                                    <Image style={{marginRight: 16}} source={item.logo} />
                                    <Text> {item.title} </Text>
                                </View>
                                <Text> {item.val} Kcal </Text>
                            </View>
                        ))}
                    </View>
                </View>
            </View>
        </ScrollView>

        <View style={styles.BtnBox}>
            {MyButton(props.navigation, `Add`, 'info', icon)}
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
      marginVertical: 20,
    },
    image: {
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
        overflow: "hidden",
    },
    box: {
      backgroundColor: "white",
      marginHorizontal: 20,
      paddingVertical: 20,
      paddingHorizontal: 10,
      borderRadius: 16,
      marginBottom: 20,
    },
    h1: {
      fontSize: 26,
      textAlign: 'center',
      marginBottom: 10,
      fontWeight: "bold",
    },
    h2: {
        textAlign: 'center',
        fontSize: 16,
    },

    boxContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    boxx: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    },
    BtnBox: {
        marginHorizontal: 20,
        marginBottom: 20
    },

    list: {
        marginHorizontal: 30,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 6,
        justifyContent: 'space-between',
    }
    
    
  })