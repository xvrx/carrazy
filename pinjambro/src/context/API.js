import { createContext } from "react"

export const ApiContext = createContext()

export const APIProvider = props => {

    const currentHost = `http://${window.location.hostname}:2000/`;
    const apiLogin = "http://localhost:2000/auth/login";
    const apiVerify = "http://localhost:2000/auth/verify";

    return (
        <ApiContext.Provider value={{
            currentHost, apiLogin, apiVerify
            }}>
            {props.children}
        </ApiContext.Provider>
    )
}