"use client";
import React from "react";
import { TodoContainer } from "../components/TodoContainer";

export default function Home() {
    return (
        <div className="w-full flex items-center center flex-col min-h-screen max-h-max bg-slate-400">
            <TodoContainer />
        </div>
    );
}
