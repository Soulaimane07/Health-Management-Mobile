import { useState } from 'react'
import Meal from './Meal'

export default function Dinner({navigation}) {
  const [data, setData] = useState([])

  return (
    <Meal image={require("../../../assets/meals/image6.jpg")} kal={200} carbs={50} protein={100} fat={30} title={"My Dinner"} data={data} navigation={navigation} />
  )
}