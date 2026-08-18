import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router";
import { ChevronLeft, Package } from "lucide-react";
import { cn } from "@/lib/utils";
import { useApp } from "@/context/AppContext";
import { formatPrice } from "@/data/mockData";
import { PageHeader, EmptyState, StatusBadge } from "@/components/common";
import type { OrderStatus } from "@/types";

const TABS = ["الكل", "قيد المعالجة", "قيد التوصيل", "مكتملة", "ملغاة"];

export default function OrdersPage() {
  const { orders } = useApp();
  const navigate = useNavigate();
  const [tab, setTab] = useState("الكل");

  const filtered = useMemo(() => (tab === "الكل" ? orders : orders.filter((o) => o.status === tab)), [orders, tab]);

  return (
    <div>
      <PageHeader title="الطلبات" subtitle="تابع حالة طلباتك الحالية والسابقة" />

      <div className="mb-6 flex gap-2 overflow-x-auto pb-1 no-scrollbar" role="tablist" aria-label="حالة الطلبات">
        {TABS.map((t) => (
          <button key={t} role="tab" aria-selected={tab === t} onClick={() => setTab(t)}
            className={cn("shrink-0 rounded-full border px-4 py-2 text-xs font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold",
              tab === t ? "border-plum bg-plum text-gold" : "border-sand bg-white text-ink hover:border-plum/40")}>
            {t}
            <span className="mr-1.5 opacity-70">({t === "الكل" ? orders.length : orders.filter((o) => o.status === t).length})</span>
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState type="orders" title={tab === "الكل" ? "لا توجد طلبات بعد" : `لا توجد طلبات ${tab}`}
          desc="عند إتمام أول طلب ستجده هنا مع تتبع كامل لحالته"
          actionLabel="تسوق الآن" onAction={() => navigate("/designs")} />
      ) : (
        <div className="space-y-3">
          {filtered.map((o) => (
            <Link key={o.id} to={`/order/${o.id}`}
              className="block rounded-2xl border border-sand bg-white p-5 card-shadow transition hover:card-shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-plum-mist">
                    <Package className="h-5 w-5 text-plum" />
                  </div>
                  <div>
                    <div className="font-black text-ink" dir="ltr">{o.number}</div>
                    <div className="text-xs text-mutedtext">{o.date}</div>
                  </div>
                </div>
                <StatusBadge status={o.status as OrderStatus} />
              </div>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-sand pt-4">
                <p className="line-clamp-1 flex-1 text-sm text-mutedtext">
                  {o.items.map((i) => `${i.name} (×${i.qty})`).join("، ")}
                </p>
                <div className="flex items-center gap-4">
                  <span className="font-black text-plum">{formatPrice(o.total)}</span>
                  <span className="flex items-center gap-1 text-sm font-bold text-gold-dark">
                    عرض التفاصيل <ChevronLeft className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
