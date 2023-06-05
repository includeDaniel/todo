import React, { useEffect } from "react";
import { useState } from "react";
import { TodoFilter } from "./TodoFilter";
import { TodoItem } from './TodoItem'
import { TodoInput } from "./TodoInput";
import { useTodo } from "@/hooks/useTodo";

const Todo = () => {

    const [input, setInput] = useState("");
    const [listItems, setListItems] = useState(() => {
        const localData = localStorage.getItem('todo');
        return localData ? JSON.parse(localData) : [];
    });
    const [state, setState] = useState('all');
    const {items, action} = useTodo()

    useEffect(() => {
        window.localStorage.setItem('todo', JSON.stringify(listItems))
    }, [listItems])

    function handleChange(e) {
        setInput(e.target.value)
    }

    function handleClick() {
        const id = crypto.randomUUID()
        setListItems([...listItems, { id , value: input, status: "active" }])
        setInput('')
        action.append({id , value: input, status: "active"})    
    }

    function removeItem(id) {

        setListItems(listItems.filter((f) => (f.id != id)))
        action.remove(id)

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

        action.toggleStatus(id)
    }

    function UpdateList(e, id) {
        setListItems(listItems.map((m) => id === m.id ? { ...m, value: e.currentTarget.innerHTML } : m))
        action.edit(id, e.currentTarget.innerHTML)

    }
    const toggleAllStatus = (status = listItems.some((f) => f.status == 'active') ? 'completed' : 'active',
        next = listItems.map((value) => ({ ...value, status }))) =>
        setListItems(next)

    const hasCompleted = listItems.filter((value) => value.status == 'completed').length > 0
 
    const xitems = action.filter(state)
    console.log(xitems)
  
    const _items = listItems.filter((f) => state === 'all' ? state : (f.status === state))
    .map((i) => (

            <div key={i.id} className="w-full h-16 border-2 boreder-white flex items-center justify-between">
                <button className="w-16 h-16 border-2 border-white flex justify-center items-center" onClick={() => toggleStatus(i.id)}><div style={{ backgroundColor: i.status === 'completed' ? 'green' : 'transparent' }} className='w-6 h-6 rounded-full border-4 border-green-700'></div></button >
                <li contenteditable="true" onBlur={(e) => UpdateList(e, i.id)} style={{ textDecoration: i.status === 'completed' ? 'line-through' : 'none', color: i.status === 'completed' ? 'gray' : "white" }}>{i.value}</li>
                <button className="w-16 h-16 text-red-500 border-2 border-white" onClick={() => removeItem(i.id)}>x</button>
            </div >))
    const length = listItems.filter((value) => value.status == 'active').length

    console.log(items)
    

    return (
        <>
            <div className="w-100 flex items-center justify-center flex-col bg-slate-800 text-[#ffffff]">
                <TodoInput input={input} handleChange={handleChange} handleKeyDown={handleKeyDown} toggleAllStatus={toggleAllStatus} />
                <TodoItem items={_items} />
                <TodoFilter length={length} hasCompleted={hasCompleted} removeActive={removeActive} setState={setState} />
            </div>


        </>

    )
}
export { Todo }