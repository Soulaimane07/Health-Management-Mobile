import { useState } from 'react'
import Meal from './Meal'

export default function Lunch({navigation}) {
  const [data, setData] = useState([])

  return (
      <Meal image={require("../../../assets/meals/image8.jpg")} kal={650} carbs={50} protein={100} fat={30} title={"My Lunch"} data={data} navigation={navigation} />
  )
}