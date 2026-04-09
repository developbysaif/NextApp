"use client";

import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem("currentUser");
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (e) {
                console.error("Failed to parse user", e);
            }
        }
        setLoading(false);
    }, []);

    const signup = async (userData) => {
        try {
            // Simulate network delay
            await new Promise(resolve => setTimeout(resolve, 500));

            const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
            const userExists = existingUsers.find(u => u.email === userData.email);

            if (userExists) {
                throw new Error("User already exists");
            }

            const newUser = { ...userData, id: Date.now().toString() };
            const updatedUsers = [...existingUsers, newUser];

            localStorage.setItem("users", JSON.stringify(updatedUsers));

            // Auto login
            return await login(userData.email, userData.password);
        } catch (error) {
            throw error;
        }
    };

    const login = async (email, password) => {
        try {
            // Simulate network delay
            await new Promise(resolve => setTimeout(resolve, 500));

            const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
            const user = existingUsers.find(u => u.email === email && u.password === password);

            if (!user) {
                throw new Error("Invalid email or password");
            }

            const { password: _, ...userWithoutPassword } = user;
            localStorage.setItem("currentUser", JSON.stringify(userWithoutPassword));
            setUser(userWithoutPassword);
            return userWithoutPassword;
        } catch (error) {
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem("currentUser");
        setUser(null);
    };

    const updateProfile = async (updatedData) => {
        if (!user) return;
        // In a real app, this would call an API
        const newUser = { ...user, ...updatedData };
        localStorage.setItem("currentUser", JSON.stringify(newUser));
        setUser(newUser);
    };

    return (
        <AuthContext.Provider value={{ user, signup, login, logout, updateProfile, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
