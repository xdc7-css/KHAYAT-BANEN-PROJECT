import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { MapPin, Phone, MessageCircle, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { companies, designs, formatNum } from "@/data/mockData";
import { useApp } from "@/context/AppContext";
import { Rating, EmptyState, InitialsAvatar } from "@/components/common";
import { ProductCard } from "@/components/cards";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const REVIEWS = [
  { name: "هالة محمد", rating: 5, text: "تعامل احترافي وجودة ممتازة، التسليم كان قبل الموعد المتفق عليه.", date: "قبل أسبوع" },
  { name: "عمرو فتحي", rating: 4, text: "أسعار جيدة للجملة والخامات ممتازة، أتعامل معهم باستمرار.", date: "قبل شهر" },
  { name: "ريم سامح", rating: 4.5, text: "التطريز اليدوي راقٍ جدًا، أنصح بالتعامل معهم للمناسبات.", date: "قبل شهرين" },
];

export default function CompanyDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isFollowing, toggleFollow } = useApp();
  const company = companies.find((c) => c.id === id);
  const [tab, setTab] = useState("products");

  if (!company) {
    return <EmptyState type="search" title="الشركة غير موجودة" actionLabel="عرض الشركات" onAction={() => navigate("/companies")} />;
  }

  const companyDesigns = designs.slice(0, 4);
  const products = designs.slice(4, 8);

  return (
    <div className="space-y-6">
      {/* header card */}
      <section className="overflow-hidden rounded-3xl border border-sand bg-white card-shadow">
        <div className="h-28 bg-gradient-to-l from-plum via-plum-light to-plum md:h-36" />
        <div className="relative px-5 pb-5 md:px-8 md:pb-6">
          <div className="-mt-10 flex flex-wrap items-end justify-between gap-4 md:-mt-12">
            <div className="flex items-end gap-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-3xl border-4 border-white bg-plum text-3xl font-black text-gold card-shadow md:h-24 md:w-24">
                {company.name.charAt(0)}
              </div>
              <div className="pb-1">
                <h1 className="text-xl font-black text-ink md:text-2xl">{company.name}</h1>
                <p className="mt-0.5 flex items-center gap-1 text-sm text-mutedtext">
                  <MapPin className="h-4 w-4" /> {company.city} · تأسست {company.founded}
                </p>
              </div>
            </div>
            <div className="flex gap-2 pb-1">
              <Button variant="outline" className="border-plum text-plum hover:bg-plum-mist" onClick={() => navigate("/messages")}>
                <MessageCircle className="ml-1.5 h-4 w-4" /> تواصل
              </Button>
              <Button onClick={() => toggleFollow(company.id, company.name)} className={cn(isFollowing(company.id) ? "bg-plum-mist text-plum hover:bg-sand" : "bg-plum text-cream hover:bg-plum-light")}>
                {isFollowing(company.id) ? "تمت المتابعة" : "متابعة"}
              </Button>
            </div>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { label: "التقييم", value: <Rating value={company.rating} count={company.reviewsCount} size="md" /> },
              { label: "المنتجات", value: <span className="text-lg font-black text-plum">{company.productsCount}</span> },
              { label: "المتابعون", value: <span className="text-lg font-black text-plum">{formatNum(company.followers)}</span> },
              { label: "التخصص", value: <span className="text-sm font-bold text-plum">{company.specialty}</span> },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl bg-cream p-3.5 text-center">
                <div className="text-xs text-mutedtext">{s.label}</div>
                <div className="mt-1 flex justify-center">{s.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* tabs */}
      <Tabs value={tab} onValueChange={setTab} dir="rtl">
        <TabsList className="w-full justify-start overflow-x-auto rounded-full border border-sand bg-white p-1 no-scrollbar">
          <TabsTrigger value="products" className="rounded-full data-[state=active]:bg-plum data-[state=active]:text-gold">المنتجات</TabsTrigger>
          <TabsTrigger value="designs" className="rounded-full data-[state=active]:bg-plum data-[state=active]:text-gold">التصاميم</TabsTrigger>
          <TabsTrigger value="about" className="rounded-full data-[state=active]:bg-plum data-[state=active]:text-gold">من نحن</TabsTrigger>
          <TabsTrigger value="reviews" className="rounded-full data-[state=active]:bg-plum data-[state=active]:text-gold">التقييمات</TabsTrigger>
        </TabsList>

        <TabsContent value="products" className="mt-5">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5 xl:grid-cols-4">
            {products.map((d) => <ProductCard key={d.id} design={d} />)}
          </div>
          <Button variant="outline" className="mt-5 w-full border-plum text-plum hover:bg-plum-mist">عرض المنتجات ({company.productsCount})</Button>
        </TabsContent>

        <TabsContent value="designs" className="mt-5">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5 xl:grid-cols-4">
            {companyDesigns.map((d) => <ProductCard key={d.id} design={d} />)}
          </div>
        </TabsContent>

        <TabsContent value="about" className="mt-5">
          <div className="grid gap-5 lg:grid-cols-2">
            <div className="rounded-2xl border border-sand bg-white p-6 card-shadow">
              <h3 className="mb-3 font-black text-ink">نبذة عن الشركة</h3>
              <p className="leading-relaxed text-mutedtext">{company.description}</p>
              <p className="mt-3 leading-relaxed text-mutedtext">
                نعمل في {company.specialty} منذ {company.founded}، ونخدم عملاءنا في جميع المحافظات بجودة ثابتة والتزام كامل بالمواعيد.
              </p>
            </div>
            <div className="rounded-2xl border border-sand bg-white p-6 card-shadow">
              <h3 className="mb-4 font-black text-ink">معلومات التواصل</h3>
              <ul className="space-y-3.5 text-sm">
                <li className="flex items-center gap-3"><Phone className="h-5 w-5 text-plum" /><span dir="ltr" className="font-bold text-ink">{company.phone}</span></li>
                <li className="flex items-center gap-3"><MapPin className="h-5 w-5 text-plum" /><span className="text-mutedtext">{company.address}</span></li>
                <li className="flex items-center gap-3"><Calendar className="h-5 w-5 text-plum" /><span className="text-mutedtext">مواعيد العمل: السبت - الخميس، ٩ ص - ٩ م</span></li>
              </ul>
              <Button className="mt-5 w-full bg-plum text-cream hover:bg-plum-light" onClick={() => navigate("/messages")}>
                <MessageCircle className="ml-2 h-4 w-4" /> إرسال رسالة
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="reviews" className="mt-5">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {REVIEWS.map((r) => (
              <div key={r.name} className="rounded-2xl border border-sand bg-white p-5 card-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <InitialsAvatar name={r.name} size="sm" />
                    <div>
                      <div className="text-sm font-bold text-ink">{r.name}</div>
                      <div className="text-xs text-mutedtext">{r.date}</div>
                    </div>
                  </div>
                  <Rating value={r.rating} />
                </div>
                <p className="mt-3 text-sm leading-relaxed text-mutedtext">{r.text}</p>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <p className="text-center text-xs text-mutedtext">
        <Link to="/companies" className="hover:text-plum">← العودة إلى قائمة الشركات</Link>
      </p>
    </div>
  );
}
