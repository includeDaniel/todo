import { useState, FocusEvent } from "react";
import { Item, Todo as TodoType, useTodoType } from "../../hooks/useTodo";
import Todo from "./Todo";

type ItemsProps = {
    todo: TodoType;
    action: useTodoType["action"];
};

const Items = ({ todo, action }: ItemsProps) => {
    const [status, setStatus] = useState<Item["status"]>("all");
    const itemsList = todo.items.reduce((acc, curr) => {
        if (status === "all" || curr.status === status) {
            return [
                ...acc,
                <Todo.Item action={action} curr={curr}></Todo.Item>,
            ];
        }
        return acc;
    }, [] as JSX.Element[]);
    return (
        <>
            <ul
                className=" w-full border-2 border-white"
                style={{ listStyleType: "none" }}
            >
                {itemsList}
            </ul>
            <Todo.Filter
                action={action}
                length={todo.active}
                hasCompleted={todo.completed > 0}
                setStatus={setStatus}
            />
        </>
    );
};
export default Items;
