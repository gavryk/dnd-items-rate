import React from 'react';
import { DraggableProps } from '@/common';
import { useDraggable } from '@dnd-kit/core';

export const UIDraggable: React.FC<DraggableProps> = ({ item }) => {
	const { id, src } = item;
	const { setNodeRef, listeners, attributes, transform } = useDraggable({ id });

	const style = {
		transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
	};

	return (
		<button
			className="cursor-pointer"
			ref={setNodeRef}
			style={style}
			{...listeners}
			{...attributes}
		>
			<img src={`/src/assets/${src}`} alt="" className="max-h-30 aspect-[0.833] object-cover" />
		</button>
	);
};
