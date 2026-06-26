import './App.css';
import { UIDraggable } from '@/components';
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
import { activeDraggableAtom, draggablesAtom, dropZonesAtom } from './store/dnd';

export default function App() {
	const [draggables, setDraggables] = useAtom(draggablesAtom);
	const [dropZones, setDropZones] = useAtom(dropZonesAtom);
	const [activeDraggable, setActiveDraggable] = useAtom(activeDraggableAtom);

	const dropZonesIds = dropZones.map((dz) => dz.id);

	const handleDragStart = (e: DragStartEvent) => {
		const activeDraggable = draggables.find((draggable) => draggable.id === e.active.id);
		setActiveDraggable(activeDraggable);
	};

	const handleDragOver = (e: DragOverEvent) => {
		if (!e.over || !activeDraggable) return;
		const overId = e.over.id as string;
		const activeDraggableId = e.active.id as string;
		setDropZones((prev) => {
			const currentDropZone = dropZones.find((dz) =>
				dz.draggables.some((draggable) => draggable === activeDraggableId),
			);
			if (!currentDropZone) return;
			const currentDropZoneId = currentDropZone.id;

			//Case #1: if we're hovering the empty space in a DropZone
			if (dropZonesIds.includes(overId)) {
				const dropZone = prev.find((dz) => dz.id === overId)!;
				const newDraggables = [
					...dropZone.draggables.filter((draggable) => draggable !== activeDraggableId),
					activeDraggableId,
				];
				return prev.map((dz) => {
					// If not the old OR new, just return
					if (dz.id !== overId && dz.id !== currentDropZoneId) return dz;

					//Remove from the old IF we went across zones
					if (dz.id === currentDropZoneId && currentDropZoneId !== overId)
						return {
							...dz,
							draggables: dz.draggables.filter((draggable) => draggable !== activeDraggableId),
						};

					//Add to new one
					return { ...dz, draggables: newDraggables };
				});
			}

			//Case #2: Re-arranging items in the same row
			if (currentDropZone.draggables.some((draggable) => draggable === overId)) {
				const oldIndx = currentDropZone.draggables.findIndex(
					(draggable) => draggable === activeDraggableId,
				);
				const newIndx = currentDropZone.draggables.findIndex((draggable) => draggable === overId);

				if (oldIndx === newIndx) return prev;

				const newDraggables = arrayMove(currentDropZone.draggables, oldIndx, newIndx);

				return prev.map((dz) => {
					if (dz.id !== currentDropZoneId) return dz;
					return { ...dz, draggables: newDraggables };
				});
			}

			//Case #3: If we're re-arranging between TWO different rows

			return prev;
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
