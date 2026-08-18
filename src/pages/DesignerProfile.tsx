import { useNavigate, useParams } from "react-router";
import { MapPin, BadgeCheck, Users, Shirt } from "lucide-react";
import { cn } from "@/lib/utils";
import { designers, designs, formatNum } from "@/data/mockData";
import { useApp } from "@/context/AppContext";
import { Rating, InitialsAvatar, SectionHeader, EmptyState } from "@/components/common";
import { ProductCard } from "@/components/cards";
import { Button } from "@/components/ui/button";

export default function DesignerProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isFollowing, toggleFollow } = useApp();
  const designer = designers.find((d) => d.id === id);

  if (!designer) {
    return <EmptyState type="search" title="المصمم غير موجود" actionLabel="عرض المصممين" onAction={() => navigate("/designers")} />;
  }

  const works = designs.filter((d) => d.designerId === designer.id);
  const following = isFollowing(designer.id);

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-3xl border border-sand bg-white card-shadow">
        <div className="h-28 bg-gradient-to-l from-plum via-plum-light to-plum md:h-36" />
        <div className="px-5 pb-6 md:px-8">
          <div className="-mt-10 flex flex-wrap items-end justify-between gap-4 md:-mt-12">
            <div className="flex items-end gap-4">
              <InitialsAvatar name={designer.name} size="xl" className="border-4 border-white card-shadow" />
              <div className="pb-1">
                <h1 className="flex items-center gap-2 text-xl font-black text-ink md:text-2xl">
                  {designer.name}
                  {designer.verified && <BadgeCheck className="h-5 w-5 fill-gold text-plum" />}
                </h1>
                <p className="mt-0.5 text-sm text-mutedtext">{designer.specialty}</p>
                <p className="mt-0.5 flex items-center gap-1 text-xs text-mutedtext"><MapPin className="h-3.5 w-3.5" />{designer.city}</p>
              </div>
            </div>
            <div className="flex gap-2 pb-1">
              <Button variant="outline" className="border-plum text-plum hover:bg-plum-mist" onClick={() => navigate("/messages")}>تواصل</Button>
              <Button onClick={() => toggleFollow(designer.id, designer.name)} className={cn(following ? "bg-plum-mist text-plum hover:bg-sand" : "bg-plum text-cream hover:bg-plum-light")}>
                {following ? "تمت المتابعة" : "متابعة"}
              </Button>
            </div>
          </div>
          <p className="mt-5 max-w-2xl leading-relaxed text-mutedtext">{designer.bio}</p>
          <div className="mt-5 grid grid-cols-3 gap-3 sm:max-w-md">
            <div className="rounded-2xl bg-cream p-3 text-center">
              <div className="flex justify-center"><Rating value={designer.rating} size="md" /></div>
              <div className="mt-1 text-xs text-mutedtext">{designer.reviewsCount} تقييم</div>
            </div>
            <div className="rounded-2xl bg-cream p-3 text-center">
              <div className="flex items-center justify-center gap-1 text-lg font-black text-plum"><Users className="h-4 w-4" />{formatNum(designer.followers)}</div>
              <div className="mt-1 text-xs text-mutedtext">متابع</div>
            </div>
            <div className="rounded-2xl bg-cream p-3 text-center">
              <div className="flex items-center justify-center gap-1 text-lg font-black text-plum"><Shirt className="h-4 w-4" />{works.length}</div>
              <div className="mt-1 text-xs text-mutedtext">تصميم</div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <SectionHeader title={`أعمال ${designer.name}`} />
        {works.length === 0 ? (
          <EmptyState type="search" title="لا توجد تصاميم منشورة بعد" />
        ) : (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5 xl:grid-cols-4">
            {works.map((d) => <ProductCard key={d.id} design={d} />)}
          </div>
        )}
      </section>
    </div>
  );
}
