import { useState } from 'react';
import './App.css';
import { UIDraggable } from '@/components';
import { DraggbleItem } from '@/common';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { UIDropZone } from '@/components/ui-drop-zone';

const defaultDraggbles: DraggbleItem[] = [
	{ id: crypto.randomUUID(), src: 'BabyDragonCard.png', dz: undefined },
	{ id: crypto.randomUUID(), src: 'BarbariansCard.png', dz: undefined },
	{ id: crypto.randomUUID(), src: 'BomberCard.png', dz: undefined },
	{ id: crypto.randomUUID(), src: 'DarkPrinceCard.png', dz: undefined },
	{ id: crypto.randomUUID(), src: 'ElectroDragonCard.png', dz: undefined },
	{ id: crypto.randomUUID(), src: 'ElixirGolemCard.png', dz: undefined },
	{ id: crypto.randomUUID(), src: 'FireballCard.png', dz: undefined },
	{ id: crypto.randomUUID(), src: 'GiantCard.png', dz: undefined },
	{ id: crypto.randomUUID(), src: 'GiantSkeletonCard.png', dz: undefined },
	{ id: crypto.randomUUID(), src: 'GolemCard.png', dz: undefined },
	{ id: crypto.randomUUID(), src: 'GuardsCard.png', dz: undefined },
	{ id: crypto.randomUUID(), src: 'HogRiderCard.png', dz: undefined },
	{ id: crypto.randomUUID(), src: 'KnightCard.png', dz: undefined },
	{ id: crypto.randomUUID(), src: 'MegaKnight.png', dz: undefined },
	{ id: crypto.randomUUID(), src: 'MinerCard.png', dz: undefined },
	{ id: crypto.randomUUID(), src: 'PEKKACard.png', dz: undefined },
	{ id: crypto.randomUUID(), src: 'RagingPrinceCard.png', dz: undefined },
	{ id: crypto.randomUUID(), src: 'RocketCard.png', dz: undefined },
	{ id: crypto.randomUUID(), src: 'RoyalGiantCard.png', dz: undefined },
	{ id: crypto.randomUUID(), src: 'SkeletonsCard.png', dz: undefined },
	{ id: crypto.randomUUID(), src: 'SpearGoblinsCard.png', dz: undefined },
	{ id: crypto.randomUUID(), src: 'TowerPrincessCard.png', dz: undefined },
	{ id: crypto.randomUUID(), src: 'WizardCard.png', dz: undefined },
];

export default function App() {
	const [draggables, setDraggables] = useState<DraggbleItem[]>(defaultDraggbles);

	const handleDragEnd = (e: DragEndEvent) => {
		if (!e.over) return;
		const dropZoneId = e.over.id as string;
		const activeDraggableId = e.active.id as string;
		setDraggables((prev) =>
			prev.map((draggable) =>
				draggable.id !== activeDraggableId ? draggable : { ...draggable, dz: dropZoneId },
			),
		);
	};

	return (
		<div className="w-screen h-screen flex flex-col gap-15 justify-center items-center">
			<DndContext onDragEnd={handleDragEnd}>
				<UIDropZone draggables={draggables} />
				<div className="flex gap-2">
					{draggables
						.filter((draggable) => !draggable.dz)
						.map((draggable) => (
							<UIDraggable key={draggable.id} item={draggable} />
						))}
				</div>
			</DndContext>
		</div>
	);
}
