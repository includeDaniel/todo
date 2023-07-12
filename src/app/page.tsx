"use client";
import React from "react";
import Todo from "../components/todo";
import { useTodo } from "../hooks/useTodo";

export default function Home() {
    const {
        todo,
        append,
        toggleAllStatus,
        toggleStatus,
        edit,
        remove,
        clearCompleted,
    } = useTodo();
    return (
        <div className="w-full flex items-center center flex-col min-h-screen max-h-max bg-slate-400">
            <Todo title={<Todo.Title>My Tasks</Todo.Title>}>
                <Todo.Input append={append} toggleAllStatus={toggleAllStatus} />
                <Todo.Items
                    toggleStatus={toggleStatus}
                    edit={edit}
                    remove={remove}
                    clearCompleted={clearCompleted}
                    todo={todo}
                />
            </Todo>
        </div>
    );
}
