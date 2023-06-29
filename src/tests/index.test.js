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
    test("should remove a active item of todo's list", async () => {
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
    test("should remove a completed item of todo's list", async () => {
        const { result } = renderHook(() => useTodo());
        const { action } = result.current;

        act(() => {
            action.append({
                id: "123",
                status: "active",
                value: "MensagemTeste",
            });
            action.toggleStatus("123", "active");
            action.remove({
                id: "123",
                status: "completed",
                value: "MensagemTeste",
            });
        });
        expect(result.current.todo).toStrictEqual({
            active: 0,
            completed: 0,
            items: [],
        });
    });
    test("should edit a item in todo's list", async () => {
        const { result } = renderHook(() => useTodo());
        const { action } = result.current;

        act(() => {
            action.append({
                id: "123",
                value: "MensagemTeste",
                status: "active",
            });
            action.edit("123", "batatinha");
        });
        expect(result.current.todo).toStrictEqual({
            active: 1,
            completed: 0,
            items: [{ id: "123", value: "batatinha", status: "active" }],
        });
    });
    test("should don't edit a item in todo's list because of a wrong id", async () => {
        const { result } = renderHook(() => useTodo());
        const { action } = result.current;

        act(() => {
            action.edit("444", "batatinha");
        });
        expect(result.current.todo).toStrictEqual({
            active: 1,
            completed: 0,
            items: [{ id: "123", value: "batatinha", status: "active" }],
        });
    });
    test("should toggle a item with active status to completed status", async () => {
        const { result } = renderHook(() => useTodo());
        const { action } = result.current;

        act(() => {
            action.toggleStatus("123", "active");
        });
        expect(result.current.todo).toStrictEqual({
            active: 0,
            completed: 1,
            items: [{ id: "123", value: "batatinha", status: "completed" }],
        });
    });
    test("should toggle a item with completed status to active status", async () => {
        const { result } = renderHook(() => useTodo());
        const { action } = result.current;

        act(() => {
            action.toggleStatus("123", "completed");
        });
        expect(result.current.todo).toStrictEqual({
            active: 1,
            completed: 0,
            items: [{ id: "123", value: "batatinha", status: "active" }],
        });
    });
    // test("should don't toggle a item's status, because is of a different id", async () => {
    //     const { result } = renderHook(() => useTodo());
    //     const { action } = result.current;

    //     act(() => {
    //         action.toggleStatus("44444444", "completed");
    //     });
    //     expect(result.current.todo).toStrictEqual({
    //         active: 1,
    //         completed: 0,
    //         items: [{ id: "123", value: "batatinha", status: "active" }],
    //     });
    // });
    test("should filter with status in todo's list", async () => {
        const { result } = renderHook(() => useTodo());
        const { action } = result.current;

        act(() => {
            action.append({ id: "124", value: "batatinha2", status: "active" });
            action.filter("all");
        });
        expect(result.current.todo).toStrictEqual({
            active: 2,
            completed: 0,
            items: [
                { id: "123", value: "batatinha", status: "active" },
                {
                    id: "124",
                    status: "active",
                    value: "batatinha2",
                },
            ],
        });
    });
    test("should toggle all status of todo's list", async () => {
        const { result } = renderHook(() => useTodo());
        const { action } = result.current;

        act(() => {
            action.toggleAllStatus();
        });
        expect(result.current.todo).toStrictEqual({
            active: 0,
            completed: 2,
            items: [
                { id: "123", value: "batatinha", status: "completed" },
                {
                    id: "124",
                    status: "completed",
                    value: "batatinha2",
                },
            ],
        });
    });
    test("should remove all items with completed status of todo's list", async () => {
        const { result } = renderHook(() => useTodo());
        const { action } = result.current;

        act(() => {
            action.clearCompleted();
        });
        expect(result.current.todo).toStrictEqual({
            active: 0,
            completed: 0,
            items: [],
        });
    });
});
