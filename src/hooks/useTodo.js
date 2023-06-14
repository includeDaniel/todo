import { useEffect, useState } from "react";

//Quando eu crio um item
//Quando eu removo um item ativo
//Qundo eu mudo o status para completed
//Quando eu dou toggleAllStatus

export const useTodo = () => {
    const [todo, setTodo] = useState(() => {
        const localData =
            typeof window !== "undefined" &&
            window.localStorage.getItem("todo");
        return localData
            ? JSON.parse(localData)
            : { items: [], completed: 0, active: 0 };
    });

    useEffect(() => {
        window.localStorage.setItem("todo", JSON.stringify(todo));
    }, [todo]);

    console.log(todo);

    const append = (newItem) => {
        setTodo((prev) => ({
            ...prev,
            items: [...prev.items, newItem],
            active: prev.active + 1,
        }));
    };
    const remove = (todo) => {
        setTodo((prev) => ({
            ...prev,
            items: prev.items.filter((f) => f.id != todo.id),
            completed:
                todo.status === "completed"
                    ? prev.completed - 1
                    : prev.completed,
            active: todo.status === "active" ? prev.active - 1 : prev.active,
        }));
    };
    const edit = (id, value) => {
        setTodo((prev) => ({
            ...prev,
            items: prev.items.map((curr) =>
                curr.id === id ? { ...curr, value } : curr
            ),
        }));
    };
    const toggleStatus = (id, status) => {
        const nextStatus = status === "active" ? "completed" : "active";
        setTodo((prev) => ({
            ...prev,
            items: prev.items.map((curr) => {
                if (curr.id === id) {
                    return {
                        ...curr,
                        status: nextStatus,
                    };
                }
                return curr;
            }),
            ...(nextStatus === "completed"
                ? { active: prev.active - 1, completed: prev.completed + 1 }
                : { active: prev.active + 1, completed: prev.completed - 1 }),
        }));
    };
    const filter = (status) => {
        return todo.items.filter((curr) =>
            status === "all" ? curr : curr.status === status
        );
    };
    const clearCompleted = () => {
        setTodo((prev) => ({
            ...prev,
            items: prev.items.filter((curr) => curr.status !== "completed"),
            completed: 0,
        }));
    };
    const toggleAllStatus = (
        status = todo.items.some((f) => f.status == "active")
            ? "completed"
            : "active",
        next = todo.items.map((value) => ({ ...value, status }))
    ) => {
        setTodo((prev) => {
            const status = prev.items.some((f) => f.status == "active")
                ? "completed"
                : "active";
            return {
                ...prev,
                items: prev.items.map((curr) => ({ ...curr, status })),
                active: status === "active" ? prev.items.length : 0,
                completed: status === "completed" ? prev.items.length : 0,
            };
        });
    };

    return {
        todo,
        action: {
            append,
            remove,
            edit,
            filter,
            clearCompleted,
            toggleStatus,
            toggleAllStatus,
        },
    };
};
