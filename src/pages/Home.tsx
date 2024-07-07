import React, {useState} from 'react';

import Sidebar from '../Sidebar.tsx';
import Swimlane from "../Swimlane.tsx";
import TopBar from "../TopBar.tsx";
import Card from "../TodoCard.tsx";
import ProjectTopBar from "../ProjectTopbar.tsx";

const App: React.FC = () => {
    const [isSidebarVisible, setSidebarVisible] = useState<boolean>(true);

    const toggleSidebar = () => {
        setSidebarVisible(!isSidebarVisible);
    };

    const [sidebarWidth, setSidebarWidth] = useState(250);


    return (
        <div className="flex-1 flex-col w-full h-full">
            <TopBar toggleSidebar={toggleSidebar}/>
            <div className="flex w-full h-full">
                {isSidebarVisible && <Sidebar width={sidebarWidth} setWidth={setSidebarWidth}/>}
                <div className="flex flex-col pt-16 w-full h-full bg-sky-100"
                     style={{paddingLeft: isSidebarVisible ? sidebarWidth + 2 : 0}}>
                    <ProjectTopBar/>
                    <div className="flex h-full overflow-x-auto overflow-y-auto flex-row ">
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
