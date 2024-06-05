
import React, { createContext, useState, ReactNode } from 'react';

interface UserContextType {
    value: string,
    setValue: React.Dispatch<React.SetStateAction<string>>,
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [value, setValue] = useState<string>('');

    return (
        <UserContext.Provider value={{ loading, setLoading, value, setValue }}>
            {children}
        </UserContext.Provider>
    );
};

