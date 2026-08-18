import { useEffect, useState } from "react";
import { designers } from "@/data/mockData";
import { PageHeader } from "@/components/common";
import { DesignerCard } from "@/components/cards";
import { Skeleton } from "@/components/ui/skeleton";

export default function DesignersPage() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, []);
  return (
    <div>
      <PageHeader title="المصممون والخياطون" subtitle="نخبة من المصممين والحرفيين المميزين" />
      {loading ? (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5 xl:grid-cols-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-2xl border border-sand bg-white p-5 card-shadow">
              <Skeleton className="mx-auto h-14 w-14 rounded-full" />
              <Skeleton className="mx-auto mt-3 h-4 w-24" />
              <Skeleton className="mx-auto mt-2 h-3 w-32" />
              <Skeleton className="mt-4 h-9 w-full" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5 xl:grid-cols-4">
          {designers.map((d) => <DesignerCard key={d.id} designer={d} />)}
        </div>
      )}
    </div>
  );
}
