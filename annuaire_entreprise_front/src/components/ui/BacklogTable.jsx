import React from 'react';

const BacklogTable = ({ children }) => {
    return (
        <div className="flex flex-col overflow-y-auto overflow-x-hidden items-center justify-start border-[1px] border-gray-400/50 rounded-sm w-9/10 md:w-8/10 lg:w-7/10  min-h-[5vh] h-auto max-h-[50vh]">
            {
                children
            }
        </div>
    );
};

export default BacklogTable;