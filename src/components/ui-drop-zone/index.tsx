import { DraggbleItem } from '@/common';
import { useDroppable } from '@dnd-kit/core';
import { UIDraggable } from '../ui-draggable';
import { SortableContext } from '@dnd-kit/sortable';

export const UIDropZone = ({ draggables }: { draggables: DraggbleItem[] }) => {
	const { setNodeRef, isOver } = useDroppable({ id: 'dropZone' });

	const style = {
		backgroundColor: isOver ? 'green' : undefined,
	};

	const freeDraggables = draggables.filter((draggable) => draggable.dz);

	return (
		<div style={style} className="border border-b-cyan-900 bg-[#c7c7c7] h-30 w-full flex gap-4">
			<div className="flex gap-4">
				<SortableContext items={draggables.map((draggable) => draggable.id)}>
					{freeDraggables.map((draggable) => (
						<UIDraggable key={draggable.id} item={draggable} />
					))}
				</SortableContext>
			</div>
			<div ref={setNodeRef} className="bg-yellow-500 flex-1"></div>
		</div>
	);
};
