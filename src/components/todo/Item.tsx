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
                    className={`w-6 h-6 rounded-full border-4 border-green-700 ${
                        curr.status === "completed"
                            ? "bg-green-700"
                            : "bg-transparent"
                    } `}
                ></div>
            </button>
            <div
                contentEditable="true"
                onBlur={(e: FocusEvent<HTMLElement>) =>
                    edit(curr.id, e.currentTarget.innerHTML)
                }
                suppressContentEditableWarning={true}
                className={`${
                    curr.status === "completed"
                        ? "line-through text-gray-500"
                        : "text-white no-underline"
                }`}
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
