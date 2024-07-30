import IconButton from "@material-ui/core/IconButton";
import RemoveTaskIcon from "@mui/icons-material/Delete";
import {ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {StarBorder} from "@mui/icons-material";
import React from "react";
import axios from "axios";
import {apiUrl} from "./Common";

interface TaskListProps {
    name: string;
    index: number;
    selectedIndex: number;
    setSelectedIndex: (index: number) => void;
    fetchData: () => Promise<void>;
    info: (message: string, type: ("error" | "success")) => void;
}

export const TaskListItem: React.FC<TaskListProps> = ({
                                                          name,
                                                          index,
                                                          selectedIndex,
                                                          setSelectedIndex,
                                                          fetchData,
                                                          info
                                                      }) => {

    async function handleTaskDeletion(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        event.stopPropagation();
        try {
            const response = await axios.delete(`${apiUrl}/task`, {params: {task_id: index}});
            if (response.data.success) {
                info("🎉操作完成", "success");
                await fetchData();
            } else {
                info("操作失败，请稍后再试。", "error");
            }
        } catch (err) {
            info("操作失败，请稍后再试。", "error");
        }
    }

    return (
        <ListItemButton
            className="pl-4 group"
            selected={index === selectedIndex}
            onClick={() => {
                setSelectedIndex(index);

            }}
        >
            <ListItemIcon>
                <StarBorder/>
            </ListItemIcon>
            <ListItemText primary={name} sx={{wordWrap: "break-word"}}/>
            <div className="hidden group-hover:block">
                <IconButton edge="end" size="small" onClick={handleTaskDeletion}>
                    <RemoveTaskIcon className="text-red-400"/>
                </IconButton>
            </div>
        </ListItemButton>
    );
}