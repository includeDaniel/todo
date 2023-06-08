import { useEffect, useState } from "react";

//Quando eu crio um item
//Quando eu removo um item ativo
//Qundo eu mudo o status para completed
//Quando eu dou toggleAllStatus

export const useTodo = () => {
    const [items, setItems] = useState(() => {
        const localData =
            typeof window !== "undefined" &&
            window.localStorage.getItem("todo");
        return localData ? JSON.parse(localData) : [];
    });

    const [todo, setTodo] = useState({
        items: [],
        completed: 0,
        active: 0,
    });

    useEffect(() => {
        window.localStorage.setItem("todo", JSON.stringify(items));
    }, [items]);

    console.log(todo);

    const append = (newItem) => {
        setItems([...items, newItem]);
        setTodo((prev) => ({
            ...prev,
            items: [...prev.items, newItem],
            active: prev.active + 1,
        }));
    };
    const remove = (todo) => {
        setItems(items.filter((f) => f.id != todo.id));
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
        setItems(
            items.map((curr) => (curr.id === id ? { ...curr, value } : curr))
        );
        setTodo((prev) => ({
            ...prev,
            items: prev.items.map((curr) =>
                curr.id === id ? { ...curr, value } : curr
            ),
        }));
    };
    const toggleStatus = (id, status) => {
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
        console.log(
            todo.items.filter((curr) =>
                status === "all" ? curr : curr.status === status
            )
        );

        return items.filter((curr) =>
            status === "all" ? curr : curr.status === status
        );
    };
    const clearCompleted = () => {
        setItems(items.filter((f) => f.status !== "completed"));
        setTodo((prev) => ({
            ...prev,
            items: prev.items.filter((curr) => curr.status !== "completed"),
            completed: 0,
            active: prev.active,
        }));
    };
    const toggleAllStatus = (
        status = items.some((f) => f.status == "active")
            ? "completed"
            : "active",
        next = items.map((value) => ({ ...value, status }))
    ) => {
        setItems(next);
        setTodo((prev) => ({
            ...prev,
            items: prev.items.map((curr) =>
                curr.status == "active"
                    ? { id: curr.id, value: curr.value, status: "completed" }
                    : { id: curr.id, value: curr.value, status: "active" }
            ),
            active: prev.items.some((curr) => curr.status == "completed")
                ? prev.items.length
                : 0,
            completed: prev.items.some((curr) => curr.status == "active")
                ? prev.items.length
                : 0,
        }));
    };

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
