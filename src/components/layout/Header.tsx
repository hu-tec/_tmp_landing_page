"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV } from "@/data/navigation";
import { cn } from "@/lib/utils";
import { usePlan } from "@/components/plan/PlanContext";

export function Header() {
  const [open, setOpen] = useState(false);
  const { plan, mounted } = usePlan();
  const inlineCommunity = mounted && plan === "1안";
  const navItems = NAV.map((n) =>
    n.label === "커뮤니티"
      ? { ...n, href: inlineCommunity ? "#community" : "/community" }
      : n
  );
  return (
    <header className="fixed inset-x-0 top-11 z-40 backdrop-blur-md bg-white/85 border-b border-navy-100">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 md:px-8 h-16">
        <Link href="/" className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-navy-900 text-white text-xs font-black">
            T
          </span>
          <span className="text-sm md:text-base font-black tracking-tight text-navy-900">
            TIMES · AI 영어교사 양성
          </span>
        </Link>
        <nav className="hidden lg:flex items-center gap-6">
          {navItems.map((n) => (
            <Link
              key={n.label}
              href={n.href}
              className={cn(
                "text-sm font-medium text-navy-800/80 hover:text-burgundy-700 transition-colors"
              )}
            >
              {n.label}
            </Link>
          ))}
          <a
            href="#recruitment"
            className="rounded-full bg-burgundy-700 text-white text-sm font-semibold px-4 py-2 hover:bg-burgundy-800"
          >
            모집 신청
          </a>
        </nav>
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="menu"
          className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-md text-navy-900"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {open && (
        <div className="lg:hidden border-t border-navy-100 bg-white">
          <div className="mx-auto max-w-6xl px-5 py-4 flex flex-col gap-1">
            {navItems.map((n) => (
              <Link
                key={n.label}
                href={n.href}
                onClick={() => setOpen(false)}
                className="py-2 text-sm font-medium text-navy-800"
              >
                {n.label}
              </Link>
            ))}
            <a
              href="#recruitment"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-burgundy-700 text-white text-sm font-semibold px-4 py-2 text-center"
            >
              모집 신청
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
