import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import defaultTaskImg from './assets/task.svg'

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
    title: string;
}

const TaskTopBar: React.FC<TopBarProps> = ({title}) => {
    const classes = useStyles();
    return (<AppBar color="transparent" position="static">
        <Toolbar>
            <img src={defaultTaskImg} alt="Task" className="w-6 h-6 mr-2"/>
            <Typography variant="h6" className={classes.title}>
                {title}
            </Typography>
        </Toolbar>
    </AppBar>);
}

export default TaskTopBar