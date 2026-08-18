import { Star, WifiOff, SearchX, Heart, ShoppingBag, MessageCircle, Bell, Package, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

/* ---------- Rating ---------- */
export function Rating({ value, count, size = "sm", className }: { value: number; count?: number; size?: "sm" | "md"; className?: string }) {
  const s = size === "md" ? "h-4 w-4" : "h-3.5 w-3.5";
  return (
    <div className={cn("flex items-center gap-1", className)} dir="ltr">
      <Star className={cn(s, "fill-gold text-gold")} />
      <span className={cn("font-bold text-ink", size === "md" ? "text-sm" : "text-xs")}>{value.toFixed(1)}</span>
      {count !== undefined && <span className="text-xs text-mutedtext">({count})</span>}
    </div>
  );
}

/* ---------- Initials avatar ---------- */
const AVATAR_TINTS = ["#24152F", "#34203F", "#5B2333", "#4A5540", "#1F2A44", "#7A5A2E"];
export function InitialsAvatar({ name, size = "md", className }: { name: string; size?: "sm" | "md" | "lg" | "xl"; className?: string }) {
  const initial = name.trim().charAt(0);
  const tint = AVATAR_TINTS[(name.length + name.charCodeAt(0)) % AVATAR_TINTS.length];
  const cls = { sm: "h-9 w-9 text-sm", md: "h-11 w-11 text-base", lg: "h-14 w-14 text-lg", xl: "h-24 w-24 text-3xl" }[size];
  return (
    <div className={cn("flex shrink-0 items-center justify-center rounded-full font-bold text-gold", cls, className)} style={{ backgroundColor: tint }} aria-hidden>
      {initial}
    </div>
  );
}

/* ---------- Section header ---------- */
export function SectionHeader({ title, action, onAction }: { title: string; action?: string; onAction?: () => void }) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <h2 className="text-lg font-extrabold text-ink md:text-xl">{title}</h2>
      {action && (
        <button onClick={onAction} className="text-sm font-bold text-gold-dark transition hover:text-plum focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-md px-1">
          {action}
        </button>
      )}
    </div>
  );
}

/* ---------- Page header ---------- */
export function PageHeader({ title, subtitle, children }: { title: string; subtitle?: string; children?: React.ReactNode }) {
  return (
    <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 className="text-2xl font-black text-ink md:text-3xl">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-mutedtext">{subtitle}</p>}
      </div>
      {children && <div className="flex items-center gap-2">{children}</div>}
    </div>
  );
}

/* ---------- Empty state ---------- */
const EMPTY_ICONS: Record<string, LucideIcon> = {
  search: SearchX, favorites: Heart, cart: ShoppingBag, messages: MessageCircle,
  notifications: Bell, orders: Package, offline: WifiOff,
};
export function EmptyState({ type = "search", title, desc, actionLabel, onAction }: {
  type?: "search" | "favorites" | "cart" | "messages" | "notifications" | "orders" | "offline";
  title: string; desc?: string; actionLabel?: string; onAction?: () => void;
}) {
  const Icon = EMPTY_ICONS[type];
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-sand bg-white/60 px-6 py-14 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-plum-mist">
        <Icon className="h-7 w-7 text-plum" />
      </div>
      <h3 className="text-lg font-bold text-ink">{title}</h3>
      {desc && <p className="mt-1 max-w-sm text-sm text-mutedtext">{desc}</p>}
      {actionLabel && (
        <Button onClick={onAction} className="mt-5 bg-plum text-cream hover:bg-plum-light">{actionLabel}</Button>
      )}
    </div>
  );
}

/* ---------- Status badge ---------- */
export function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    "قيد المعالجة": "bg-gold-mist text-gold-dark",
    "قيد التوصيل": "bg-blue-50 text-blue-700",
    "مكتملة": "bg-green-50 text-green-700",
    "ملغاة": "bg-red-50 text-red-600",
    "متوفر": "bg-green-50 text-green-700",
    "غير متوفر": "bg-red-50 text-red-600",
    "مبتدئ": "bg-green-50 text-green-700",
    "متوسط": "bg-gold-mist text-gold-dark",
    "متقدم": "bg-plum-mist text-plum",
  };
  return (
    <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold", styles[status] ?? "bg-muted text-muted-foreground")}>
      {status}
    </span>
  );
}

/* ---------- Discount badge ---------- */
export function DiscountBadge({ price, discount }: { price: number; discount: number }) {
  const pct = Math.round(((price - discount) / price) * 100);
  return (
    <span className="absolute right-2 top-2 z-10 rounded-full bg-plum px-2.5 py-1 text-xs font-black text-gold shadow-sm">
      خصم {pct}٪
    </span>
  );
}

/* ---------- Skeletons ---------- */
export function CardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-sand bg-white card-shadow">
      <Skeleton className="aspect-[4/3] w-full rounded-none" />
      <div className="space-y-2 p-4">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="h-5 w-1/3" />
      </div>
    </div>
  );
}

export function GridSkeletons({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => <CardSkeleton key={i} />)}
    </div>
  );
}

/* ---------- Quantity selector ---------- */
export function QtySelector({ qty, onChange, small }: { qty: number; onChange: (q: number) => void; small?: boolean }) {
  const btn = cn(
    "flex items-center justify-center rounded-full bg-plum-mist text-plum transition hover:bg-plum hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold",
    small ? "h-7 w-7 text-sm" : "h-9 w-9 text-lg"
  );
  return (
    <div className="flex items-center gap-2" dir="ltr">
      <button className={btn} onClick={() => onChange(qty + 1)} aria-label="زيادة الكمية">+</button>
      <span className={cn("min-w-6 text-center font-bold", small ? "text-sm" : "text-base")}>{qty}</span>
      <button className={btn} onClick={() => onChange(qty - 1)} aria-label="تقليل الكمية">−</button>
    </div>
  );
}

/* ---------- Fabric swatch (CSS generated visual) ---------- */
export function FabricSwatch({ color, className }: { color: string; className?: string }) {
  return (
    <div className={cn("fabric-sheen relative overflow-hidden", className)} style={{ backgroundColor: color }} role="img" aria-label="صورة القماش">
      <div className="absolute inset-0 bg-gradient-to-tl from-black/10 via-transparent to-white/20" />
    </div>
  );
}
