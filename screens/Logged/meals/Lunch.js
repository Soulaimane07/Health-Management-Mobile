import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react'
import Meal from './Meal'

export default function Lunch({navigation}) {
  const [data, setData] = useState([])
  
  async function getUser(){
      const lunch = await AsyncStorage.getItem('lunch')
      const val = JSON.parse(lunch)
      lunch !== null ? (
          console.log(lunch),
          setData(val)
      ) : (
          setData([])
      )
  }
  
  useEffect(() => {
      getUser();
  }, [data])

  return (
      <Meal meal={"lunch"} image={require("../../../assets/meals/image8.jpg")} kal={650} carbs={50} protein={100} fat={30} title={"My Lunch"} data={data} navigation={navigation} />
  )
}