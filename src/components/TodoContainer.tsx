import { useTodo } from "../hooks/useTodo";
import Todo from "./Todo";

export const TodoContainer = () => {
    const {
        todo,
        append,
        toggleAllStatus,
        toggleStatus,
        edit,
        remove,
        clearCompleted,
    } = useTodo();

    return (
        <Todo title={<Todo.Title>My Tasks</Todo.Title>}>
            <Todo.Input append={append} toggleAllStatus={toggleAllStatus} />
            <Todo.Items
                toggleStatus={toggleStatus}
                edit={edit}
                remove={remove}
                clearCompleted={clearCompleted}
                todo={todo}
            />
        </Todo>
    );
};
