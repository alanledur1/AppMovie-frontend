'use client';

import { useTheme } from "@/context/ThemeContext";
import { FaMoon, FaSun } from "react-icons/fa";


export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button className="theme-toggle" onClick={toggleTheme} aria-label="Alternar Tema">
            {theme === 'dark' ? <FaSun /> : <FaMoon /> }
        </button>
    );
}