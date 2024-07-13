import React, {useState} from 'react';

import Sidebar from '../Sidebar';
import Swimlane from "../Swimlane";
import TopBar from "../TopBar";
import Card from "../TodoCard";
import ProjectTopBar from "../ProjectTopbar";

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
        </div>
    )
        ;
}

export default App
