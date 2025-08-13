import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext() //creating a context and naming it as themecontext


export const useTheme = () => {
    return useContext(ThemeContext) // what ever the theme created under this themecontext is accessible by this Usetheme 
};


export const ThemeProvider = ({ children }) => {  // this is the func created which will contain all our logic
    const [isDarkMode, setIsDarkMode] = useState(false) // creating a usestate for dark theme and kepping the initial state as false 



    const toogleTheme = () => {
        setIsDarkMode((prevState) => !prevState);
    }


    const theme = isDarkMode ? "Light" : "Dark" ;

    useEffect(()=>{
        document.documentElement.setAttribute("data-theme",theme)
        localStorage.setItem('theme', theme) // setting the theme in local storage
    },[isDarkMode])

    return <ThemeContext.Provider value={{ theme, toogleTheme }}>
        {children}
    </ThemeContext.Provider>  //these themeprovider will provide all of the state to this children

    // inside value --> is prop where it contains the theme ie, the dark or light and toogle theme
}