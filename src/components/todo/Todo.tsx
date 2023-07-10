import React from "react";
import TodoFilter from "./Filter";
import TodoInput from "./Input";
import TodoItems from "./Items";
import TodoTitle from "./Title";

type TodoType = (({ children, title }: TodoProps) => JSX.Element) & {
    children: JSX.Element | JSX.Element[];
    title?: JSX.Element;
    Filter: typeof TodoFilter;
    Input: typeof TodoInput;
    Items: typeof TodoItems;
    Title: typeof TodoTitle;
};

type TodoProps = Pick<TodoType, "children" | "title">;

const Todo = ({ children, title }: TodoProps) => {
    return (
        <>
            {title}
            <div
                data-testid="todo"
                className="w-100 flex items-center justify-center flex-col bg-slate-800 text-[#ffffff]"
            >
                <>{children}</>
            </div>
        </>
    );
};
export default Todo as TodoType;
