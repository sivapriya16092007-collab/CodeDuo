"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  {
    name: "Dashboard",
    href: "/",
    icon: "⌂",
  },
  {
    name: "Suppliers",
    href: "/suppliers",
    icon: "♙",
  },
  {
    name: "Shipments",
    href: "/shipments",
    icon: "▣",
  },
  {
    name: "Document Processing",
    href: "/documents",
    icon: "▤",
  },
  {
    name: "Carbon Analytics",
    href: "/carbon",
    icon: "◒",
  },
  {
    name: "Compliance",
    href: "/compliance",
    icon: "✓",
  },
  {
    name: "ESG Ledger",
    href: "/ledger",
    icon: "▥",
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-full min-h-screen w-64 flex-col border-r border-slate-200 bg-white">
      <div className="flex h-16 items-center border-b border-slate-100 px-5">
        <Link
          href="/"
          className="flex items-center gap-3"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-sm font-bold text-white shadow-sm">
            S
          </div>

          <div>
            <div className="text-base font-bold tracking-tight text-slate-900">
              SourceTrace
            </div>
            <div className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
              ESG Platform
            </div>
          </div>
        </Link>
      </div>

      <nav className="flex-1 px-3 py-5">
        <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-widest text-slate-400">
          Workspace
        </p>

        <div className="space-y-1">
          {navigation.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                  isActive
                    ? "bg-blue-50 text-blue-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-base ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 text-slate-500 group-hover:bg-slate-200"
                  }`}
                >
                  {item.icon}
                </span>

                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="border-t border-slate-100 p-4">
        <div className="rounded-xl bg-slate-50 p-3">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-emerald-500" />

            <span className="text-xs font-semibold text-slate-700">
              Demo Environment
            </span>
          </div>

          <p className="mt-1 text-[10px] leading-4 text-slate-400">
            Local MVP data · No external APIs
          </p>
        </div>
      </div>
    </aside>
  );
}