import { memo } from "react";
import { Item, useTodoType } from "../../hooks/useTodo";

type FilterProps = {
    length: number;
    hasCompleted: boolean;
    setStatus: React.Dispatch<React.SetStateAction<Item["status"]>>;
    clearCompleted: useTodoType["clearCompleted"];
};
const Filter = ({
    length,
    hasCompleted,
    setStatus,
    clearCompleted,
}: FilterProps) => (
    <div className=" text-sm text-zinc-500 flex justify-between bg-slate-800 w-full border-2 border-white">
        <div className="pr-10 pl-5 flex items-center justify-center">
            <span>{length} items left</span>
        </div>
        <div>
            <button
                className="p-5 text-sm text-zinc-500"
                onClick={() => setStatus("all")}
            >
                Al
            </button>
            <button
                className="p-5 text-sm text-zinc-500"
                onClick={() => setStatus("active")}
            >
                Active
            </button>
            <button
                className="p-5 text-sm text-zinc-500"
                onClick={() => setStatus("completed")}
            >
                Completed
            </button>
        </div>
        <button
            className={`p-5 text-sm text-zinc-500 ${
                hasCompleted ? "visible" : "invisible"
            }`}
            onClick={() => clearCompleted()}
        >
            Clear completed
        </button>
    </div>
);
export default memo(Filter);
