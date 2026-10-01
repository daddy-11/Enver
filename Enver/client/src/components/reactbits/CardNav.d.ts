import type { ReactNode, MouseEvent } from 'react';

export interface CardNavLink {
  label: string;
  href?: string;
  ariaLabel?: string;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
}

export interface CardNavItem {
  label: string;
  bgColor: string;
  textColor: string;
  links: CardNavLink[];
}

export interface CardNavProps {
  logo?: ReactNode | string;
  logoAlt?: string;
  items?: CardNavItem[];
  className?: string;
  ease?: string;
  baseColor?: string;
  menuColor?: string;
  buttonBgColor?: string;
  buttonTextColor?: string;
  ctaLabel?: string;
  onCtaClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  onLogoClick?: (e: MouseEvent<HTMLDivElement>) => void;
}

export default function CardNav(props: CardNavProps): React.JSX.Element;
