import { useEffect, useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { companies, CITIES } from "@/data/mockData";
import { PageHeader, EmptyState } from "@/components/common";
import { CompanyCard } from "@/components/cards";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const SPECIALTIES = ["الكل", "مفروشات وستائر فاخرة", "تصنيع ملابس بالجملة", "ملابس نسائية كاجوال", "عبايات وملابس محتشمة", "خدمات تطريز", "أقمشة"];
const CLOTHING_TYPES = ["الكل", "منزلية", "رجالية ونسائية", "نسائية", "عبايات", "أقمشة"];

function FilterControls({ city, setCity, spec, setSpec, type, setType, rating, setRating, onReset }: {
  city: string; setCity: (v: string) => void; spec: string; setSpec: (v: string) => void;
  type: string; setType: (v: string) => void; rating: number; setRating: (v: number) => void; onReset: () => void;
}) {
  const group = (label: string, items: string[], value: string, setter: (v: string) => void) => (
    <div>
      <h4 className="mb-2.5 text-sm font-black text-ink">{label}</h4>
      <div className="flex flex-wrap gap-2">
        {items.map((c) => (
          <button key={c} onClick={() => setter(c)}
            className={cn("rounded-full border px-3.5 py-1.5 text-xs font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold",
              value === c ? "border-plum bg-plum text-gold" : "border-sand bg-white text-ink hover:border-plum/40")}>
            {c}
          </button>
        ))}
      </div>
    </div>
  );
  return (
    <div className="space-y-6">
      {group("المدينة", ["الكل", ...CITIES], city, setCity)}
      {group("التخصص", SPECIALTIES, spec, setSpec)}
      {group("نوع الملابس", CLOTHING_TYPES, type, setType)}
      <div>
        <h4 className="mb-2.5 text-sm font-black text-ink">التقييم</h4>
        <div className="flex flex-wrap gap-2">
          {[0, 4, 4.5].map((r) => (
            <button key={r} onClick={() => setRating(r)}
              className={cn("rounded-full border px-3.5 py-1.5 text-xs font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold",
                rating === r ? "border-plum bg-plum text-gold" : "border-sand bg-white text-ink hover:border-plum/40")}>
              {r === 0 ? "الكل" : `${r}+`}
            </button>
          ))}
        </div>
      </div>
      <Button variant="outline" onClick={onReset} className="w-full border-plum text-plum hover:bg-plum-mist">
        <X className="ml-1 h-4 w-4" /> إعادة تعيين
      </Button>
    </div>
  );
}

export default function CompaniesPage() {
  const [q, setQ] = useState("");
  const [city, setCity] = useState("الكل");
  const [spec, setSpec] = useState("الكل");
  const [type, setType] = useState("الكل");
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, []);

  const results = useMemo(() => {
    let list = [...companies];
    if (q.trim()) list = list.filter((c) => c.name.includes(q.trim()) || c.specialty.includes(q.trim()));
    if (city !== "الكل") list = list.filter((c) => c.city === city);
    if (spec !== "الكل") list = list.filter((c) => c.specialty === spec);
    if (type !== "الكل") list = list.filter((c) => c.clothingType === type);
    if (rating > 0) list = list.filter((c) => c.rating >= rating);
    return list;
  }, [q, city, spec, type, rating]);

  const reset = () => { setCity("الكل"); setSpec("الكل"); setType("الكل"); setRating(0); setQ(""); };
  const controls = <FilterControls city={city} setCity={setCity} spec={spec} setSpec={setSpec} type={type} setType={setType} rating={rating} setRating={setRating} onReset={reset} />;

  return (
    <div>
      <PageHeader title="شركات الملابس" subtitle="شركات ومصانع ودور أزياء موثوقة — بيانات تجريبية للعرض">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="rounded-full border-sand bg-white lg:hidden">
              <SlidersHorizontal className="ml-1 h-4 w-4" /> الفلاتر
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="max-h-[85vh] overflow-y-auto rounded-t-3xl">
            <SheetHeader><SheetTitle className="text-right">تصفية الشركات</SheetTitle></SheetHeader>
            <div className="mt-4 pb-6">
              {controls}
              <Button className="mt-5 w-full bg-plum text-cream hover:bg-plum-light" onClick={() => setOpen(false)}>
                عرض {results.length} شركة
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </PageHeader>

      <div className="relative mb-5 max-w-lg">
        <Search className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-mutedtext" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          type="search"
          placeholder="ابحث عن شركة ملابس بالاسم…"
          aria-label="بحث عن شركة"
          className="h-11 w-full rounded-full border border-sand bg-white pr-10 pl-4 text-sm focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30"
        />
      </div>

      <div className="flex gap-6">
        <aside className="hidden w-64 shrink-0 lg:block">
          <div className="sticky top-24 rounded-2xl border border-sand bg-white p-5 card-shadow">{controls}</div>
        </aside>
        <div className="min-w-0 flex-1">
          {loading ? (
            <div className="grid gap-4 md:grid-cols-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="rounded-2xl border border-sand bg-white p-5 card-shadow">
                  <div className="flex gap-4"><Skeleton className="h-14 w-14 rounded-2xl" /><div className="flex-1 space-y-2"><Skeleton className="h-4 w-1/2" /><Skeleton className="h-3 w-3/4" /></div></div>
                  <Skeleton className="mt-4 h-3 w-full" /><Skeleton className="mt-2 h-3 w-2/3" />
                </div>
              ))}
            </div>
          ) : results.length === 0 ? (
            <EmptyState type="search" title="لا توجد شركات مطابقة" desc="جرّب تعديل البحث أو الفلاتر" actionLabel="إعادة تعيين" onAction={reset} />
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {results.map((c) => <CompanyCard key={c.id} company={c} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
