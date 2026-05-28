import React from 'react';
import { DraggableProps } from '@/common';

export const UIDraggable: React.FC<DraggableProps> = ({ item }) => {
	return (
		<div className="draggble-card">
			<h4>{item.src}</h4>
		</div>
	);
};
