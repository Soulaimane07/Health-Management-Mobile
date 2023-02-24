import React, { useState } from 'react'
import Meal from './Meal'

export default function Snack({navigation}) {
  const [data, setData] = useState([])

  return (
    <Meal image={require("../../../assets/meals/snacks/image6.jpg")} kal={320} carbs={50} protein={100} fat={30} title={"My Snacks"} data={data} navigation={navigation} />
  )
}