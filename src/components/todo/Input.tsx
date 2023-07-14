import { useState, KeyboardEvent, useCallback, memo } from "react";
import { useTodoType } from "../../hooks/useTodo";

type InputProps = {
    append: useTodoType["append"];
    toggleAllStatus: useTodoType["toggleAllStatus"];
};

const Input = ({ append, toggleAllStatus }: InputProps) => {
    const [input, setInput] = useState("");
    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setInput(e.target.value);
        },
        []
    );

    const handleKeyDown = useCallback(
        (e: KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter") {
                append({
                    id: crypto.randomUUID(),
                    value: input,
                    status: "active",
                });
                setInput("");
            }
        },
        [input, append]
    );

    return (
        <div className="w-full flex items-center justify-center ">
            <button
                className="w-18 h-16 cursor-pointer border-2 border-white-800"
                onClick={() => toggleAllStatus()}
            >
                *
            </button>
            <input
                className="w-full h-16 border-2 border-white text-slate-800 text-2xl"
                type="text"
                value={input}
                onChange={handleChange}
                placeholder="Type somenthing to do"
                onKeyDown={handleKeyDown}
            />
        </div>
    );
};
export default memo(Input);
