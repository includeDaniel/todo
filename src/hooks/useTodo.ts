import { useEffect, useState } from "react";

export interface Item {
    id: string;
    value: string;
    status: string;
}
export interface Todo {
    items: Item[];
    active: number;
    completed: number;
}

export const useTodo = () => {
    // const [todo, setTodo] = useState(() => {
    //     const localData =
    //         typeof window !== "undefined" &&
    //         window.localStorage.getItem("todo");
    //     return localData
    //         ? JSON.parse(localData)
    //         : { items: [], completed: 0, active: 0 };
    // });
    const [todo, setTodo] = useState({ items: [], completed: 0, active: 0 });

    useEffect(() => {
        window.localStorage.setItem("todo", JSON.stringify(todo));
    }, [todo]);

    const append = (newItem: Item) => {
        setTodo((prev: any) => ({
            ...prev,
            items: [...prev.items, newItem],
            active: prev.active + 1,
        }));
    };
    const remove = (todo: Item) => {
        setTodo((prev) => ({
            ...prev,
            items: prev.items.filter((f: any) => f.id != todo.id),
            completed:
                todo.status === "completed"
                    ? prev.completed - 1
                    : prev.completed,
            active: todo.status === "active" ? prev.active - 1 : prev.active,
        }));
    };
    const edit = (id: string, value: string) => {
        setTodo((prev: any) => ({
            ...prev,
            items: prev.items.map((curr: any) =>
                curr.id === id ? { ...curr, value } : curr
            ),
        }));
    };
    const toggleStatus = (id: string, status: string) => {
        const nextStatus = status === "active" ? "completed" : "active";
        setTodo((prev: any) => ({
            ...prev,
            items: prev.items.map((curr: any) => {
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
    const filter = (status: string) => {
        return todo.items.filter((curr: any) =>
            status === "all" ? curr : curr.status === status
        );
    };
    const clearCompleted = () => {
        setTodo((prev: any) => ({
            ...prev,
            items: prev.items.filter(
                (curr: any) => curr.status !== "completed"
            ),
            completed: 0,
        }));
    };
    const toggleAllStatus = () => {
        setTodo((prev: any) => {
            const status = prev.items.some((f: any) => f.status == "active")
                ? "completed"
                : "active";
            return {
                ...prev,
                items: prev.items.map((curr: any) => ({ ...curr, status })),
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
