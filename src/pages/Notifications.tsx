import { useState } from "react";
import { useNavigate } from "react-router";
import { Package, MessageCircle, Shirt, Tag, Settings2, CheckCheck, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useApp } from "@/context/AppContext";
import { PageHeader, EmptyState } from "@/components/common";
import { Button } from "@/components/ui/button";

const CATS: { key: string; icon: LucideIcon }[] = [
  { key: "طلبات", icon: Package },
  { key: "رسائل", icon: MessageCircle },
  { key: "تصاميم", icon: Shirt },
  { key: "عروض", icon: Tag },
  { key: "النظام", icon: Settings2 },
];

export default function NotificationsPage() {
  const { notifications, markAllRead, markRead } = useApp();
  const navigate = useNavigate();
  const [cat, setCat] = useState("الكل");

  const filtered = cat === "الكل" ? notifications : notifications.filter((n) => n.category === cat);
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader title="الإشعارات" subtitle={unreadCount > 0 ? `${unreadCount} إشعارات غير مقروءة` : "كل الإشعارات مقروءة"}>
        {unreadCount > 0 && (
          <Button variant="outline" onClick={markAllRead} className="rounded-full border-plum text-plum hover:bg-plum-mist">
            <CheckCheck className="ml-1.5 h-4 w-4" /> تعليم الكل كمقروء
          </Button>
        )}
      </PageHeader>

      <div className="mb-5 flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {["الكل", ...CATS.map((c) => c.key)].map((c) => (
          <button key={c} onClick={() => setCat(c)}
            className={cn("shrink-0 rounded-full border px-4 py-2 text-xs font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold",
              cat === c ? "border-plum bg-plum text-gold" : "border-sand bg-white text-ink hover:border-plum/40")}>
            {c}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState type="notifications" title="لا توجد إشعارات" desc="ستصلك إشعارات الطلبات والرسائل والعروض هنا"
          actionLabel="تصفح التصاميم" onAction={() => navigate("/designs")} />
      ) : (
        <ul className="space-y-2.5">
          {filtered.map((n) => {
            const Icon = CATS.find((c) => c.key === n.category)?.icon ?? Settings2;
            return (
              <li key={n.id}>
                <button
                  onClick={() => markRead(n.id)}
                  className={cn(
                    "flex w-full items-start gap-3.5 rounded-2xl border p-4 text-right transition card-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold",
                    n.read ? "border-sand bg-white" : "border-gold/50 bg-gold-mist/40"
                  )}
                >
                  <div className={cn("flex h-11 w-11 shrink-0 items-center justify-center rounded-xl", n.read ? "bg-plum-mist text-plum" : "bg-plum text-gold")}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className={cn("text-sm", n.read ? "font-bold text-ink" : "font-black text-ink")}>{n.title}</span>
                      <span className="shrink-0 text-[11px] text-mutedtext">{n.time}</span>
                    </div>
                    <p className="mt-0.5 line-clamp-2 text-xs leading-relaxed text-mutedtext">{n.body}</p>
                    <span className="mt-1.5 inline-block rounded-full bg-plum-mist px-2 py-0.5 text-[10px] font-bold text-plum">{n.category}</span>
                  </div>
                  {!n.read && <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-gold" aria-label="غير مقروء" />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
