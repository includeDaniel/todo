import { renderHook } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { useTodo } from "../hooks/useTodo";

describe("useTodo", () => {
    beforeEach(() => {
        Object.defineProperty(window, "localStorage", {
            value: {
                getItem: jest.fn(),
                setItem: jest.fn(),
            },
        });
    });

    test("should return the initial value of todo's list when someting goes wrong", () => {
        window.localStorage.getItem = jest
            .fn()
            .mockReturnValueOnce("Invalid JSON");
        const { result } = renderHook(() => useTodo());

        expect(result.current.todo).toStrictEqual({
            items: [],
            completed: 0,
            active: 0,
        });
    });
    test("should add a item in todo's list", () => {
        const { result } = renderHook(() => useTodo());
        const { action } = result.current;

        act(() => {
            action.append({
                id: "1",
                value: "Caminhar pela manhã",
                status: "active",
            });
        });
        expect(result.current.todo).toStrictEqual({
            active: 1,
            completed: 0,
            items: [
                { id: "1", value: "Caminhar pela manhã", status: "active" },
            ],
        });
    });

    test("should remove a active item of todo's list", () => {
        const { result } = renderHook(() => useTodo());
        const { action } = result.current;

        act(() => {
            action.append({
                id: "1",
                value: "Caminhar pela manhã",
                status: "active",
            });
            action.append({ id: "2", value: "Almoçar", status: "active" });
            action.append({ id: "3", value: "Ver um filme", status: "active" });

            action.remove({ id: "3", value: "Ver um filme", status: "active" });
        });
        expect(result.current.todo).toStrictEqual({
            active: 2,
            completed: 0,
            items: [
                {
                    id: "1",
                    value: "Caminhar pela manhã",
                    status: "active",
                },
                { id: "2", value: "Almoçar", status: "active" },
            ],
        });
    });
    test("should remove a completed item of todo's list", () => {
        const { result } = renderHook(() => useTodo());
        const { action } = result.current;

        act(() => {
            action.append({
                id: "1",
                value: "Caminhar pela manhã",
                status: "active",
            });
            action.append({ id: "2", value: "Almoçar", status: "active" });
            action.append({ id: "3", value: "Ver um filme", status: "active" });

            action.toggleStatus("1", "active");

            action.remove({
                id: "1",
                value: "Caminhar pela manhã",
                status: "completed",
            });
        });
        expect(result.current.todo).toStrictEqual({
            active: 2,
            completed: 0,
            items: [
                { id: "2", value: "Almoçar", status: "active" },
                { id: "3", value: "Ver um filme", status: "active" },
            ],
        });
    });
    test("should edit a item in todo's list", () => {
        const { result } = renderHook(() => useTodo());
        const { action } = result.current;

        act(() => {
            action.append({
                id: "1",
                value: "Caminhar pela manhã",
                status: "active",
            });

            action.edit("1", "Tomar café da manhã");
        });
        expect(result.current.todo).toStrictEqual({
            active: 1,
            completed: 0,
            items: [
                { id: "1", value: "Tomar café da manhã", status: "active" },
            ],
        });
    });
    test("should don't edit a item in todo's list because of a wrong id", () => {
        const { result } = renderHook(() => useTodo());
        const { action } = result.current;

        act(() => {
            action.append({
                id: "1",
                value: "Caminhar pela manhã",
                status: "active",
            });
            action.edit("2", "Tomar café da manhã");
        });
        expect(result.current.todo).toStrictEqual({
            active: 1,
            completed: 0,
            items: [
                {
                    id: "1",
                    value: "Caminhar pela manhã",
                    status: "active",
                },
            ],
        });
    });
    test("should toggle a item with active status to completed status", () => {
        const { result } = renderHook(() => useTodo());
        const { action } = result.current;

        act(() => {
            action.append({
                id: "1",
                value: "Caminhar pela manhã",
                status: "active",
            });

            action.toggleStatus("1", "active");
        });
        expect(result.current.todo).toStrictEqual({
            active: 0,
            completed: 1,
            items: [
                { id: "1", value: "Caminhar pela manhã", status: "completed" },
            ],
        });
    });
    test("should toggle a item with completed status to active status", () => {
        const { result } = renderHook(() => useTodo());
        const { action } = result.current;

        act(() => {
            action.append({
                id: "1",
                value: "Caminhar pela manhã",
                status: "active",
            });
            action.toggleStatus("1", "active");
            action.toggleStatus("1", "completed");
        });
        expect(result.current.todo).toStrictEqual({
            active: 1,
            completed: 0,
            items: [
                { id: "1", value: "Caminhar pela manhã", status: "active" },
            ],
        });
    });
    test("should don't toggle a item's status, because is of a different id", () => {
        const { result } = renderHook(() => useTodo());
        const { action } = result.current;

        act(() => {
            action.append({
                id: "1",
                value: "Caminhar pela manhã",
                status: "active",
            });
            action.append({ id: "2", value: "Almoçar", status: "active" });
            action.append({ id: "3", value: "Ver um filme", status: "active" });

            action.toggleStatus("1", "active");
        });
        expect(result.current.todo).toStrictEqual({
            active: 2,
            completed: 1,
            items: [
                {
                    id: "1",
                    value: "Caminhar pela manhã",
                    status: "completed",
                },
                { id: "2", value: "Almoçar", status: "active" },
                { id: "3", value: "Ver um filme", status: "active" },
            ],
        });
    });
    test("should filter with all status in todo's list", () => {
        const { result } = renderHook(() =>
            useTodo({
                completed: 1,
                active: 2,
                items: [
                    {
                        id: "1",
                        value: "Caminhar pela manhã",
                        status: "completed",
                    },
                    { id: "2", value: "Almoçar", status: "active" },
                    { id: "3", value: "Ver um filme", status: "active" },
                ],
            })
        );
        const { action } = result.current;
        expect(action.filter("all")).toStrictEqual([
            { id: "1", status: "completed", value: "Caminhar pela manhã" },
            { id: "2", status: "active", value: "Almoçar" },
            { id: "3", status: "active", value: "Ver um filme" },
        ]);
    });
    test("should filter with a specific status in todo's list", () => {
        const { result } = renderHook(() =>
            useTodo({
                completed: 1,
                active: 2,
                items: [
                    {
                        id: "1",
                        value: "Caminhar pela manhã",
                        status: "completed",
                    },
                    { id: "2", value: "Almoçar", status: "active" },
                    { id: "3", value: "Ver um filme", status: "active" },
                ],
            })
        );
        const { action } = result.current;
        expect(action.filter("active")).toStrictEqual([
            { id: "2", value: "Almoçar", status: "active" },
            { id: "3", value: "Ver um filme", status: "active" },
        ]);
    });
    test("should toggle all active status to completed status of todo's list", () => {
        const { result } = renderHook(() => useTodo());
        const { action } = result.current;

        act(() => {
            action.append({
                id: "1",
                value: "Caminhar pela manhã",
                status: "active",
            });
            action.append({ id: "2", value: "Almoçar", status: "active" });
            action.append({ id: "3", value: "Ver um filme", status: "active" });
            action.toggleAllStatus();
        });
        expect(result.current.todo).toStrictEqual({
            active: 0,
            completed: 3,
            items: [
                {
                    id: "1",
                    value: "Caminhar pela manhã",
                    status: "completed",
                },
                { id: "2", value: "Almoçar", status: "completed" },
                { id: "3", value: "Ver um filme", status: "completed" },
            ],
        });
    });
    test("should toggle all completed status to active status of todo's list", () => {
        const { result } = renderHook(() => useTodo());
        const { action } = result.current;

        act(() => {
            action.append({
                id: "1",
                value: "Caminhar pela manhã",
                status: "completed",
            });
            action.append({ id: "2", value: "Almoçar", status: "completed" });
            action.append({
                id: "3",
                value: "Ver um filme",
                status: "completed",
            });
            action.toggleAllStatus();
        });
        expect(result.current.todo).toStrictEqual({
            active: 3,
            completed: 0,
            items: [
                {
                    id: "1",
                    value: "Caminhar pela manhã",
                    status: "active",
                },
                { id: "2", value: "Almoçar", status: "active" },
                { id: "3", value: "Ver um filme", status: "active" },
            ],
        });
    });
    test("should toggle all completed status to active status of todo's list", () => {
        const { result } = renderHook(() => useTodo());
        const { action } = result.current;

        act(() => {
            action.append({
                id: "1",
                value: "Caminhar pela manhã",
                status: "active",
            });
            action.append({ id: "2", value: "Almoçar", status: "completed" });
            action.append({
                id: "3",
                value: "Ver um filme",
                status: "completed",
            });
            action.toggleAllStatus();
        });
        expect(result.current.todo).toStrictEqual({
            active: 0,
            completed: 3,
            items: [
                {
                    id: "1",
                    value: "Caminhar pela manhã",
                    status: "completed",
                },
                { id: "2", value: "Almoçar", status: "completed" },
                { id: "3", value: "Ver um filme", status: "completed" },
            ],
        });
    });
    test("should don't remove the items, because all items are active in todo's list", () => {
        const { result } = renderHook(() => useTodo());
        const { action } = result.current;
        act(() => {
            action.append({
                id: "1",
                value: "Caminhar pela manhã",
                status: "active",
            });
            action.append({ id: "2", value: "Almoçar", status: "active" });
            action.append({ id: "3", value: "Ver um filme", status: "active" });
            action.clearCompleted();
        });
        expect(result.current.todo).toStrictEqual({
            active: 3,
            completed: 0,
            items: [
                {
                    id: "1",
                    value: "Caminhar pela manhã",
                    status: "active",
                },
                { id: "2", value: "Almoçar", status: "active" },
                { id: "3", value: "Ver um filme", status: "active" },
            ],
        });
    });
    test("should don't remove the items, because all items are active in todo's list", () => {
        const { result } = renderHook(() => useTodo());
        const { action } = result.current;

        act(() => {
            action.append({
                id: "1",
                value: "Caminhar pela manhã",
                status: "active",
            });
            action.append({ id: "2", value: "Almoçar", status: "active" });
            action.append({ id: "3", value: "Ver um filme", status: "active" });
            action.toggleAllStatus();
            action.clearCompleted();
        });
        expect(result.current.todo).toStrictEqual({
            active: 0,
            completed: 0,
            items: [],
        });
    });
});
