import { Link } from "react-router";
import { Heart, MapPin, ShoppingCart, BadgeCheck, Clock, BookOpen, Scissors, Ruler, Pin, Gem, Archive, CircleDot, Cog, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useApp } from "@/context/AppContext";
import { formatPrice, formatNum, designers } from "@/data/mockData";
import type { Design, Designer, Company, Fabric, Supply, Course } from "@/types";
import { Rating, InitialsAvatar, DiscountBadge, StatusBadge, FabricSwatch } from "@/components/common";
import { Button } from "@/components/ui/button";

/* ---------- Favorite toggle ---------- */
export function FavoriteButton({ id, label, className }: { id: string; label?: string; className?: string }) {
  const { isFavorite, toggleFavorite } = useApp();
  const active = isFavorite(id);
  return (
    <button
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleFavorite(id, label); }}
      aria-label={active ? "إزالة من المفضلة" : "إضافة للمفضلة"}
      aria-pressed={active}
      className={cn(
        "flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur transition hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold",
        className
      )}
    >
      <Heart className={cn("h-4 w-4 transition", active ? "fill-plum text-plum" : "text-mutedtext")} />
    </button>
  );
}

/* ---------- Design / product card ---------- */
export function ProductCard({ design, layout = "grid" }: { design: Design; layout?: "grid" | "list" }) {
  const designer = designers.find((d) => d.id === design.designerId);
  if (layout === "list") {
    return (
      <Link to={`/design/${design.id}`} className="group flex gap-4 overflow-hidden rounded-2xl border border-sand bg-white p-3 card-shadow transition hover:card-shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold">
        <div className="relative w-32 shrink-0 overflow-hidden rounded-xl sm:w-44">
          <img src={design.image} alt={design.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
          {design.discountPrice && <DiscountBadge price={design.price} discount={design.discountPrice} />}
        </div>
        <div className="flex min-w-0 flex-1 flex-col justify-between py-1">
          <div>
            <div className="flex items-start justify-between gap-2">
              <h3 className="line-clamp-1 font-bold text-ink group-hover:text-plum">{design.title}</h3>
              <FavoriteButton id={design.id} label={design.title} className="static h-8 w-8 bg-plum-mist" />
            </div>
            <p className="mt-0.5 text-sm text-mutedtext">{designer?.name} · {design.city}</p>
            <Rating value={design.rating} count={design.reviewsCount} className="mt-1" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-lg font-black text-plum">{formatPrice(design.discountPrice ?? design.price)}</span>
            {design.discountPrice && <span className="text-sm text-mutedtext line-through">{formatPrice(design.price)}</span>}
          </div>
        </div>
      </Link>
    );
  }
  return (
    <Link to={`/design/${design.id}`} className="group overflow-hidden rounded-2xl border border-sand bg-white card-shadow transition hover:-translate-y-0.5 hover:card-shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold">
      <div className="relative aspect-[4/3] overflow-hidden bg-sand">
        <img src={design.image} alt={design.title} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        {design.discountPrice && <DiscountBadge price={design.price} discount={design.discountPrice} />}
        {design.isNew && !design.discountPrice && (
          <span className="absolute right-2 top-2 z-10 rounded-full bg-gold px-2.5 py-1 text-xs font-black text-plum shadow-sm">جديد</span>
        )}
        <FavoriteButton id={design.id} label={design.title} className="absolute left-2 top-2" />
      </div>
      <div className="p-3.5">
        <h3 className="line-clamp-1 text-sm font-bold text-ink group-hover:text-plum md:text-base">{design.title}</h3>
        <p className="mt-0.5 line-clamp-1 text-xs text-mutedtext">{designer?.name}</p>
        <div className="mt-1.5 flex items-center justify-between">
          <Rating value={design.rating} count={design.reviewsCount} />
          <div className="flex items-baseline gap-1.5">
            <span className="text-sm font-black text-plum md:text-base">{formatPrice(design.discountPrice ?? design.price)}</span>
            {design.discountPrice && <span className="text-xs text-mutedtext line-through">{formatPrice(design.price)}</span>}
          </div>
        </div>
      </div>
    </Link>
  );
}

/* ---------- Designer card ---------- */
export function DesignerCard({ designer }: { designer: Designer }) {
  const { isFollowing, toggleFollow } = useApp();
  const following = isFollowing(designer.id);
  return (
    <div className="flex flex-col items-center rounded-2xl border border-sand bg-white p-5 text-center card-shadow transition hover:card-shadow-lg">
      <Link to={`/designer/${designer.id}`} className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold">
        <InitialsAvatar name={designer.name} size="lg" />
      </Link>
      <Link to={`/designer/${designer.id}`} className="mt-3 flex items-center gap-1 font-bold text-ink hover:text-plum focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-md">
        {designer.name}
        {designer.verified && <BadgeCheck className="h-4 w-4 fill-gold text-plum" />}
      </Link>
      <p className="mt-0.5 text-xs text-mutedtext">{designer.specialty}</p>
      <Rating value={designer.rating} className="mt-2" />
      <p className="mt-1 text-xs text-mutedtext">{designer.reviewsCount} تقييم · {formatNum(designer.followers)} متابع</p>
      <Button
        onClick={() => toggleFollow(designer.id, designer.name)}
        variant={following ? "outline" : "default"}
        className={cn("mt-4 w-full", !following && "bg-plum text-cream hover:bg-plum-light", following && "border-plum text-plum hover:bg-plum-mist")}
      >
        {following ? "تمت المتابعة" : "متابعة"}
      </Button>
    </div>
  );
}

/* ---------- Company card ---------- */
export function CompanyCard({ company }: { company: Company }) {
  const { isFollowing, toggleFollow } = useApp();
  return (
    <div className="rounded-2xl border border-sand bg-white p-5 card-shadow transition hover:card-shadow-lg">
      <div className="flex items-start gap-4">
        <Link to={`/company/${company.id}`} className="rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-plum text-xl font-black text-gold">
            {company.name.charAt(0)}
          </div>
        </Link>
        <div className="min-w-0 flex-1">
          <Link to={`/company/${company.id}`} className="line-clamp-1 font-bold text-ink hover:text-plum focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-md">
            {company.name}
          </Link>
          <p className="mt-0.5 flex items-center gap-1 text-xs text-mutedtext">
            <MapPin className="h-3.5 w-3.5" /> {company.city} · {company.specialty}
          </p>
          <Rating value={company.rating} count={company.reviewsCount} className="mt-1.5" />
        </div>
      </div>
      <p className="mt-3 line-clamp-2 text-sm text-mutedtext">{company.description}</p>
      <div className="mt-4 flex items-center justify-between border-t border-sand pt-3">
        <span className="text-xs font-bold text-mutedtext">{company.productsCount} منتج</span>
        <div className="flex gap-2">
          <Button asChild size="sm" variant="outline" className="border-plum text-plum hover:bg-plum-mist">
            <Link to={`/company/${company.id}`}>عرض</Link>
          </Button>
          <Button size="sm" onClick={() => toggleFollow(company.id, company.name)} className={cn(isFollowing(company.id) ? "bg-plum-mist text-plum hover:bg-sand" : "bg-plum text-cream hover:bg-plum-light")}>
            {isFollowing(company.id) ? "تمت المتابعة" : "متابعة"}
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ---------- Fabric card ---------- */
export function FabricCard({ fabric }: { fabric: Fabric }) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-sand bg-white card-shadow transition hover:card-shadow-lg">
      <div className="relative aspect-[4/3]">
        <FabricSwatch color={fabric.swatch} className="h-full w-full transition duration-500 group-hover:scale-105" />
        <FavoriteButton id={fabric.id} label={fabric.name} className="absolute left-2 top-2" />
        <span className="absolute bottom-2 right-2 rounded-full bg-white/90 px-2.5 py-1 text-xs font-bold text-plum backdrop-blur">
          {fabric.type}
        </span>
      </div>
      <div className="p-3.5">
        <h3 className="line-clamp-1 text-sm font-bold text-ink md:text-base">{fabric.name}</h3>
        <p className="mt-0.5 line-clamp-1 text-xs text-mutedtext">{fabric.seller} · {fabric.city}</p>
        <div className="mt-2 flex items-center gap-1.5">
          {fabric.colors.map((c) => (
            <span key={c.hex + c.name} title={c.name} className="h-4 w-4 rounded-full border border-black/10" style={{ backgroundColor: c.hex }} />
          ))}
        </div>
        <div className="mt-2 flex items-center justify-between">
          <Rating value={fabric.rating} count={fabric.reviewsCount} />
          <div className="text-left">
            <span className="text-sm font-black text-plum">{formatPrice(fabric.pricePerMeter)}</span>
            <span className="text-xs text-mutedtext"> / متر</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Supply card ---------- */
const SUPPLY_ICONS: Record<string, LucideIcon> = {
  scissors: Scissors, ruler: Ruler, pin: Pin, gem: Gem, archive: Archive, "circle-dot": CircleDot, cog: Cog, spool: Archive,
};
export function SupplyCard({ supply }: { supply: Supply }) {
  const { addToCart } = useApp();
  const Icon = SUPPLY_ICONS[supply.icon] ?? Archive;
  return (
    <div className="group overflow-hidden rounded-2xl border border-sand bg-white card-shadow transition hover:card-shadow-lg">
      <div className="relative flex aspect-[4/3] items-center justify-center" style={{ backgroundColor: supply.tint }}>
        <Icon className="h-16 w-16 text-plum/60 transition duration-300 group-hover:scale-110" strokeWidth={1.2} />
        {supply.discountPrice && <DiscountBadge price={supply.price} discount={supply.discountPrice} />}
        <div className="absolute right-2 bottom-2">
          <StatusBadge status={supply.inStock ? "متوفر" : "غير متوفر"} />
        </div>
      </div>
      <div className="p-3.5">
        <h3 className="line-clamp-1 text-sm font-bold text-ink md:text-base">{supply.name}</h3>
        <p className="mt-0.5 line-clamp-1 text-xs text-mutedtext">{supply.seller}</p>
        <div className="mt-1.5 flex items-center justify-between">
          <Rating value={supply.rating} count={supply.reviewsCount} />
          <div className="flex items-baseline gap-1.5">
            <span className="text-sm font-black text-plum">{formatPrice(supply.discountPrice ?? supply.price)}</span>
            {supply.discountPrice && <span className="text-xs text-mutedtext line-through">{formatPrice(supply.price)}</span>}
          </div>
        </div>
        <Button
          disabled={!supply.inStock}
          onClick={() => addToCart({ id: supply.id, kind: "supply", name: supply.name, seller: supply.seller, price: supply.discountPrice ?? supply.price, swatch: supply.tint, meta: supply.category })}
          className="mt-3 w-full bg-plum text-cream hover:bg-plum-light disabled:opacity-50"
          size="sm"
        >
          <ShoppingCart className="ml-1 h-4 w-4" />
          {supply.inStock ? "أضف للسلة" : "نفدت الكمية"}
        </Button>
      </div>
    </div>
  );
}

/* ---------- Course card ---------- */
export function CourseCard({ course }: { course: Course }) {
  return (
    <Link to={`/course/${course.id}`} className="group overflow-hidden rounded-2xl border border-sand bg-white card-shadow transition hover:-translate-y-0.5 hover:card-shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold">
      <div className="relative aspect-[4/3] overflow-hidden bg-sand">
        <img src={course.image} alt={course.title} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        {course.discountPrice && <DiscountBadge price={course.price} discount={course.discountPrice} />}
        <div className="absolute bottom-2 right-2"><StatusBadge status={course.level} /></div>
      </div>
      <div className="p-3.5">
        <h3 className="line-clamp-1 text-sm font-bold text-ink group-hover:text-plum md:text-base">{course.title}</h3>
        <p className="mt-0.5 line-clamp-1 text-xs text-mutedtext">{course.instructor}</p>
        <div className="mt-2 flex items-center gap-3 text-xs text-mutedtext">
          <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{course.duration}</span>
          <span className="flex items-center gap-1"><BookOpen className="h-3.5 w-3.5" />{course.lessonsCount} درسًا</span>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <Rating value={course.rating} count={course.reviewsCount} />
          <div className="flex items-baseline gap-1.5">
            <span className="text-sm font-black text-plum">{formatPrice(course.discountPrice ?? course.price)}</span>
            {course.discountPrice && <span className="text-xs text-mutedtext line-through">{formatPrice(course.price)}</span>}
          </div>
        </div>
      </div>
    </Link>
  );
}
