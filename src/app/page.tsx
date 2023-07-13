"use client";
import React, { useEffect, useState } from "react";
import { TodoContainer } from "../components/TodoContainer";

export default function Home() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <div className="w-full flex items-center center flex-col min-h-screen max-h-max bg-slate-400">
            {mounted && <TodoContainer />}
        </div>
    );
}
