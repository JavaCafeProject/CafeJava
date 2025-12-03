import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');
        const userId = localStorage.getItem('userId');
        const firstName = localStorage.getItem('firstName');
        const employeeRole = localStorage.getItem('employeeRole');

        if (token && role && userId) {
            return { token, role, userId: Number(userId), firstName, employeeRole };
        }
        return null;
    });

    const login = (data) => {
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.role);
        localStorage.setItem('userId', data.userId);
        localStorage.setItem('firstName', data.firstName || '');
        localStorage.setItem('employeeRole', data.employeeRole || '');
        setUser(data);
    };

    const logout = () => {
        localStorage.clear();
        setUser(null);
    };

    const isEmployee = () => {
        return user?.role === 'EMPLOYEE' || user?.role === 'MANAGER' || user?.role === 'WAITER';
    };

    const isManager = () => {
        return user?.role === 'MANAGER';
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isEmployee, isManager }}>
            {children}
        </AuthContext.Provider>
    );
};