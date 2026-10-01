import type { ReactNode } from 'react';

export interface BranchedMenuLeaf {
  value: string;
  label: string;
  icon?: any;
}

export interface BranchedMenuSection {
  label: string;
  children?: BranchedMenuLeaf[];
  value?: string;
}

export type BranchedMenuItem = BranchedMenuSection | BranchedMenuLeaf;

export interface BranchedMenuProps {
  items?: BranchedMenuItem[];
  defaultOpen?: number | number[];
  defaultActive?: string;
  active?: string;
  onSelect?: (value: string, item: any) => void;
  onToggle?: (index: number, open: boolean) => void;
  color?: string;
  accentColor?: string;
  lineColor?: string;
  width?: number;
  rowHeight?: number;
  indent?: number;
  trunk?: number;
  radius?: number;
  lineWidth?: number;
  fontSize?: number;
  drawDuration?: number;
  foldDuration?: number;
  className?: string;
}

export default function BranchedMenu(props: BranchedMenuProps): React.JSX.Element;
