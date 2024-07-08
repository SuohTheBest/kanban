import React, {useState} from "react";
import Grid from "@mui/material/Grid";
import {Avatar, Paper} from "@material-ui/core";
import {Textarea} from "@mui/joy";
import Button from "@material-ui/core/Button";
import Box from "@mui/material/Box";
import {keyframes} from "@emotion/react";

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

const CommentZone: React.FC<CommentZoneProps> = ({imgLink, children}) => {
    const hasChildren = React.Children.count(children) > 0;
    const [isFocused, setIsFocused] = useState(false);
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
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}>
                    </Textarea>
                    {isFocused && <Box sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        mt: 1,
                        animation: `${fadeIn} 0.3s ease-out`,
                    }}>
                        <Button size="small" style={{backgroundColor: '#1a73e8', color: 'white'}}>发布</Button>
                    </Box>}
                </Grid>
            </Grid>
            {hasChildren && children}


        </Paper>

    );
};

export default CommentZone;