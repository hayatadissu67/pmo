import React, { createContext, useState, useContext } from 'react';
import { mockUsers } from '../data/mockData';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem('pmo_user');
        return saved ? JSON.parse(saved) : null;
    });

    const login = (email, password) => {
        // For demo, password must be 'password'
        const found = mockUsers.find(u => u.email === email && password === 'password');
        if (found) {
            setUser(found);
            localStorage.setItem('pmo_user', JSON.stringify(found));
            return { success: true };
        }
        // Allow login with any email if password is 'password'
        const foundAny = mockUsers.find(u => u.email === email);
        if (foundAny && password === 'password') {
            setUser(foundAny);
            localStorage.setItem('pmo_user', JSON.stringify(foundAny));
            return { success: true };
        }
        return { success: false, error: 'Invalid credentials. Use password: password' };
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('pmo_user');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}