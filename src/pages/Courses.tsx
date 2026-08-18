import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { courses } from "@/data/mockData";
import { PageHeader, EmptyState, GridSkeletons } from "@/components/common";
import { CourseCard } from "@/components/cards";

const LEVELS = ["الكل", "مبتدئ", "متوسط", "متقدم"];

export default function CoursesPage() {
  const [level, setLevel] = useState("الكل");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, []);

  const results = useMemo(() => (level === "الكل" ? courses : courses.filter((c) => c.level === level)), [level]);

  return (
    <div>
      <PageHeader title="دورات خياطة" subtitle="تعلم الخياطة والتفصيل والتصميم من خبراء المجال" />

      <div className="mb-6 flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {LEVELS.map((l) => (
          <button key={l} onClick={() => setLevel(l)}
            className={cn("shrink-0 rounded-full border px-5 py-2 text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold",
              level === l ? "border-plum bg-plum text-gold" : "border-sand bg-white text-ink hover:border-plum/40")}>
            {l}
          </button>
        ))}
      </div>

      {loading ? <GridSkeletons count={6} /> : results.length === 0 ? (
        <EmptyState type="search" title="لا توجد دورات بهذا المستوى" actionLabel="عرض الكل" onAction={() => setLevel("الكل")} />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 xl:grid-cols-3">
          {results.map((c) => <CourseCard key={c.id} course={c} />)}
        </div>
      )}
    </div>
  );
}
