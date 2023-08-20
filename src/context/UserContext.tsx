import React, { createContext, useContext, useState } from 'react';

interface UserContextType {
    user: { username: string; email: string } | null;
    setUser: React.Dispatch<React.SetStateAction<{ username: string; email: string } | null>>;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<{ username: string; email: string } | null>({ username: '', email: '' });

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUserContext(): UserContextType {
    const context = useContext(UserContext);
    if (!context) throw new Error('useUserContext must be used within a UserProvider');
    return context;
}
