import React, {useState} from 'react';
import DateIcon from './assets/date.svg';
import MdLabel from './assets/label.svg';
import TaskModal from "./TaskModal";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from "@material-ui/core/IconButton";
import EditIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import CreateTaskModal from "./CreateTaskModal";

interface CardProps {
    title: string;
    creator: string;
    create_date: string;
    start_date: string;
    end_date: string;
    description: string;
    task_id: number;
    handleDelete: () => void;
    info: (message: string, type: ("success" | "error")) => void;
    fetchProjectData: () => Promise<void>;
}

const Card: React.FC<CardProps> = ({
                                       title,
                                       creator,
                                       create_date,
                                       start_date,
                                       end_date,
                                       description,
                                       handleDelete,
                                       task_id,
                                       info,
                                       fetchProjectData
                                   }) => {
    const [modelOpen, setModelOpen] = useState(false);
    const [editModelOpen, setEditModelOpen] = useState(false);

    const handleOpen = () => setModelOpen(true);

    function handleClose() {
        setModelOpen(false);
    }

    return (
        <>
            <div
                className="group bg-white p-4 border rounded-lg shadow flex flex-col space-y-2 hover:bg-gray-200 cursor-pointer"
                onClick={handleOpen}>
                <div className="flex justify-between">
                    <h3 className="text-lg font-bold py-1">{title}</h3>
                    <div className="hidden group-hover:block">
                        <IconButton size='small' onClick={(e) => {
                            e.stopPropagation();
                            setEditModelOpen(true);
                        }}><EditIcon className="text-lime-500"/>
                        </IconButton>
                        <IconButton size='small'
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDelete();
                                    }}><DeleteIcon className="text-red-400"/>
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
            <TaskModal title={title} creator={creator} create_date={create_date} start_date={start_date}
                       end_date={end_date}
                       description={description} isOpen={modelOpen}
                       handleClose={handleClose} info={info} task_id={task_id}/>
            <CreateTaskModal isOpen={editModelOpen} handleClose={() => {
                setEditModelOpen(false)
            }} task_id={task_id} info={info} fetchProjectData={fetchProjectData} alter={true}
                             default_subject={title} default_startDate={start_date} default_endDate={end_date}
                             default_description={description}/>

        </>
    );
};

export default Card;