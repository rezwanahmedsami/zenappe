type FilePathProps = {
    path: string;
};

export default function FilePath({ path }: FilePathProps) {
    return (
        <div className="bg-blue-200 p-2 flex-shrink-0">
            <p className="text-xs font-medium">{path}</p>
        </div>
    );
}
