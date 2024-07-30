import React, {useEffect, useState} from 'react';
import ExpandablePanel from './ExpandablePanel';
import addButton from "./assets/add_circle.svg";
import {Paper} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import CreateProjectModal from "./CreateProjectModal";
import axios from "axios";
import {apiUrl} from "./Common";
import {Task} from "./interfaces";

interface SidebarProps {
    width: number;
    setWidth: (width: number) => void;
    selectedIndex: number;
    setSelectedIndex: (index: number) => void;
    taskList: Task[];
    setTaskList: (tasks: Task[]) => void;
    info: (message: string, type: ("error" | "success")) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
                                             width,
                                             setWidth,
                                             selectedIndex,
                                             setSelectedIndex,
                                             taskList,
                                             setTaskList,
                                             info
                                         }) => {
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

    function handleClose() {
        setOpen(false);
    }

    async function fetchData() {
        try {
            const allTasks = await axios.get(`${apiUrl}/task`);
            if (!allTasks.data.success) {
                info("更新数据异常!", "error");
            } else {
                setTaskList(allTasks.data.value as Task[]);
            }
        } catch (err) {
            console.log(err);
            info("更新数据异常!", "error");
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Paper elevation={3}>
            <div className="flex-row flex h-full fixed">
                <div className="flex h-full pt-20 left-0 bg-white overflow-y-auto">
                    <div style={{width: width}}>
                        <div className="flex items-center justify-between px-3 mb-1">
                            <h2 className="text-lg text-black font-bold">项目</h2>
                            <IconButton className="p-1 rounded bg-transparent" onClick={() => {
                                setOpen(true);
                            }}>
                                <img src={addButton} alt="Add" className="w-6 h-6"/>
                            </IconButton>
                        </div>
                        <ExpandablePanel title={"我创建的"} items={taskList} fetchData={fetchData} info={info}
                                         selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex}

                        />
                    </div>
                </div>
                <div
                    onMouseDown={handleMouseDown}
                    className="justify-end top-0 w-1 h-full cursor-ew-resize bg-gray-200 hover:bg-sky-500"
                />
            </div>
            <CreateProjectModal isOpen={isOpen} handleClose={handleClose} fetchData={fetchData} info={info}/>
        </Paper>
    );
}

export default Sidebar