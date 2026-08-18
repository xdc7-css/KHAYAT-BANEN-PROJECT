import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { Clock, BookOpen, PlayCircle, Lock, CheckCircle2, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { courses, formatPrice } from "@/data/mockData";
import { Rating, StatusBadge, EmptyState, InitialsAvatar } from "@/components/common";
import { CourseCard } from "@/components/cards";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function CourseDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const course = courses.find((c) => c.id === id);
  const [enrolled, setEnrolled] = useState(false);

  if (!course) {
    return <EmptyState type="search" title="الدورة غير موجودة" actionLabel="عرض الدورات" onAction={() => navigate("/courses")} />;
  }

  const related = courses.filter((c) => c.id !== course.id).slice(0, 3);

  return (
    <div className="space-y-10">
      <div className="grid gap-8 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <div className="overflow-hidden rounded-3xl border border-sand card-shadow">
            <img src={course.image} alt={course.title} className="aspect-video w-full object-cover" />
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <StatusBadge status={course.level} />
            <span className="flex items-center gap-1 rounded-full bg-plum-mist px-3 py-1 text-xs font-bold text-plum"><Clock className="h-3.5 w-3.5" />{course.duration}</span>
            <span className="flex items-center gap-1 rounded-full bg-plum-mist px-3 py-1 text-xs font-bold text-plum"><BookOpen className="h-3.5 w-3.5" />{course.lessonsCount} درسًا</span>
          </div>
          <h1 className="mt-3 text-2xl font-black text-ink md:text-3xl">{course.title}</h1>
          <div className="mt-2"><Rating value={course.rating} count={course.reviewsCount} size="md" /></div>
          <p className="mt-4 leading-relaxed text-mutedtext">{course.overview}</p>

          {/* instructor */}
          <div className="mt-6 flex items-center gap-4 rounded-2xl border border-sand bg-white p-4 card-shadow">
            <InitialsAvatar name={course.instructor} size="md" />
            <div>
              <div className="text-xs text-mutedtext">المدرب</div>
              <div className="font-bold text-ink">{course.instructor}</div>
            </div>
          </div>

          {/* curriculum */}
          <section className="mt-8">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-black text-ink">
              <GraduationCap className="h-5 w-5 text-plum" /> محتوى الدورة
            </h2>
            <Accordion type="multiple" defaultValue={["s0"]} className="space-y-3">
              {course.curriculum.map((sec, si) => (
                <AccordionItem key={si} value={`s${si}`} className="overflow-hidden rounded-2xl border border-sand bg-white card-shadow">
                  <AccordionTrigger className="px-5 py-4 font-bold text-ink hover:no-underline [&[data-state=open]>svg]:rotate-180">
                    <span className="flex items-center gap-2">
                      {sec.section}
                      <span className="rounded-full bg-plum-mist px-2 py-0.5 text-xs font-bold text-plum">{sec.lessons.length} دروس</span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-5 pb-3">
                    <ul className="divide-y divide-sand">
                      {sec.lessons.map((l, li) => (
                        <li key={li} className="flex items-center justify-between gap-3 py-3">
                          <span className="flex items-center gap-2.5 text-sm">
                            {l.free ? <PlayCircle className="h-4 w-4 text-gold-dark" /> : <Lock className="h-4 w-4 text-mutedtext" />}
                            <span className={cn(enrolled || l.free ? "text-ink" : "text-mutedtext")}>{l.title}</span>
                            {l.free && <span className="rounded-full bg-gold-mist px-2 py-0.5 text-[10px] font-black text-gold-dark">مجاني</span>}
                          </span>
                          <span className="text-xs text-mutedtext" dir="ltr">{l.duration}</span>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>
        </div>

        {/* purchase card */}
        <aside className="lg:col-span-2">
          <div className="sticky top-24 rounded-3xl border border-sand bg-white p-6 card-shadow-lg">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-black text-plum">{formatPrice(course.discountPrice ?? course.price)}</span>
              {course.discountPrice && <span className="text-lg text-mutedtext line-through">{formatPrice(course.price)}</span>}
            </div>
            {course.discountPrice && (
              <p className="mt-1 text-xs font-bold text-gold-dark">
                وفّر {formatPrice(course.price - course.discountPrice)} — عرض لفترة محدودة
              </p>
            )}
            {enrolled ? (
              <div className="mt-5 flex items-center gap-2 rounded-2xl bg-green-50 p-4 text-sm font-bold text-green-700">
                <CheckCircle2 className="h-5 w-5" /> أنت مشترك في هذه الدورة
              </div>
            ) : (
              <Button
                className="mt-5 h-12 w-full bg-gold text-base font-black text-plum hover:bg-gold-light"
                onClick={() => { setEnrolled(true); toast.success("تم الاشتراك في الدورة بنجاح", { description: course.title }); }}
              >
                اشترك بالدورة
              </Button>
            )}
            <ul className="mt-5 space-y-3 text-sm text-mutedtext">
              {["وصول مدى الحياة لجميع الدروس", "شهادة إتمام معتمدة", "متابعة مباشرة مع المدرب", "ملفات وباترونات قابلة للتحميل"].map((f) => (
                <li key={f} className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-plum" /> {f}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      {/* reviews */}
      <section className="rounded-2xl border border-sand bg-white p-6 card-shadow">
        <h2 className="mb-4 text-lg font-black text-ink">آراء المتدربين</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {[
            { name: "أسماء رمضان", text: "الدورة عملية جدًا وشرح المدربة واضح، أنجزت أول قطعة لي في الأسبوع الثاني.", rating: 5 },
            { name: "إبراهيم سيد", text: "محتوى منظم والتطبيقات ممتازة، استفدت كثيرًا في شغل المشغل.", rating: 4.5 },
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

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-extrabold text-ink md:text-xl">دورات ذات صلة</h2>
          <Link to="/courses" className="text-sm font-bold text-gold-dark hover:text-plum">عرض الكل</Link>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 xl:grid-cols-3">
          {related.map((c) => <CourseCard key={c.id} course={c} />)}
        </div>
      </section>
    </div>
  );
}
