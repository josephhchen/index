import { useContext } from "react";
import { Colors } from '../constants/Colors';
import { ThemeContext } from '../contexts/ThemeContext';

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) throw new Error('useTheme must be used within ThemeProvider');
    
    return {
        ...context,
        colors: Colors[context.theme]
    }
}