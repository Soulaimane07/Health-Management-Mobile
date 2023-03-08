import AsyncStorage from "@react-native-async-storage/async-storage";
import { GetUser } from "./GetData";
import { LangFun } from "./Language";

const { createContext, useState } = require("react");

const PracticeContext = createContext();

const ContextProvider = ({children}) => {
    const user = GetUser().user
    const [lang, setLang] = useState("fr")
    const [languageObj, setlanguageObj] = useState(LangFun("fr"))

    const fun = async () => {
        const value = await AsyncStorage.getItem('lang')
        let val
        value !== null ? (
            // console.log("==> Language:", value),
            val = JSON.parse(value),
            setLang(val.lang),
            setlanguageObj(LangFun(val.lang))
        ) : (
            // console.log("Language is empty"),
            setLang("fr"),
            setlanguageObj(LangFun("fr"))
        )
    }
    fun()

    return(
        <PracticeContext.Provider value={{user, lang, setLang, languageObj}}>
            {children}
        </PracticeContext.Provider>
    )
}

export {ContextProvider, PracticeContext}