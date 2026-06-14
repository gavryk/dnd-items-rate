import React from 'react';
import { DraggableProps } from '@/common';
import { useSortable } from '@dnd-kit/sortable';
import { DraggableContent } from './ui/DraggableContent';

export const UIDraggable: React.FC<DraggableProps> = ({ item }) => {
	const { id } = item;
	const { setNodeRef, listeners, attributes, transform, transition } = useSortable({ id });

	const style = {
		transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
		transition,
	};

	return (
		<button
			className="cursor-pointer"
			ref={setNodeRef}
			style={style}
			{...listeners}
			{...attributes}
		>
			<DraggableContent item={item} />
		</button>
	);
};
