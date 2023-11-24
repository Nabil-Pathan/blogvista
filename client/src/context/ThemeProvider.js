import React , { useState} from "react";
import ThemeContext from "./ThemeContext";

const ThemeProvider = ({children}) =>{
    const [theme , setTheme] = useState('light')


    const toggleTheme = () =>{
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme)
    }

    return(
        <ThemeContext.Provider value={{theme , toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

export default  ThemeProvider