"use client";

import { Todo } from "../components/Todo";
import { TodoTitle } from "../components/TodoTitle";

export default function Home() {
    return (
        <div className="w-full flex items-center center flex-col min-h-screen max-h-max bg-slate-400">
            <TodoTitle>My Tasks</TodoTitle>
            <Todo />
        </div>
    );
}
