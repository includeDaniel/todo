import { useState } from "react"
import React from "react";

const Body = () => {

    const [input, setInput] = useState([]);
    const [list, setList] = useState('');
    const [x, setX] = useState(0);
    const keepMessages = []


    function whenChanges(e) {
        setInput(e.target.value)
    }

    function getValue() {
        value = document.querySelector('input').value;

    }

    function handleSubmit() {
        event.preventDefault();
        setList(input)
        setInput('')
        setX(x + 1)
        keepMessages[x] = input
        console.log(keepMessages)

    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type="text" value={input} onChange={whenChanges} placeholder="Type somenthing to do" onSubmit={getValue} />
                <input type="submit" value="Add" />
            </form>
            <ul style={{ listStyleType: "none" }}>

                <li>{list}</li>
            </ul>
        </>
    )

}
export { Body }