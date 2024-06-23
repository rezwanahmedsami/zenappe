import TabItem from "./TabItem";

export default function TabList() {
    return (
        <div className="overflow-x-auto bg-neutral-100 flex divide-x divide-neutral-200 border-b border-b-neutral-200">
            <TabItem link="/" text="Documents - Documents" active={true} />
            <TabItem link="/" text="rezwan@tutopa.com@ftp.tutopa.com" />
            <TabItem link="/" text="rezwan@tutopa.com@ftp.tutopa.com" />
            <TabItem link="/" text="rezwan@tutopa.com@ftp.tutopa.com" />
            <button
                type="button"
                className="h-9 px-3 bg-blue-500 text-white text-xs font-medium whitespace-nowrap"
            >
                New Site
            </button>
        </div>
    );
}
