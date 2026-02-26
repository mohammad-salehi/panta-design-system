// src/components/Navbar/Navbar.tsx
'use client';
import React, { useRef, useState } from 'react';
import { useTheme } from '../ThemeProvider';
import clsx from 'clsx';

export interface NavItem {
  link: string;          // مسیر کامل (مثلاً "/panel/dashboard")
  label: string;
  access?: string;
  icon?: React.ReactNode;
}

export interface NavbarProps {
  navItems: NavItem[];
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
  userFullName?: string;
  userRole?: string;
  onChangePassword?: () => void;
  onLogout?: () => void;
  brand?: React.ReactNode;
  className?: string;
  currentPath: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  navItems,
  isOpen,
  setIsOpen,
  isMobileOpen,
  setIsMobileOpen,
  userFullName = 'کاربر',
  userRole = '',
  onChangePassword,
  onLogout,
  brand,
  className,
  currentPath,
}) => {
  const { theme, setTheme } = useTheme();
  const isDarkMode = theme === 'dark';
  const asideRef = useRef<HTMLDivElement>(null);

  const toggleTheme = () => setTheme(isDarkMode ? 'light' : 'dark');

  React.useEffect(() => {
    if (!isMobileOpen) return;
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (asideRef.current && !asideRef.current.contains(e.target as Node)) {
        setIsMobileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isMobileOpen, setIsMobileOpen]);

  React.useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileOpen]);

  return (
    <>
      {/* ===== Mobile top bar ===== */}
      <div className="fixed top-0 left-0 right-0 z-40 lg:hidden">
        <div className="bg-boxColor/90 backdrop-blur border-b border-boxBorderColor lux-panel rounded-none">
          <div className="h-14 px-4 flex items-center justify-between">
            <button
              onClick={() => setIsMobileOpen(true)}
              className="h-10 w-10 rounded-xl border border-boxBorderColor bg-boxColor/70 hover:bg-gray-100 transition flex items-center justify-center text-titleText lux-btn"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
            <button
              onClick={toggleTheme}
              className="h-10 w-10 rounded-xl border border-boxBorderColor bg-boxColor/70 hover:bg-gray-100 transition flex items-center justify-center text-titleText lux-btn"
            >
              {isDarkMode ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M21.0672 11.8568L20.4253 11.469L21.0672 11.8568ZM12.1432 2.93276L11.7553 2.29085V2.29085L12.1432 2.93276ZM7.37554 20.013C7.017 19.8056 6.5582 19.9281 6.3508 20.2866C6.14339 20.6452 6.26591 21.104 6.62446 21.3114L7.37554 20.013ZM2.68862 17.3755C2.89602 17.7341 3.35482 17.8566 3.71337 17.6492C4.07191 17.4418 4.19443 16.983 3.98703 16.6245L2.68862 17.3755ZM21.25 12C21.25 17.1086 17.1086 21.25 12 21.25V22.75C17.9371 22.75 22.75 17.9371 22.75 12H21.25ZM2.75 12C2.75 6.89137 6.89137 2.75 12 2.75V1.25C6.06294 1.25 1.25 6.06294 1.25 12H2.75ZM15.5 14.25C12.3244 14.25 9.75 11.6756 9.75 8.5H8.25C8.25 12.5041 11.4959 15.75 15.5 15.75V14.25ZM20.4253 11.469C19.4172 13.1373 17.5882 14.25 15.5 14.25V15.75C18.1349 15.75 20.4407 14.3439 21.7092 12.2447L20.4253 11.469ZM9.75 8.5C9.75 6.41182 10.8627 4.5828 12.531 3.57467L11.7553 2.29085C9.65609 3.5593 8.25 5.86509 8.25 8.5H9.75ZM12 2.75C11.9115 2.75 11.8077 2.71008 11.7324 2.63168C11.6686 2.56527 11.6538 2.50244 11.6503 2.47703C11.6461 2.44587 11.6482 2.35557 11.7553 2.29085L12.531 3.57467C13.0342 3.27065 13.196 2.71398 13.1368 2.27627C13.0754 1.82126 12.7166 1.25 12 1.25V2.75ZM21.7092 12.2447C21.6444 12.3518 21.5541 12.3539 21.523 12.3497C21.4976 12.3462 21.4347 12.3314 21.3683 12.2676C21.2899 12.1923 21.25 12.0885 21.25 12H22.75C22.75 11.2834 22.1787 10.9246 21.7237 10.8632C21.286 10.804 20.7293 10.9658 20.4253 11.469L21.7092 12.2447ZM12 21.25C10.3139 21.25 8.73533 20.7996 7.37554 20.013L6.62446 21.3114C8.2064 22.2265 10.0432 22.75 12 22.75V21.25ZM3.98703 16.6245C3.20043 15.2647 2.75 13.6861 2.75 12H1.25C1.25 13.9568 1.77351 15.7936 2.68862 17.3755L3.98703 16.6245Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364-6.364l-1.414 1.414M6.05 17.95l-1.414 1.414m0-13.828l1.414 1.414M17.95 17.95l1.414 1.414M12 8a4 4 0 100 8 4 4 0 000-8z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isMobileOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" />}

      {/* Sidebar */}
      <aside
        ref={asideRef}
        className={clsx(
          'flex flex-col fixed top-0 right-0 h-screen w-[82vw] max-w-[320px] lg:w-64 shadow-[0_10px_40px_rgba(0,0,0,0.18)] transition-transform duration-300 z-50 lux-panel rounded-none',
          {
            'translate-x-full lg:translate-x-0': !isOpen && !isMobileOpen,
            'translate-x-0': isOpen || isMobileOpen,
          },
          className
        )}
      >
        {/* Sidebar header */}
        <div className="sticky top-0 z-10 lux-panel rounded-none border-none">
          <div className="p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {brand ? brand : <div className="font-bold text-titleText">لوگو</div>}
              </div>
              <button
                onClick={() => setIsMobileOpen(false)}
                className="lg:hidden h-10 w-10 rounded-xl border border-boxBorderColor bg-boxColor/70 hover:bg-gray-100 transition flex items-center justify-center text-titleText lux-btn"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* User card */}
            <div className="mt-3 rounded-2xl border border-boxBorderColor bg-boxColor/70 p-3 lux-panel">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-gray-100 border border-boxBorderColor flex items-center justify-center text-titleText">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M5 21C5 17.134 8.13401 14 12 14C15.866 14 19 17.134 19 21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="min-w-0 flex-1" dir="ltr">
                  <div className="text-sm font-semibold text-titleText truncate">{userFullName}</div>
                  <div className="text-[11px] text-gray-500 truncate">{userRole}</div>
                </div>
                {onChangePassword && (
                  <button
                    onClick={onChangePassword}
                    className="shrink-0 h-10 w-10 rounded-xl border border-boxBorderColor bg-boxColor/70 hover:bg-gray-100 transition flex items-center justify-center text-titleText lux-btn"
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                      <path d="M10.6887 11.9999C10.6887 13.0229 9.85974 13.8519 8.83674 13.8519C7.81374 13.8519 6.98474 13.0229 6.98474 11.9999C6.98474 10.9769 7.81374 10.1479 8.83674 10.1479H8.83974C9.86174 10.1489 10.6887 10.9779 10.6887 11.9999Z" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M10.6918 12H17.0098V13.852" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M14.182 13.852V12" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M2.74988 12C2.74988 5.063 5.06288 2.75 11.9999 2.75C18.9369 2.75 21.2499 5.063 21.2499 12C21.2499 18.937 18.9369 21.25 11.9999 21.25C5.06288 21.25 2.74988 18.937 2.74988 12Z" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="px-3 pt-4 space-y-2 overflow-y-auto flex-1 min-h-0 lux-panel">
          {navItems.map((item) => {
            if (item.access && item.access !== userRole) return null;
            const isActive = currentPath === item.link;
            return (
              <a
                href={item.link}
                key={item.label}
                style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}
              >
                <button
                  type="button"
                  className={clsx(
                    'w-full flex items-center justify-between gap-1 px-1 py-1 rounded-xl transition lux-icon',
                  )}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className={clsx(
                        'h-6 w-6 rounded-xl flex items-center justify-center border shrink-0 lux-btn p-2',
                        isActive ? 'text-primary' : 'text-titleText border-boxBorderColor'
                      )}
                    >
                      {item.icon}
                    </span>
                    <span
                      className={clsx(
                        'text-sm font-medium text-right leading-5 min-w-0 break-words',
                        isActive ? 'text-primary' : 'lux-text'
                      )}
                      dir="rtl"
                    >
                      {item.label}
                    </span>
                  </div>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    className={clsx('transition mt-3 self-start shrink-0', isActive ? 'opacity-100' : 'opacity-40')}
                  >
                    <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </a>
            );
          })}
        </nav>

        {/* Logout button - با رنگ‌های مناسب برای دارک و لایت */}
        {onLogout && (
          <div className="p-3 mt-auto">
            <button
              onClick={onLogout}
              className="w-full flex items-center justify-center gap-2 rounded-2xl border border-red-200 dark:border-red-900/40 bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-950/60 transition py-3 lux-btn"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M10 12H18M18 12L15.5 9.77778M18 12L15.5 14.2222M18 7.11111V5C18 4.44772 17.5523 4 17 4H7C6.44772 4 6 4.44772 6 5V19C6 19.5523 6.44772 20 7 20H17C17.5523 20 18 19.5523 18 19V16.8889" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
              <span className="text-sm font-semibold">خروج</span>
            </button>
          </div>
        )}
      </aside>
    </>
  );
};