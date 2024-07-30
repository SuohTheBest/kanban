import React, {useEffect, useState} from 'react';
import Sidebar from '../Sidebar';
import Swimlane from "../Swimlane";
import TopBar from "../TopBar";
import Card from "../TodoCard";
import TaskTopBar from "../TaskTopBar";
import {useLocation, useNavigate} from "react-router-dom";
import {CustomSnackbar, useCustomSnackbar} from "../CustomSnackBar";
import axios from "axios";
import {apiUrl} from "../Common";
import {Project, Task} from "../interfaces";
import CreateTaskModal from "../CreateTaskModal";

const WorkSpace: React.FC = () => {
    const {message, openMessage, info, closeInfo} = useCustomSnackbar();

    const [isSidebarVisible, setSidebarVisible] = useState<boolean>(true);
    const [sidebarWidth, setSidebarWidth] = useState(250);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [isModelOpen, setIsModelOpen] = useState(false);
    const [taskList, setTaskList] = useState<Task[]>([]);
    const [title, setTitle] = useState("");
    const [projects, setProjects] =
        useState<{ type1: Project[], type2: Project[], type3: Project[] }>({
            type1: [],
            type2: [],
            type3: []
        });

    const location = useLocation();
    const navigate = useNavigate();

    const username = location.state?.username;

    const toggleSidebar = () => {
        setSidebarVisible(!isSidebarVisible);
    };

    function getProjectName() {
        const tasks = taskList.filter((task) => {
            return task.id === selectedIndex
        });
        if (tasks.length > 0) {
            setTitle(tasks[0].name);
        } else
            setTitle("");
    }

    const fetchProjectData = async () => {
        if (selectedIndex === -1) return;
        try {
            const response = await axios.get(`${apiUrl}/project`, {params: {task_id: selectedIndex}});
            if (response.data.success) {
                const projectData = response.data.value as Project[];
                const type1Projects = projectData.filter(project => project.type === 1);
                const type2Projects = projectData.filter(project => project.type === 2);
                const type3Projects = projectData.filter(project => project.type === 3);
                setProjects({type1: type1Projects, type2: type2Projects, type3: type3Projects});
            } else {
                info("更新数据异常!", "error");
            }
        } catch (err) {
            console.log(err);
            info("更新数据异常!", "error");
        }
    };


    useEffect(() => {
        if (!username) {
            navigate('/login');
        }
    }, [username, navigate]);

    useEffect(() => {
        fetchProjectData();
        getProjectName();
    }, [selectedIndex]);


    return (
        <div className="flex-1 flex-col w-full h-full">
            <TopBar username={username} toggleSidebar={toggleSidebar}/>
            <div className="flex w-full h-full">
                {isSidebarVisible &&
                    <Sidebar width={sidebarWidth} setWidth={setSidebarWidth} info={info}
                             selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex}
                             taskList={taskList} setTaskList={setTaskList}/>}
                <div className="flex flex-col pt-16 w-full h-full bg-[#e9f2ff]"
                     style={{paddingLeft: isSidebarVisible ? sidebarWidth + 2 : 0}}>
                    <TaskTopBar title={title}/>
                    <div className="flex h-full overflow-x-auto overflow-y-auto flex-row ">
                        <Swimlane title="待办" hasCreate={true} disabled={selectedIndex === -1}
                                  setModelOpen={setIsModelOpen}>
                            {projects.type1.map((project) => (
                                <Card key={project.id} title={project.subject} create_date={project.create_date}
                                      start_date={project.start_date} end_date={project.end_date}
                                      description={project.description}
                                      creator={project.creator} task_id={project.id} info={info}></Card>
                            ))}
                        </Swimlane>
                        <Swimlane title="正在进行" hasCreate={false}>
                            {projects.type2.map((project) => (
                                <Card key={project.id} title={project.subject} create_date={project.create_date}
                                      start_date={project.start_date} end_date={project.end_date}
                                      description={project.description}
                                      creator={project.creator} task_id={project.id} info={info}></Card>
                            ))}
                        </Swimlane>
                        <Swimlane title="已完成" hasCreate={false}>
                            {projects.type3.map((project) => (
                                <Card key={project.id} title={project.subject} create_date={project.create_date}
                                      start_date={project.start_date} end_date={project.end_date}
                                      description={project.description}
                                      creator={project.creator} task_id={project.id} info={info}></Card>
                            ))}
                        </Swimlane>
                    </div>
                </div>
                {isModelOpen &&
                    <CreateTaskModal isOpen={isModelOpen} task_id={selectedIndex}
                                     handleClose={() => setIsModelOpen(false)} info={info}
                                     fetchProjectData={fetchProjectData}/>}
            </div>
            <CustomSnackbar messageInfo={message} onClose={() => closeInfo()}
                            isOpen={openMessage}/>
        </div>
    )
        ;
}

export default WorkSpace
