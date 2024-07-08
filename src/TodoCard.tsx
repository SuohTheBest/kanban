import React, {useState} from 'react';
import DateIcon from './assets/date.svg';
import MdLabel from './assets/label.svg';
import TaskModal from "./TaskModal.tsx";
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import IconButton from "@material-ui/core/IconButton";

interface CardProps {
    title: string;
    date: string;
    label: string;
}

const Card: React.FC<CardProps> = ({title, date, label}) => {
    const [Open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);

    function handleClose() {
        setOpen(false);
    }

    function btn_more_click(event: React.MouseEvent) {
        event.stopPropagation();
        console.log('btn_more_click');
    }

    return (
        <>
            <div
                className="group bg-white p-4 border rounded-lg shadow flex flex-col space-y-2 hover:bg-gray-200 cursor-pointer"
                onClick={handleOpen}>
                <div className="flex justify-between">
                    <h3 className="text-lg font-bold py-1">{title}</h3>
                    <div className="hidden group-hover:block">
                        <IconButton size='small'
                                     onClick={btn_more_click}><MoreHorizOutlinedIcon/>
                        </IconButton>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <img src={DateIcon} alt="Date"/>
                    <span className="text-gray-600">{date}</span>
                </div>
                <div className="flex items-center space-x-2">
                    <img src={MdLabel} alt="Label"/>
                    <span className="text-blue-500">{label}</span>
                </div>
            </div>
            <TaskModal isOpen={Open} handleClose={handleClose}/>
        </>
    );
};

export default Card;