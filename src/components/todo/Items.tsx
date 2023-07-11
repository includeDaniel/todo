import { useCallback, useState } from "react";
import { Item, Todo as TodoType, useTodoType } from "../../hooks/useTodo";
import Todo from "./Todo";

type ItemsProps = {
    todo: TodoType;
    action: useTodoType["action"];
};

const Items = ({ todo, action }: ItemsProps) => {
    const [status, setStatus] = useState<Item["status"]>("all");
    const itemsList = action.filter(status).map((v: any) => (
        <ul
            key={v.i}
            className=" w-full border-2 border-white"
            style={{ listStyleType: "none" }}
        >
            <div
                key={v.id}
                className="w-full h-16 border-2 boreder-white flex items-center justify-between"
            >
                <button
                    className="w-16 h-16 border-2 border-white flex justify-center items-center"
                    onClick={() => action.toggleStatus(v.id, v.status)}
                >
                    <div
                        style={{
                            backgroundColor:
                                v.status === "completed"
                                    ? "green"
                                    : "transparent",
                        }}
                        className="w-6 h-6 rounded-full border-4 border-green-700"
                    ></div>
                </button>
                <li
                    contentEditable="true"
                    onBlur={(e: any) =>
                        action.edit(v.id, e.currentTarget.innerHTML)
                    }
                    style={{
                        textDecoration:
                            v.status === "completed" ? "line-through" : "none",
                        color: v.status === "completed" ? "gray" : "white",
                    }}
                >
                    {v.value}
                </li>
                <button
                    className="w-16 h-16 text-red-500 border-2 border-white"
                    onClick={() => action.remove(v)}
                >
                    x
                </button>
            </div>
        </ul>
    ));
    return (
        <>
            {itemsList}
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
