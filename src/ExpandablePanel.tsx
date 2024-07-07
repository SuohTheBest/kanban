import React from "react";
import {ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ExpandLess from '@mui/icons-material/NavigateNextOutlined';
import ExpandMore from '@mui/icons-material/ExpandMore';
import List from '@material-ui/core/List';
import {StarBorder} from "@mui/icons-material";

interface ExpandablePanelProps {
    title: string
}

const ExpandablePanel: React.FC<ExpandablePanelProps> = ({title}) => {
    const [isopen, setIsopen] = React.useState(true);

    const handleClick = () => {
        setIsopen(!isopen);
    };

    return (
        <List>
            <ListItem button onClick={handleClick}>
                <ListItemIcon>
                    <InboxIcon/>
                </ListItemIcon>
                <ListItemText primary={title}/>
                {isopen ? <ExpandMore/> : <ExpandLess/>}
            </ListItem>
            <Collapse in={isopen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItem button className="pl-4">
                        <ListItemIcon>
                            <StarBorder/>
                        </ListItemIcon>
                        <ListItemText primary="Starred"/>
                    </ListItem>
                </List>
            </Collapse>
        </List>
    )
        ;
}
export default ExpandablePanel;