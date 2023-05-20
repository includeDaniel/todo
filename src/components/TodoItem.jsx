const TodoItem = ({ items }) =>
    <ul className=" w-full border-2 border-white" style={{ listStyleType: "none" }}>
        {items}
    </ul>
export { TodoItem }