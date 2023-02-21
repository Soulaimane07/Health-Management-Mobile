import Meal from './Meal'

export default function Breakfast({navigation}) {
  const data = [
    {
        "title":"Orange",
        "image":require("../../../assets/breakfast/orange.png"),
        "cal": 50,
        "carbs": 11.7,
        "protein": 0.5,
        "fat": 0.1,
        "fibre": 2.4
    },
    {
        "title":"Pomme",
        "image":require("../../../assets/breakfast/apple.png"),
        "cal": 52,
        "carbs": 12,
        "protein": 0.3,
        "fat": 0.3,
        "fibre": 2.4
    },
    {
        "title":"Avocat",
        "image":require("../../../assets/breakfast/avocado.png"),
        "cal": 167,
        "carbs": 4.7,
        "protein": 2.1,
        "fat": 16.4,
        "fibre": 6.7
    },
    {
        "title":"Pain blanc",
        "image":require("../../../assets/breakfast/baguette.png"),
        "cal": 0,
        "carbs": 49.1,
        "protein": 9.2,
        "fat": 3.2,
        "fibre": 2.7
    },
  ]

  return (
    <Meal image={require("../../../assets/meals/image1.jpg")} kal={0} carbs={50} protein={100} fat={30} title={"My Breakfast"} data={data} navigation={navigation} />
  )
}