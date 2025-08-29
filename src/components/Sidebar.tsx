"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Menu, X, LayoutGrid, LineChart, RouteIcon, Gauge } from 'lucide-react'

// Local helper to avoid '@/lib/utils' import
function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ")
}

type NavItem = {
  label: string
  href: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

const NAV_ITEMS: NavItem[] = [
  { label: "Landing", href: "/landing", icon: LayoutGrid },
  { label: "Skill Gap Analysis", href: "/skillgap", icon: LineChart },
  { label: "Generate Roadmap", href: "/generate", icon: RouteIcon },
  { label: "Dashboard", href: "/dashboard", icon: Gauge },
]

export default function Sidebar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <aside className="border-r bg-background">
      {/* Mobile toggle */}
      <div className="flex items-center justify-between p-4 md:hidden">
        <span className="text-sm font-medium">Menu</span>
        <button
          aria-label={open ? "Close sidebar" : "Open sidebar"}
          onClick={() => setOpen((v) => !v)}
          className="rounded-md border px-2 py-1 hover:bg-muted"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <nav className={cx("md:block", open ? "block" : "hidden")} aria-label="Primary">
        <ul className="flex flex-col gap-1 p-2">
          {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
            const active = pathname === href || pathname?.startsWith(href + "/")
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={cx(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-muted",
                    active ? "bg-muted font-medium" : "text-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  <span className="truncate">{label}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </aside>
  )
}