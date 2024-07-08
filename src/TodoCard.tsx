import React, {useState} from 'react';
import DateIcon from './assets/date.svg';
import MdLabel from './assets/label.svg';
import TaskModal from "./TaskModal.tsx";

interface CardProps {
    title: string;
    date: string;
    label: string;
}

const Card: React.FC<CardProps> = ({title, date, label}) => {
    const [isOpen, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    return (
        <div className="bg-gray-100 p-4 rounded-lg shadow flex flex-col space-y-2" onClick={handleOpen}>
            <h3 className="text-lg font-bold">{title}</h3>
            <div className="flex items-center space-x-2">
                <img src={DateIcon} alt="Date"/>
                <span className="text-gray-600">{date}</span>
            </div>
            <div className="flex items-center space-x-2">
                <img src={MdLabel} alt="Label"/>
                <span className="text-blue-500">{label}</span>
            </div>
            <TaskModal isOpen={isOpen} setOpen={setOpen} />
        </div>
    );
};

export default Card;