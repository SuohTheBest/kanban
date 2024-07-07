import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import menuButton from './assets/menu.svg';
import React from "react";
import {useNavigate} from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            width: '100%',
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: theme.zIndex.drawer + 1,
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

    const navigate = useNavigate();

    function handleLoginClick() {
        navigate('/login');
    }

    return (
        <div className={classes.root}>
            <AppBar elevation={0} style={{backgroundColor: "skyblue"}} position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu"
                                onClick={toggleSidebar}>
                        <img src={menuButton} alt="Add" className="w-6 h-6"/>
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        敏捷看板
                    </Typography>
                    <Button color="inherit" style={{color: "black"}} onClick={handleLoginClick}><h2
                        className="text-">登录</h2></Button>
                </Toolbar>
            </AppBar>
        </div>);
}

export default TopBar