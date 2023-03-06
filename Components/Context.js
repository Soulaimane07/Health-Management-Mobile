import { GetUser } from "./GetData";

const { createContext } = require("react");

const PracticeContext = createContext();

const ContextProvider = ({children}) => {
    const user = GetUser().user

    return(
        <PracticeContext.Provider value={{user}}>
            {children}
        </PracticeContext.Provider>
    )
}

export {ContextProvider, PracticeContext}