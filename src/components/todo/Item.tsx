import { FocusEvent } from "react";
import { Item, useTodoType } from "../../hooks/useTodo";

type ItemProps = {
    action: useTodoType["action"];
    curr: Item;
};

const Item = ({ action, curr }: ItemProps) => {
    return (
        <li
            key={curr.id}
            className="w-full h-16 border-2 boreder-white flex items-center justify-between"
        >
            <button
                className="w-16 h-16 border-2 border-white flex justify-center items-center"
                onClick={() => action.toggleStatus(curr.id, curr.status)}
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
            <div
                contentEditable="true"
                onBlur={(e: FocusEvent<HTMLElement>) =>
                    action.edit(curr.id, e.currentTarget.innerHTML)
                }
                style={{
                    textDecoration:
                        curr.status === "completed" ? "line-through" : "none",
                    color: curr.status === "completed" ? "gray" : "white",
                }}
            >
                {curr.value}
            </div>
            <button
                className="w-16 h-16 text-red-500 border-2 border-white"
                onClick={() => action.remove(curr)}
            >
                x
            </button>
        </li>
    );
};

export default Item;
