"use client";

import { useEffect, useRef, createContext, useContext } from "react";

type ResizeableProps = {
    children: React.ReactNode;
};
type ResizeableGroupProps = ResizeableProps &
    ResizeableContextType & {
        className?: string;
    };
type ResizeableContextType = {
    direction?: "horizontal" | "vertical";
};

const ResizeableContext = createContext<ResizeableContextType | null>(null);

export function ResizeableGroup({
    children,
    direction = "horizontal",
    className,
}: ResizeableGroupProps) {
    return (
        <ResizeableContext.Provider
            value={{
                direction,
            }}
        >
            <div
                className={`flex ${className ?? ""} ${
                    direction === "vertical" ? "flex-col" : "flex-row"
                }`}
            >
                {children}
            </div>
        </ResizeableContext.Provider>
    );
}

function useResizeable() {
    const context = useContext(ResizeableContext);
    if (!context) {
        throw new Error("useResizeable must be used within an ResizeableGroup");
    }
    return context;
}

type ResizeableHandleProps = {
    className?: string;
};

export function ResizeableHandle({ className }: ResizeableHandleProps) {
    const handleRef = useRef<HTMLDivElement>(null);
    const { direction } = useResizeable();

    useEffect(() => {
        if (!handleRef.current) return;
        const handle = handleRef.current;
        const next = handle.nextElementSibling as HTMLDivElement;
        const prev = handle.previousElementSibling as HTMLDivElement;
        const parent = handle.parentElement;
        if (!parent) return;
        let start = 0;
        let isDragging = false;
        let flexGrow = {
            prev: 0,
            next: 0,
        };
        const parentWidth = parent.clientWidth;
        document.addEventListener("mousedown", mouseDown);
        document.addEventListener("mousemove", mouseMove);
        document.addEventListener("mouseup", mouseLeaveAndUp);

        function mouseDown(e: MouseEvent) {
            if ((e.target as HTMLDivElement).contains(handle)) {
                e.preventDefault();
                start = direction === "horizontal" ? e.clientX : e.clientY;
                isDragging = true;
                prev &&
                    (flexGrow.prev = Number(getComputedStyle(prev).flexGrow));
                next &&
                    (flexGrow.next = Number(getComputedStyle(next).flexGrow));
            }
        }
        function mouseMove(e: MouseEvent) {
            if (isDragging) {
                const current =
                    direction === "horizontal"
                        ? e.clientX - start
                        : e.clientY - start;
                const currentPos = Math.abs((current / parentWidth) * 100);
                prev &&
                    (prev.style.flex = `${
                        flexGrow.prev + currentPos * (current < 0 ? -1 : 1)
                    } 1 0`);
                next &&
                    (next.style.flex = `${
                        flexGrow.next + currentPos * (current > 0 ? -1 : 1)
                    } 1 0`);
            }
        }
        function mouseLeaveAndUp() {
            if (isDragging) {
                isDragging = false;
                start = 0;
                flexGrow = {
                    prev: 0,
                    next: 0,
                };
            }
        }

        return () => {
            document.removeEventListener("mousedown", mouseDown);
            document.removeEventListener("mousemove", mouseMove);
            document.removeEventListener("mouseup", mouseLeaveAndUp);
        };
    }, []);

    return (
        <div
            ref={handleRef}
            className={`w-px cursor-col-resize ${className ?? ""}`}
        ></div>
    );
}

type ResizeablePanelProps = ResizeableProps & {
    grow?: number;
    minWidth?: string;
    maxWidth?: string;
    className?: string;
};

export function ResizeablePanel({
    children,
    grow = 50,
    minWidth = "0",
    maxWidth = "none",
    className,
}: ResizeablePanelProps) {
    return (
        <div
            className={`min-w-0 min-h-0 ${className ?? ""}`}
            style={{
                flex: `${grow} 1 0`,
                maxWidth: maxWidth,
                minWidth: minWidth,
            }}
        >
            {children}
        </div>
    );
}
