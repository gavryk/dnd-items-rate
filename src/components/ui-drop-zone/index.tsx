import { DraggbleItem, DropZoneTP } from '@/common';
import { useDroppable } from '@dnd-kit/core';
import { UIDraggable } from '../ui-draggable';
import { SortableContext } from '@dnd-kit/sortable';
import { useAtomValue } from 'jotai';
import { draggablesAtom } from '@/store/dnd';

export const UIDropZone = ({ dropZone }: { dropZone: DropZoneTP }) => {
	const allDraggables = useAtomValue(draggablesAtom);
	const { id, draggables } = dropZone;
	const { setNodeRef, isOver } = useDroppable({ id });

	const style = {
		backgroundColor: isOver ? 'green' : undefined,
	};

	return (
		<div style={style} className="border border-b-cyan-900 bg-[#c7c7c7] h-30 w-full flex gap-4">
			<div className="flex gap-4">
				<SortableContext items={draggables}>
					{draggables.map((draggableId) => {
						const draggable = allDraggables.find((draggable) => draggable.id === draggableId);
						if (!draggable) return null;
						return <UIDraggable key={draggableId} item={draggable} />;
					})}
				</SortableContext>
			</div>
			<div ref={setNodeRef} className="bg-yellow-500 flex-1"></div>
		</div>
	);
};
