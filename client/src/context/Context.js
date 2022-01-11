import { createContext, useReducer, useEffect } from "react";
import reducer from "./Reducer";

const initState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isFetching: false,
  error: false,
};

export const Context = createContext();

export const ContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initState);

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(state.user))
       
    }, [state.user])

    const value = {
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch
    }
    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    )
}