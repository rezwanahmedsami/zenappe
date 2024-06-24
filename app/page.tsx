import TabList from "@/components/TabList";
import FileBox from "@/components/FileBox";

export default function Home() {
    return (
        <div className="flex flex-col h-screen">
            <TabList />
            <div className="grid grid-cols-2 gap-2 bg-neutral-100 h-full min-h-0">
                <FileBox />
                <FileBox />
            </div>
        </div>
    );
}
