import Langs from "../Langs/Langs.json"

export const LangFun = (language) => {
    let lang

    language === "fr" && ( lang = Langs.frensh )
    language === "en" && ( lang = Langs.english )
    language === "ar" && ( lang = Langs.arabic )

    return lang
}