import { useState } from 'react';
import './App.css';
import { UIDraggable } from '@/components';
import { DraggbleItem } from '@/common';
import {
	DndContext,
	DragEndEvent,
	DragOverEvent,
	DragOverlay,
	DragStartEvent,
} from '@dnd-kit/core';
import { UIDropZone } from '@/components/ui-drop-zone';
import { arrayMove } from '@dnd-kit/sortable';
import { useAtom } from 'jotai';
import { activeDraggableAtom } from './store/dnd';

const defaultDraggbles: DraggbleItem[] = [
	{ id: crypto.randomUUID(), src: 'BabyDragonCard.png', dz: 'dropZone' },
	{ id: crypto.randomUUID(), src: 'BarbariansCard.png', dz: 'dropZone' },
	{ id: crypto.randomUUID(), src: 'BomberCard.png', dz: 'dropZone' },
	{ id: crypto.randomUUID(), src: 'DarkPrinceCard.png', dz: 'dropZone' },
	{ id: crypto.randomUUID(), src: 'ElectroDragonCard.png', dz: 'dropZone' },
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
	const [activeDraggable, setActiveDraggable] = useAtom(activeDraggableAtom);

	const handleDragStart = (e: DragStartEvent) => {
		const activeDraggable = draggables.find((draggable) => draggable.id === e.active.id);
		setActiveDraggable(activeDraggable);
	};

	const handleDragOver = (e: DragOverEvent) => {
		if (!e.over) return;
		const overId = e.over.id as string;
		const activeDraggableId = e.active.id as string;
		setDraggables((prev) => {
			const oldIndx = prev.findIndex((draggable) => draggable.id === activeDraggableId);
			const newIndx = prev.findIndex((draggable) => draggable.id === overId);

			if (oldIndx === newIndx) return prev;

			return arrayMove(prev, oldIndx, newIndx);
		});
	};

	const handleDragEnd = (e: DragEndEvent) => {
		setActiveDraggable(undefined);
	};

	return (
		<div className="w-screen h-screen flex flex-col gap-15 justify-center items-center">
			<DndContext
				onDragStart={handleDragStart}
				onDragEnd={handleDragEnd}
				onDragOver={handleDragOver}
			>
				<UIDropZone draggables={draggables} />
				<div className="flex gap-2">
					{draggables
						.filter((draggable) => !draggable.dz)
						.map((draggable) => (
							<UIDraggable key={draggable.id} item={draggable} />
						))}
				</div>
				<DragOverlay>{activeDraggable && <UIDraggable item={activeDraggable} />}</DragOverlay>
			</DndContext>
		</div>
	);
}
