import { FocusEvent, memo } from "react";
import { Item as ItemType, useTodoType } from "../../hooks/useTodo";

type ItemProps = {
    toggleStatus: useTodoType["toggleStatus"];
    edit: useTodoType["edit"];
    remove: useTodoType["remove"];
    curr: ItemType;
};

const Item = ({ toggleStatus, edit, remove, curr }: ItemProps) => {
    return (
        <li
            key={curr.id}
            className="w-full h-16 border-2 boreder-white flex items-center justify-between"
        >
            <button
                className="w-16 h-16 border-2 border-white flex justify-center items-center"
                onClick={() => toggleStatus(curr.id, curr.status)}
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
                    edit(curr.id, e.currentTarget.innerHTML)
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
                onClick={() => remove(curr)}
            >
                x
            </button>
        </li>
    );
};

export default memo(Item);
