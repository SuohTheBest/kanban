import React from "react";
import {ListItem} from "@mui/material";
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@mui/icons-material/NavigateNextOutlined';
import ExpandMore from '@mui/icons-material/ExpandMore';
import List from '@material-ui/core/List';
import {Task} from "./interfaces";
import {TaskListItem} from "./TaskListItem";

interface ExpandablePanelProps {
    title: string;
    fetchData: () => Promise<void>;
    selectedIndex: number;
    setSelectedIndex: (index: number) => void;
    info: (message: string, type: ("error" | "success")) => void;
    items?: Task[];
}

const ExpandablePanel: React.FC<ExpandablePanelProps> = ({
                                                             title,
                                                             fetchData,
                                                             selectedIndex,
                                                             setSelectedIndex,
                                                             info,
                                                             items = []
                                                         }) => {
    const [isOpen, setIsOpen] = React.useState(true);
    const handleClick = () => {
        setIsOpen(!isOpen);
    };

    return (
        <List>
            <ListItem onClick={handleClick}>
                {isOpen ? <ExpandMore htmlColor='gray'/> : <ExpandLess htmlColor='gray'/>}
                <h2 className="text-sm text-gray-500">{title}</h2>
            </ListItem>
            <Collapse in={isOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {items.map((item) => (
                        <TaskListItem name={item.name}
                                      data-userid={item.user_id}
                                      key={item.id}
                                      index={item.id}
                                      selectedIndex={selectedIndex}
                                      setSelectedIndex={setSelectedIndex}
                                      fetchData={fetchData}
                                      info={info}
                        />
                    ))}
                </List>
            </Collapse>
        </List>
    )
        ;
}
export default ExpandablePanel;