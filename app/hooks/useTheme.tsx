import { useContext } from "react";
import { ThemeContext } from '../contexts/ThemeContext'
import { Colors } from '../constants/Colors'

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) throw new Error('useTheme must be used within ThemeProvider');
    
    return {
        ...context,
        colors: Colors[context.theme]
    }
}