import React from 'react';
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
import CommentBox from "./CommentBox";
import Container from "@mui/material/Container";
import {AvatarWithName, DateYMD} from "./Common";

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
    isOpen: boolean;
    handleClose: () => void;
}


const TaskModal: React.FC<TaskModalProps> = ({isOpen, handleClose}) => {
    const classes = useStyles();

    const [FoldDetail, setFoldDetail] = React.useState(false);

    const toggleFoldDetail = () => {
        setFoldDetail(!FoldDetail);
    }

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
                            <h1 className="font-semibold text-2xl"> title </h1>
                            <IconButton className="rounded" onClick={handleClose}> <CloseOutlinedIcon/> </IconButton>
                        </div>
                        <div className="flex">
                            <Container sx={{
                                maxHeight: '75vh',
                                overflow: 'auto',
                                flex: 6,
                            }} className="flex flex-row mr-3 mb-1 overflow-y-auto">
                                <input
                                    accept="*"
                                    className='hidden'
                                    id="button-file"
                                    multiple
                                    type="file"
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
                                <h2 className="pt-5 font-semibold pb-2">描述</h2>
                                <Textarea
                                    placeholder="编辑描述"
                                    variant="plain"
                                    maxRows={4}
                                >
                                    12334444
                                </Textarea>
                                <h2 className="pt-5 font-semibold">活动</h2>
                                <CommentZone imgLink='broken'>
                                    <CommentBox imgLink='broken' userName='stb'
                                                content='汪大吼汪大吼汪大吼汪大吼'></CommentBox>
                                </CommentZone>
                            </Container>
                            <Container
                                sx={{
                                    maxHeight: '75vh',
                                    overflow: 'auto',
                                    flex: 4,
                                }}
                                className="flex flex-col ml-3 mb-1 overflow-y-auto">
                                <Button
                                    endIcon={<KeyboardArrowDownOutlinedIcon/>}
                                    variant="contained"
                                >
                                    Type
                                </Button>
                                <div className='border rounded-lg mt-5'>
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
                                                    <AvatarWithName src='broken' name='name'/>
                                                </div>
                                                <div className='flex py-3 items-center justify-between'>
                                                    <h3 className='text-sm py-3'>开始日期</h3>
                                                    <DateYMD year={2024} month={12} day={12}/>
                                                </div>
                                                <div className='flex py-3 items-center justify-between'>
                                                    <h3 className='text-sm py-3'>截止日期</h3>
                                                    <DateYMD year={2024} month={12} day={12}/>
                                                </div>
                                            </div>

                                        </>
                                    }
                                </div>
                                <div className='pt-8 text-sm pl-3 text-gray-500'>
                                    <p>已创建 4天前</p>
                                    <p>更新日期 4天前</p>
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