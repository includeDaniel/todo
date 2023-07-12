import { useState, KeyboardEvent, useCallback, memo } from "react";
import { useTodoType } from "../../hooks/useTodo";

type InputProps = {
    action: useTodoType["action"];
};

const Input = ({ action }: InputProps) => {
    const [input, setInput] = useState("");

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setInput(e.target.value);
        },
        []
    );

    const append = useCallback(() => {
        action.append({
            id: crypto.randomUUID(),
            value: input,
            status: "active",
        });
        setInput("");
    }, [action, input]);

    const handleKeyDown = useCallback(
        (e: KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter") {
                append();
            }
        },
        [append]
    );

    return (
        <div className="w-full flex items-center justify-center ">
            <button
                className="w-18 h-16 cursor-pointer border-2 border-white-800"
                onClick={() => action.toggleAllStatus()}
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
