import React, {useEffect, useState} from 'react';

import Sidebar from '../Sidebar';
import Swimlane from "../Swimlane";
import TopBar from "../TopBar";
import Card from "../TodoCard";
import ProjectTopBar from "../ProjectTopbar";
import {useLocation, useNavigate} from "react-router-dom";
import {CustomSnackbar, useCustomSnackbar} from "../CustomSnackBar";

const App: React.FC = () => {
    const [isSidebarVisible, setSidebarVisible] = useState<boolean>(true);
    const {message, openMessage, info, closeInfo} = useCustomSnackbar();

    const toggleSidebar = () => {
        setSidebarVisible(!isSidebarVisible);
    };

    const [sidebarWidth, setSidebarWidth] = useState(250);

    const location = useLocation();
    const navigate = useNavigate();

    const username = location.state?.username;

    useEffect(() => {
        if (!username) {
            navigate('/login');
        }
    }, [username, navigate]);

    return (
        <div className="flex-1 flex-col w-full h-full">
            <TopBar username={username} toggleSidebar={toggleSidebar}/>
            <div className="flex w-full h-full">
                {isSidebarVisible && <Sidebar width={sidebarWidth} setWidth={setSidebarWidth} info={info}/>}
                <div className="flex flex-col pt-16 w-full h-full bg-[#e9f2ff]"
                     style={{paddingLeft: isSidebarVisible ? sidebarWidth + 2 : 0}}>
                    <ProjectTopBar/>
                    <div className="flex h-full overflow-x-auto overflow-y-auto flex-row ">
                        <Swimlane title="待办" hasCreate={true}>
                            <Card title="test" date="10 JUL" label="stb"/>
                            <Card title="test" date="10 JUL" label="stb"/>
                        </Swimlane>
                        <Swimlane title="正在进行" hasCreate={false}>
                            {}
                        </Swimlane>
                        <Swimlane title="已完成" hasCreate={false}>
                            {}
                        </Swimlane>
                    </div>
                </div>
            </div>
            <CustomSnackbar messageInfo={message} onClose={() => closeInfo()}
                            isOpen={openMessage}/>
        </div>
    )
        ;
}

export default App
