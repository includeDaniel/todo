import { memo } from "react";
import { Item, useTodoType } from "../../hooks/useTodo";

type FilterProps = {
    action: useTodoType["action"];
    length: number;
    hasCompleted: boolean;
    setStatus: React.Dispatch<React.SetStateAction<Item["status"]>>;
};
const Filter = ({ action, length, hasCompleted, setStatus }: FilterProps) => (
    <div className=" text-sm text-[#808080] flex justify-between bg-slate-800 w-full border-2 border-white">
        <div className="pr-10 pl-5 flex items-center justify-center">
            <span>{length} items left</span>
        </div>
        <div>
            <button
                className="p-5 text-sm text-[#808080]"
                onClick={() => setStatus("all")}
            >
                All
            </button>
            <button
                className="p-5 text-sm text-[#808080]"
                onClick={() => setStatus("active")}
            >
                Active
            </button>
            <button
                className="p-5 text-sm text-[#808080]"
                onClick={() => setStatus("completed")}
            >
                Completed
            </button>
        </div>
        <button
            className="p-5 text-sm text-[#808080]"
            style={{ visibility: hasCompleted ? "visible" : "hidden" }}
            onClick={() => action.clearCompleted()}
        >
            Clear completed
        </button>
    </div>
);
export default memo(Filter);
