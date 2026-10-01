'use client';

import { isValidElement, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ArrowUpRight } from 'lucide-react';
import './CardNav.css';

const CardNav = ({
  logo,
  logoAlt = 'Logo',
  items = [],
  className = '',
  ease = 'power3.out',
  baseColor = '#fff',
  menuColor = '#2B121F',
  buttonBgColor = '#2B121F',
  buttonTextColor = '#fff',
  ctaLabel = 'Get Started',
  onCtaClick,
  onLogoClick
}) => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const navRef = useRef(null);
  const cardsRef = useRef([]);
  const tlRef = useRef(null);

  const calculateHeight = () => {
    const navEl = navRef.current;
    if (!navEl) return 260;

    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) {
      const contentEl = navEl.querySelector('.card-nav-content');
      if (contentEl) {
        const wasVisible = contentEl.style.visibility;
        const wasPointerEvents = contentEl.style.pointerEvents;
        const wasPosition = contentEl.style.position;
        const wasHeight = contentEl.style.height;

        contentEl.style.visibility = 'visible';
        contentEl.style.pointerEvents = 'auto';
        contentEl.style.position = 'static';
        contentEl.style.height = 'auto';

        contentEl.offsetHeight;

        const topBar = 60;
        const padding = 20;
        const contentHeight = contentEl.scrollHeight;

        contentEl.style.visibility = wasVisible;
        contentEl.style.pointerEvents = wasPointerEvents;
        contentEl.style.position = wasPosition;
        contentEl.style.height = wasHeight;

        const totalNeeded = topBar + contentHeight + padding;
        const maxHeight = window.innerHeight * 0.88;
        return Math.min(maxHeight, Math.max(420, totalNeeded));
      }
      return Math.min(window.innerHeight * 0.88, 440);
    }
    return 260;
  };

  const createTimeline = () => {
    const navEl = navRef.current;
    if (!navEl) return null;

    gsap.set(navEl, { height: 60, overflow: 'hidden' });
    gsap.set(cardsRef.current, { y: 50, opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    tl.to(navEl, {
      height: calculateHeight,
      duration: 0.35,
      ease
    });

    tl.to(cardsRef.current, { y: 0, opacity: 1, duration: 0.35, ease, stagger: 0.06 }, '-=0.1');

    return tl;
  };

  useLayoutEffect(() => {
    const tl = createTimeline();
    tlRef.current = tl;

    return () => {
      tl?.kill();
      tlRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ease]);

  useEffect(() => {
    const handleResize = () => {
      if (!tlRef.current || !navRef.current) return;
      if (isExpanded) {
        const newHeight = calculateHeight();
        gsap.set(navRef.current, { height: newHeight });
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isExpanded]);

  // Click outside to collapse
  useEffect(() => {
    if (!isExpanded) return;
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        toggleMenu();
      }
    };
    const timer = setTimeout(() => {
      document.addEventListener('click', handleClickOutside);
    }, 60);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('click', handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isExpanded]);

  const toggleMenu = (e) => {
    if (e && e.stopPropagation) {
      e.stopPropagation();
    }
    const tl = tlRef.current;
    if (!tl) return;
    if (!isExpanded) {
      setIsHamburgerOpen(true);
      setIsExpanded(true);
      tl.play(0);
    } else {
      setIsHamburgerOpen(false);
      tl.eventCallback('onReverseComplete', () => {
        setIsExpanded(false);
      });
      tl.reverse();
    }
  };

  const setCardRef = i => el => {
    if (el) cardsRef.current[i] = el;
  };

  return (
    <div className={`card-nav-container ${className}`}>
      <nav ref={navRef} className={`card-nav ${isExpanded ? 'open' : ''}`} style={{ backgroundColor: baseColor }}>
        <div className="card-nav-top">
          <div
            className={`hamburger-menu ${isHamburgerOpen ? 'open' : ''}`}
            onClick={toggleMenu}
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleMenu(e);
              }
            }}
            role="button"
            aria-label={isExpanded ? 'Close menu' : 'Open menu'}
            aria-expanded={isExpanded}
            tabIndex={0}
            style={{ color: menuColor || '#2B121F' }}
          >
            <div className="hamburger-line" />
            <div className="hamburger-line" />
          </div>

          <div
            className="logo-container"
            role="button"
            tabIndex={0}
            onClick={(e) => {
              e.stopPropagation();
              if (onLogoClick) onLogoClick(e);
              if (isExpanded) toggleMenu(e);
            }}
          >
            {isValidElement(logo) ? (
              logo
            ) : typeof logo === 'function' ? (
              logo()
            ) : logo ? (
              <img src={logo} alt={logoAlt} className="logo" />
            ) : null}
          </div>

          <button
            type="button"
            className="card-nav-cta-button"
            style={{ backgroundColor: buttonBgColor, color: buttonTextColor }}
            onClick={(e) => {
              e.stopPropagation();
              if (onCtaClick) onCtaClick(e);
              if (isExpanded) toggleMenu(e);
            }}
          >
            {ctaLabel}
          </button>
        </div>

        <div className="card-nav-content" aria-hidden={!isExpanded}>
          {(items || []).slice(0, 3).map((item, idx) => (
            <div
              key={`${item.label}-${idx}`}
              className="nav-card"
              ref={setCardRef(idx)}
              style={{ backgroundColor: item.bgColor, color: item.textColor }}
            >
              <div className="nav-card-label">{item.label}</div>
              <div className="nav-card-links">
                {item.links?.map((lnk, i) => (
                  <a
                    key={`${lnk.label}-${i}`}
                    className="nav-card-link"
                    href={lnk.href || '#'}
                    aria-label={lnk.ariaLabel}
                    onClick={e => {
                      e.stopPropagation();
                      if (lnk.onClick) lnk.onClick(e);
                      toggleMenu(e);
                    }}
                  >
                    <ArrowUpRight className="nav-card-link-icon" aria-hidden="true" size={15} />
                    <span>{lnk.label}</span>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default CardNav;
