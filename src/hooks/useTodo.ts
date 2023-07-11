import { useCallback, useEffect, useState } from "react";

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

export const useTodo = (
    initialProps = { items: [], completed: 0, active: 0 } as Todo
) => {
    const [todo, setTodo] = useState(() => {
        try {
            const localData =
                typeof window !== "undefined" &&
                window.localStorage.getItem("todo");
            return localData ? (JSON.parse(localData) as Todo) : initialProps;
        } catch {
            return initialProps;
        }
    });

    useEffect(() => {
        window.localStorage.setItem("todo", JSON.stringify(todo));
    }, [todo]);

    const append = useCallback((newItem: Item) => {
        setTodo((prev) => ({
            ...prev,
            items: [...prev.items, newItem],
            active: prev.active + 1,
        }));
    }, []);
    const remove = useCallback((item: Item) => {
        setTodo((prev) => ({
            ...prev,
            items: prev.items.filter((f) => f.id != item.id),
            completed:
                item.status === "completed"
                    ? prev.completed - 1
                    : prev.completed,
            active: item.status === "active" ? prev.active - 1 : prev.active,
        }));
    }, []);
    const edit = useCallback((id: Item["id"], value: Item["value"]) => {
        setTodo((prev) => ({
            ...prev,
            items: prev.items.map((curr) =>
                curr.id === id ? { ...curr, value } : curr
            ),
        }));
    }, []);
    const toggleStatus = useCallback(
        (id: Item["id"], status: Item["status"]) => {
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
                    : {
                          active: prev.active + 1,
                          completed: prev.completed - 1,
                      }),
            }));
        },
        []
    );
    const filter = useCallback(
        (status: Item["status"]) => {
            return todo.items.filter((curr) =>
                status === "all" ? curr : curr.status === status
            );
        },
        [todo]
    );
    const clearCompleted = useCallback(() => {
        setTodo((prev) => ({
            ...prev,
            items: prev.items.filter((curr) => curr.status !== "completed"),
            completed: 0,
        }));
    }, []);
    const toggleAllStatus = useCallback(() => {
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
    }, []);
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
