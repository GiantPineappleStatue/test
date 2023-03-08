import React, { useContext, useState } from 'react';

const MainContext = React.createContext();

export const ContextProvider = ({ children }) => {
    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => {
        setSidebar((prev) => !prev);
    };
    return <MainContext.Provider value={{ sidebar, showSidebar }}>{children}</MainContext.Provider>;
};

export const useMainContext = () => {
    return useContext(MainContext);
};
