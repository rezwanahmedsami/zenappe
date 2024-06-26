import TabList from "@/components/TabList";
import FileBox from "@/components/FileBox";
import {
    ResizeableGroup,
    ResizeableHandle,
    ResizeablePanel,
} from "@/components/ui/Resizeable";

export default function Home() {
    return (
        <div className="flex flex-col h-screen">
            <TabList />
            <ResizeableGroup className="h-full min-h-0">
                <ResizeablePanel className="h-full" minWidth="300px">
                    <FileBox />
                </ResizeablePanel>
                <ResizeableHandle className="w-2 bg-neutral-200" />
                <ResizeablePanel className="h-full" minWidth="300px">
                    <FileBox />
                </ResizeablePanel>
            </ResizeableGroup>
            {/* <div className="grid grid-cols-2 gap-2 bg-neutral-100 min-h-0">
                <FileBox />
                <FileBox />
            </div> */}
        </div>
    );
}
