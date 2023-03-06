import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react'
import Meal from './Meal'

export default function Dinner({navigation}) {
  const [data, setData] = useState([])
  
  async function getDinner(){
      const dinner = await AsyncStorage.getItem('dinner')
      const val = JSON.parse(dinner)
      dinner !== null ? (
          console.log(dinner),
          setData(val)
      ) : (
          setData([])
      )
  }
  
  useEffect(() => {
      getDinner();
  }, [data])

  return (
    <Meal meal={"dinner"} image={require("../../../assets/meals/image6.jpg")} kal={200} carbs={50} protein={100} fat={30} title={"My Dinner"} data={data} navigation={navigation} />
  )
}