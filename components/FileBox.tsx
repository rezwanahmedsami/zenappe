"use client";

import FileToolbar from "./FileToolbar";
import FilePath from "./FilePath";
import FileTable from "./FileTable";
import { useEffect, useState } from "react";

export type FileType = {
    type: string; // "file" | "folder" | symlink;
    name: string;
    size: string;
    changed: string;
    rights: number;
    owner: boolean;
};

export default function FileBox() {
    const [filesAndFolders, setFilesAndFolders] = useState<FileType[]>([]);
    const [path, setPath] = useState<string[]>([]);

    useEffect(() => {
        setHomePath();
        let pathStr = path.length > 0 ? "/" + path.join("/") : "/";
        getFilesAndFolders(pathStr);
    }, [path]);

    function setHomePath() {
        // set home directory as path based on os
        if (path.length === 0) {
            import("@tauri-apps/api")
                .then(({ invoke }) => {
                    invoke<string>("get_home_dir", {})
                        .then((homeDir) => {
                            console.log(homeDir);
                            setPath([homeDir]);
                        })
                        .catch((error) => {
                            console.error("Error fetching home directory:", error);
                        });
                })
                .catch((error) => {
                    console.error("Error loading @tauri-apps/api:", error);
                });
        }
    }

    function getFilesAndFolders(path: string) {
        import("@tauri-apps/api")
            .then(({ invoke }) => {
                invoke<string[]>("list_files_and_folders", {path: path})
                    .then((items: any[]) => {
                        console.log(items);
                        const formattedItems: FileType[] = items.map(
                            (item) => ({
                                type: item.type_,
                                name: item.name,
                                size: item.size,
                                changed: item.changed,
                                rights: item.rights,
                                owner: item.owner,
                            })
                        );

                        // sort folders first
                        formattedItems.sort((a, b) => {
                            if (a.type === "folder" && b.type === "file") {
                                return -1;
                            } else if (a.type === "file" && b.type === "folder") {
                                return 1;
                            } else {
                                return a.name.localeCompare(b.name);
                            }
                        });
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
        // import("@tauri-apps/api")
        //     .then(({ invoke }) => {
        //         invoke<string[]>("list_files_and_folders", {
        //             path: path.length > 0 ? "/" + path.join("/") : "/",
        //         })
        //             .then((items: string[]) => {
        //                 const formattedItems: FileType[] = items.map(
        //                     (name) => ({
        //                         type: name.includes(".") ? "file" : "folder",
        //                         label: name,
        //                         size: "100kb",
        //                         changed: "6/8/2024 4:50:26 pm",
        //                         rights: "rw-r--r--",
        //                         owner: "1013",
        //                     })
        //                 );
        //                 setFilesAndFolders(formattedItems);
        //             })
        //             .catch((error) => {
        //                 console.error(
        //                     "Error fetching files and folders:",
        //                     error
        //                 );
        //             });
        //     })
        //     .catch((error) => {
        //         console.error("Error loading @tauri-apps/api:", error);
        //     });
    }

    return (
        <div className="flex flex-col h-full">
            <FileToolbar refresh={getFilesAndFolders} />
            <FilePath path={path.length > 0 ? path.join("/") : "/"} />
            <FileTable files={filesAndFolders} path={path} setPath={setPath} />
        </div>
    );
}
