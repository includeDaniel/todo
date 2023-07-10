type TodoTitleProps = {
    children: string;
};

const TodoTitle = ({ children }: TodoTitleProps) => (
    <h1 className="text-8xl py-10 text-slate-800 ">{children}</h1>
);

export default TodoTitle;
