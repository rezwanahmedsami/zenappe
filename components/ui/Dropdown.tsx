"use client";

import useDropdown from "@/context/ui/Dropdown";

type DropdownProps = {
    children: React.ReactNode;
    className?: string;
};

export function DropdownTrigger({ children, className }: DropdownProps) {
    const { open, setOpen } = useDropdown();

    return (
        <button
            type="button"
            onClick={() => setOpen(!open)}
            className={className ?? ""}
        >
            {children}
        </button>
    );
}

export function DropdownList({ children, className }: DropdownProps) {
    const { open } = useDropdown();

    return (
        <>
            {open && (
                <div
                    className={`absolute top-full left-0 w-full max-h-80 overflow-y-auto bg-white z-30 shadow-md shadow-black/10 border border-neutral-200 py-1 rounded ${
                        className ?? ""
                    }`}
                >
                    {children}
                </div>
            )}
        </>
    );
}

export function DropdownItem({ children, className }: DropdownProps) {
    return (
        <button
            type="button"
            className={`py-1.5 px-3 text-xs text-left font-medium w-full hover:bg-neutral-200 ${
                className ?? ""
            }`}
        >
            {children}
        </button>
    );
}
