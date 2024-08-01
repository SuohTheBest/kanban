import React from 'react';
import Button from "@material-ui/core/Button";
import {Paper} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

interface SwimlaneProps {
    hasCreate: boolean;
    title: string;
    disabled?: boolean;
    setModelOpen?: (open: boolean) => void;
    children?: React.ReactNode;
}

const useStyles = makeStyles(() => ({
    paperRoot: {
        backgroundColor: '#f7f8f9'
    },
    button: {
        color: '#4285f4',
        borderColor: '#1a73e8',
        '&:hover': {
            color: '#1a73e8',
        },
    },
}));

const Swimlane: React.FC<SwimlaneProps> = ({
                                               hasCreate,
                                               title,
                                               disabled = false,
                                               setModelOpen = () => {
                                               },
                                               children
                                           }) => {
    const classes = useStyles();

    const hasChildren = React.Children.count(children) > 0;
    return (
        <div className="flex pl-6 pt-8 space-x-4 items-start">
            <Paper classes={{root: classes.paperRoot}} elevation={3}
                   className="rounded-lg shadow p-2 w-72 flex flex-col space-y-4">
                <div className="flex items-center p-2 justify-between">
                    <h2 className="text-xl font-bold">{title}</h2>
                    <span
                        className="bg-gray-200 text-gray-800 rounded-full px-2 py-1 text-sm">{React.Children.count(children)}</span>
                </div>
                {hasChildren && (
                    <div className="flex flex-col space-y-2 overflow-y-auto">
                        {children}
                    </div>
                )}
                {hasCreate &&
                    <Button className={classes.button} variant={"outlined"} disabled={disabled} onClick={() => {
                        setModelOpen(true)
                    }}>
                        + 创建
                    </Button>}
            </Paper>
        </div>

    );
};

export default Swimlane;