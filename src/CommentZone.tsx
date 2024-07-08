import React, {useRef, useState} from "react";
import Grid from "@mui/material/Grid";
import {Avatar, Paper} from "@material-ui/core";
import {Textarea} from "@mui/joy";
import Button from "@material-ui/core/Button";
import Box from "@mui/material/Box";
import {keyframes} from "@emotion/react";
import {createStyles, makeStyles} from "@material-ui/core/styles";

interface CommentZoneProps {
    imgLink: string;
    children?: React.ReactNode;
}

const fadeIn = keyframes`
    from {
        opacity: 0;
        transform: translateY(-2px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

const useStyles = makeStyles(() =>
    createStyles({
        button: {
            backgroundColor: '#4285f4',
            color: 'white',
            '&:hover': {
                backgroundColor: '#1a73e8',
            },
        },
    }),
);

const CommentZone: React.FC<CommentZoneProps> = ({imgLink, children}) => {
    const hasChildren = React.Children.count(children) > 0;
    const [isFocused, setIsFocused] = useState(false);
    const timeoutRef = useRef<number | null>(null);

    const classes = useStyles();

    const handleFocus = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
        setIsFocused(true);
    };

    const handleBlur = () => {
        timeoutRef.current = window.setTimeout(() => {
            setIsFocused(false);
        }, 100);
    };

    return (
        <Paper elevation={0} className="pt-6 pb-3 ">
            <Grid container wrap="nowrap" spacing={2}>
                <Grid item>
                    <Avatar src={imgLink}/>
                </Grid>
                <Grid item className='w-full'>
                    <Textarea
                        placeholder="发表您的评论"
                        variant="plain"
                        maxRows={4}
                        onFocus={handleFocus}
                        onBlur={handleBlur}>
                    </Textarea>
                    {isFocused && <Box sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        mt: 1,
                        animation: `${fadeIn} 0.3s ease-out`,
                    }}>
                        <Button size="small" variant="contained" className={classes.button}>发布</Button>
                    </Box>}
                </Grid>
            </Grid>
            {hasChildren && children}
        </Paper>

    );
};

export default CommentZone;