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
    <div className="tablet:w-full cellphone:w-80 h-16 tablet:text-sm cellphone:text-xs text-zinc-500 flex justify-between bg-slate-800 border-2 border-white">
        <div className="tablet:pr-10 tablet:pl-5 cellphone:pr-1 cellphone:pl-1 flex items-center justify-center">
            <span>{length} items left</span>
        </div>
        <div className="flex">
            <button
                className="tablet:p-5 cellphone:pl-2 text-zinc-500"
                onClick={() => setStatus("all")}
            >
                All
            </button>
            <button
                className="tablet:p-5 cellphone:p-2 text-zinc-500"
                onClick={() => setStatus("active")}
            >
                Active
            </button>
            <button
                className="tablet:p-5 cellphone:pr-2 text-zinc-500"
                onClick={() => setStatus("completed")}
            >
                Completed
            </button>
        </div>
        <button
            className={`tablet:p-5 cellphone:p-2 text-zinc-500 ${
                hasCompleted ? "visible" : "invisible"
            }`}
            onClick={() => clearCompleted()}
        >
            Clear completed
        </button>
    </div>
);
export default memo(Filter);
