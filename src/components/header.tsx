import * as React from 'react';
import { Link } from 'gatsby';
import Star from './star';

const MENU: { label: string; to?: string }[] = [
  { label: 'Tech', to: '/' },
  { label: 'Diary' },
  { label: 'Project' },
  { label: 'About' },
];

const item = 'flex min-h-11 items-center rounded-full px-[18px] text-[17px]';

const Header = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <header className="mx-auto flex max-w-page flex-wrap items-center justify-between gap-4 p-5 md:px-12 md:py-7">
      <Link
        to="/"
        aria-label="홈"
        className="flex gap-0.5 text-[40px] leading-none"
      >
        F's
        <Star className="text-accent" />
      </Link>

      <button
        type="button"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-surface md:hidden"
        aria-label="메뉴"
        aria-expanded={open}
        aria-controls="site-menu"
        onClick={() => setOpen(!open)}
      >
        <svg
          aria-hidden="true"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <path d={open ? 'M6 6l12 12M18 6L6 18' : 'M5 8h14M5 16h14'} />
        </svg>
      </button>

      <nav
        id="site-menu"
        className={`${open ? 'flex' : 'hidden'} w-full flex-col gap-1 rounded-3xl bg-surface p-1.5 md:flex md:w-auto md:flex-row md:rounded-full`}
      >
        {MENU.map(({ label, to }) =>
          to ? (
            <Link
              key={label}
              to={to}
              className={`${item} bg-accent-strong text-white`}
            >
              {label}
            </Link>
          ) : (
            <span
              key={label}
              aria-disabled="true"
              title="준비 중"
              className={`${item} text-muted`}
            >
              {label}
            </span>
          ),
        )}
      </nav>
    </header>
  );
};

export default Header;
