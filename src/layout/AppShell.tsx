import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import {
  Home, Shirt, Building2, Layers, Scissors, GraduationCap, Package, Heart, MessageCircle,
  Bell, Settings, Plus, Search, ShoppingBag, User, type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useApp } from "@/context/AppContext";
import { InitialsAvatar } from "@/components/common";

const NAV_ITEMS: { to: string; label: string; icon: LucideIcon }[] = [
  { to: "/", label: "الرئيسية", icon: Home },
  { to: "/designs", label: "التصاميم", icon: Shirt },
  { to: "/companies", label: "شركات الملابس", icon: Building2 },
  { to: "/fabrics", label: "الأقمشة", icon: Layers },
  { to: "/supplies", label: "مستلزمات الخياطة", icon: Scissors },
  { to: "/courses", label: "دورات خياطة", icon: GraduationCap },
  { to: "/orders", label: "الطلبات", icon: Package },
  { to: "/favorites", label: "المفضلة", icon: Heart },
  { to: "/messages", label: "الرسائل", icon: MessageCircle },
  { to: "/notifications", label: "الإشعارات", icon: Bell },
  { to: "/settings", label: "الإعدادات", icon: Settings },
];

function Logo({ compact }: { compact?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-lg">
      <div className={cn("flex items-center justify-center rounded-xl bg-gold font-black text-plum card-shadow", compact ? "h-9 w-9 text-lg" : "h-10 w-10 text-xl")}>
        خ
      </div>
      <div>
        <div className={cn("font-black leading-none", compact ? "text-lg text-plum" : "text-xl text-cream")}>خياط</div>
        {!compact && <div className="mt-1 text-[10px] leading-none text-cream/60">منصة الخياطين ومصممي الأزياء</div>}
      </div>
    </Link>
  );
}

function HeaderSearch({ className }: { className?: string }) {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  return (
    <form
      className={cn("relative", className)}
      onSubmit={(e) => {
        e.preventDefault();
        if (q.trim()) navigate(`/designs?q=${encodeURIComponent(q.trim())}`);
      }}
    >
      <Search className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-mutedtext" />
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        type="search"
        placeholder="ابحث عن تصاميم، أقمشة، شركات…"
        aria-label="بحث"
        className="h-11 w-full rounded-full border border-sand bg-white pr-10 pl-4 text-sm text-ink placeholder:text-mutedtext/70 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30"
      />
    </form>
  );
}

function BadgeDot({ count }: { count: number }) {
  if (!count) return null;
  return (
    <span className="absolute -left-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1 text-[10px] font-black text-plum">
      {count}
    </span>
  );
}

function DesktopSidebar() {
  const { unreadMessages, unreadNotifications } = useApp();
  return (
    <aside className="fixed inset-y-0 right-0 z-40 hidden w-64 flex-col bg-plum px-4 py-6 lg:flex">
      <div className="px-2"><Logo /></div>
      <nav className="mt-8 flex-1 space-y-1 overflow-y-auto no-scrollbar" aria-label="التنقل الرئيسي">
        {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-bold text-cream/70 transition hover:bg-plum-light hover:text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold",
                isActive && "bg-plum-light text-gold"
              )
            }
          >
            <Icon className="h-5 w-5 shrink-0" />
            <span className="flex-1">{label}</span>
            {label === "الرسائل" && unreadMessages > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1 text-[10px] font-black text-plum">{unreadMessages}</span>
            )}
            {label === "الإشعارات" && unreadNotifications > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1 text-[10px] font-black text-plum">{unreadNotifications}</span>
            )}
          </NavLink>
        ))}
      </nav>
      <Link
        to="/publish"
        className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-gold px-4 py-3 text-sm font-black text-plum transition hover:bg-gold-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream"
      >
        <Plus className="h-5 w-5" />
        نشر تصميم
      </Link>
    </aside>
  );
}

function DesktopHeader() {
  const { cartCount, unreadMessages, unreadNotifications, user } = useApp();
  return (
    <header className="sticky top-0 z-30 hidden border-b border-sand bg-cream/85 backdrop-blur-md lg:block">
      <div className="flex items-center gap-4 px-8 py-3.5">
        <HeaderSearch className="w-full max-w-md" />
        <div className="mr-auto flex items-center gap-1.5">
          <Link to="/cart" className="relative rounded-full p-2.5 text-plum transition hover:bg-plum-mist focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold" aria-label="سلة التسوق">
            <ShoppingBag className="h-5 w-5" />
            <BadgeDot count={cartCount} />
          </Link>
          <Link to="/notifications" className="relative rounded-full p-2.5 text-plum transition hover:bg-plum-mist focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold" aria-label="الإشعارات">
            <Bell className="h-5 w-5" />
            <BadgeDot count={unreadNotifications} />
          </Link>
          <Link to="/messages" className="relative rounded-full p-2.5 text-plum transition hover:bg-plum-mist focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold" aria-label="الرسائل">
            <MessageCircle className="h-5 w-5" />
            <BadgeDot count={unreadMessages} />
          </Link>
          <Link to="/profile" className="mr-2 flex items-center gap-2.5 rounded-full py-1 pl-4 pr-1 transition hover:bg-plum-mist focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold">
            <InitialsAvatar name={user.name} size="sm" />
            <div className="text-right">
              <div className="text-sm font-bold text-ink">{user.name}</div>
              <div className="text-[11px] text-mutedtext">{user.username}</div>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}

function MobileHeader() {
  const { unreadNotifications } = useApp();
  return (
    <header className="sticky top-0 z-30 border-b border-sand bg-cream/90 backdrop-blur-md lg:hidden">
      <div className="flex items-center gap-3 px-4 py-3">
        <Logo compact />
        <HeaderSearch className="flex-1" />
        <Link to="/notifications" className="relative rounded-full bg-white p-2.5 text-plum shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold" aria-label="الإشعارات">
          <Bell className="h-5 w-5" />
          <BadgeDot count={unreadNotifications} />
        </Link>
      </div>
    </header>
  );
}

const BOTTOM_NAV: { to: string; label: string; icon: LucideIcon }[] = [
  { to: "/", label: "الرئيسية", icon: Home },
  { to: "/designs", label: "التصاميم", icon: Shirt },
  { to: "/publish", label: "نشر", icon: Plus },
  { to: "/favorites", label: "المفضلة", icon: Heart },
  { to: "/profile", label: "حسابي", icon: User },
];

function MobileBottomNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-sand bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden" aria-label="تنقل سفلي">
      <div className="mx-auto flex max-w-md items-end justify-around px-2">
        {BOTTOM_NAV.map(({ to, label, icon: Icon }) => {
          const isPublish = to === "/publish";
          return (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                cn(
                  "flex min-w-14 flex-col items-center gap-1 py-2 text-[11px] font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-lg",
                  isPublish
                    ? "relative -top-4"
                    : isActive
                      ? "text-plum"
                      : "text-mutedtext"
                )
              }
            >
              {isPublish ? (
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gold p-3.5 text-plum shadow-lg ring-4 ring-cream">
                  <Icon className="h-6 w-6" />
                </span>
              ) : (
                <Icon className="h-5 w-5" />
              )}
              <span className={isPublish ? "text-plum" : ""}>{label}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}

export default function AppShell() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);
  return (
    <div className="min-h-screen">
      <DesktopSidebar />
      <div className="lg:mr-64">
        <DesktopHeader />
        <MobileHeader />
        <main className="mx-auto w-full max-w-6xl px-4 pb-28 pt-5 md:px-6 lg:px-8 lg:pb-12 lg:pt-6">
          <Outlet />
        </main>
      </div>
      <MobileBottomNav />
    </div>
  );
}
