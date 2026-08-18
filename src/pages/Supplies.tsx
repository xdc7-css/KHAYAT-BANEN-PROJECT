import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { supplies } from "@/data/mockData";
import { PageHeader, EmptyState, GridSkeletons } from "@/components/common";
import { SupplyCard } from "@/components/cards";

const CATS = ["الكل", "ماكينات خياطة", "خيوط", "إبر", "مقصات", "أزرار", "سحابات", "أدوات قياس", "إكسسوارات الخياطة"];

export default function SuppliesPage() {
  const [searchParams] = useSearchParams();
  const initialCat = searchParams.get("cat") ?? "الكل";
  const [cat, setCat] = useState(CATS.includes(initialCat) ? initialCat : "الكل");
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, []);

  const results = useMemo(() => {
    let list = [...supplies];
    if (cat !== "الكل") list = list.filter((s) => s.category === cat);
    if (q.trim()) list = list.filter((s) => s.name.includes(q.trim()) || s.seller.includes(q.trim()));
    return list;
  }, [cat, q]);

  return (
    <div>
      <PageHeader title="مستلزمات الخياطة" subtitle="ماكينات وأدوات وإكسسوارات لكل ما يحتاجه مشغلك" />

      <div className="mb-5 flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {CATS.map((c) => (
          <button key={c} onClick={() => setCat(c)}
            className={cn("shrink-0 rounded-full border px-4 py-2 text-xs font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold",
              cat === c ? "border-plum bg-plum text-gold" : "border-sand bg-white text-ink hover:border-plum/40")}>
            {c}
          </button>
        ))}
      </div>

      <div className="relative mb-6 max-w-lg">
        <Search className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-mutedtext" />
        <input value={q} onChange={(e) => setQ(e.target.value)} type="search" placeholder="ابحث عن ماكينة، خيوط، أدوات…" aria-label="بحث في المستلزمات"
          className="h-11 w-full rounded-full border border-sand bg-white pr-10 pl-4 text-sm focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30" />
      </div>

      {loading ? <GridSkeletons count={8} /> : results.length === 0 ? (
        <EmptyState type="search" title="لا توجد منتجات مطابقة" desc="جرّب البحث بكلمات أخرى" actionLabel="عرض الكل" onAction={() => { setQ(""); setCat("الكل"); }} />
      ) : (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5 xl:grid-cols-4">
          {results.map((s) => <SupplyCard key={s.id} supply={s} />)}
        </div>
      )}
    </div>
  );
}
