import { DraggbleItem } from '@/common';
import { useDroppable } from '@dnd-kit/core';
import { UIDraggable } from '../ui-draggable';
import { SortableContext } from '@dnd-kit/sortable';

export const UIDropZone = ({ draggables }: { draggables: DraggbleItem[] }) => {
	const { setNodeRef, isOver } = useDroppable({ id: 'dropZone' });

	const style = {
		backgroundColor: isOver ? '#c7c7c7' : undefined,
	};

	return (
		<div
			ref={setNodeRef}
			style={style}
			className="border border-b-cyan-900 bg-[#c7c7c7] h-30 w-full flex gap-4"
		>
			<SortableContext items={draggables.map((draggable) => draggable.id)}>
				{draggables.map((draggable) => (
					<UIDraggable key={draggable.id} item={draggable} />
				))}
			</SortableContext>
		</div>
	);
};
