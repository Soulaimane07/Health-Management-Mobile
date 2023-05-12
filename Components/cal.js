import AsyncStorage from "@react-native-async-storage/async-storage"
import { useEffect, useState } from "react"


export const calorie = (data) => {
    let cal = 0
    let carbs = 0
    let protein = 0
    let fat = 0
    let fibre = 0

    data?.map(item=>{
        cal = item.calories + cal
        fibre = item.fiber + fibre

        carbs = item.carbs + carbs
        protein = item.protein + protein
        fat = item.fat + fat
    })

    return {cal, carbs, protein, fat, fibre}
}

export const Nutrition = (calories) => {
    const [Diets, setDiets] = useState([])
    
    const getDiet = async () => {
        try{
            const Diet = await AsyncStorage.getItem("Diets")
            console.log("==> Diet: ",Diet);
            setDiets(JSON.parse(Diet))
        }
        catch(e) {
            console.log(e);
        }
    }

    useEffect(()=> {
        getDiet()
    }, [])
    console.log("Diets ==> ",Diets)


    let carbs = 0
    let protein = 0
    let fat = 0

    Diets ?
    (
        carbs = (((calories*Diets?.carbs)/100)/4).toFixed(0),
        protein = (((calories*Diets?.protein)/100)/4).toFixed(0),
        fat = (((calories*Diets?.fat)/100)/4).toFixed(0)
        

    )   : (
        carbs = (((calories*50)/100)/4).toFixed(0),
        protein = (((calories*20)/100)/4).toFixed(0),
        fat = (((calories*30)/100)/4).toFixed(0)
    )

    return {carbs, protein, fat}
}