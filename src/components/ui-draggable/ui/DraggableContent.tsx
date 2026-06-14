import { DraggableProps } from '@/common';
import { activeDraggableAtom } from '@/store/dnd';
import { useAtomValue } from 'jotai';
import React from 'react';

export const DraggableContent: React.FC<DraggableProps> = ({ item, isDragging }) => {
	const activeDraggableId = useAtomValue(activeDraggableAtom)?.id;
	return (
		<img
			src={`/src/assets/${item.src}`}
			alt=""
			style={{ opacity: isDragging || activeDraggableId !== item.id ? 1 : 0.5 }}
			className="max-h-30 aspect-[0.833] object-cover"
		/>
	);
};
