import { useState } from 'react';
import './App.css';
import { UIDraggable } from '@/components';
import { DraggbleItem, DropZoneTP } from '@/common';
import {
	DndContext,
	DragEndEvent,
	DragOverEvent,
	DragOverlay,
	DragStartEvent,
} from '@dnd-kit/core';
import { UIDropZone } from '@/components/ui-drop-zone';
import { arrayMove, SortableContext } from '@dnd-kit/sortable';
import { useAtom } from 'jotai';
import { activeDraggableAtom, draggablesAtom, dropZonesAtom } from './store/dnd';

export default function App() {
	const [draggables, setDraggables] = useAtom(draggablesAtom);
	const [dropZones, setDropZones] = useAtom(dropZonesAtom);
	const [activeDraggable, setActiveDraggable] = useAtom(activeDraggableAtom);

	const handleDragStart = (e: DragStartEvent) => {
		const activeDraggable = draggables.find((draggable) => draggable.id === e.active.id);
		setActiveDraggable(activeDraggable);
	};

	const handleDragOver = (e: DragOverEvent) => {
		if (!e.over || !activeDraggable) return;
		const overId = e.over.id as string;
		const activeDraggableId = e.active.id as string;
		setDraggables((prev) => {
			//if we're hovering the empty space in a DropZone
			if (overId === 'dropZone') {
				const newDraggable = { ...activeDraggable, dz: 'dropZone' };

				return [...prev.filter((draggable) => draggable.id !== activeDraggableId), newDraggable];
			}

			// If we're hovering the space inside a SortableContext
			const overDraggable = prev.find((draggable) => draggable.id === overId);
			const overDropZone = !!overDraggable?.dz;
			const oldIndx = prev.findIndex((draggable) => draggable.id === activeDraggableId);
			const newIndx = prev.findIndex((draggable) => draggable.id === overId);

			if (oldIndx === newIndx) return prev;

			const shiftedItems = arrayMove(prev, oldIndx, newIndx);
			shiftedItems[newIndx] = {
				...shiftedItems[newIndx],
				dz: overDropZone ? 'dropZone' : undefined,
			};

			return shiftedItems;
		});
	};

	const handleDragEnd = (e: DragEndEvent) => {
		setActiveDraggable(undefined);
	};

	const freeDraggables = draggables.filter((draggable) => !draggable.dz);

	return (
		<div className="w-screen h-screen flex flex-col gap-15 justify-center items-center">
			<DndContext
				onDragStart={handleDragStart}
				onDragEnd={handleDragEnd}
				onDragOver={handleDragOver}
			>
				{dropZones.map((dz) => (
					<UIDropZone dropZone={dz} />
				))}
				<DragOverlay>{activeDraggable && <UIDraggable item={activeDraggable} />}</DragOverlay>
			</DndContext>
		</div>
	);
}
