import React from "react";
import {ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@mui/icons-material/NavigateNextOutlined';
import ExpandMore from '@mui/icons-material/ExpandMore';
import List from '@material-ui/core/List';
import {StarBorder} from "@mui/icons-material";

const ExpandablePanel = () => {
    const [isopen, setIsopen] = React.useState(true);

    const handleClick = () => {
        setIsopen(!isopen);
    };

    return (
        <List>
            <ListItem button onClick={handleClick}>
                {isopen ? <ExpandMore htmlColor='gray'/> : <ExpandLess htmlColor='gray'/>}
                <h2 className="text-sm text-gray-500">最近</h2>
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