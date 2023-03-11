import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'
import Meal from './Meal'

export default function Snack({navigation}) {
  const [data, setData] = useState([])
  
  async function getSnacks(){
      const snacks = await AsyncStorage.getItem('snacks')
      const val = JSON.parse(snacks)
      snacks !== null ? (
          console.log(snacks),
          setData(val)
      ) : (
          setData([])
      )
  }
  
  useEffect(() => {
      getSnacks();
  }, [data])

  return (
    <Meal meal={"snacks"} image={require("../../../assets/images/logged/meals/snacksPage.jpg")} kal={320} carbs={50} protein={100} fat={30} title={"My Snacks"} data={data} navigation={navigation} />
  )
}