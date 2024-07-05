import React from 'react';

interface SwimlaneProps {
    title: string;
    children?: React.ReactNode;
}

const Swimlane: React.FC<SwimlaneProps> = ({ title, children }) => {
    const hasChildren = React.Children.count(children) > 0;
    return (
        <div className="bg-white rounded-lg shadow m-4 p-4 w-64 flex flex-col space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">{title}</h2>
                <span className="bg-gray-200 text-gray-800 rounded-full px-2 py-1 text-sm">{React.Children.count(children)}</span>
            </div>
            {hasChildren && (
                <div className="flex flex-col space-y-2 overflow-y-auto">
                    {children}
                </div>
            )}
            <button className="text-blue-500 hover:text-blue-700 mt-4">+ 创建</button>
        </div>
    );
};

export default Swimlane;