import Meal from './Meal'
import data from '../../../Data/Breakfast.json'


export default function Breakfast({navigation}) {
  return (
    <Meal image={require("../../../assets/meals/image1.jpg")} kal={0} carbs={50} protein={100} fat={30} title={"My Breakfast"} navigation={navigation} />
  )
}