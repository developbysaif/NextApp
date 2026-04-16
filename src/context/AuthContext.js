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
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData),
            });
            const data = await res.json();
            if (!data.success) throw new Error(data.message || "Signup failed");
            
            // Auto login after signup
            return await login(userData.email, userData.password);
        } catch (error) {
            throw error;
        }
    };

    const login = async (email, password) => {
        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();
            if (!data.success) throw new Error(data.message || "Login failed");

            localStorage.setItem("currentUser", JSON.stringify(data.user));
            setUser(data.user);
            return data.user;
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
        try {
            const res = await fetch("/api/auth/update", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId: user._id || user.id, ...updatedData }),
            });
            const data = await res.json();
            if (!data.success) throw new Error(data.message);

            const newUser = { ...user, ...data.user };
            localStorage.setItem("currentUser", JSON.stringify(newUser));
            setUser(newUser);
            return newUser;
        } catch (error) {
            console.error("Update failed:", error);
            throw error;
        }
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
