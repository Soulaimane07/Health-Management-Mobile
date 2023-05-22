import { View, Text, Image, TextInput, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NavigateBtn } from './Buttons'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';
import { calorie } from './cal';
import SelectDropdown from 'react-native-select-dropdown';
import Error from './Error';
import { ServerLink } from './API';
import axios from 'axios';

export default function SheetBody(props) {
    let val
    let mealData

    console.log(props.selectedId);
    const [food, setFood] = useState({})

    useEffect(()=> {
        axios.get(`${ServerLink}/food/getById/${props.selectedId}`)
            .then(res => {
                console.log('==> Food : ',res.data);
                setFood(res.data)
            })
            .catch(err => {
                console.log(err);
            })
    }, [])
    
    const Submit = async () => {
        try {
            console.log("### Function ###");
            let calVal
            let value = await AsyncStorage.getItem('user')
            let value2 = JSON.parse(value)
            console.log(value2.calories);
    
            value2.calories !== undefined 
                ?   calVal = value2.calories + food?.calories
                :   calVal = food?.calories

            const calories = {
                calories : calVal,
            }
            await AsyncStorage.mergeItem("user", JSON.stringify(calories))

            val = await AsyncStorage.getItem(props.meal)
            val !== null ? (
                mealData = JSON.parse(val),
                mealData.push(food)
            ) : (
                mealData = [food]
            )
            console.log(mealData),
            await AsyncStorage.setItem(props.meal, JSON.stringify(mealData)),
            console.log(`${props.meal} is Updated!`),
            props.CloseModal(),
            console.log(val)
        } catch (e) {
            console.log(`${props.meal} is not Updated! : ${e}`);
        }
    }

    const [selectedGrams, setSelectedGrams] = useState(1)

    const data = [
        {
            "title":"Calories",
            "value": food?.calories,
            "unit":"Kcal",
        },
        {
            "title":"Carbs",
            "value": food?.carbs,
            "unit":"g",
        },
        {
            "title":"Protein",
            "value": food?.protein,
            "unit":"g",
        },
        {
            "title":"Fat",
            "value": food?.fat,
            "unit":"g",
        },
        {
            "title":"Fibre",
            "value": food?.fiber,
            "unit":"g",
        },
    ]

    const condittion = selectedGrams > 0

  return (
    <>
        <ScrollView vertical>
            <View style={{alignItems: "center", justifyContent: 'center'}}>
                <Image source={{uri: `${ServerLink}/${food?.image}`}} style={{width: 100, height: 100}} />
            </View>
            <Text style={{marginTop: 20, marginBottom: 20, fontSize: 30, textAlign: 'center', fontWeight: 'bold'}}>{food?.name}</Text>
            <Error text={`The above values are for ${selectedGrams} grams !`} color="#3FC495" />
            <View style={{marginTop: 20}}>
                <View style={{marginHorizontal: 60}}>
                {data.map((item,key)=>{
                    let value = item.value
                    // let grams
                    // selectedGrams.includes("100") && (grams = 1)
                    // selectedGrams.includes("50") && (grams = 50)
                    // selectedGrams.includes("20") && (grams = 20)

                    value = (item.value / selectedGrams)?.toFixed(2)

                    return(
                        <View style={{justifyContent: "space-between", alignItems: 'center', flexDirection: 'row', marginBottom: 10}} key={key}>
                            <Text style={{fontSize: 16, fontWeight: 'bold'}}> {item.title} </Text>
                            <Text style={{fontSize: 16,}}> {value} {item.unit} </Text>
                        </View>
                    )
                })}
                </View>
            </View>
            <View style={{marginHorizontal: 30, marginTop: 20}}>
                <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 10}}> Quantity: </Text>
                {/* <SelectDropdown
                    data={countries}
                    buttonStyle={{backgroundColor: "white", width: "100%", borderColor: "#3FC495", borderWidth: 1.4, borderRadius: 8}}
                    defaultValue={countries[0]}
                    onSelect={(selectedItem, index) => {
                        setSelectedGrams(selectedItem)
                    }}
                /> */}
                <View style={styles.textInput}>
                    <TextInput 
                        keyboardType="numeric"
                        maxLength={3}
                        style={{paddingHorizontal: 20, alignItems: 'center', textAlign: 'center'}}
                        value={selectedGrams}
                        defaultValue={selectedGrams}
                        onChangeText={e => setSelectedGrams(e)}
                    />
                    <Text> Grams </Text>
                </View>
            </View>
        </ScrollView>
        <View>
            {NavigateBtn("Add", Submit , condittion, null)}
        </View>
    </>
  )
}

const styles = StyleSheet.create({
    textInput: {
        borderWidth: 1.6,  
        borderColor: '#3FC495',
        fontSize: 16,
        borderRadius: 16,
        padding: 10,
        paddingHorizontal: 20,
        textAlign: 'center',
        flexDirection: 'row', 
        justifyContent: 'center',
        alignItems: 'center'
    },
})