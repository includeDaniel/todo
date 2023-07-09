import React from "react";

type TodoProps = {
    children: JSX.Element;
};

const Todo = ({ children }: TodoProps) => {
    return (
        <>
            <div
                data-testid="todo"
                className="w-100 flex items-center justify-center flex-col bg-slate-800 text-[#ffffff]"
            >
                {children}
            </div>
        </>
    );
};
export { Todo };
