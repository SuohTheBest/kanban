import {createStyles, makeStyles} from "@material-ui/core/styles";
import 'date-fns'
import React from "react";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import {Fade} from "@material-ui/core";
import Container from "@mui/material/Container";
import IconButton from "@material-ui/core/IconButton";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import TextField from "@mui/material/TextField";
import {Textarea} from "@mui/joy";
import {DateSelector} from "./Common.tsx";
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

interface TaskModalProps {
    isOpen: boolean;
    handleClose: () => void;
}

const CreateTaskModal: React.FC<TaskModalProps> = ({isOpen, handleClose}) => {
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
                            <h1 className="font-semibold text-2xl"> 创建任务 </h1>
                            <IconButton className="rounded" onClick={handleClose}> <CloseOutlinedIcon/> </IconButton>
                        </div>
                        <div className="flex items-center mt-5 ml-5 mb-2 justify-between">
                            <h2 className="font-semibold mr-4"> 标题 </h2>
                            <TextField label="标题" variant="outlined"></TextField>
                        </div>
                        <div className="flex items-center mt-5 ml-5 mb-2 justify-between">
                            <h2 className="font-semibold mr-4"> 开始日期 </h2>
                            <DateSelector label='开始日期'/>
                        </div>
                        <div className="flex items-center mt-5 ml-5 mb-2 justify-between">
                            <h2 className="font-semibold mr-4"> 截止日期 </h2>
                            <DateSelector label='开始日期'/>
                        </div>
                        <h2 className="mt-5 ml-5 mb-2 font-semibold  mr-4"> 描述 </h2>
                        <Textarea className="ml-5 mt-5" placeholder="添加描述" maxRows={4}></Textarea>
                        <div className='flex w-full mt-12 ml-auto flex-row-reverse'>
                            <Button variant="contained" className={classes.createButton}>创建</Button>
                        </div>
                    </Container>
                </div>
            </Fade>
        </Modal>
    );
};

export default CreateTaskModal;