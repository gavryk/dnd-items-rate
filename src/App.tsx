import { useState } from 'react';
import './App.css';
import { UIDraggable } from './components';

const defaultDraggbles = [{ id: crypto.randomUUID(), src: 'GoldenCard.png' }];

export default function App() {
	const [draggables, setDraggables] = useState(defaultDraggbles);

	return (
		<div className="w-screen h-screen flex justify-center items-center">
			<div className="flex gap-2">
				{draggables.map((draggable) => (
					<UIDraggable key={draggable.id} item={draggable} />
				))}
			</div>
		</div>
	);
}
