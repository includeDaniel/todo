import { useState } from "react";
import React from "react";
import "../css/Body.css";




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
        event.preventDefault()
        setListItems([...listItems, input])
        setInput('')


    }
    function removeItem(index) {

        setListItems(listItems.filter((f, i) => i != index))

    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleClick()
        }
    }

    const items = listItems.map((i, index) => (
        <div className="ClassItem">
            <li key={i}>{i}</li>
            <button className="DeleteButton" onClick={() => removeItem(index)}>x</button>
        </div>))

    return (
        <div className="Wrapper">
            <div className="Form">

                <input type="text" value={input} onChange={handleChange} placeholder="Type somenthing to do" onSubmit={getValue} onKeyDown={handleKeyDown} />
                <button onClick={handleClick}>Add</button>

            </div>
            <div className="List">
                <ul style={{ listStyleType: "none" }}>
                    {items}
                </ul>
                <div className="Footer">
                    <span>{listItems.length}</span>
                </div>
            </div>
        </div>
    )
}
export { Body }