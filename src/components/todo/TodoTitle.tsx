type TodoTitleProps = () => JSX.Element;

const TodoTitle = ({ children }: { children: string }) => (
    <h1 className="text-8xl py-10 text-slate-800 ">{children}</h1>
);

export default TodoTitle as TodoTitleProps;
