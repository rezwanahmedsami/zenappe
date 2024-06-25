"use client";

import FileToolbar from "./FileToolbar";
import FilePath from "./FilePath";
import FileTable from "./FileTable";
import { useEffect, useState } from "react";

export type FileType = {
    type?: "folder" | "file";
    label: string;
    size: string;
    changed: string;
    rights: string;
    owner: string;
};

export default function FileBox() {
    const [filesAndFolders, setFilesAndFolders] = useState<FileType[]>([]);
    const [path, setPath] = useState<string[]>([]);

    useEffect(() => {
        getFilesAndFolders();
    }, [path]);

    function getFilesAndFolders() {
        import("@tauri-apps/api")
            .then(({ invoke }) => {
                invoke<string[]>("list_files_and_folders", {
                    path: path.length > 0 ? "/" + path.join("/") : "/",
                })
                    .then((items: string[]) => {
                        const formattedItems: FileType[] = items.map(
                            (name) => ({
                                type: name.includes(".") ? "file" : "folder",
                                label: name,
                                size: "100kb",
                                changed: "6/8/2024 4:50:26 pm",
                                rights: "rw-r--r--",
                                owner: "1013",
                            })
                        );
                        setFilesAndFolders(formattedItems);
                    })
                    .catch((error) => {
                        console.error(
                            "Error fetching files and folders:",
                            error
                        );
                    });
            })
            .catch((error) => {
                console.error("Error loading @tauri-apps/api:", error);
            });
    }

    return (
        <div className="flex flex-col min-h-0">
            <FileToolbar refresh={getFilesAndFolders} />
            <FilePath path={path.length > 0 ? "/" + path.join("/") : "/"} />
            <FileTable files={filesAndFolders} path={path} setPath={setPath} />
        </div>
    );
}
