import { View, Text, StyleSheet, Image } from 'react-native'
import React, { useState } from 'react'
import { NavigateBtn } from './Buttons'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SheetBody(props) {
    const data = [props.data]
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

  return (
    <>
        <View>
            <View style={{alignItems: "center", justifyContent: 'center'}}>
                <Image source={props.data.image} style={{width: 100, height: 100}} />
            </View>
            <Text style={{marginTop: 20, marginBottom: 20, fontSize: 30, textAlign: 'center', fontWeight: 'bold'}}>{props.data.title}</Text>
            <View style={{justifyContent: "space-evenly", alignItems: 'center', flexDirection: 'row'}}>
                <View style={{marginRight: "10%"}}>
                    <Text style={{marginBottom: 6, fontSize: 16, fontWeight: 'bold'}}>Calories</Text>
                    <Text style={{marginBottom: 6, fontSize: 16, fontWeight: 'bold'}}>Carbs</Text>
                    <Text style={{marginBottom: 6, fontSize: 16, fontWeight: 'bold'}}>Protein</Text>
                    <Text style={{marginBottom: 6, fontSize: 16, fontWeight: 'bold'}}>Fat</Text>
                    <Text style={{marginBottom: 6, fontSize: 16, fontWeight: 'bold'}}>fibre</Text>
                </View>
                <View>
                    <Text style={{marginBottom: 6, fontSize: 16,}}>{props.data.cal} Kcal</Text>
                    <Text style={{marginBottom: 6, fontSize: 16,}}>{props.data.carbs} g</Text>
                    <Text style={{marginBottom: 6, fontSize: 16,}}>{props.data.protein} g</Text>
                    <Text style={{marginBottom: 6, fontSize: 16,}}>{props.data.fat} g</Text>
                    <Text style={{marginBottom: 6, fontSize: 16,}}>{props.data.fibre} g</Text>
                </View>
            </View>
            <View style={{marginHorizontal: 30, marginTop: 20}}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}> Info: </Text>
                <Text > It is a long established fact that a reader will be distracted by the readable content. </Text>
            </View>
        </View>
        <View style={styles.BtnBox}>
            {NavigateBtn("Add", Submit , true, null)}
        </View>
    </>
  )
}

const styles = StyleSheet.create({
})