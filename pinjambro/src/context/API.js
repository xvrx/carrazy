import { createContext } from "react"

export const ApiContext = createContext()

export const APIProvider = props => {

    // const currentHost = `http://${window.location.hostname}:2000/`;
    const currentHost = process.env.REACT_APP_BASE_URL;

    return (
        <ApiContext.Provider value={{
            currentHost
            }}>
            {props.children}
        </ApiContext.Provider>
    )
}


