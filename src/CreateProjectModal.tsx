import {createStyles, makeStyles} from "@material-ui/core/styles";
import 'date-fns'
import React from "react";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import {Fade} from "@material-ui/core";
import Container from "@mui/material/Container";
import IconButton from "@material-ui/core/IconButton";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import {Textarea} from "@mui/joy";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(() =>
    createStyles({
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        createButton: {
            backgroundColor: '#4285f4',
            color: 'white',
            '&:hover': {
                backgroundColor: '#1a73e8',
            },
        },
    }),
);

interface ProjectProps {
    isOpen: boolean;
    handleClose: () => void;
}

const CreateProjectModal: React.FC<ProjectProps> = ({isOpen, handleClose}) => {
    const classes = useStyles();
    return (
        <Modal className={classes.modal}
               open={isOpen}
               onClose={handleClose}
               closeAfterTransition
               BackdropComponent={Backdrop}
               BackdropProps={{
                   timeout: 500,
               }}>
            <Fade in={isOpen}>
                <div className='w-[60vh]'>
                    <Container fixed className="flex flex-col px-4 pb-10 pt-8 bg-white">
                        <div className="flex items-center ml-5 mb-2 justify-between">
                            <h1 className="font-semibold text-2xl"> 创建项目 </h1>
                            <IconButton className="rounded" onClick={handleClose}> <CloseOutlinedIcon/> </IconButton>
                        </div>
                        <div className="flex flex-col mt-5 ml-5 mb-2">
                            <h2 className="font-semibold mr-4 pb-5"> 名称 </h2>
                            <Textarea placeholder="团队名称、项目名称、里程碑......" maxRows={2}></Textarea>
                        </div>
                        <div className='flex w-full mt-12 ml-auto flex-row-reverse'>
                            <Button variant="contained" className={classes.createButton}>创建</Button>
                        </div>
                    </Container>
                </div>
            </Fade>
        </Modal>
    );
};

export default CreateProjectModal;