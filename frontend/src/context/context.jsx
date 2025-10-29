import React, { createContext, useContext, useState, useEffect } from "react";


const AppContext = createContext();

export const ContextProvider = ({ children }) => {

    const [internalActiveSection, setInternalActiveSection] = useState("Dashboard")

     return (
        <AppContext.Provider value={{internalActiveSection,setInternalActiveSection}}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    return useContext(AppContext);
};