import React, {useState} from 'react';
import ExpandablePanel from './ExpandablePanel';
import addButton from "./assets/add_circle.svg";


const Sidebar: React.FC = () => {
    const [sidebarWidth, setSidebarWidth] = useState(200);

    const handleMouseDown = (e: React.MouseEvent) => {
        const startX = e.clientX;
        const startWidth = sidebarWidth;

        const handleMouseMove = (e: MouseEvent) => {
            let newWidth = startWidth + e.clientX - startX;
            if (newWidth > 500) newWidth = 500;
            if (newWidth < 100) newWidth = 100;
            setSidebarWidth(newWidth);
        };
        const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    return (
        <div className={"flex-row flex h-full"}>
            <div className="flex h-full top-0 left-0 bg-gray-100 pt-5">
                <div style={{width: sidebarWidth}}>
                    <div className="flex items-center justify-between px-3 mb-5">
                        <h2 className="text-lg text-black font-bold">项目</h2>
                        <button className="p-1 rounded bg-transparent">
                            <img src={addButton} alt="Add" className="w-6 h-6"/>
                        </button>
                    </div>
                    <ExpandablePanel title="最近项目">
                        <p className="text-black">Content for Panel 1</p>
                    </ExpandablePanel>
                </div>
            </div>
            <div
                onMouseDown={handleMouseDown}
                className=" justify-end top-0 w-1 h-full cursor-ew-resize bg-gray-200 hover:bg-sky-500"
            />
        </div>
    );
}

export default Sidebar