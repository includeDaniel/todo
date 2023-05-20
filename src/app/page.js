'use client'

import { Title } from '../components/Title'
import { Body } from '../components/Body'

export default function Home() {
	return (
		<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>

			<Title>todos</Title>
			<Body />
		</div>
	)
}
