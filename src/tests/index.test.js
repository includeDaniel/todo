import { useTodo } from "@/hooks/useTodo";
import { renderHook, createEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";

describe("useTodo", () => {
    test("should return the initial value of the todo's list", async () => {
        const { result } = renderHook(() => useTodo());

        expect(result.current.todo).toBeNull;
    });
    test("should add a item in todo's list", async () => {
        const { result } = renderHook(() => useTodo());
        const { action } = result.current;

        act(() => {
            action.append({
                id: "123",
                value: "MensagemTeste",
                status: "active",
            });
        });

        expect(result.current.todo).toStrictEqual({
            active: 1,
            completed: 0,
            items: [{ id: "123", status: "active", value: "MensagemTeste" }],
        });
    });
    test("should remove a item in todo's list", async () => {
        const { result } = renderHook(() => useTodo());
        const { action } = result.current;

        act(() => {
            action.remove({
                id: "123",
                status: "active",
                value: "MensagemTeste",
            });
        });
        expect(result.current.todo).toStrictEqual({
            active: 0,
            completed: 0,
            items: [],
        });
    });
});
