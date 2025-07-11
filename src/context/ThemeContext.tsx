'use client';

import React, { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark';

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    // Começa sem tema definido para evitar "piscar" no carregamento inicial
    const [theme, setTheme] = useState<Theme | null>(null);


    useEffect(() => {
        // Esta lógica agora corre apenas no lado do cliente
        const storedTheme = localStorage.getItem('Theme') as Theme | null;
        const initialTheme = storedTheme ? storedTheme : 'light';
        setTheme(initialTheme);
        document.documentElement.setAttribute('data-theme', initialTheme);
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('Theme', newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
    };

    if (!theme) {
        return null;
    };
    
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
        {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) throw new Error("UseTheme must be used within ThemeProvider");
    return context;
}
