const TodoInput = ({ input, handleChange, getValue, handleKeyDown, toggleAllStatus }) =>
    <div className="w-full flex items-center justify-center ">
        <button className="w-18 h-16 cursor-pointer border-2 border-white-800" onClick={() => toggleAllStatus()}>*</button>
        <input className="w-full h-16 border-2 border-white text-slate-800 text-2xl" type="text" value={input} onChange={handleChange} placeholder="Type somenthing to do" onSubmit={getValue} onKeyDown={handleKeyDown} />
    </div>
export { TodoInput }