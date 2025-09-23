import { createContext, useReducer } from "react";

const notificationReducer = (state, action) => {
    switch (action.type) {
        case "SET":
            return action.payload
        case "CLEAR":
            return ""
        default: 
            return state
    }
}

export const NotificationContext = createContext()

export const NotificationProvider = ({ children }) => {
    const [notification, dispatch] = useReducer(notificationReducer, "")
    
    return (
        <NotificationContext.Provider value={[notification, dispatch]}>
            {children}
        </NotificationContext.Provider>
    )
}