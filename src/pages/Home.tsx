import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { Shirt, Building2, Layers, Scissors, GraduationCap, Cog, Headset, Truck, Wallet, Award, ShieldCheck, type LucideIcon } from "lucide-react";
import { designers, designs, FEATURES } from "@/data/mockData";
import { SectionHeader, GridSkeletons, InitialsAvatar } from "@/components/common";
import { ProductCard, DesignerCard } from "@/components/cards";
import { Skeleton } from "@/components/ui/skeleton";

const CATEGORIES: { label: string; icon: LucideIcon; to: string }[] = [
  { label: "التصاميم", icon: Shirt, to: "/designs" },
  { label: "شركات الملابس", icon: Building2, to: "/companies" },
  { label: "الأقمشة", icon: Layers, to: "/fabrics" },
  { label: "مستلزمات الخياطة", icon: Scissors, to: "/supplies" },
  { label: "دورات خياطة", icon: GraduationCap, to: "/courses" },
  { label: "معدات الخياطة", icon: Cog, to: "/supplies?cat=ماكينات خياطة" },
];

const FEATURE_ICONS: Record<string, LucideIcon> = { headset: Headset, truck: Truck, wallet: Wallet, award: Award, shield: ShieldCheck };

export default function HomePage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="space-y-10">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl card-shadow-lg">
        <img src={`${import.meta.env.BASE_URL}images/hero.jpg`} alt="مشغل خياطة فاخر" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-l from-plum/90 via-plum/60 to-plum/20" />
        <div className="relative z-10 flex min-h-[340px] flex-col justify-center gap-5 p-6 md:min-h-[420px] md:p-12">
          <h1 className="max-w-xl text-2xl font-black leading-snug text-cream text-balance md:text-4xl">
            كل ما يحتاجه الخياط في منصة واحدة
          </h1>
          <div className="flex flex-wrap gap-2">
            {["تصاميم", "شركات", "أقمشة", "مستلزمات", "دورات"].map((t) => (
              <span key={t} className="rounded-full border border-gold/40 bg-plum/40 px-3.5 py-1.5 text-sm font-bold text-gold backdrop-blur-sm">
                {t}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              to="/designs"
              className="rounded-full bg-gold px-7 py-3 text-sm font-black text-plum transition hover:bg-gold-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream"
            >
              استكشف الآن
            </Link>
            <Link
              to="/publish"
              className="rounded-full border-2 border-cream/70 px-7 py-3 text-sm font-black text-cream transition hover:bg-cream/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              نشر تصميم
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section aria-label="التصنيفات">
        <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar md:grid md:grid-cols-6 md:gap-5">
          {CATEGORIES.map(({ label, icon: Icon, to }) => (
            <Link
              key={label}
              to={to}
              className="group flex w-24 shrink-0 flex-col items-center gap-2.5 md:w-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-2xl"
            >
              <div className="flex h-20 w-20 items-center justify-center rounded-full border border-sand bg-white card-shadow transition group-hover:border-gold group-hover:bg-gold-mist md:h-24 md:w-24">
                <Icon className="h-8 w-8 text-plum transition group-hover:text-gold-dark" strokeWidth={1.5} />
              </div>
              <span className="text-center text-xs font-bold text-ink md:text-sm">{label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Features strip */}
      <section className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5" aria-label="مميزات المنصة">
        {FEATURES.map((f) => {
          const Icon = FEATURE_ICONS[f.icon];
          return (
            <div key={f.title} className="flex items-center gap-3 rounded-2xl border border-sand bg-white p-4 card-shadow">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-plum-mist">
                <Icon className="h-5 w-5 text-plum" />
              </div>
              <div>
                <div className="text-xs font-black text-ink md:text-sm">{f.title}</div>
                <div className="mt-0.5 hidden text-[11px] text-mutedtext sm:block">{f.desc}</div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Featured designers */}
      <section>
        <SectionHeader title="مصممون مميزون" action="عرض الكل" onAction={() => navigate("/designers")} />
        {loading ? (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center rounded-2xl border border-sand bg-white p-5 card-shadow">
                <Skeleton className="h-14 w-14 rounded-full" />
                <Skeleton className="mt-3 h-4 w-24" />
                <Skeleton className="mt-2 h-3 w-32" />
                <Skeleton className="mt-4 h-9 w-full" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5 xl:grid-cols-4">
            {designers.slice(0, 4).map((d) => <DesignerCard key={d.id} designer={d} />)}
          </div>
        )}
      </section>

      {/* Latest designs */}
      <section>
        <SectionHeader title="أحدث التصاميم" action="عرض الكل" onAction={() => navigate("/designs")} />
        {loading ? (
          <GridSkeletons count={4} />
        ) : (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5 xl:grid-cols-4">
            {designs.slice(0, 8).map((d) => <ProductCard key={d.id} design={d} />)}
          </div>
        )}
      </section>

      {/* CTA banner */}
      <section className="flex flex-col items-center gap-4 rounded-3xl bg-plum p-8 text-center md:flex-row md:justify-between md:text-right">
        <div className="flex items-center gap-4">
          <InitialsAvatar name="خياط" size="lg" className="hidden md:flex" />
          <div>
            <h3 className="text-xl font-black text-cream">هل أنت خياط أو مصمم أزياء؟</h3>
            <p className="mt-1 text-sm text-cream/70">انضم لآلاف الحرفيين واعرض أعمالك لعملاء من كل المحافظات</p>
          </div>
        </div>
        <Link
          to="/auth"
          className="shrink-0 rounded-full bg-gold px-7 py-3 text-sm font-black text-plum transition hover:bg-gold-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream"
        >
          أنشئ حسابك مجانًا
        </Link>
      </section>
    </div>
  );
}
