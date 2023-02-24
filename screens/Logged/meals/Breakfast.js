import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react'
import Meal from './Meal'

export default function Breakfast({navigation}) {
  const [data, setData] = useState([])
  
  useEffect(() => {
    async function getUser(){
      const breakfast = await AsyncStorage.getItem('breakfast')
      const val = JSON.parse(breakfast)
      if(breakfast !== null) {
          console.log(breakfast);
          setData(val)
      }
    }
    getUser();
  }, [data]) 

  return (
    <Meal image={require("../../../assets/meals/image1.jpg")} kal={0} carbs={50} protein={100} fat={30} title={"My Breakfast"} data={data} navigation={navigation} />
  )
}