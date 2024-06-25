import FileTableItem from "./FileTableItem";
import { FileType } from "./FileBox";

type FileTableProps = {
    files: FileType[];
    path: string[];
    setPath: React.Dispatch<React.SetStateAction<string[]>>;
};

export default function FileTable({ files, path, setPath }: FileTableProps) {
    function handleFolderClick(path: string) {
        setPath((prev) => [...prev, path]);
    }
    function handleFolderBack() {
        setPath((prev) => prev.slice(0, -1));
    }

    return (
        <div className="overflow-x-auto overflow-y-auto max-h-full min-h-0">
            <table className="w-full h-full">
                <thead className="sticky top-0 left-0">
                    <tr>
                        <th className="bg-neutral-200 p-2 text-xs font-bold text-left">
                            Name
                        </th>
                        <th className="bg-neutral-200 p-2 text-xs font-bold text-right w-24">
                            Size
                        </th>
                        <th className="bg-neutral-200 p-2 text-xs font-bold text-left">
                            Changed
                        </th>
                        <th className="bg-neutral-200 p-2 text-xs font-bold text-left w-24">
                            Rights
                        </th>
                        <th className="bg-neutral-200 p-2 text-xs font-bold text-left w-24">
                            Owner
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {path.length > 0 && (
                        <FileTableItem
                            type="folder"
                            label="..."
                            size=""
                            changed=""
                            rights=""
                            owner=""
                            onDoubleClick={handleFolderBack}
                        />
                    )}
                    {files.map((file, index) => (
                        <FileTableItem
                            key={index}
                            type={file.type}
                            label={file.label}
                            size={file.size}
                            changed={file.changed}
                            rights={file.rights}
                            owner={file.owner}
                            onDoubleClick={() =>
                                file.type === "folder" &&
                                handleFolderClick(file.label)
                            }
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}
