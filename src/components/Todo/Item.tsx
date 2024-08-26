import { FocusEvent, memo } from "react";
import { Item as ItemType, useTodoType } from "../../hooks/useTodo";

// Icons
import { FaCircleCheck } from "react-icons/fa6";
import { FaRegCircleCheck } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";

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
            className="tablet:w-full tablet:h-16 tablet:text-base cellphone:text-xs cellphone:h-10  border-2 border-white flex items-center justify-between"
        >
            <button
                className="tablet:w-16 tablet:h-16 cellphone:w-12 cellphone:h-10 border-2 border-white flex justify-center items-center hover:bg-slate-700"
                onClick={() => toggleStatus(curr.id, curr.status)}
            >
                <div>
                    {curr.status === "completed"
                        ? <FaCircleCheck className="text-green-700" size={20}/>
                        : <FaRegCircleCheck className="text-white" size={20} />
                    }
                </div>
            </button>
            <div
                contentEditable="true"
                onBlur={(e: FocusEvent<HTMLElement>) =>
                    edit(curr.id, e.currentTarget.innerHTML)
                }
                suppressContentEditableWarning={true}
                className={`${curr.status === "completed"
                        ? "line-through text-gray-500"
                        : "text-white no-underline"
                    }`}
            >
                {curr.value}
            </div>
            <button
                className="tablet:w-16 tablet:h-16 cellphone:w-10 cellphone:h-10 text-red-500 border-2 border-white hover:bg-slate-700 flex justify-center items-center"
                onClick={() => remove(curr)}
            >
                <MdDelete className="text-red-500" size={20}/>
            </button>
        </li>
    );
};

export default memo(Item);
