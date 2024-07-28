import React, {useState} from 'react';
import DateIcon from './assets/date.svg';
import MdLabel from './assets/label.svg';
import TaskModal from "./TaskModal";
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import IconButton from "@material-ui/core/IconButton";

interface CardProps {
    title: string;
    creator: string;
    create_date: string;
    start_date: string;
    end_date: string;
    description: string;
}

const Card: React.FC<CardProps> = ({title, creator, create_date, start_date, end_date, description}) => {
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
                    <span className="text-gray-600">{create_date}</span>
                </div>
                <div className="flex items-center space-x-2">
                    <img src={MdLabel} alt="Label"/>
                    <span className="text-blue-500">{creator}</span>
                </div>
            </div>
            <TaskModal title={title} creator={creator} create_date={create_date} start_date={start_date} end_date={end_date}
                       description={description} isOpen={Open}
                       handleClose={handleClose}/>
        </>
    );
};

export default Card;