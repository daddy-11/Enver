import React from 'react';

export interface InfiniteMenuItem {
  image: string;
  link: string;
  title: string;
  description: string;
}

export interface InfiniteMenuProps {
  items?: InfiniteMenuItem[];
  scale?: number;
  backgroundColor?: string;
  onModeChange?: (mode: "webgl2" | "fallback") => void;
}

declare const InfiniteMenu: React.FC<InfiniteMenuProps>;
export default InfiniteMenu;
