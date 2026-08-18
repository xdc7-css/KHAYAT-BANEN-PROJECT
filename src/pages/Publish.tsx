import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import { ImagePlus, X, Star, Save, Eye, UploadCloud, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { DESIGN_CATEGORIES, CITIES, SIZES, COLOR_OPTIONS, formatPrice } from "@/data/mockData";
import { PageHeader } from "@/components/common";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";

interface UploadedImage { url: string; isCover: boolean; }

export default function PublishPage() {
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [colors, setColors] = useState<string[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);
  const [material, setMaterial] = useState("");
  const [city, setCity] = useState("");
  const [tags, setTags] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [previewOpen, setPreviewOpen] = useState(false);

  const simulateUpload = (files: FileList) => {
    setUploading(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setUploading(false);
          const newImgs = Array.from(files).map((f) => ({ url: URL.createObjectURL(f), isCover: false }));
          setImages((prev) => {
            const merged = [...prev, ...newImgs];
            if (!merged.some((i) => i.isCover) && merged.length) merged[0].isCover = true;
            return merged;
          });
          return 100;
        }
        return p + 20;
      });
    }, 150);
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (images.length === 0) e.images = "أضف صورة واحدة على الأقل للتصميم";
    if (!title.trim()) e.title = "عنوان التصميم مطلوب";
    if (!category) e.category = "اختر تصنيف التصميم";
    if (description.trim().length < 20) e.description = "اكتب وصفًا لا يقل عن ٢٠ حرفًا";
    if (!price || Number(price) <= 0) e.price = "أدخل سعرًا صحيحًا";
    if (discountPrice && Number(discountPrice) >= Number(price)) e.discountPrice = "سعر الخصم يجب أن يكون أقل من السعر الأصلي";
    if (colors.length === 0) e.colors = "اختر لونًا واحدًا على الأقل";
    if (sizes.length === 0) e.sizes = "اختر مقاسًا واحدًا على الأقل";
    if (!material.trim()) e.material = "حدد الخامة";
    if (!city) e.city = "اختر المدينة";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const publish = () => {
    if (!validate()) {
      toast.error("يرجى استكمال الحقول المطلوبة");
      return;
    }
    toast.success("تم نشر التصميم بنجاح 🎉", { description: "سيظهر تصميمك في صفحة التصاميم خلال دقائق" });
    navigate("/designs");
  };

  const saveDraft = () => {
    toast.success("تم حفظ المسودة", { description: "يمكنك استكمالها لاحقًا من حسابك" });
  };

  const fieldError = (k: string) => errors[k] ? <p className="mt-1.5 text-xs font-bold text-red-600">{errors[k]}</p> : null;

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader title="نشر تصميم جديد" subtitle="شارك إبداعك مع آلاف العملاء في جميع المحافظات" />

      <div className="space-y-6">
        {/* images */}
        <section className="rounded-2xl border border-sand bg-white p-5 card-shadow md:p-6">
          <h2 className="mb-4 font-black text-ink">صور التصميم <span className="text-red-600">*</span></h2>
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
            {images.map((img, i) => (
              <div key={i} className="group relative aspect-square overflow-hidden rounded-xl border border-sand">
                <img src={img.url} alt={`صورة ${i + 1}`} className="h-full w-full object-cover" />
                {img.isCover && (
                  <span className="absolute bottom-1.5 right-1.5 flex items-center gap-1 rounded-full bg-gold px-2 py-0.5 text-[10px] font-black text-plum">
                    <Star className="h-3 w-3 fill-plum" /> الغلاف
                  </span>
                )}
                <div className="absolute inset-0 hidden items-center justify-center gap-2 bg-plum/60 group-hover:flex">
                  {!img.isCover && (
                    <button onClick={() => setImages((p) => p.map((x, xi) => ({ ...x, isCover: xi === i })))}
                      className="rounded-full bg-white px-2.5 py-1 text-[10px] font-bold text-plum">تعيين كغلاف</button>
                  )}
                  <button onClick={() => setImages((p) => p.filter((_, xi) => xi !== i))}
                    className="rounded-full bg-red-600 p-1.5 text-white" aria-label="حذف الصورة">
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
            <button
              onClick={() => fileRef.current?.click()}
              className="flex aspect-square flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-sand text-mutedtext transition hover:border-gold hover:text-plum focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              <ImagePlus className="h-7 w-7" />
              <span className="text-xs font-bold">إضافة صور</span>
            </button>
          </div>
          <input ref={fileRef} type="file" accept="image/*" multiple className="hidden"
            onChange={(e) => { if (e.target.files?.length) simulateUpload(e.target.files); e.target.value = ""; }} />
          {uploading && (
            <div className="mt-4">
              <div className="mb-1.5 flex items-center justify-between text-xs font-bold text-mutedtext">
                <span className="flex items-center gap-1.5"><UploadCloud className="h-4 w-4" /> جاري رفع الصور…</span>
                <span dir="ltr">{progress}٪</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}
          {fieldError("images")}
        </section>

        {/* basic info */}
        <section className="space-y-5 rounded-2xl border border-sand bg-white p-5 card-shadow md:p-6">
          <h2 className="font-black text-ink">المعلومات الأساسية</h2>
          <div>
            <Label htmlFor="title">عنوان التصميم <span className="text-red-600">*</span></Label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="مثال: فستان سهرة مخملي بتطريز ذهبي"
              className={cn("mt-1.5", errors.title && "border-red-500")} aria-invalid={!!errors.title} />
            {fieldError("title")}
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <Label>تصنيف التصميم <span className="text-red-600">*</span></Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className={cn("mt-1.5", errors.category && "border-red-500")} aria-invalid={!!errors.category}>
                  <SelectValue placeholder="اختر التصنيف" />
                </SelectTrigger>
                <SelectContent>
                  {DESIGN_CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
              {fieldError("category")}
            </div>
            <div>
              <Label className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> المدينة <span className="text-red-600">*</span></Label>
              <Select value={city} onValueChange={setCity}>
                <SelectTrigger className={cn("mt-1.5", errors.city && "border-red-500")} aria-invalid={!!errors.city}>
                  <SelectValue placeholder="اختر المدينة" />
                </SelectTrigger>
                <SelectContent>
                  {CITIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
              {fieldError("city")}
            </div>
          </div>
          <div>
            <Label htmlFor="desc">وصف التصميم <span className="text-red-600">*</span></Label>
            <Textarea id="desc" value={description} onChange={(e) => setDescription(e.target.value)} rows={4}
              placeholder="صف التصميم والخامات والقصّة وما يميزه…"
              className={cn("mt-1.5", errors.description && "border-red-500")} aria-invalid={!!errors.description} />
            <p className="mt-1 text-xs text-mutedtext">{description.length} / ٢٠ حرفًا كحد أدنى</p>
            {fieldError("description")}
          </div>
        </section>

        {/* pricing */}
        <section className="space-y-5 rounded-2xl border border-sand bg-white p-5 card-shadow md:p-6">
          <h2 className="font-black text-ink">التسعير</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <Label htmlFor="price">السعر (ج.م) <span className="text-red-600">*</span></Label>
              <Input id="price" type="number" min="1" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="٠"
                className={cn("mt-1.5", errors.price && "border-red-500")} aria-invalid={!!errors.price} dir="ltr" />
              {fieldError("price")}
            </div>
            <div>
              <Label htmlFor="dprice">السعر بعد الخصم (اختياري)</Label>
              <Input id="dprice" type="number" min="0" value={discountPrice} onChange={(e) => setDiscountPrice(e.target.value)} placeholder="٠"
                className={cn("mt-1.5", errors.discountPrice && "border-red-500")} aria-invalid={!!errors.discountPrice} dir="ltr" />
              {fieldError("discountPrice")}
            </div>
          </div>
          {price && (
            <p className="rounded-xl bg-gold-mist px-4 py-2.5 text-sm font-bold text-gold-dark">
              السعر المعروض للعملاء: {formatPrice(Number(discountPrice) > 0 && Number(discountPrice) < Number(price) ? Number(discountPrice) : Number(price))}
            </p>
          )}
        </section>

        {/* options */}
        <section className="space-y-5 rounded-2xl border border-sand bg-white p-5 card-shadow md:p-6">
          <h2 className="font-black text-ink">المواصفات</h2>
          <div>
            <Label>الألوان المتاحة <span className="text-red-600">*</span></Label>
            <div className="mt-2.5 flex flex-wrap gap-2.5">
              {COLOR_OPTIONS.map((c) => {
                const active = colors.includes(c.hex);
                return (
                  <button key={c.hex} type="button" title={c.name} aria-pressed={active}
                    onClick={() => setColors((p) => (active ? p.filter((x) => x !== c.hex) : [...p, c.hex]))}
                    className={cn("h-9 w-9 rounded-full border-2 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold",
                      active ? "border-plum ring-2 ring-gold scale-110" : "border-black/10")}
                    style={{ backgroundColor: c.hex }} />
                );
              })}
            </div>
            {fieldError("colors")}
          </div>
          <div>
            <Label>المقاسات <span className="text-red-600">*</span></Label>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {SIZES.map((s) => {
                const active = sizes.includes(s);
                return (
                  <button key={s} type="button" aria-pressed={active}
                    onClick={() => setSizes((p) => (active ? p.filter((x) => x !== s) : [...p, s]))}
                    className={cn("min-w-12 rounded-xl border px-4 py-2 text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold",
                      active ? "border-plum bg-plum text-gold" : "border-sand bg-white text-ink hover:border-plum/40")}>
                    {s}
                  </button>
                );
              })}
            </div>
            {fieldError("sizes")}
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <Label htmlFor="material">الخامة <span className="text-red-600">*</span></Label>
              <Input id="material" value={material} onChange={(e) => setMaterial(e.target.value)} placeholder="مثال: مخمل إيطالي"
                className={cn("mt-1.5", errors.material && "border-red-500")} aria-invalid={!!errors.material} />
              {fieldError("material")}
            </div>
            <div>
              <Label htmlFor="tags">وسوم التصميم</Label>
              <Input id="tags" value={tags} onChange={(e) => setTags(e.target.value)} placeholder="سهرة، تطريز، زفاف…" className="mt-1.5" />
            </div>
          </div>
          <div>
            <Label htmlFor="delivery">معلومات التوصيل والتنفيذ</Label>
            <Input id="delivery" placeholder="مثال: ٥ - ٧ أيام عمل، توصيل لجميع المحافظات" className="mt-1.5" />
          </div>
        </section>

        {/* actions */}
        <div className="flex flex-col gap-3 pb-4 sm:flex-row">
          <Button variant="outline" onClick={saveDraft} className="h-12 flex-1 border-sand text-ink hover:bg-plum-mist">
            <Save className="ml-2 h-4 w-4" /> حفظ كمسودة
          </Button>
          <Button variant="outline" onClick={() => setPreviewOpen(true)} className="h-12 flex-1 border-plum text-plum hover:bg-plum-mist">
            <Eye className="ml-2 h-4 w-4" /> معاينة
          </Button>
          <Button onClick={publish} className="h-12 flex-1 bg-gold font-black text-plum hover:bg-gold-light">
            نشر التصميم
          </Button>
        </div>
      </div>

      {/* preview dialog */}
      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-lg" dir="rtl">
          <DialogHeader><DialogTitle>معاينة التصميم</DialogTitle></DialogHeader>
          <div className="overflow-hidden rounded-2xl border border-sand bg-white">
            {images.length > 0 ? (
              <img src={images.find((i) => i.isCover)?.url ?? images[0].url} alt="الغلاف" className="aspect-[4/3] w-full object-cover" />
            ) : (
              <div className="flex aspect-[4/3] items-center justify-center bg-sand text-mutedtext">لا توجد صورة بعد</div>
            )}
            <div className="p-4">
              <h3 className="font-bold text-ink">{title || "عنوان التصميم"}</h3>
              <p className="mt-0.5 text-xs text-mutedtext">{category || "التصنيف"} · {city || "المدينة"}</p>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-lg font-black text-plum">
                  {price ? formatPrice(Number(discountPrice) > 0 && Number(discountPrice) < Number(price) ? Number(discountPrice) : Number(price)) : "— ج.م"}
                </span>
                {discountPrice && Number(discountPrice) < Number(price) && (
                  <span className="text-sm text-mutedtext line-through">{formatPrice(Number(price))}</span>
                )}
              </div>
              <p className="mt-2 line-clamp-3 text-sm text-mutedtext">{description || "وصف التصميم…"}</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
