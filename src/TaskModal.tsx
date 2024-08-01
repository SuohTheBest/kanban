import React, {useEffect, useState} from 'react';
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from "@material-ui/core/Button";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import IconButton from "@material-ui/core/IconButton";
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import {Textarea} from "@mui/joy";
import CommentZone from "./CommentZone";
import Container from "@mui/material/Container";
import {apiUrl, AvatarWithName, DateYMD, TimeWait} from "./Common";
import axios from "axios";
import {Comments, UploadFile} from "./interfaces";
import List from "@mui/material/List";
import {UploadListItem} from "./UploadListItem";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        small: {
            width: theme.spacing(3),
            height: theme.spacing(3),
        },
    }),
);

interface TaskModalProps {
    title: string;
    creator: string;
    create_date: string;
    // modify_time: number;
    start_date: string;
    end_date: string;
    description: string;
    isOpen: boolean;
    handleClose: () => void;
    task_id: number;
    info: (message: string, type: ("success" | "error")) => void;
}

const TaskModal: React.FC<TaskModalProps> = ({
                                                 title,
                                                 creator,
                                                 create_date,
                                                 start_date,
                                                 end_date,
                                                 description,
                                                 isOpen,
                                                 handleClose,
                                                 task_id,
                                                 info
                                             }) => {
    const classes = useStyles();
    const [FoldDetail, setFoldDetail] = React.useState(false);
    const [uploadFileList, setUploadFileList] = React.useState<UploadFile[]>([]);
    const [commentList, setCommentList] = useState<Comments[]>([]);
    const o_currDate = new Date();
    const o_createDate = new Date(create_date);
    const o_startDate = new Date(start_date);
    const o_endDate = new Date(end_date);

    const timeDifference = o_currDate.getTime() - o_createDate.getTime();
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    const toggleFoldDetail = () => {
        setFoldDetail(!FoldDetail);
    }

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            await handleFileUpload(event.target.files[0]);
        }
    };

    const handleFileUpload = async (file: File) => {
        if (!file) {
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('task_id', task_id.toString());
        try {
            const response = await axios.post(`${apiUrl}/project/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.data.success) {
                info("文件上传成功", "success");
                await TimeWait(750);
                await fetchUploadFile();
            } else {
                info(response.data.value, "error");
            }
        } catch (error) {
            console.error(error);
            info("文件上传失败", "error");
        }
    };

    const fetchComments = async () => {
        try {
            const response = await axios.get(`${apiUrl}/project/comment`, {params: {'project_id': task_id}});
            if (response.data.success) {
                setCommentList(response.data.value);
            } else {
                info("获取评论失败!", "error");
            }
        } catch (err) {
            console.error(err);
            info("获取评论失败!", "error");
        }
    }

    const fetchUploadFile = async () => {
        try {
            const response = await axios.get(`${apiUrl}/project/upload`, {params: {'project_id': task_id}});
            if (response.data.success) {
                setUploadFileList(response.data.value);
            } else {
                info("获取附件失败!", "error");
            }
        } catch (err) {
            console.error(err);
            info("获取附件失败!", "error");
        }
    }

    useEffect(() => {
        if (!isOpen) return;
        fetchUploadFile();
        fetchComments();
    }, [isOpen]);

    return (
        <Modal
            className={classes.modal}
            open={isOpen}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={isOpen}>
                <div className='w-[100vh]'>
                    <Container fixed className="flex flex-col px-4 pb-10 pt-8 bg-white">
                        <div className="flex items-center ml-5 mb-2 justify-between">
                            <h1 className="font-semibold text-2xl"> {title} </h1>
                            <IconButton className="rounded" onClick={handleClose}> <CloseOutlinedIcon/> </IconButton>
                        </div>
                        <div className="ml-5 mb-3 justify-between">
                            <input
                                accept="*"
                                className='hidden'
                                id="button-file"
                                type="file"
                                onChange={handleFileChange}
                            />
                            <label htmlFor='button-file'>
                                <Button
                                    startIcon={<AttachFileOutlinedIcon/>}
                                    variant="contained"
                                    component="span"
                                >
                                    添加附件
                                </Button>
                            </label>
                        </div>
                        <div className="flex">
                            <Container sx={{
                                maxHeight: '75vh',
                                overflow: 'auto',
                                flex: 6,
                            }} className="flex flex-row mr-3 mb-1">
                                <h2 className="pt-5 font-semibold pb-2">描述</h2>
                                <Textarea
                                    placeholder="编辑描述"
                                    variant="plain"
                                    maxRows={4}
                                    value={description}
                                />
                                {uploadFileList.length > 0 && <div className="overflow-y-auto">
                                    <h2 className="pt-5 font-semibold pb-2">附件</h2>
                                    <List sx={{width: '100%'}}>
                                        {uploadFileList.map((file: UploadFile) => (
                                            <UploadListItem file_name={file.file_name}
                                                            file_id={file.id}
                                                            task_id={task_id}
                                                            fetchUploadList={fetchUploadFile}
                                                            info={info} key={file.id}/>))}
                                    </List>
                                </div>}
                                <h2 className="pt-5 font-semibold">活动</h2>
                                <CommentZone commentList={commentList} fetchComments={fetchComments} info={info}
                                             task_id={task_id}/>
                            </Container>
                            <Container
                                sx={{
                                    maxHeight: '75vh',
                                    overflow: 'auto',
                                    flex: 4,
                                }}
                                className="flex flex-col ml-3 mb-1 overflow-y-auto">
                                <div className='border rounded-lg mt-16'>
                                    <Button className='w-full' onClick={toggleFoldDetail}>
                                        <h2 className="font-semibold">详细信息</h2>
                                        {!FoldDetail && <KeyboardArrowDownOutlinedIcon/>}
                                        {FoldDetail && <KeyboardArrowRightOutlinedIcon/>}
                                    </Button>
                                    {!FoldDetail &&
                                        <>
                                            <hr className='w-full'/>
                                            <div className='p-3'>
                                                <div className='flex py-3 items-center justify-between'>
                                                    <h3 className='text-sm '>发起人</h3>
                                                    <AvatarWithName src='broken' name={creator}/>
                                                </div>
                                                <div className='flex py-3 items-center justify-between'>
                                                    <h3 className='text-sm py-3'>开始日期</h3>
                                                    <DateYMD year={o_startDate.getFullYear()}
                                                             month={o_startDate.getMonth() + 1}
                                                             day={o_startDate.getDate()}/>
                                                </div>
                                                <div className='flex py-3 items-center justify-between'>
                                                    <h3 className='text-sm py-3'>截止日期</h3>
                                                    <DateYMD year={o_endDate.getFullYear()}
                                                             month={o_endDate.getMonth() + 1}
                                                             day={o_endDate.getDate()}/>
                                                </div>
                                            </div>
                                        </>
                                    }
                                </div>
                                <div className='pt-8 text-sm pl-3 text-gray-500'>
                                    <p>已创建 {daysDifference}天前</p>
                                    {/*<p>更新日期 {modify_time}天前</p>*/}
                                </div>
                            </Container>
                        </div>
                    </Container>
                </div>
            </Fade>
        </Modal>
    );
}

export default TaskModal;