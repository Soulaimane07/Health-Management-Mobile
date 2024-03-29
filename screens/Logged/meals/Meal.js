import { View, Text, Image, StatusBar, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native'
import { NavigateBtn } from '../../../Components/Buttons'
import Oicon from 'react-native-vector-icons/Octicons'
import Ficon from 'react-native-vector-icons/FontAwesome'
import { calorie } from '../../../Components/cal'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ServerLink } from '../../../Components/API'

export default function Breakfast(props) {
    const data = props.data
    
    const Submit = async () => {
        try {
            props.navigation.navigate('info', {
                meal: props.meal,
            })
        } catch (e) {
            console.log("Breakfast is not created");
        }
    }

    const Delete = async () => {
        let found
        let index
        let cals = 0
        let caloriesObj

        const user = await AsyncStorage.getItem('user')
        const val = JSON.parse(user)

        console.log(val);

        try {
            data?.map((item,key)=>(
                remove?.map((itemm, keyy)=>(
                    item.name == itemm &&(
                        found = data?.find(element => element.name == itemm),
                        index = data?.indexOf(found),
                        console.log(found),
                        console.log(index),
                        cals = cals + item.calories,
                        console.log(cals),

                        caloriesObj = {
                            calories : val?.calories - cals
                        },
                        
                        data?.splice(index, remove?.length),
                        AsyncStorage.setItem(props.meal, JSON.stringify(data)),
                        remove.splice(itemm, remove?.length),
                        AsyncStorage.mergeItem('user', JSON.stringify(caloriesObj))
                    )
                ))
            ))
        } catch (e) {
            console.log("Delete function is not working !");
        }
    }

    const calories = [
        {
          "logo": require('../../../assets/calories/carbs1.png'),
          "title":"Carbs",
          "val": calorie(data).carbs?.toFixed(2),
          "unit":"g"
        },
        {
          "logo": require('../../../assets/calories/eggs.png'),
          "title":"Protein",
          "val": calorie(data).protein?.toFixed(2),
          "unit":"g"
        },
        {
          "logo": require('../../../assets/calories/fat1.png'),
          "title":"Fat",
          "val": calorie(data).fat?.toFixed(2),
          "unit":"g"
        },
    ]

    const [remove, setRemove] = useState([])

  return (
    <SafeAreaView style={{flex: 1}}>
        <StatusBar
            backgroundColor="transparent" 
            translucent={true}
            barStyle="light-content"
        />
        <Image resizeMode="cover" source={props.image} style={[styles.image, {width:"100%", height: 220}]}>
        </Image>

        <ScrollView vertival style={{flex: 1}}>
            <View style={styles.container}>
                <View style={styles.box}>
                    <Text style={styles.h1}> Calories </Text>
                    <Text style={styles.h2}> {calorie(data).cal} Kcal </Text>
                
                    <View style={[styles.boxContent, {marginTop: 20}]}>
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
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, marginBottom: 20, alignItems: 'center'}}>
                        <Text style={{fontSize:17, fontWeight: 'bold'}}>{props.title} :</Text>
                    </View>
                    <View style={styles.list}>
                        {data?.map((item,key)=>{
                            let r = remove.find(element => element == item.name)
                            let index

                            const removefromarray = () => {
                                index = remove.indexOf(r)
                                console.log(`index: ` + index);
                                remove.splice(index, 1)
                                console.log(`==> ${item.name} is removed from remove array`);
                            }

                            const addtoarray = () => {
                                setRemove([...remove, item.name])
                                console.log(`==> ${item.name} is added to remove array`);
                            }

                            return(
                                <TouchableOpacity onPress={()=>  (r !== item.name && addtoarray()) & (r == item.name && removefromarray())} key={key} style={styles.row}>
                                    <View style={{flexDirection: 'row', alignItems: 'center',}}>
                                        {r == item.name 
                                            ?   <Oicon name='check-circle-fill' color="#3FC495" size={24} />
                                            :   <Ficon name='circle-thin' color="#adb5bd" size={27} />
                                        }
                                        <Image style={{marginLeft: 16, marginRight: 6, width: 30, height: 30,}} source={{uri: `${ServerLink}/${item.image}`}} />
                                        <Text> {item.name} </Text>
                                    </View>
                                    <Text> {item.calories} Kcal </Text>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                </View>
            </View>
        </ScrollView>

        <View style={styles.BtnBox}>
            {remove.length == 0 && 
                <View style={styles.btn}>
                    {NavigateBtn(`Add`, Submit, true)}
                </View>
            }
            {remove.length > 0 && 
                <View style={{marginTop: 10}}>
                    {NavigateBtn(`Remove`, Delete, true,)}
                </View>
            }
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
        marginBottom: 20,
        paddingTop: 10,
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