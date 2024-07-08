import {Avatar} from "@material-ui/core";
import React from "react";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        small: {
            width: theme.spacing(3),
            height: theme.spacing(3),
        },
    }),
);

interface AvatarWithNameProps {
    src: string;
    name: string;
}

export const AvatarWithName: React.FC<AvatarWithNameProps> = ({src, name}) => {
    const classes = useStyles();
    return (

        <div className='flex'>
            <Avatar src={src} className={classes.small}/>
            <h4 className="ml-2 text-base text-gray-600">{name}</h4>
        </div>

    );
};

interface DateYMDProps {
    year: number;
    month: number;
    day: number;
}

export const DateYMD: React.FC<DateYMDProps> = ({year, month, day}) => {
    return (
        <h5 className='text-sm'>{year}年{month}月{day}日</h5>
    );
};
