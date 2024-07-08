import Grid from "@mui/material/Grid";
import {Avatar, Paper} from "@material-ui/core";
import React from "react";

interface CommentBoxProps {
    userName: string,
    imgLink: string,
    content: string,
}

const CommentBox: React.FC<CommentBoxProps> = ({userName, imgLink, content}) => {

    return (<Paper elevation={0} className="pt-5">
        <Grid container wrap="nowrap" spacing={2}>
            <Grid item>
                <Avatar src={imgLink}/>
            </Grid>
            <Grid justifyContent="left" item xs zeroMinWidth>
                <h4 className="m-0 pt-1 text-base font-semibold text-gray-600">{userName}</h4>
                <p className="my-1">
                    {content}
                </p>
                <p className="text-gray-400 text-sm">
                    1分钟前
                </p>
            </Grid>
        </Grid>
    </Paper>);
}

export default CommentBox;