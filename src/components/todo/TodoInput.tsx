type TodoInputProps = (() => JSX.Element) & {
    input: string;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleKeyDown: (e: any) => void;
    toggleAllStatus: () => void;
};

const TodoInput = ({
    input,
    handleChange,
    handleKeyDown,
    toggleAllStatus,
}: TodoInputProps) => (
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
export default TodoInput as TodoInputProps;
