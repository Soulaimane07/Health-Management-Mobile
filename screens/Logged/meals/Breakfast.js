import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react'
import Meal from './Meal'

export default function Breakfast({navigation}) {
  const [data, setData] = useState([])
  
  async function getBreakfast(){
      const breakfast = await AsyncStorage.getItem('breakfast')
      const val = JSON.parse(breakfast)
      breakfast !== null ? (
          // console.log(breakfast),
          setData(val)
      ) : (
          setData([])
      )
  }
  
  useEffect(() => {
      getBreakfast();
  }, [data]) 

  return (
    <Meal meal={'breakfast'} image={require("../../../assets/images/logged/meals/breakfastPage.jpg")} kal={0} carbs={50} protein={100} fat={30} title={"My Breakfast"} data={data} navigation={navigation} />
  )
}