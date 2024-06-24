import Link from "next/link";

type TabItemProps = {
    text: string;
    link: string;
    active?: boolean;
};

export default function TabItem({ text, link, active = false }: TabItemProps) {
    return (
        <Link
            href={link}
            className={`h-9 flex items-center pl-3 pr-6 space-x-2 relative ${
                active ? "bg-white" : "bg-neutral-100 hover:bg-neutral-200"
            }`}
        >
            <svg
                className="text-blue-500 w-4 h-4 flex-shrink-0"
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M0 5.61939V11.25C0.00208008 12.975 1.39998 14.3729 3.12501 14.375H11.875C13.6 14.3729 14.9979 12.975 15 11.25V5.55002L0 5.61939Z"
                    fill="currentColor"
                />
                <path
                    d="M11.875 1.87501H7.79499C7.69834 1.87566 7.6028 1.85427 7.51562 1.81252L5.54312 0.822521C5.28272 0.692853 4.99588 0.625265 4.70499 0.625031H3.12498C1.39998 0.627081 0.00208008 2.02498 0 3.75001V4.36938L14.9144 4.3C14.5887 2.88306 13.3289 1.87791 11.875 1.87501Z"
                    fill="currentColor"
                />
            </svg>
            <span className="text-xs font-medium whitespace-nowrap">
                {text}
            </span>
            <button
                type="button"
                className="absolute top-1/2 -translate-y-1/2 right-1 hover:text-black"
            >
                <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 text-neutral-700"
                >
                    <path
                        d="M11.25 3.75001C11.1328 3.63284 10.9739 3.56702 10.8081 3.56702C10.6424 3.56702 10.4835 3.63284 10.3663 3.75001L7.50001 6.61626L4.63376 3.75001C4.51655 3.63284 4.35761 3.56702 4.19188 3.56702C4.02616 3.56702 3.86721 3.63284 3.75001 3.75001C3.63284 3.86721 3.56702 4.02616 3.56702 4.19188C3.56702 4.35761 3.63284 4.51655 3.75001 4.63376L6.61626 7.50001L3.75001 10.3663C3.63284 10.4835 3.56702 10.6424 3.56702 10.8081C3.56702 10.9739 3.63284 11.1328 3.75001 11.25C3.86721 11.3672 4.02616 11.433 4.19188 11.433C4.35761 11.433 4.51655 11.3672 4.63376 11.25L7.50001 8.38376L10.3663 11.25C10.4835 11.3672 10.6424 11.433 10.8081 11.433C10.9739 11.433 11.1328 11.3672 11.25 11.25C11.3672 11.1328 11.433 10.9739 11.433 10.8081C11.433 10.6424 11.3672 10.4835 11.25 10.3663L8.38376 7.50001L11.25 4.63376C11.3672 4.51655 11.433 4.35761 11.433 4.19188C11.433 4.02616 11.3672 3.86721 11.25 3.75001Z"
                        fill="currentColor"
                    />
                </svg>
            </button>
        </Link>
    );
}
