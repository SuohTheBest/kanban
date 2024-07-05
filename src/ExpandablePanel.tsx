import React, {useState, ReactNode} from "react";
import chevron_right from "./assets/chevron_right.svg"
import arrow_down from "./assets/arrow_down.svg";

interface ExpandablePanelProps {
    title: string;
    children: ReactNode;
}

const ExpandablePanel: React.FC<ExpandablePanelProps> = ({title, children}) => {
    const [isOpen, setIsOpen] = useState(false);

    const togglePanel = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="mb-4">
            <div
                className="flex items-center cursor-pointer bg-transparent p-4 text-gray-500 h-2"
                onClick={togglePanel}>
                {!isOpen && (
                    <button className="p-1 rounded bg-transparent">
                        <img src={chevron_right} alt='Expand' className="w-4 h-4"></img>
                    </button>
                )}
                {isOpen&& (
                    <button className="p-1 rounded bg-transparent">
                        <img src={arrow_down} alt='Expand' className="w-4 h-4"></img>
                    </button>
                )}
                <h3 className="font-normal p-2">{title}</h3>
            </div>
            {isOpen && (
                <div className="bg-transparent p-4">
                    {children}
                </div>
            )}
        </div>
    );
};

export default ExpandablePanel;