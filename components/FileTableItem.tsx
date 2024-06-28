import { FileType } from "./FileBox";

type FileTableItemProps = FileType & {
    onDoubleClick: () => void;
};

export default function FileTableItem({
    type = "file",
    name,
    size,
    changed,
    rights,
    owner,
    onDoubleClick,
}: FileTableItemProps) {
    return (
        <tr
            className="group/td cursor-grab divide-x divide-neutral-200"
            draggable={true}
        >
            <td
                className="p-2 group-hover/td:bg-neutral-200"
                onDoubleClick={onDoubleClick}
            >
                <div className="flex items-center space-x-2">
                    {type === "folder" ? (
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
                    ) : (
                        <svg
                            width="15"
                            height="15"
                            viewBox="0 0 15 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="text-neutral-500 flex-shrink-0 w-4 h-4"
                        >
                            <g clipPath="url(#clip0_5_195)">
                                <path
                                    d="M8.75 4.37499V0.287492C9.32816 0.505827 9.85331 0.844562 10.2906 1.28124L12.4681 3.45999C12.9053 3.89679 13.2443 4.4218 13.4625 4.99999H9.375C9.20924 4.99999 9.05027 4.93414 8.93306 4.81693C8.81585 4.69972 8.75 4.54075 8.75 4.37499ZM13.75 6.55312V11.875C13.749 12.7035 13.4194 13.4978 12.8336 14.0836C12.2478 14.6694 11.4535 14.999 10.625 15H4.375C3.5465 14.999 2.75222 14.6694 2.16639 14.0836C1.58055 13.4978 1.25099 12.7035 1.25 11.875V3.12499C1.25099 2.2965 1.58055 1.50222 2.16639 0.91638C2.75222 0.330544 3.5465 0.000984782 4.375 -7.62939e-06L7.19688 -7.62939e-06C7.29875 -7.62939e-06 7.39937 0.00811737 7.5 0.0149924V4.37499C7.5 4.87227 7.69754 5.34919 8.04917 5.70082C8.40081 6.05245 8.87772 6.24999 9.375 6.24999H13.735C13.7419 6.35062 13.75 6.45124 13.75 6.55312ZM8.75 11.875C8.75 11.7092 8.68415 11.5503 8.56694 11.4331C8.44973 11.3158 8.29076 11.25 8.125 11.25H5C4.83424 11.25 4.67527 11.3158 4.55806 11.4331C4.44085 11.5503 4.375 11.7092 4.375 11.875C4.375 12.0408 4.44085 12.1997 4.55806 12.3169C4.67527 12.4341 4.83424 12.5 5 12.5H8.125C8.29076 12.5 8.44973 12.4341 8.56694 12.3169C8.68415 12.1997 8.75 12.0408 8.75 11.875ZM10.625 9.37499C10.625 9.20923 10.5592 9.05026 10.4419 8.93305C10.3247 8.81584 10.1658 8.74999 10 8.74999H5C4.83424 8.74999 4.67527 8.81584 4.55806 8.93305C4.44085 9.05026 4.375 9.20923 4.375 9.37499C4.375 9.54075 4.44085 9.69972 4.55806 9.81693C4.67527 9.93414 4.83424 9.99999 5 9.99999H10C10.1658 9.99999 10.3247 9.93414 10.4419 9.81693C10.5592 9.69972 10.625 9.54075 10.625 9.37499Z"
                                    fill="currentColor"
                                />
                            </g>
                            <defs>
                                <clipPath id="clip0_5_195">
                                    <rect
                                        width="15"
                                        height="15"
                                        fill="currentColor"
                                    />
                                </clipPath>
                            </defs>
                        </svg>
                    )}
                    <span className="text-xs font-medium min-w-0 truncate w-full">
                        {name}
                    </span>
                </div>
            </td>
            <td className="p-2 group-hover/td:bg-neutral-200 text-xs font-medium text-right">
                {size}
            </td>
            <td className="p-2 group-hover/td:bg-neutral-200 text-xs font-medium truncate">
                {changed}
            </td>
            <td className="p-2 group-hover/td:bg-neutral-200 text-xs font-medium truncate">
                {rights}
            </td>
            <td className="p-2 group-hover/td:bg-neutral-200 text-xs font-medium">
                {owner}
            </td>
        </tr>
    );
}
