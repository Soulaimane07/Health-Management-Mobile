import AsyncStorage from "@react-native-async-storage/async-storage"
import { useEffect, useState } from "react"

export const GetUser = () => {
    const [user, setUser] = useState({})

    const getUser = async () => {
        try {
            const value = await AsyncStorage.getItem('user')
            const val = JSON.parse(value)
            if(value !== null) {
                // console.log(`==> User data: ${value}`);
                setUser(val)
            }
        } catch(e){
            console.log(e);
        }
    }

    useEffect(() => {
        getUser();
    }, [user]) 

    return {user, getUser}
}

export const GetBreakfast = () => {
    const [breakfast, setBreakfast] = useState([])

    const getBreakfast = async () => {
        try {
            const value = await AsyncStorage.getItem('breakfast')
            const val = JSON.parse(value)
            if(value !== null) {
                // console.log(`==> User data: ${value}`);
                setBreakfast(val)
            }
        } catch(e){
            console.log(e);
        }
    }

    useEffect(() => {
        getBreakfast();
    }, [breakfast])

    return {breakfast, getBreakfast}
}