export default function FileTable() {
    return (
        <div className="overflow-x-auto">
            <table className="w-full h-full select-none">
                <thead>
                    <tr>
                        <th className="bg-neutral-200 p-2 text-xs font-bold text-left">
                            Name
                        </th>
                        <th className="bg-neutral-200 p-2 text-xs font-bold text-right">
                            Size
                        </th>
                        <th className="bg-neutral-200 p-2 text-xs font-bold text-left">
                            Changed
                        </th>
                        <th className="bg-neutral-200 p-2 text-xs font-bold text-left">
                            Rights
                        </th>
                        <th className="bg-neutral-200 p-2 text-xs font-bold text-left">
                            Owner
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="group/td cursor-grab" draggable={true}>
                        <td className="border border-neutral-200 p-2 group-hover/td:bg-neutral-200">
                            <div className="flex items-center space-x-2">
                                <svg
                                    width="15"
                                    height="15"
                                    viewBox="0 0 15 15"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="text-blue-500 flex-shrink-0 w-4 h-4"
                                >
                                    <path
                                        d="M0 5.61936V11.25C0.00208008 12.975 1.39998 14.3729 3.12501 14.375H11.875C13.6 14.3729 14.9979 12.975 15 11.25V5.54999L0 5.61936Z"
                                        fill="currentColor"
                                    />
                                    <path
                                        d="M11.875 1.875H7.79499C7.69834 1.87564 7.6028 1.85425 7.51562 1.81251L5.54312 0.822506C5.28272 0.692838 4.99588 0.62525 4.70499 0.625015H3.12498C1.39998 0.627066 0.00208008 2.02497 0 3.75V4.36936L14.9144 4.29999C14.5887 2.88304 13.3289 1.8779 11.875 1.875Z"
                                        fill="currentColor"
                                    />
                                </svg>
                                <span className="text-xs font-medium min-w-0 truncate w-full">
                                    Folder
                                </span>
                            </div>
                        </td>
                        <td className="border border-neutral-200 p-2 group-hover/td:bg-neutral-200 text-xs font-medium text-right">
                            100kb
                        </td>
                        <td className="border border-neutral-200 p-2 group-hover/td:bg-neutral-200 text-xs font-medium">
                            6/8/2024 4:50:26 pm
                        </td>
                        <td className="border border-neutral-200 p-2 group-hover/td:bg-neutral-200 text-xs font-medium">
                            rw-r--r--
                        </td>
                        <td className="border border-neutral-200 p-2 group-hover/td:bg-neutral-200 text-xs font-medium">
                            1013
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
