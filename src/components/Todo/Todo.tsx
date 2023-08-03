import React from "react";
import Filter from "./Filter";
import Input from "./Input";
import Items from "./Items";
import Title from "./Title";
import Item from "./Item";

type TodoType = (({ children, title }: TodoProps) => JSX.Element) & {
    children: JSX.Element | JSX.Element[];
    title?: JSX.Element;
    Filter: typeof Filter;
    Input: typeof Input;
    Items: typeof Items;
    Title: typeof Title;
    Item: typeof Item;
};

type TodoProps = Pick<TodoType, "children" | "title">;

const Todo = ({ children, title }: TodoProps) => {
    return (
        <>
            {title}
            <div
                data-testid="todo"
                className="desktop:w-100 flex items-center justify-center flex-col bg-slate-800 text-white"
            >
                <>{children}</>
            </div>
        </>
    );
};
export default Todo as TodoType;
