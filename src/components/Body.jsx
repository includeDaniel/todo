import { useState } from "react"
import React from "react";

const Body = () => {

    const [input, setInput] = useState("");
    const [listItems, setListItems] = useState([]);


    function handleChange(e) {
        setInput(e.target.value)
    }

    function getValue() {
        value = document.querySelector('input').value;
    }

    function handleClick() {
        setListItems(listItems.concat(input))
        setInput('')

    }
    const items = listItems.map((i) => <li key={i}>{i}</li>)
    return (
        <>
            <input type="text" value={input} onChange={handleChange} placeholder="Type somenthing to do" onSubmit={getValue} />
            <button onClick={handleClick}>Add</button>
            <ul style={{ listStyleType: "none" }}>
                {items}
            </ul>
        </>
    )
}
export { Body }