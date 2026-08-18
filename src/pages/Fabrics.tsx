import { useEffect, useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { fabrics, CITIES } from "@/data/mockData";
import { PageHeader, EmptyState, GridSkeletons } from "@/components/common";
import { FabricCard } from "@/components/cards";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const TYPES = ["الكل", "قطن", "حرير", "ساتان", "كتان", "شيفون", "مخمل", "جورجيت", "أقمشة مطرزة"];
const PRICE_RANGES = [
  { label: "الكل", min: 0, max: Infinity },
  { label: "أقل من ٢٥٠", min: 0, max: 250 },
  { label: "٢٥٠ - ٥٠٠", min: 250, max: 500 },
  { label: "أكثر من ٥٠٠", min: 500, max: Infinity },
];
const COLORS = ["#5B2333", "#D7B45A", "#1F2A44", "#F1E7D7", "#D9A7A0", "#1C1A1C", "#4A5540", "#FFFFFF", "#C9C9CF"];

export default function FabricsPage() {
  const [q, setQ] = useState("");
  const [type, setType] = useState("الكل");
  const [price, setPrice] = useState("الكل");
  const [color, setColor] = useState("الكل");
  const [city, setCity] = useState("الكل");
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, []);

  const results = useMemo(() => {
    let list = [...fabrics];
    if (q.trim()) list = list.filter((f) => f.name.includes(q.trim()) || f.type.includes(q.trim()) || f.seller.includes(q.trim()));
    if (type !== "الكل") list = list.filter((f) => f.type === type);
    const pr = PRICE_RANGES.find((p) => p.label === price)!;
    list = list.filter((f) => f.pricePerMeter >= pr.min && f.pricePerMeter < pr.max);
    if (color !== "الكل") list = list.filter((f) => f.colors.some((c) => c.hex === color));
    if (city !== "الكل") list = list.filter((f) => f.city === city);
    return list;
  }, [q, type, price, color, city]);

  const reset = () => { setType("الكل"); setPrice("الكل"); setColor("الكل"); setCity("الكل"); setQ(""); };

  const controls = (
    <div className="space-y-6">
      <div>
        <h4 className="mb-2.5 text-sm font-black text-ink">النوع</h4>
        <div className="flex flex-wrap gap-2">
          {TYPES.map((t) => (
            <button key={t} onClick={() => setType(t)}
              className={cn("rounded-full border px-3.5 py-1.5 text-xs font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold",
                type === t ? "border-plum bg-plum text-gold" : "border-sand bg-white text-ink hover:border-plum/40")}>
              {t}
            </button>
          ))}
        </div>
      </div>
      <div>
        <h4 className="mb-2.5 text-sm font-black text-ink">السعر (للمتر)</h4>
        <div className="flex flex-wrap gap-2">
          {PRICE_RANGES.map((p) => (
            <button key={p.label} onClick={() => setPrice(p.label)}
              className={cn("rounded-full border px-3.5 py-1.5 text-xs font-bold transition",
                price === p.label ? "border-plum bg-plum text-gold" : "border-sand bg-white text-ink hover:border-plum/40")}>
              {p.label}
            </button>
          ))}
        </div>
      </div>
      <div>
        <h4 className="mb-2.5 text-sm font-black text-ink">اللون</h4>
        <div className="flex flex-wrap gap-2.5">
          <button onClick={() => setColor("الكل")}
            className={cn("rounded-full border px-3.5 py-1.5 text-xs font-bold transition", color === "الكل" ? "border-plum bg-plum text-gold" : "border-sand bg-white text-ink")}>
            الكل
          </button>
          {COLORS.map((c) => (
            <button key={c} onClick={() => setColor(c)} aria-label={`لون ${c}`} aria-pressed={color === c}
              className={cn("h-8 w-8 rounded-full border-2 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold",
                color === c ? "border-plum ring-2 ring-gold scale-110" : "border-black/10")}
              style={{ backgroundColor: c }} />
          ))}
        </div>
      </div>
      <div>
        <h4 className="mb-2.5 text-sm font-black text-ink">المدينة</h4>
        <div className="flex flex-wrap gap-2">
          {["الكل", ...CITIES, "المحلة الكبرى"].map((c) => (
            <button key={c} onClick={() => setCity(c)}
              className={cn("rounded-full border px-3.5 py-1.5 text-xs font-bold transition",
                city === c ? "border-plum bg-plum text-gold" : "border-sand bg-white text-ink hover:border-plum/40")}>
              {c}
            </button>
          ))}
        </div>
      </div>
      <Button variant="outline" onClick={reset} className="w-full border-plum text-plum hover:bg-plum-mist">
        <X className="ml-1 h-4 w-4" /> إعادة تعيين
      </Button>
    </div>
  );

  return (
    <div>
      <PageHeader title="الأقمشة" subtitle="أجود الأقمشة من موردين موثوقين — الأسعار بالمتر">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="rounded-full border-sand bg-white lg:hidden">
              <SlidersHorizontal className="ml-1 h-4 w-4" /> الفلاتر
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="max-h-[85vh] overflow-y-auto rounded-t-3xl">
            <SheetHeader><SheetTitle className="text-right">تصفية الأقمشة</SheetTitle></SheetHeader>
            <div className="mt-4 pb-6">
              {controls}
              <Button className="mt-5 w-full bg-plum text-cream hover:bg-plum-light" onClick={() => setOpen(false)}>
                عرض {results.length} قماشًا
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </PageHeader>

      {/* quick category chips */}
      <div className="mb-5 flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {TYPES.map((t) => (
          <button key={t} onClick={() => setType(t)}
            className={cn("shrink-0 rounded-full border px-4 py-2 text-xs font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold",
              type === t ? "border-plum bg-plum text-gold" : "border-sand bg-white text-ink hover:border-plum/40")}>
            {t}
          </button>
        ))}
      </div>

      <div className="relative mb-5 max-w-lg">
        <Search className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-mutedtext" />
        <input value={q} onChange={(e) => setQ(e.target.value)} type="search" placeholder="ابحث عن قماش…" aria-label="بحث في الأقمشة"
          className="h-11 w-full rounded-full border border-sand bg-white pr-10 pl-4 text-sm focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30" />
      </div>

      <div className="flex gap-6">
        <aside className="hidden w-64 shrink-0 lg:block">
          <div className="sticky top-24 rounded-2xl border border-sand bg-white p-5 card-shadow">{controls}</div>
        </aside>
        <div className="min-w-0 flex-1">
          {loading ? <GridSkeletons count={8} /> : results.length === 0 ? (
            <EmptyState type="search" title="لا توجد أقمشة مطابقة" desc="جرّب تعديل البحث أو الفلاتر" actionLabel="إعادة تعيين" onAction={reset} />
          ) : (
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
              {results.map((f) => <FabricCard key={f.id} fabric={f} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
