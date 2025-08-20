import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from 'react-native';

interface ThemeContextType {
    theme: 'light' | 'dark' ;
    toggleTheme: () => void;
}
const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider = ({ children }: {children: React.ReactNode }) => {
    const [theme, setTheme] = useState('light' as 'light' | 'dark');
    const defaultTheme = useColorScheme();
    
    useEffect(() => {
        const loadTheme = async () => {
            const savedTheme = await AsyncStorage.getItem('theme');
            if (savedTheme === 'light' || savedTheme === 'dark') {
                setTheme(savedTheme);
            } else {
                const systemTheme = defaultTheme === 'dark' ? 'dark' : 'light';
                setTheme(systemTheme)
                await AsyncStorage.setItem('theme', systemTheme)
            }
        }
        loadTheme();
    }, [])

    const toggleTheme = async () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        await AsyncStorage.setItem('theme', newTheme)
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export { ThemeContext }