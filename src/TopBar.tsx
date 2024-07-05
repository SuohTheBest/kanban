import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import menuButton from './assets/menu.svg';
import React from "react";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
            color: "black",
        },
    }),
);

interface TopBarProps {
    toggleSidebar: () => void;
}

const TopBar: React.FC<TopBarProps> = ({toggleSidebar}) => {
    const classes = useStyles();
    return (<AppBar style={{backgroundColor: "skyblue"}} position="static">
        <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu"
                        onClick={toggleSidebar}>
                <img src={menuButton} alt="Add" className="w-6 h-6"/>
            </IconButton>
            <Typography variant="h6" className={classes.title}>
                敏捷看板
            </Typography>
            <Button color="inherit" style={{color: "black"}}>Login</Button>
        </Toolbar>
    </AppBar>);
}

export default TopBar