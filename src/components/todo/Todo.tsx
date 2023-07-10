import React, { ReactNode } from "react";
import TodoFilter from "./TodoFilter";
import TodoInput from "./TodoInput";
import TodoItems from "./TodoItems";
import TodoTitle from "./TodoTitle";

type TodoProps = (({
    children,
}: Pick<TodoProps, "children">) => JSX.Element) & {
    children: JSX.Element | JSX.Element[];
    Filter: typeof TodoFilter;
    Input: typeof TodoInput;
    Items: typeof TodoItems;
    Title: typeof TodoTitle;
};

const Todo = ({ children }: Pick<TodoProps, "children">) => {
    return (
        <div
            data-testid="todo"
            className="w-100 flex items-center justify-center flex-col bg-slate-800 text-[#ffffff]"
        >
            <>{children}</>
        </div>
    );
};
export default Todo as TodoProps;
