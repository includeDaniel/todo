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
    <div className="tablet:w-full tablet:h-16 cellphone:h-10 cellphone:w-80  tablet:text-sm cellphone:text-xs text-zinc-500 flex justify-between bg-slate-800 border-2 border-white">
        <div className="tablet:pr-10 tablet:pl-5 tablet:mr-0 tablet:ml-0 cellphone:mr-1 cellphone:ml-2 flex items-center justify-center">
            <span>{length} items left</span>
        </div>
        <div className="flex justify-center items-center">
            <button
                className="tablet:p-5 tablet:ml-0 cellphone:ml-3 text-zinc-500"
                onClick={() => setStatus("all")}
            >
                All
            </button>
            <button
                className="tablet:p-5 tablet:m-0 cellphone:m-2 text-zinc-500"
                onClick={() => setStatus("active")}
            >
                Active
            </button>
            <button
                className="tablet:p-5 tablet:mr-0 cellphone:mr-2 text-zinc-500"
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
