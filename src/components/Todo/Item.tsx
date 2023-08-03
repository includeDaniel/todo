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
            className="tablet:w-full tablet:h-16 tablet:text-base cellphone:text-xs cellphone:h-10  border-2 boreder-white flex items-center justify-between"
        >
            <button
                className="tablet:w-16 tablet:h-16 cellphone:w-12 cellphone:h-10 border-2 border-white flex justify-center items-center"
                onClick={() => toggleStatus(curr.id, curr.status)}
            >
                <div
                    className={`tablet:w-6 tablet:h-6 cellphone:w-4 cellphone:h-4 rounded-full border-4 border-green-700 ${
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
                className="tablet:w-16 tablet:h-16 cellphone:w-10 cellphone:h-10 text-red-500 border-2 border-white"
                onClick={() => remove(curr)}
            >
                x
            </button>
        </li>
    );
};

export default memo(Item);
