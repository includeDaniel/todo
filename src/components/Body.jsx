import React from "react";
import { useState } from "react";
import { TodoFilter } from "./TodoFilter";
import { TodoItem } from './TodoItem'
import { TodoInput } from "./TodoInput";

const Body = () => {

    const [input, setInput] = useState("");
    const [listItems, setListItems] = useState([{ id: crypto.randomUUID(), value: '1', status: 'active' }]);
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

    const hasCompleted = listItems.filter((value) => value.status == 'completed').length > 0
    const items = listItems.filter((f) => state === 'all' ? state : (f.status === state))

        .map((i) => (

            <div key={i.id} className="w-full h-16 border-2 boreder-white flex items-center justify-between">
                <button className="w-16 h-16 border-2 border-white flex justify-center items-center" onClick={() => toggleStatus(i.id)}><div style={{ backgroundColor: i.status === 'completed' ? 'green' : 'transparent' }} className='w-6 h-6 rounded-full border-4 border-green-700'></div></button >
                <li style={{ textDecoration: i.status === 'completed' ? 'line-through' : 'none', color: i.status === 'completed' ? 'gray' : "white" }}>{i.value}</li>
                <button className="w-16 h-16 text-red-500 border-2 border-white" onClick={() => removeItem(i.id, i.status)}>x</button>
            </div >))
    const length = listItems.filter((value) => value.status == 'active').length



    return (

        <div className="w-100 flex items-center justify-center flex-col bg-slate-800 text-[#ffffff]">
            <TodoInput input={input} handleChange={handleChange} getValue={getValue} handleKeyDown={handleKeyDown} toggleAllStatus={toggleAllStatus} />
            <TodoItem items={items} />
            <TodoFilter length={length} hasCompleted={hasCompleted} removeActive={removeActive} setState={setState} />
        </div>

    )
}
export { Body }