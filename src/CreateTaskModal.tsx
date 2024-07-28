import {createStyles, makeStyles} from "@material-ui/core/styles";
import React, {useState} from "react";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import {Fade} from "@material-ui/core";
import Container from "@mui/material/Container";
import IconButton from "@material-ui/core/IconButton";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import {Textarea} from "@mui/joy";
import Button from "@material-ui/core/Button";
import axios from "axios";
import {apiUrl, TimeWait} from "./Common";

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

interface TaskModelProps {
    isOpen: boolean;
    handleClose: () => void;
    info: (message: string, type: ("error" | "success")) => void;
    fetchData: () => Promise<void>;
}

const CreateTaskModal: React.FC<TaskModelProps> = ({isOpen, handleClose, info, fetchData}) => {
    const classes = useStyles();
    const [taskName, setTaskName] = useState('');

    async function handleSubmitTask() {
        const str = taskName;
        if (str === '') {
            info("项目名称不能为空!", "error");
            return;
        }
        const response = await axios.post(`${apiUrl}/task`, {name: str});
        if (response.data.success) {
            info("🎉添加成功", 'success');
            await fetchData();
            await TimeWait(750);
            handleClose();
        } else {
            info("添加失败，请稍后重试", "error");
        }
    }

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
                            <IconButton className="rounded" onClick={handleClose}> <CloseOutlinedIcon/>
                            </IconButton>
                        </div>
                        <div className="flex flex-col mt-5 ml-5 mb-2">
                            <h2 className="font-semibold mr-4 pb-5"> 名称 </h2>
                            <Textarea placeholder="团队名称、项目名称、里程碑......"
                                      maxRows={2}
                                      onChange={(event) => {
                                          setTaskName(event.target.value);
                                      }}>
                            </Textarea>
                        </div>
                        <div className='flex w-full mt-12 ml-auto flex-row-reverse'>
                            <Button variant="contained" className={classes.createButton}
                                    onClick={handleSubmitTask}>创建</Button>
                        </div>
                    </Container>
                </div>
            </Fade>
        </Modal>
    );
};

export default CreateTaskModal;