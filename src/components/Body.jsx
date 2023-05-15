import { useState } from "react"
import React from "react";

const Body = () => {

    const [toDo, setToDo] = useState([]);
    const [lastMessage, setLastMessage] = useState('');
    const [x, setX] = useState(0);
    const keepMessages = []


    function whenChanges(e) {
        setToDo(e.target.value)
    }

    function getValue() {
        value = document.querySelector('input').value;

    }

    function handleSubmit() {
        event.preventDefault();
        setLastMessage(toDo)
        setToDo('')
        setX(x + 1)
        keepMessages[x] = toDo
        console.log(keepMessages)

    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type="text" value={toDo} onChange={whenChanges} placeholder="Type somenthing to do" onSubmit={getValue} />
                <input type="submit" value="Add" />
            </form>
            <ul style={{ listStyleType: "none" }}>

                <li>{lastMessage}</li>
            </ul>
        </>
    )

}
export { Body }