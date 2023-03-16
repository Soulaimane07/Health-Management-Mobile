import AsyncStorage from "@react-native-async-storage/async-storage";
import { GetUser } from "./GetData";
import { LangFun } from "./Language";

const { createContext, useState, useEffect } = require("react");

const PracticeContext = createContext();

const ContextProvider = ({children}) => {
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

    const [lang, setLang] = useState("fr")
    const [languageObj, setlanguageObj] = useState(LangFun("fr"))
    const [language, setLanguage] = useState()

    const fun = async () => {
        const value = await AsyncStorage.getItem('lang')
        let val
        value !== null ? (
            // console.log("==> Language:", value),
            val = JSON.parse(value),
            setLang(val.lang),
            setlanguageObj(LangFun(val.lang)),

            // console.log(val.lang),

            val.lang == "fr" && (setLanguage("Français")),
            val.lang == "ar" && (setLanguage("العربية")),
            val.lang == "en" && (setLanguage("English"))
        ) : (
            // console.log("Language is empty"),
            setLang("fr"),
            setlanguageObj(LangFun("fr"))
        )
    }
    fun()

    return(
        <PracticeContext.Provider value={{user, lang, setLang, languageObj, language}}>
            {children}
        </PracticeContext.Provider>
    )
}

export {ContextProvider, PracticeContext}