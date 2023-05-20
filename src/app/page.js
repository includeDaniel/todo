'use client'

import { TodoTitle } from '../components/TodoTitle'
import { Body } from '../components/Body'

export default function Home() {
	return (
		<div className='w-screen flex items-center flex-col h-screen bg-slate-400'>
			<TodoTitle>My Tasks</TodoTitle>
			<Body />
		</div>
	)
}
