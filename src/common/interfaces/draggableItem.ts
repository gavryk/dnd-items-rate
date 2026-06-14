export interface DraggableProps {
	item: DraggbleItem;
	isDragging?: boolean;
}

export type DraggbleItem = {
	id: string;
	src: string;
	dz?: string;
};
