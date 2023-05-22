'use client'

import { TodoTitle } from '../components/TodoTitle'
import { Todo } from '../components/Todo'

export default function Home() {
	return (
		<div className='w-full flex items-center flex-col min-h-screen max-h-max bg-slate-400'>
			<TodoTitle>My Tasks</TodoTitle>
			<Todo />
		</div>
	)
}
