import { memo } from "react";

const TodoItems = ({ action, state, toggleStatus, UpdateList, removeItem }) => {
    return action.filter(state).map((i) => (
        <ul
            className=" w-full border-2 border-white"
            style={{ listStyleType: "none" }}
        >
            <div
                key={i.id}
                className="w-full h-16 border-2 boreder-white flex items-center justify-between"
            >
                <button
                    className="w-16 h-16 border-2 border-white flex justify-center items-center"
                    onClick={() => toggleStatus(i.id, i.status)}
                >
                    <div
                        style={{
                            backgroundColor:
                                i.status === "completed"
                                    ? "green"
                                    : "transparent",
                        }}
                        className="w-6 h-6 rounded-full border-4 border-green-700"
                    ></div>
                </button>
                <li
                    contenteditable="true"
                    onBlur={(e) => UpdateList(e, i.id)}
                    style={{
                        textDecoration:
                            i.status === "completed" ? "line-through" : "none",
                        color: i.status === "completed" ? "gray" : "white",
                    }}
                >
                    {i.value}
                </li>
                <button
                    className="w-16 h-16 text-red-500 border-2 border-white"
                    onClick={() => removeItem(i)}
                >
                    x
                </button>
            </div>
        </ul>
    ));
};
export { TodoItems };
