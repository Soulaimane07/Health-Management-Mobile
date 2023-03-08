import AsyncStorage from "@react-native-async-storage/async-storage"
import { useEffect, useState } from "react"

export const GetUser = () => {
    const [user, setUser] = useState("null")

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