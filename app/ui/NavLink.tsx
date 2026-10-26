'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
export default function NavLink({ href, label, icon}: { href: string; label: string; icon: React.ReactNode}) {
    const pathname = usePathname()
    const active = pathname === href

    return (
        
      <Link
  href={href}
  title={label}
  className={`flex items-center gap-3 px-3 h-9 rounded-lg text-sm min-w-0 ${active ? 'bg-accent/10 text-accent' : 'hover:bg-black/5'}`}
>
  <span className="shrink-0">{icon}</span>
  <span className="truncate">{label}</span>
</Link>

    )
}