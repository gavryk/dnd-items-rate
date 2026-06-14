import { atom } from 'jotai';
import { DraggbleItem } from '@/common';

export const activeDraggableAtom = atom<DraggbleItem | undefined>(undefined);
