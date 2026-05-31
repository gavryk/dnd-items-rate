import { DraggbleItem } from '@/common';
import { useDroppable } from '@dnd-kit/core';
import { UIDraggable } from '../ui-draggable';

export const UIDropZone = ({ draggables }: { draggables: DraggbleItem[] }) => {
	const { setNodeRef, isOver } = useDroppable({ id: 'dropZone' });

	const style = {
		backgroundColor: isOver ? 'green' : undefined,
	};

	return (
		<div
			ref={setNodeRef}
			style={style}
			className="border border-b-cyan-900 bg-[#c7c7c7] h-30 w-full flex gap-4"
		>
			{draggables
				.filter((draggable) => draggable.dz)
				.map((draggable) => (
					<UIDraggable key={draggable.id} item={draggable} />
				))}
		</div>
	);
};
