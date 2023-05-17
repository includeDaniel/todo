import { useState } from "react";
import React from "react";
import "../css/Body.css";

let activeLength = [1]

const Body = () => {

    const [input, setInput] = useState("");
    const [listItems, setListItems] = useState([]);
    const [state, setState] = useState('all');
    const [count, setCount] = useState(0)

    function handleChange(e) {
        setInput(e.target.value)
    }

    function getValue() {
        value = document.querySelector('input').value;
    }

    function handleClick() {
        setListItems([...listItems, { id: count, value: input, status: "active" }])
        setCount(count + 1)
        setInput('')


    }
    function removeItem(id) {

        setListItems(listItems.filter((f) => f.id != id))

    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleClick()
        }
    }

    function toggleStatus(id) {
        setListItems(listItems.map((value, i) => {
            if (id == value.id) {
                const status = value.status === "active" ? "completed" : "active"
                return { ...value, status }
            }
            return value

        }))
    }

    const items = listItems.filter((f) => state === 'all' ? state : (f.status === state))
        .map((i, index) => (
            <div key={i.value} className="ClassItem">
                <button className="ButtonList" onClick={() => toggleStatus(i.id)}>O</button>
                <li>{i.value}</li>
                <li>{i.status}</li>
                <button className="DeleteButton" onClick={() => removeItem(i.id)}>x</button>
            </div>))

    const length = listItems.filter((value) => value.status == 'active').length

    return (
        <div className="Wrapper">
            <div className="Form">

                <input type="text" value={input} onChange={handleChange} placeholder="Type somenthing to do" onSubmit={getValue} onKeyDown={handleKeyDown} />
                <button className="ButtonList" onClick={handleClick}>Add</button>

            </div>
            <div className="List">
                <ul style={{ listStyleType: "none" }}>
                    {items}
                </ul>
                <div className="Footer">
                    <span>{length} items left</span>
                    <button className="FilterButton" onClick={() => setState('all')}>All</button>
                    <button className="FilterButton" onClick={() => setState('active')}>Active</button>
                    <button className="FilterButton" onClick={() => setState('completed')}>Completed</button>
                </div>
            </div>
        </div>
    )
}
export { Body }