const TodoFilter = ({ length, hasCompleted, removeActive, setState }) =>
    <div className=" text-sm text-[#808080] flex justify-between bg-slate-800 w-full border-2 border-white">
        <div className="pr-10 pl-5 flex items-center justify-center">
            <span>{length} items left</span>
        </div>
        <div>
            <button className="p-5 text-sm text-[#808080]" onClick={() => setState('all')}>All</button>
            <button className="p-5 text-sm text-[#808080]" onClick={() => setState('active')}>Active</button>
            <button className="p-5 text-sm text-[#808080]" onClick={() => setState('completed')}>Completed</button>
        </div>
        <button className="p-5 text-sm text-[#808080]" style={{ display: hasCompleted ? 'block' : 'none' }} onClick={() => removeActive('completed')}>Clear completed</button>
    </div>
export { TodoFilter }