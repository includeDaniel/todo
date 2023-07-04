import React from "react";
import { useState } from "react";
import { TodoItems } from "./TodoItems";
import { useTodo, Item } from "../hooks/useTodo";
import { TodoFilter } from "./TodoFilter";
import { TodoInput } from "./TodoInput";

const Todo = () => {
    const [input, setInput] = useState("");
    const [state, setState] = useState<Item["status"]>("all");
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

    function removeItem(item: Item) {
        action.remove(item);
    }

    function removeCompleted() {
        action.clearCompleted();
    }

    const handleKeyDown = (e: any) => {
        if (e.key === "Enter") {
            handleClick();
        }
    };

    function toggleStatus(id: Item["id"], status: Item["status"]) {
        action.toggleStatus(id, status);
    }

    function UpdateList(
        id: Item["id"],
        e: React.ChangeEvent<HTMLInputElement>
    ) {
        action.edit(id, e.currentTarget.innerHTML);
    }
    const toggleAllStatus = () => {
        action.toggleAllStatus();
    };
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
