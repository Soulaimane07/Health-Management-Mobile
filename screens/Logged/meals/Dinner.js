import Meal from './Meal'

export default function Dinner() {
  return (
    <Meal image={require("../../../assets/meals/image6.jpg")} kal={200} carbs={50} protein={100} fat={30} title={"My Dinner"} />
  )
}