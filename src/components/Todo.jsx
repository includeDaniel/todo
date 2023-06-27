import React from "react";
import { useState } from "react";
import { TodoFilter } from "./TodoFilter";
import { TodoItems } from "./TodoItems";
import { TodoInput } from "./TodoInput";
import { useTodo } from "@/hooks/useTodo";

const Todo = () => {
    const [input, setInput] = useState("");
    const [state, setState] = useState("all");
    const { todo, action } = useTodo();

    function handleChange(e) {
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

    function removeItem(todo) {
        action.remove(todo);
    }

    function removeActive() {
        action.clearCompleted();
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleClick();
        }
    };

    function toggleStatus(id, status) {
        action.toggleStatus(id, status);
    }

    function UpdateList(e, id) {
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
                    removeActive={removeActive}
                    setState={setState}
                />
            </div>
        </>
    );
};
export { Todo };
