import React from "react";
import { useState } from "react";
import { TodoFilter } from "./TodoFilter";
import { TodoItems } from "./TodoItems";
import { TodoInput } from "./TodoInput";
import { useTodo, Item } from "../hooks/useTodo";

const Todo = () => {
    const [input, setInput] = useState("");
    const [state, setState] = useState("all");
    const { todo, action } = useTodo();

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setInput(e.target.value);
    }

    function handleClick() {
        action.append({
            id: crypto.randomUUID(),
            value: input,
            status: "active",
        });
        setInput("");
    }

    function removeItem(todo: Item) {
        action.remove(todo);
    }

    function removeCompleted() {
        action.clearCompleted();
    }

    const handleKeyDown = (e: any) => {
        if (e.key === "Enter") {
            handleClick();
        }
    };

    function toggleStatus(id: string, status: string) {
        action.toggleStatus(id, status);
    }

    function UpdateList(id: string, e: React.ChangeEvent<HTMLInputElement>) {
        action.edit(id, e.currentTarget.innerHTML);
    }
    const toggleAllStatus = () => {
        action.toggleAllStatus();
    };
    console.log(todo);
    return (
        <>
            <div
                data-testid="todo"
                className="w-100 flex items-center justify-center flex-col bg-slate-800 text-[#ffffff]"
            >
                <TodoInput
                    input={input}
                    handleChange={handleChange}
                    handleKeyDown={handleKeyDown}
                    toggleAllStatus={toggleAllStatus}
                />
                <TodoItems
                    action={action}
                    state={state}
                    removeItem={removeItem}
                    toggleStatus={toggleStatus}
                    UpdateList={UpdateList}
                />
                <TodoFilter
                    length={todo.active}
                    hasCompleted={todo.completed > 0}
                    removeCompleted={removeCompleted}
                    setState={setState}
                />
            </div>
        </>
    );
};
export { Todo };
