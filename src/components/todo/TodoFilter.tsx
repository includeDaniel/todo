type TodoFilterProps = {
    length: number;
    hasCompleted: boolean;
    removeCompleted: () => void;
    setState: React.Dispatch<
        React.SetStateAction<"all" | "active" | "completed">
    >;
};
const TodoFilter = ({
    length,
    hasCompleted,
    removeCompleted,
    setState,
}: TodoFilterProps) => (
    <>
        <div className=" text-sm text-[#808080] flex justify-between bg-slate-800 w-full border-2 border-white">
            <div className="pr-10 pl-5 flex items-center justify-center">
                <span>{length} items left</span>
            </div>
            <div>
                <button
                    className="p-5 text-sm text-[#808080]"
                    onClick={() => setState("all")}
                >
                    All
                </button>
                <button
                    className="p-5 text-sm text-[#808080]"
                    onClick={() => setState("active")}
                >
                    Active
                </button>
                <button
                    className="p-5 text-sm text-[#808080]"
                    onClick={() => setState("completed")}
                >
                    Completed
                </button>
            </div>
            <button
                className="p-5 text-sm text-[#808080]"
                style={{ visibility: hasCompleted ? "visible" : "hidden" }}
                onClick={() => removeCompleted()}
            >
                Clear completed
            </button>
        </div>
    </>
);
export { TodoFilter };
