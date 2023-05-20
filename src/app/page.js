'use client'

import { TodoTitle } from '../components/TodoTitle'
import { Body } from '../components/Body'

export default function Home() {
	return (
		<div className='h-max-content bg-slate-400'>
			<div className='flex items-center flex-col'>
				<TodoTitle>My Tasks</TodoTitle>
				<Body />
			</div>
		</div>
	)
}
