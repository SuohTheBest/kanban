import React, {useState} from 'react';
import ExpandablePanel from './ExpandablePanel';
import addButton from "./assets/add_circle.svg";
import {Paper} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import CreateProjectModal from "./CreateProjectModal.tsx";

interface SidebarProps {
    width: number;
    setWidth: (width: number) => void;
}

const Sidebar: React.FC<SidebarProps> = ({width, setWidth}) => {
    const handleMouseDown = (e: React.MouseEvent) => {
        const startX = e.clientX;
        const startWidth = width;

        const handleMouseMove = (e: MouseEvent) => {
            let newWidth = startWidth + e.clientX - startX;
            if (newWidth > 500) newWidth = 500;
            if (newWidth < 200) newWidth = 200;
            setWidth(newWidth);
        };
        const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    const [isOpen, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Paper elevation={3}>
            <div className={"flex-row flex h-full fixed"}>
                <div className="flex h-full pt-20 left-0 bg-white">
                    <div style={{width: width}}>
                        <div className="flex items-center justify-between px-3 mb-1">
                            <h2 className="text-lg text-black font-bold">项目</h2>
                            <IconButton className="p-1 rounded bg-transparent" onClick={() => {
                                setOpen(true)
                            }}>
                                <img src={addButton} alt="Add" className="w-6 h-6"/>
                            </IconButton>
                        </div>
                        <ExpandablePanel/>
                    </div>
                </div>
                <div
                    onMouseDown={handleMouseDown}
                    className=" justify-end top-0 w-1 h-full cursor-ew-resize bg-gray-200 hover:bg-sky-500"
                />
            </div>
            <CreateProjectModal isOpen={isOpen} handleClose={handleClose}/>
        </Paper>
    );
}

export default Sidebar