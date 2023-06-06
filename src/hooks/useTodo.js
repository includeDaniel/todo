import { useState } from "react";

export const useTodo = () => {
    const [items, setItems] = useState([]);

    const append = (newItem) => {
        setItems([...items, newItem]);
    };
    const remove = (id) => {
        setItems(items.filter((f) => f.id != id));
    };
    const edit = (id, value) => {
        setItems(
            items.map((curr) => (curr.id === id ? { ...curr, value } : curr))
        );
    };
    const toggleStatus = (id) => {
        setItems(
            items.map((curr) => {
                if (curr.id === id) {
                    const status =
                        curr.status === "active" ? "completed" : "active";
                    return {
                        ...curr,
                        status,
                    };
                }
                return curr;
            })
        );
    };
    const filter = (status) => {
        return items.filter((curr) =>
            status === "all" ? curr : curr.status === status
        );
    };
    const clearCompleted = () => {
        setItems(items.filter((f) => f.status !== "completed"));
    };
    const toggleAllStatus = (
        status = items.some((f) => f.status == "active")
            ? "completed"
            : "active",
        next = items.map((value) => ({ ...value, status }))
    ) => setItems(next);

    return {
        items,
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
