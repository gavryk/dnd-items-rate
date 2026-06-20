import { atom } from 'jotai';
import { DraggbleItem, DropZoneTP } from '@/common';

export const defaultDraggbles: DraggbleItem[] = [
	{ id: crypto.randomUUID(), src: 'BabyDragonCard.png' },
	{ id: crypto.randomUUID(), src: 'BarbariansCard.png' },
	{ id: crypto.randomUUID(), src: 'BomberCard.png' },
	{ id: crypto.randomUUID(), src: 'DarkPrinceCard.png' },
	{ id: crypto.randomUUID(), src: 'ElectroDragonCard.png' },
	{ id: crypto.randomUUID(), src: 'ElixirGolemCard.png' },
	{ id: crypto.randomUUID(), src: 'FireballCard.png' },
	{ id: crypto.randomUUID(), src: 'GiantCard.png' },
	{ id: crypto.randomUUID(), src: 'GiantSkeletonCard.png' },
	{ id: crypto.randomUUID(), src: 'GolemCard.png' },
	{ id: crypto.randomUUID(), src: 'GuardsCard.png' },
	{ id: crypto.randomUUID(), src: 'HogRiderCard.png' },
	{ id: crypto.randomUUID(), src: 'KnightCard.png' },
	{ id: crypto.randomUUID(), src: 'MegaKnight.png' },
	{ id: crypto.randomUUID(), src: 'MinerCard.png' },
	{ id: crypto.randomUUID(), src: 'PEKKACard.png' },
	{ id: crypto.randomUUID(), src: 'RagingPrinceCard.png' },
	{ id: crypto.randomUUID(), src: 'RocketCard.png' },
	{ id: crypto.randomUUID(), src: 'RoyalGiantCard.png' },
	{ id: crypto.randomUUID(), src: 'SkeletonsCard.png' },
	{ id: crypto.randomUUID(), src: 'SpearGoblinsCard.png' },
	{ id: crypto.randomUUID(), src: 'TowerPrincessCard.png' },
	{ id: crypto.randomUUID(), src: 'WizardCard.png' },
];

export const defaultDropZone: DropZoneTP[] = [
	{ id: 'dropZone', draggables: [] },
	{ id: 'free', draggables: defaultDraggbles.map((draggable) => draggable.id) },
];

export const draggablesAtom = atom<DraggbleItem[]>(defaultDraggbles);

export const dropZonesAtom = atom<DropZoneTP[]>(defaultDropZone);

export const activeDraggableAtom = atom<DraggbleItem | undefined>(undefined);
