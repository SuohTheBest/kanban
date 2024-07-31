import IconButton from "@material-ui/core/IconButton";
import RemoveTaskIcon from "@mui/icons-material/Delete";
import {ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {Share, StarBorder} from "@mui/icons-material";
import React, {useState} from "react";
import axios from "axios";
import {apiUrl, TimeWait} from "./Common";
import ShareTaskModal from "./ShareTaskModel";

interface TaskListProps {
    name: string;
    index: number;
    selectedIndex: number;
    showButton: boolean;
    setSelectedIndex: (index: number) => void;
    fetchData: () => Promise<void>;
    info: (message: string, type: ("error" | "success")) => void;
}

export const TaskListItem: React.FC<TaskListProps> = ({
                                                          name,
                                                          index,
                                                          showButton,
                                                          selectedIndex,
                                                          setSelectedIndex,
                                                          fetchData,
                                                          info
                                                      }) => {
    const [open, setOpen] = React.useState(false);
    const [email, setEmail] = useState('');

    const handleClose = () => {
        setOpen(false)
    };

    async function handleTaskDeletion(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        event.stopPropagation();
        try {
            const response = await axios.delete(`${apiUrl}/task`, {params: {task_id: index}});
            if (response.data.success) {
                info("🎉操作完成", "success");
                await TimeWait(750);
                setSelectedIndex(-1);
                await fetchData();
            } else {
                info("操作失败，请稍后再试。", "error");
            }
        } catch (err) {
            info("操作失败，请稍后再试。", "error");
        }
    }

    async function handleTaskShare() {
        if (email === '') {
            info("电子邮件不能为空!", "error");
            return;
        }
        const response = await axios.post(`${apiUrl}/task/collaborate`, {email: email, task_id: index});
        if (response.data.success) {
            info("🎉添加成功", 'success');
            await fetchData();
            await TimeWait(750);
            handleClose();
        } else {
            info(response.data.message, "error");
        }
    }

    return (
        <ListItemButton
            className="pl-4 group"
            disableRipple
            selected={index === selectedIndex}
            onClick={() => {
                setSelectedIndex(index);
            }}
        >
            <ListItemIcon>
                <StarBorder/>
            </ListItemIcon>
            <ListItemText primary={name} sx={{wordWrap: "break-word"}}/>
            {showButton && <>
                <div className="space-x-2 hidden group-hover:block">
                    <IconButton edge="end" size="small" onClick={(event) => {
                        event.stopPropagation();
                        setOpen(true);
                    }}>
                        <Share className="text-lime-500"/>
                    </IconButton>
                    <IconButton edge="end" size="small" onClick={handleTaskDeletion}>
                        <RemoveTaskIcon className="text-red-400"/>
                    </IconButton>
                </div>
                <div onClick={(event) => {
                    event.stopPropagation()
                }}>
                    <ShareTaskModal open={open} handleClose={handleClose} handleTaskShare={handleTaskShare}
                                    setEmail={setEmail}/>
                </div>
            </>}

        </ListItemButton>
    );
}