import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import { Search, SlidersHorizontal, ArrowUpDown, LayoutGrid, List, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { designs, DESIGN_CATEGORIES, CITIES, SIZES } from "@/data/mockData";
import { PageHeader, GridSkeletons, EmptyState } from "@/components/common";
import { ProductCard } from "@/components/cards";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type SortKey = "newest" | "price-asc" | "price-desc" | "rating";

const SORTS: { key: SortKey; label: string }[] = [
  { key: "newest", label: "الأحدث" },
  { key: "price-asc", label: "السعر: من الأقل" },
  { key: "price-desc", label: "السعر: من الأعلى" },
  { key: "rating", label: "الأعلى تقييمًا" },
];

interface Filters {
  category: string;
  price: string;
  rating: number;
  size: string;
  color: string;
  city: string;
}

const DEFAULT_FILTERS: Filters = { category: "الكل", price: "الكل", rating: 0, size: "الكل", color: "الكل", city: "الكل" };

const PRICE_RANGES = [
  { label: "الكل", min: 0, max: Infinity },
  { label: "أقل من ١٠٠٠", min: 0, max: 1000 },
  { label: "١٠٠٠ - ٣٠٠٠", min: 1000, max: 3000 },
  { label: "أكثر من ٣٠٠٠", min: 3000, max: Infinity },
];

const COLORS = [
  { name: "عنابي", hex: "#5B2333" }, { name: "أسود", hex: "#1C1A1C" }, { name: "كحلي", hex: "#1F2A44" },
  { name: "كريمي", hex: "#F1E7D7" }, { name: "أبيض", hex: "#FFFFFF" }, { name: "بودري", hex: "#D9A7A0" }, { name: "ذهبي", hex: "#D7B45A" }, { name: "زيتي", hex: "#4A5540" },
];

function FilterPanel({ filters, onChange, onReset }: { filters: Filters; onChange: (f: Filters) => void; onReset: () => void }) {
  return (
    <div className="space-y-6">
      <div>
        <h4 className="mb-2.5 text-sm font-black text-ink">التصنيف</h4>
        <div className="flex flex-wrap gap-2">
          {["الكل", ...DESIGN_CATEGORIES].map((c) => (
            <button key={c} onClick={() => onChange({ ...filters, category: c })}
              className={cn("rounded-full border px-3.5 py-1.5 text-xs font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold",
                filters.category === c ? "border-plum bg-plum text-gold" : "border-sand bg-white text-ink hover:border-plum/40")}>
              {c}
            </button>
          ))}
        </div>
      </div>
      <div>
        <h4 className="mb-2.5 text-sm font-black text-ink">السعر</h4>
        <div className="flex flex-wrap gap-2">
          {PRICE_RANGES.map((p) => (
            <button key={p.label} onClick={() => onChange({ ...filters, price: p.label })}
              className={cn("rounded-full border px-3.5 py-1.5 text-xs font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold",
                filters.price === p.label ? "border-plum bg-plum text-gold" : "border-sand bg-white text-ink hover:border-plum/40")}>
              {p.label}
            </button>
          ))}
        </div>
      </div>
      <div>
        <h4 className="mb-2.5 text-sm font-black text-ink">التقييم</h4>
        <div className="flex flex-wrap gap-2">
          {[0, 4, 4.5, 4.8].map((r) => (
            <button key={r} onClick={() => onChange({ ...filters, rating: r })}
              className={cn("rounded-full border px-3.5 py-1.5 text-xs font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold",
                filters.rating === r ? "border-plum bg-plum text-gold" : "border-sand bg-white text-ink hover:border-plum/40")}>
              {r === 0 ? "الكل" : `${r}+`}
            </button>
          ))}
        </div>
      </div>
      <div>
        <h4 className="mb-2.5 text-sm font-black text-ink">المقاس</h4>
        <div className="flex flex-wrap gap-2">
          {["الكل", ...SIZES].map((s) => (
            <button key={s} onClick={() => onChange({ ...filters, size: s })}
              className={cn("min-w-10 rounded-full border px-3 py-1.5 text-xs font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold",
                filters.size === s ? "border-plum bg-plum text-gold" : "border-sand bg-white text-ink hover:border-plum/40")}>
              {s}
            </button>
          ))}
        </div>
      </div>
      <div>
        <h4 className="mb-2.5 text-sm font-black text-ink">اللون</h4>
        <div className="flex flex-wrap gap-2.5">
          <button onClick={() => onChange({ ...filters, color: "الكل" })}
            className={cn("rounded-full border px-3.5 py-1.5 text-xs font-bold transition", filters.color === "الكل" ? "border-plum bg-plum text-gold" : "border-sand bg-white text-ink")}>
            الكل
          </button>
          {COLORS.map((c) => (
            <button key={c.hex} title={c.name} onClick={() => onChange({ ...filters, color: c.hex })}
              aria-label={c.name} aria-pressed={filters.color === c.hex}
              className={cn("h-8 w-8 rounded-full border-2 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold",
                filters.color === c.hex ? "border-plum scale-110 ring-2 ring-gold" : "border-black/10")}
              style={{ backgroundColor: c.hex }} />
          ))}
        </div>
      </div>
      <div>
        <h4 className="mb-2.5 text-sm font-black text-ink">المدينة</h4>
        <div className="flex flex-wrap gap-2">
          {["الكل", ...CITIES].map((c) => (
            <button key={c} onClick={() => onChange({ ...filters, city: c })}
              className={cn("rounded-full border px-3.5 py-1.5 text-xs font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold",
                filters.city === c ? "border-plum bg-plum text-gold" : "border-sand bg-white text-ink hover:border-plum/40")}>
              {c}
            </button>
          ))}
        </div>
      </div>
      <Button variant="outline" onClick={onReset} className="w-full border-plum text-plum hover:bg-plum-mist">
        <X className="ml-1 h-4 w-4" /> إعادة تعيين الفلاتر
      </Button>
    </div>
  );
}

export default function DesignsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get("q") ?? "";
  const [input, setInput] = useState(q);
  const [sort, setSort] = useState<SortKey>("newest");
  const [layout, setLayout] = useState<"grid" | "list">("grid");
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => setInput(q), [q]);

  const results = useMemo(() => {
    let list = [...designs];
    if (q.trim()) {
      const t = q.trim();
      list = list.filter((d) => d.title.includes(t) || d.category.includes(t) || d.tags.some((x) => x.includes(t)) || d.city.includes(t));
    }
    if (filters.category !== "الكل") list = list.filter((d) => d.category === filters.category);
    const pr = PRICE_RANGES.find((p) => p.label === filters.price)!;
    list = list.filter((d) => (d.discountPrice ?? d.price) >= pr.min && (d.discountPrice ?? d.price) < pr.max);
    if (filters.rating > 0) list = list.filter((d) => d.rating >= filters.rating);
    if (filters.size !== "الكل") list = list.filter((d) => d.sizes.includes(filters.size));
    if (filters.color !== "الكل") list = list.filter((d) => d.colors.includes(filters.color));
    if (filters.city !== "الكل") list = list.filter((d) => d.city === filters.city);
    switch (sort) {
      case "price-asc": list.sort((a, b) => (a.discountPrice ?? a.price) - (b.discountPrice ?? b.price)); break;
      case "price-desc": list.sort((a, b) => (b.discountPrice ?? b.price) - (a.discountPrice ?? a.price)); break;
      case "rating": list.sort((a, b) => b.rating - a.rating); break;
    }
    return list;
  }, [q, filters, sort]);

  const activeCount = [filters.category !== "الكل", filters.price !== "الكل", filters.rating > 0, filters.size !== "الكل", filters.color !== "الكل", filters.city !== "الكل"].filter(Boolean).length;

  return (
    <div>
      <PageHeader title="التصاميم" subtitle={`${results.length} تصميمًا متاحًا`}>
        {/* layout toggle */}
        <div className="flex rounded-full border border-sand bg-white p-1">
          <button onClick={() => setLayout("grid")} aria-label="عرض شبكي" aria-pressed={layout === "grid"}
            className={cn("rounded-full p-2 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold", layout === "grid" ? "bg-plum text-gold" : "text-mutedtext")}>
            <LayoutGrid className="h-4 w-4" />
          </button>
          <button onClick={() => setLayout("list")} aria-label="عرض قائمة" aria-pressed={layout === "list"}
            className={cn("rounded-full p-2 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold", layout === "list" ? "bg-plum text-gold" : "text-mutedtext")}>
            <List className="h-4 w-4" />
          </button>
        </div>
        {/* sort */}
        <Select value={sort} onValueChange={(v) => setSort(v as SortKey)}>
          <SelectTrigger className="w-40 rounded-full border-sand bg-white" aria-label="ترتيب">
            <ArrowUpDown className="ml-1 h-4 w-4 text-mutedtext" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {SORTS.map((s) => <SelectItem key={s.key} value={s.key}>{s.label}</SelectItem>)}
          </SelectContent>
        </Select>
        {/* mobile filter */}
        <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="rounded-full border-sand bg-white lg:hidden">
              <SlidersHorizontal className="ml-1 h-4 w-4" />
              الفلاتر
              {activeCount > 0 && <span className="mr-1 flex h-5 w-5 items-center justify-center rounded-full bg-gold text-[10px] font-black text-plum">{activeCount}</span>}
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="max-h-[85vh] overflow-y-auto rounded-t-3xl">
            <SheetHeader><SheetTitle className="text-right">تصفية النتائج</SheetTitle></SheetHeader>
            <div className="mt-4 pb-6">
              <FilterPanel filters={filters} onChange={setFilters} onReset={() => setFilters(DEFAULT_FILTERS)} />
              <Button className="mt-5 w-full bg-plum text-cream hover:bg-plum-light" onClick={() => setDrawerOpen(false)}>
                عرض {results.length} نتيجة
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </PageHeader>

      {/* search within page */}
      <form
        className="relative mb-5 max-w-lg"
        onSubmit={(e) => { e.preventDefault(); setSearchParams(input.trim() ? { q: input.trim() } : {}); }}
      >
        <Search className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-mutedtext" />
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="search"
          placeholder="ابحث في التصاميم…"
          aria-label="بحث في التصاميم"
          className="h-11 w-full rounded-full border border-sand bg-white pr-10 pl-4 text-sm focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30"
        />
      </form>

      <div className="flex gap-6">
        {/* desktop filters */}
        <aside className="hidden w-64 shrink-0 lg:block">
          <div className="sticky top-24 rounded-2xl border border-sand bg-white p-5 card-shadow">
            <h3 className="mb-4 flex items-center gap-2 font-black text-ink">
              <SlidersHorizontal className="h-4 w-4" /> الفلاتر
            </h3>
            <FilterPanel filters={filters} onChange={setFilters} onReset={() => setFilters(DEFAULT_FILTERS)} />
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          {loading ? (
            <GridSkeletons count={8} />
          ) : results.length === 0 ? (
            <EmptyState
              type="search"
              title="لا توجد نتائج مطابقة"
              desc="جرّب تعديل كلمات البحث أو إزالة بعض الفلاتر للحصول على نتائج أكثر"
              actionLabel="إزالة كل الفلاتر"
              onAction={() => { setFilters(DEFAULT_FILTERS); setSearchParams({}); setInput(""); }}
            />
          ) : layout === "grid" ? (
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
              {results.map((d) => <ProductCard key={d.id} design={d} />)}
            </div>
          ) : (
            <div className="space-y-3">
              {results.map((d) => <ProductCard key={d.id} design={d} layout="list" />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
