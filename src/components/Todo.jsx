import React, { useEffect } from "react";
import { useState } from "react";
import { TodoFilter } from "./TodoFilter";
import { TodoItem } from "./TodoItem";
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

    const todoItems = action.filter(state).map((i) => (
        <div
            key={i.id}
            className="w-full h-16 border-2 boreder-white flex items-center justify-between"
        >
            <button
                className="w-16 h-16 border-2 border-white flex justify-center items-center"
                onClick={() => toggleStatus(i.id, i.status)}
            >
                <div
                    style={{
                        backgroundColor:
                            i.status === "completed" ? "green" : "transparent",
                    }}
                    className="w-6 h-6 rounded-full border-4 border-green-700"
                ></div>
            </button>
            <li
                contenteditable="true"
                onBlur={(e) => UpdateList(e, i.id)}
                style={{
                    textDecoration:
                        i.status === "completed" ? "line-through" : "none",
                    color: i.status === "completed" ? "gray" : "white",
                }}
            >
                {i.value}
            </li>
            <button
                className="w-16 h-16 text-red-500 border-2 border-white"
                onClick={() => removeItem(i)}
            >
                x
            </button>
        </div>
    ));
    const length = todo.items.filter(
        (value) => value.status == "active"
    ).length;
    const hasCompleted =
        todo.items.filter((value) => value.status == "completed").length > 0;

    return (
        <>
            <div className="w-100 flex items-center justify-center flex-col bg-slate-800 text-[#ffffff]">
                <TodoInput
                    input={input}
                    handleChange={handleChange}
                    handleKeyDown={handleKeyDown}
                    toggleAllStatus={toggleAllStatus}
                />
                <TodoItem items={todoItems} />
                <TodoFilter
                    length={length}
                    hasCompleted={hasCompleted}
                    removeActive={removeActive}
                    setState={setState}
                />
            </div>
        </>
    );
};
export { Todo };
