'use client'

import { Header } from '../components/Header'
import { Body } from '../components/Body'
import "../css/global.css"

export default function Home() {
	return (
		<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
			<Header />
			<Body />
		</div>
	)
}
