import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { ShoppingCart, Zap, MessageCircle, MapPin, Truck, BadgeCheck, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { designs, designers, formatPrice } from "@/data/mockData";
import { useApp } from "@/context/AppContext";
import { Rating, InitialsAvatar, SectionHeader, EmptyState } from "@/components/common";
import { ProductCard, FavoriteButton } from "@/components/cards";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function DesignDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, isFollowing, toggleFollow } = useApp();
  const design = designs.find((d) => d.id === id);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);
  const [galleryIndex, setGalleryIndex] = useState(0);

  const gallery = useMemo(() => (design ? [design.image, "/images/hero.jpg", designs[(designs.indexOf(design) + 1) % designs.length].image] : []), [design]);

  if (!design) {
    return (
      <EmptyState type="search" title="التصميم غير موجود" desc="ربما تم حذف هذا التصميم أو تغيير رابطه"
        actionLabel="تصفح التصاميم" onAction={() => navigate("/designs")} />
    );
  }

  const designer = designers.find((d) => d.id === design.designerId)!;
  const related = designs.filter((d) => d.id !== design.id && d.category === design.category).slice(0, 4);
  const price = design.discountPrice ?? design.price;

  return (
    <div className="space-y-10">
      {/* breadcrumb */}
      <nav className="flex items-center gap-1 text-xs text-mutedtext" aria-label="مسار التنقل">
        <Link to="/" className="hover:text-plum">الرئيسية</Link>
        <ChevronRight className="h-3 w-3" />
        <Link to="/designs" className="hover:text-plum">التصاميم</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="font-bold text-ink">{design.title}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* gallery */}
        <div>
          <div className="relative overflow-hidden rounded-3xl border border-sand bg-white card-shadow">
            <img src={gallery[galleryIndex]} alt={design.title} className="aspect-[4/3] w-full object-cover" />
            <FavoriteButton id={design.id} label={design.title} className="absolute left-3 top-3" />
            {design.discountPrice && (
              <span className="absolute right-3 top-3 rounded-full bg-plum px-3 py-1.5 text-xs font-black text-gold">
                خصم {Math.round(((design.price - design.discountPrice) / design.price) * 100)}٪
              </span>
            )}
          </div>
          <div className="mt-3 flex gap-3">
            {gallery.map((g, i) => (
              <button
                key={i}
                onClick={() => setGalleryIndex(i)}
                aria-label={`صورة ${i + 1}`}
                aria-pressed={galleryIndex === i}
                className={cn(
                  "h-20 w-20 overflow-hidden rounded-xl border-2 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold",
                  galleryIndex === i ? "border-gold" : "border-sand opacity-70 hover:opacity-100"
                )}
              >
                <img src={g} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* info */}
        <div>
          <div className="flex items-center gap-2 text-sm text-mutedtext">
            <span className="rounded-full bg-plum-mist px-3 py-1 text-xs font-bold text-plum">{design.category}</span>
            <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{design.city}</span>
          </div>
          <h1 className="mt-3 text-2xl font-black text-ink md:text-3xl">{design.title}</h1>
          <div className="mt-2 flex items-center gap-3">
            <Rating value={design.rating} count={design.reviewsCount} size="md" />
            <span className="text-sm text-mutedtext">·</span>
            <button className="text-sm font-bold text-gold-dark hover:text-plum" onClick={() => document.getElementById("reviews")?.scrollIntoView({ behavior: "smooth" })}>
              {design.reviewsCount} مراجعة
            </button>
          </div>

          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-3xl font-black text-plum">{formatPrice(price)}</span>
            {design.discountPrice && <span className="text-lg text-mutedtext line-through">{formatPrice(design.price)}</span>}
          </div>

          {/* colors */}
          <div className="mt-6">
            <h3 className="mb-2 text-sm font-black text-ink">الألوان المتاحة</h3>
            <div className="flex gap-2.5">
              {design.colors.map((c, i) => (
                <button key={c} onClick={() => setSelectedColor(i)} aria-label={`اللون ${i + 1}`} aria-pressed={selectedColor === i}
                  className={cn("h-9 w-9 rounded-full border-2 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold",
                    selectedColor === i ? "border-plum ring-2 ring-gold scale-110" : "border-black/10")}
                  style={{ backgroundColor: c }} />
              ))}
            </div>
          </div>

          {/* sizes */}
          <div className="mt-5">
            <h3 className="mb-2 text-sm font-black text-ink">المقاسات</h3>
            <div className="flex flex-wrap gap-2">
              {design.sizes.map((s, i) => (
                <button key={s} onClick={() => setSelectedSize(i)} aria-pressed={selectedSize === i}
                  className={cn("min-w-12 rounded-xl border px-4 py-2 text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold",
                    selectedSize === i ? "border-plum bg-plum text-gold" : "border-sand bg-white text-ink hover:border-plum/40")}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* actions */}
          <div className="mt-7 grid grid-cols-2 gap-3">
            <Button
              className="col-span-2 h-12 bg-gold text-base font-black text-plum hover:bg-gold-light sm:col-span-1"
              onClick={() => { addToCart({ id: design.id, kind: "design", name: design.title, seller: designer.name, price, image: design.image, meta: `مقاس ${design.sizes[selectedSize]}` }); navigate("/checkout"); }}
            >
              <Zap className="ml-2 h-5 w-5" /> اشترِ الآن
            </Button>
            <Button
              variant="outline" className="col-span-2 h-12 border-plum text-base font-black text-plum hover:bg-plum-mist sm:col-span-1"
              onClick={() => addToCart({ id: design.id, kind: "design", name: design.title, seller: designer.name, price, image: design.image, meta: `مقاس ${design.sizes[selectedSize]}` })}
            >
              <ShoppingCart className="ml-2 h-5 w-5" /> أضف للسلة
            </Button>
            <Button variant="outline" className="h-11 border-sand text-ink hover:bg-plum-mist" onClick={() => navigate("/messages")}>
              <MessageCircle className="ml-2 h-4 w-4" /> تواصل مع المصمم
            </Button>
            <Button
              variant="outline" className="h-11 border-sand text-ink hover:bg-plum-mist"
              onClick={() => navigate("/messages")}
            >
              <MessageCircle className="ml-2 h-4 w-4" /> استشارة مجانية
            </Button>
          </div>

          {/* delivery */}
          <div className="mt-6 flex items-center gap-3 rounded-2xl border border-sand bg-white p-4 card-shadow">
            <Truck className="h-6 w-6 shrink-0 text-plum" />
            <div>
              <div className="text-sm font-bold text-ink">معلومات التوصيل</div>
              <div className="text-xs text-mutedtext">مدة التنفيذ والتوصيل: {design.deliveryDays} · توصيل لجميع المحافظات</div>
            </div>
          </div>
        </div>
      </div>

      {/* description & materials */}
      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-sand bg-white p-6 card-shadow">
          <h2 className="mb-3 text-lg font-black text-ink">وصف التصميم</h2>
          <p className="leading-relaxed text-mutedtext">{design.description}</p>
          <Separator className="my-4" />
          <h3 className="mb-2 text-sm font-black text-ink">الخامات</h3>
          <ul className="flex flex-wrap gap-2">
            {design.materials.map((m) => (
              <li key={m} className="rounded-full bg-plum-mist px-3.5 py-1.5 text-xs font-bold text-plum">{m}</li>
            ))}
          </ul>
          <h3 className="mb-2 mt-4 text-sm font-black text-ink">الوسوم</h3>
          <div className="flex flex-wrap gap-2">
            {design.tags.map((t) => (
              <span key={t} className="rounded-full border border-sand px-3 py-1 text-xs text-mutedtext">#{t}</span>
            ))}
          </div>
        </section>

        {/* designer info */}
        <section className="rounded-2xl border border-sand bg-white p-6 card-shadow">
          <h2 className="mb-4 text-lg font-black text-ink">عن المصمم</h2>
          <div className="flex items-center gap-4">
            <InitialsAvatar name={designer.name} size="lg" />
            <div className="flex-1">
              <Link to={`/designer/${designer.id}`} className="flex items-center gap-1.5 font-bold text-ink hover:text-plum">
                {designer.name}
                {designer.verified && <BadgeCheck className="h-4 w-4 fill-gold text-plum" />}
              </Link>
              <p className="text-sm text-mutedtext">{designer.specialty}</p>
              <Rating value={designer.rating} count={designer.reviewsCount} className="mt-1" />
            </div>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-mutedtext">{designer.bio}</p>
          <div className="mt-5 flex gap-2">
            <Button asChild variant="outline" className="flex-1 border-plum text-plum hover:bg-plum-mist">
              <Link to={`/designer/${designer.id}`}>عرض الملف الشخصي</Link>
            </Button>
            <Button onClick={() => toggleFollow(designer.id, designer.name)} className={cn("flex-1", isFollowing(designer.id) ? "bg-plum-mist text-plum hover:bg-sand" : "bg-plum text-cream hover:bg-plum-light")}>
              {isFollowing(designer.id) ? "تمت المتابعة" : "متابعة"}
            </Button>
          </div>
        </section>
      </div>

      {/* reviews snippet */}
      <section id="reviews" className="rounded-2xl border border-sand bg-white p-6 card-shadow">
        <h2 className="mb-4 text-lg font-black text-ink">آراء العملاء</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {[
            { name: "نور الهدى", text: "جودة الخامة ممتازة والتطريز أجمل من الصور، التوصيل كان في الموعد تمامًا.", rating: 5 },
            { name: "محمد سامي", text: "تعامل راقٍ وتفاصيل متقنة، المقاس احتاج تعديلًا بسيطًا وتم مجانًا.", rating: 4.5 },
          ].map((r) => (
            <div key={r.name} className="rounded-xl bg-cream p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <InitialsAvatar name={r.name} size="sm" />
                  <span className="text-sm font-bold text-ink">{r.name}</span>
                </div>
                <Rating value={r.rating} />
              </div>
              <p className="mt-2.5 text-sm leading-relaxed text-mutedtext">{r.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* related */}
      {related.length > 0 && (
        <section>
          <SectionHeader title="تصاميم مشابهة" action="عرض الكل" onAction={() => navigate("/designs")} />
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5 xl:grid-cols-4">
            {related.map((d) => <ProductCard key={d.id} design={d} />)}
          </div>
        </section>
      )}
    </div>
  );
}
