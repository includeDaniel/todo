import { useState, FocusEvent } from "react";
import { Item, Todo as TodoType, useTodoType } from "../../hooks/useTodo";
import Todo from "./Todo";

type ItemsProps = {
    todo: TodoType;
    action: useTodoType["action"];
};

const Items = ({ todo, action }: ItemsProps) => {
    const [status, setStatus] = useState<Item["status"]>("all");
    const itemsList = todo.items.reduce((acc: any, curr: any) => {
        if (status === "all") {
            return [
                ...acc,
                <ul
                    key={curr.id}
                    className=" w-full border-2 border-white"
                    style={{ listStyleType: "none" }}
                >
                    <div
                        key={curr.id}
                        className="w-full h-16 border-2 boreder-white flex items-center justify-between"
                    >
                        <button
                            className="w-16 h-16 border-2 border-white flex justify-center items-center"
                            onClick={() =>
                                action.toggleStatus(curr.id, curr.status)
                            }
                        >
                            <div
                                style={{
                                    backgroundColor:
                                        curr.status === "completed"
                                            ? "green"
                                            : "transparent",
                                }}
                                className="w-6 h-6 rounded-full border-4 border-green-700"
                            ></div>
                        </button>
                        <li
                            contentEditable="true"
                            onBlur={(e: FocusEvent<HTMLElement>) =>
                                action.edit(curr.id, e.currentTarget.innerHTML)
                            }
                            style={{
                                textDecoration:
                                    curr.status === "completed"
                                        ? "line-through"
                                        : "none",
                                color:
                                    curr.status === "completed"
                                        ? "gray"
                                        : "white",
                            }}
                        >
                            {curr.value}
                        </li>
                        <button
                            className="w-16 h-16 text-red-500 border-2 border-white"
                            onClick={() => action.remove(curr)}
                        >
                            x
                        </button>
                    </div>
                </ul>,
            ];
        } else if (curr.status === status) {
            return [
                ...acc,
                <ul
                    key={curr.id}
                    className=" w-full border-2 border-white"
                    style={{ listStyleType: "none" }}
                >
                    <div
                        key={curr.id}
                        className="w-full h-16 border-2 boreder-white flex items-center justify-between"
                    >
                        <button
                            className="w-16 h-16 border-2 border-white flex justify-center items-center"
                            onClick={() =>
                                action.toggleStatus(curr.id, curr.status)
                            }
                        >
                            <div
                                style={{
                                    backgroundColor:
                                        curr.status === "completed"
                                            ? "green"
                                            : "transparent",
                                }}
                                className="w-6 h-6 rounded-full border-4 border-green-700"
                            ></div>
                        </button>
                        <li
                            contentEditable="true"
                            onBlur={(e: FocusEvent<HTMLElement>) =>
                                action.edit(curr.id, e.currentTarget.innerHTML)
                            }
                            style={{
                                textDecoration:
                                    curr.status === "completed"
                                        ? "line-through"
                                        : "none",
                                color:
                                    curr.status === "completed"
                                        ? "gray"
                                        : "white",
                            }}
                        >
                            {curr.value}
                        </li>
                        <button
                            className="w-16 h-16 text-red-500 border-2 border-white"
                            onClick={() => action.remove(curr)}
                        >
                            x
                        </button>
                    </div>
                </ul>,
            ];
        }
        return acc;
    }, []);
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
