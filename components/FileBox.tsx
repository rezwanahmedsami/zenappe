import FileToolbar from "./FileToolbar";
import FilePath from "./FilePath";
import FileTable from "./FileTable";

export default function FileBox() {
    return (
        <div>
            <FileToolbar />
            <FilePath />
            <FileTable />
        </div>
    );
}
