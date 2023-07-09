"use client";
import React, { useState } from "react";
import Todo from "../components/todo";
import { Item, useTodo } from "../hooks/useTodo";

export default function Home() {
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
        <div className="w-full flex items-center center flex-col min-h-screen max-h-max bg-slate-400">
            <Todo.Title>My Tasks</Todo.Title>
            <Todo>
                <>
                    <Todo.Input
                        input={input}
                        handleChange={handleChange}
                        handleKeyDown={handleKeyDown}
                        toggleAllStatus={toggleAllStatus}
                    />
                    <Todo.Items
                        action={action}
                        state={state}
                        removeItem={removeItem}
                        toggleStatus={toggleStatus}
                        UpdateList={UpdateList}
                    />
                    <Todo.Filter
                        length={todo.active}
                        hasCompleted={todo.completed > 0}
                        removeCompleted={removeCompleted}
                        setState={setState}
                    />
                </>
            </Todo>
        </div>
    );
}
