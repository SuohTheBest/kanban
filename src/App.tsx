import React, {useState} from 'react';

import Sidebar from './Sidebar';
import Swimlane from "./Swimlane.tsx";
import TopBar from "./TopBar.tsx";
import Card from "./TodoCard.tsx";
import ProjectTopBar from "./ProjectTopbar.tsx";

const App: React.FC = () => {
    const [isSidebarVisible, setSidebarVisible] = useState<boolean>(true);

    const toggleSidebar = () => {
        setSidebarVisible(!isSidebarVisible);
    };

    return (
        <div className="flex-1 flex-col w-full h-full">
            <TopBar toggleSidebar={toggleSidebar}/>
            <div className="flex w-full h-full">
                {isSidebarVisible && <Sidebar/>}
                <div className="flex flex-col w-full bg-sky-100">
                    <ProjectTopBar/>
                    <div className="flex pl-6 pt-8 w-full">
                        <Swimlane title="待办">
                            <Card title="test" date="10 JUL" label="stb"/>
                            <Card title="test" date="10 JUL" label="stb"/>
                        </Swimlane>
                        <Swimlane title="正在进行">
                            {}
                        </Swimlane>
                        <Swimlane title="已完成">
                            {}
                        </Swimlane>
                    </div>
                </div>
            </div>
        </div>
    )
        ;
}

export default App
