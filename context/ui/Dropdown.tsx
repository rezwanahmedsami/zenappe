"use client";

import { createContext, use, useContext, useState } from "react";

type DropdownContextType = {
    open: boolean;
    setOpen: (open: boolean) => void;
};
type DropdownProviderType = {
    children: React.ReactNode;
    className?: string;
};

const DropdownContext = createContext<DropdownContextType | null>(null);

export function DropdownProvider({
    children,
    className,
}: DropdownProviderType) {
    const [open, setOpen] = useState(false);

    return (
        <DropdownContext.Provider value={{ open, setOpen }}>
            <div className={`relative ${className ?? ""}`}>{children}</div>
        </DropdownContext.Provider>
    );
}

export default function useDropdown() {
    const context = useContext(DropdownContext);
    if (!context) {
        throw new Error("useDropdown must be used within a DropdownProvider");
    }
    return context;
}
