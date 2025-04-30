import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import themes from '../theme.json';

export const ThemeContext = createContext({
    theme: themes.light,
    toggleTheme: () => {},
});

export const ThemeProvider = ({ children }) => {
    const [themeName, setThemeName] = useState('light');
    const [theme, setTheme] = useState(themes.light);

    useEffect(() => {
        (async () => {
            const storedTheme = await AsyncStorage.getItem('appTheme');
            if (storedTheme && themes[storedTheme]){
                setThemeName(storedTheme);
                setTheme(themes[storedTheme]);
            }
        })();
    }, []);

    const toggleTheme = async () => {
        const newTheme = themeName === 'light' ? 'dark' : 'light';
        setThemeName(newTheme);
        setTheme(themes[newTheme]);
        await AsyncStorage.setItem('appTheme', newTheme);
    };

    const resetTheme = async () => {
        await AsyncStorage.removeItem('appTheme');
        setThemeName('light');
        setTheme(themes.light);
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, resetTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};