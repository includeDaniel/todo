"use client";
import React from "react";
import Todo from "../components/todo";
import { useTodo } from "../hooks/useTodo";

export default function Home() {
    const { todo, action } = useTodo();
    return (
        <div className="w-full flex items-center center flex-col min-h-screen max-h-max bg-slate-400">
            <Todo title={<Todo.Title>My Tasks</Todo.Title>}>
                <Todo.Input action={action} />
                <Todo.Items todo={todo} action={action} />
            </Todo>
        </div>
    );
}
