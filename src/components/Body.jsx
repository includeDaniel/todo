import React from "react";
import { useState } from "react";
import { TodoFilter } from "./TodoFilter";
import { TodoItem } from './TodoItem'
import { TodoInput } from "./TodoInput";

const Body = () => {

    const [input, setInput] = useState("");
    const [listItems, setListItems] = useState([{ value: '1', status: 'active' }]);
    const [state, setState] = useState('all');

    function handleChange(e) {
        setInput(e.target.value)
    }

    function getValue() {
        value = document.querySelector('input').value;
    }

    function handleClick() {
        setListItems([...listItems, { id: crypto.randomUUID(), value: input, status: "active" }])
        setInput('')


    }
    function removeItem(id) {

        setListItems(listItems.filter((f) => (f.id != id)))

    }

    function removeActive(status) {
        setListItems(listItems.filter((f) => f.status != status))

    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleClick()
        }
    }

    function toggleStatus(id) {
        setListItems(listItems.map((value) => {
            if (id == value.id) {
                const status = value.status === "active" ? "completed" : "active"
                return { ...value, status }
            }
            return value

        }))
    }
    const toggleAllStatus = (status = listItems.some((f) => f.status == 'active') ? 'completed' : 'active',
        next = listItems.map((value) => ({ ...value, status }))) =>
        setListItems(next)

    const items = listItems.filter((f) => state === 'all' ? state : (f.status === state))
        .map((i) => (
            <div key={i.id} className="w-full h-16 border-2 boreder-white flex items-center justify-between">
                <button className="w-8 h-8 text-green-500" onClick={() => toggleStatus(i.id)}>O</button>
                <li>{i.value}</li>
                <li>{i.status}</li>
                <button className="w-8 h-8 text-red-500" onClick={() => removeItem(i.id, i.status)}>x</button>
            </div>))

    const length = listItems.filter((value) => value.status == 'active').length
    const hasCompleted = listItems.filter((value) => value.status == 'completed').length > 0

    return (

        <div className="w-100 flex items-center justify-center flex-col bg-slate-800 text-[#ffffff]">
            <TodoInput input={input} handleChange={handleChange} getValue={getValue} handleKeyDown={handleKeyDown} toggleAllStatus={toggleAllStatus} />
            <TodoItem items={items} />
            <TodoFilter length={length} hasCompleted={hasCompleted} removeActive={removeActive} setState={setState} />
        </div>

    )
}
export { Body }