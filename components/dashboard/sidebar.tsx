"use client";

import { useState } from "react";

type NavItem = {
  label: string;
  icon: React.ReactNode;
};

function DashboardIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function SuppliersIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <path
        d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ShipmentIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <path
        d="M3 7.5 12 3l9 4.5v9L12 21l-9-4.5v-9Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M3.5 7.5 12 12l8.5-4.5M12 12v9"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DocumentIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <path
        d="M6 3h8l4 4v14H6V3Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M14 3v5h5M9 13h6M9 17h6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CarbonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <path
        d="M20 4C12 4 5 7 5 14c0 3.31 2.69 6 6 6 7 0 10-7 9-16Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M4 20c3-5 7-8 13-11"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ComplianceIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <path
        d="M12 3 20 6v5c0 5-3.4 8.5-8 10-4.6-1.5-8-5-8-10V6l8-3Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="m8.5 12 2.2 2.2 4.8-5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LedgerIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <path
        d="M5 4h14v16H5z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M8 8h8M8 12h8M8 16h5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <path
        d="m6 6 12 12M18 6 6 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
      <path
        d="M4 7h16M4 12h16M4 17h16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

const navItems: NavItem[] = [
  {
    label: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    label: "Suppliers",
    icon: <SuppliersIcon />,
  },
  {
    label: "Shipments",
    icon: <ShipmentIcon />,
  },
  {
    label: "Document Processing",
    icon: <DocumentIcon />,
  },
  {
    label: "Carbon Analytics",
    icon: <CarbonIcon />,
  },
  {
    label: "Compliance",
    icon: <ComplianceIcon />,
  },
  {
    label: "ESG Ledger",
    icon: <LedgerIcon />,
  },
];

export default function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        className="fixed left-4 top-4 z-40 rounded-lg border border-slate-200 bg-white p-2 text-slate-700 shadow-sm lg:hidden"
        aria-label="Open navigation"
      >
        <MenuIcon />
      </button>

      {mobileOpen && (
        <button
          type="button"
          aria-label="Close navigation overlay"
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-slate-950/30 lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-200 bg-white transition-transform duration-200 lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-20 items-center justify-between border-b border-slate-200 px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600 text-white">
              <CarbonIcon />
            </div>

            <div>
              <h1 className="text-lg font-bold tracking-tight text-slate-900">
                SourceTrace
              </h1>
              <p className="text-[10px] font-medium uppercase tracking-widest text-slate-400">
                ESG Platform
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="rounded-md p-1 text-slate-500 hover:bg-slate-100 lg:hidden"
            aria-label="Close navigation"
          >
            <CloseIcon />
          </button>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-6">
          <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Workspace
          </p>

          {navItems.map((item, index) => {
            const isActive = index === 0;

            return (
              <button
                key={item.label}
                type="button"
                onClick={() => setMobileOpen(false)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                  isActive
                    ? "bg-emerald-50 text-emerald-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>

                {isActive && (
                  <span className="ml-auto h-1.5 w-1.5 rounded-full bg-emerald-600" />
                )}
              </button>
            );
          })}
        </nav>

        <div className="border-t border-slate-200 p-4">
          <div className="rounded-xl bg-slate-50 p-4">
            <div className="mb-2 flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-emerald-500" />
              <span className="text-xs font-semibold text-slate-700">
                System Status
              </span>
            </div>

            <p className="text-xs leading-5 text-slate-500">
              All SourceTrace services are operating normally.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}