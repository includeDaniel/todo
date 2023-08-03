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
        <div className="tablet:w-full tablet:h-16 cellphone:w-80 cellphone:h-10  flex items-center justify-center ">
            <button
                className="tablet:w-18 tablet:h-16 cellphone:w-12 cellphone:h-10 cursor-pointer border-2 border-white-800"
                onClick={() => toggleAllStatus()}
            >
                *
            </button>
            <input
                className="tablet:w-full tablet:h-16 cellphone:h-10 cellphone:w-80  border-2 border-white text-slate-800 tablet:text-2xl cellphone:text-base"
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
