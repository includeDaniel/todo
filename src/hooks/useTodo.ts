import { useEffect, useState } from "react";

export type Item = {
    id: string;
    value: string;
    status: "completed" | "active" | "all";
};
export type Todo = {
    items: Item[];
    active: number;
    completed: number;
};

export const useTodo = () => {
    const [todo, setTodo] = useState<Todo>(() => {
        const localData =
            typeof window !== "undefined" &&
            window.localStorage.getItem("todo");
        try {
            return localData
                ? (JSON.parse(localData) as Todo)
                : { items: [], completed: 0, active: 0 };
        } catch {
            return { items: [], completed: 0, active: 0 };
        }
    });
    // const [todo, setTodo] = useState<Todo>({
    //     items: [],
    //     completed: 0,
    //     active: 0,
    // });

    useEffect(() => {
        window.localStorage.setItem("todo", JSON.stringify(todo));
    }, [todo]);

    const append = (newItem: Item) => {
        setTodo((prev) => ({
            ...prev,
            items: [...prev.items, newItem],
            active: prev.active + 1,
        }));
    };
    const remove = (item: Item) => {
        setTodo((prev) => ({
            ...prev,
            items: prev.items.filter((f) => f.id != item.id),
            completed:
                item.status === "completed"
                    ? prev.completed - 1
                    : prev.completed,
            active: item.status === "active" ? prev.active - 1 : prev.active,
        }));
    };
    const edit = (id: Item["id"], value: Item["value"]) => {
        setTodo((prev) => ({
            ...prev,
            items: prev.items.map((curr) =>
                curr.id === id ? { ...curr, value } : curr
            ),
        }));
    };
    const toggleStatus = (id: Item["id"], status: Item["status"]) => {
        const nextStatus = status === "active" ? "completed" : "active";
        setTodo((prev) => ({
            ...prev,
            items: prev.items.map((curr) => {
                if (curr.id != id) {
                } else {
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
    const filter = (status: Item["status"]) => {
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
    const toggleAllStatus = () => {
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

export type useTodoType = ReturnType<typeof useTodo>;
