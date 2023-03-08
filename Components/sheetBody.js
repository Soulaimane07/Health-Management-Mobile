import { View, Text, StyleSheet, Image, TextInput } from 'react-native'
import React, { useState } from 'react'
import { NavigateBtn } from './Buttons'
import AsyncStorage from '@react-native-async-storage/async-storage';
import SelectDropdown from 'react-native-select-dropdown';
import { ScrollView } from 'react-native-gesture-handler';
import Error from './Error';

export default function SheetBody(props) {
    let val
    let mealData

    const Submit = async () => {
        try {
            val = await AsyncStorage.getItem(props.meal),
            val !== null ? (
                mealData = JSON.parse(val),
                mealData.push(props.data)
            ) : (
                mealData = data
            ),
            console.log(mealData),
            await AsyncStorage.setItem(props.meal, JSON.stringify(mealData)),
            console.log(`${props.meal} is Updated!`),
            props.CloseModal(),
            console.log(val)
        } catch (e) {
            console.log(`${props.meal} is not Updated!`);
        }
    }

    const countries = ["100 grams", "50 grams", "20 grams"]
    const [selectedGrams, setSelectedGrams] = useState(countries[0])

    const data = [
        {
            "title": "Calories",
            "val": props.data.cal,
            "unit":"Kcal"
        },
        {
            "title": "Carbs",
            "val": props.data.carbs,
            "unit":"g"
        },
        {
            "title": "Protein",
            "val": props.data.protein,
            "unit":"g"
        },
        {
            "title": "Fat",
            "val": props.data.fat,
            "unit":"g"
        },
        {
            "title": "Fibre",
            "val": props.data.fibre,
            "unit":"g"
        },
    ]

  return (
    <>
        <ScrollView vertical>
            <View style={{alignItems: "center", justifyContent: 'center'}}>
                <Image source={props.data.image} style={{width: 100, height: 100}} />
            </View>
            <Text style={{marginTop: 20, marginBottom: 20, fontSize: 30, textAlign: 'center', fontWeight: 'bold'}}>{props.data.title}</Text>
            <View>
                <View style={{marginHorizontal: 60}}>
                {data.map((item,key)=>{
                    let value = item.val
                    let grams
                    selectedGrams.includes("100") && (grams = 1)
                    selectedGrams.includes("50") && (grams = 50)
                    selectedGrams.includes("20") && (grams = 20)

                    value = item.val / grams

                    return(
                        <View style={{justifyContent: "space-between", alignItems: 'center', flexDirection: 'row', marginBottom: 10}} key={key}>
                            <Text style={{fontSize: 16, fontWeight: 'bold'}}> {item.title} </Text>
                            <Text style={{fontSize: 16,}}> {value} {item.unit} </Text>
                        </View>
                    )
                })}
                </View>
                <Error text={`The above values are for ${selectedGrams} !`} color="#3FC495" />
            </View>
            <View style={{marginHorizontal: 30, marginTop: 20}}>
                <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 10}}> Quantity: </Text>
                <SelectDropdown
                    data={countries}
                    buttonStyle={{backgroundColor: "white", width: "100%", borderColor: "#3FC495", borderWidth: 1.4, borderRadius: 8}}
                    defaultValue={countries[0]}
                    onSelect={(selectedItem, index) => {
                        setSelectedGrams(selectedItem)
                    }}
                />
            </View>
            <View style={{marginHorizontal: 30, marginTop: 20, marginBottom: 100}}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}> Info: </Text>
                <Text > It is a long established fact that a reader will be distracted by the readable content. </Text>
            </View>
        </ScrollView>
        <View style={styles.BtnBox}>
            {NavigateBtn("Add", Submit , true, null)}
        </View>
    </>
  )
}

const styles = StyleSheet.create({
})