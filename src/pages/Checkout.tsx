import { useState } from "react";
import { useNavigate } from "react-router";
import { Banknote, CreditCard, Smartphone, MapPin, Phone, User, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useApp } from "@/context/AppContext";
import { formatPrice, CITIES } from "@/data/mockData";
import { PageHeader, EmptyState } from "@/components/common";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const PAYMENTS = [
  { key: "cod", label: "الدفع عند الاستلام", desc: "ادفع نقدًا عند وصول الطلب", icon: Banknote },
  { key: "card", label: "بطاقة مصرفية", desc: "فيزا / ماستركارد / ميزة", icon: CreditCard },
  { key: "ewallet", label: "الدفع الإلكتروني", desc: "محافظ إلكترونية وفوري", icon: Smartphone },
];

const DELIVERY = [
  { key: "standard", label: "توصيل عادي", desc: "٣ - ٥ أيام عمل", price: 60 },
  { key: "express", label: "توصيل سريع", desc: "١ - ٢ يوم عمل", price: 120 },
];

export default function CheckoutPage() {
  const { cart, clearCart, addOrder } = useApp();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("cod");
  const [delivery, setDelivery] = useState("standard");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState<string | null>(null);

  if (cart.length === 0 && !done) {
    return (
      <div>
        <PageHeader title="إتمام الطلب" />
        <EmptyState type="cart" title="لا توجد منتجات لإتمام الطلب" desc="أضف منتجات إلى السلة أولًا"
          actionLabel="تصفح التصاميم" onAction={() => navigate("/designs")} />
      </div>
    );
  }

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const deliveryPrice = DELIVERY.find((d) => d.key === delivery)!.price;
  const discount = subtotal > 2000 ? Math.round(subtotal * 0.05) : 0;
  const total = subtotal + deliveryPrice - discount;

  const confirm = () => {
    const e: Record<string, string> = {};
    if (name.trim().length < 3) e.name = "أدخل الاسم بالكامل";
    if (!/^01[0-9]{9}$/.test(phone.replace(/\s/g, ""))) e.phone = "أدخل رقم هاتف مصري صحيح (١١ رقمًا يبدأ بـ 01)";
    if (!city) e.city = "اختر المحافظة";
    if (address.trim().length < 10) e.address = "أدخل العنوان بالتفصيل";
    setErrors(e);
    if (Object.keys(e).length) return;
    const num = `KH-2024-${Math.floor(1900 + Math.random() * 99)}`;
    addOrder({
      id: `o${Date.now()}`, number: num, date: "اليوم",
      items: cart.map((i) => ({ name: i.name, qty: i.qty, price: i.price })),
      total, status: "قيد المعالجة", address: `${address}، ${city}`,
      payment: PAYMENTS.find((p) => p.key === payment)!.label,
      timeline: [
        { label: "تم استلام الطلب", date: "الآن", done: true },
        { label: "جاري التجهيز", date: "—", done: false },
        { label: "تم الشحن", date: "—", done: false },
        { label: "قيد التوصيل", date: "—", done: false },
        { label: "تم التسليم", date: "—", done: false },
      ],
    });
    setDone(num);
    clearCart();
  };

  if (done) {
    return (
      <div className="mx-auto max-w-lg">
        <div className="flex flex-col items-center rounded-3xl border border-sand bg-white px-6 py-12 text-center card-shadow-lg">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-50">
            <CheckCircle2 className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="mt-5 text-2xl font-black text-ink">تم تأكيد طلبك بنجاح 🎉</h1>
          <p className="mt-2 text-sm text-mutedtext">رقم الطلب: <span className="font-black text-plum" dir="ltr">{done}</span></p>
          <p className="mt-1 text-sm text-mutedtext">سنتواصل معك لتأكيد التفاصيل، ويمكنك متابعة حالة الطلب من صفحة الطلبات.</p>
          <div className="mt-6 flex w-full gap-3">
            <Button className="flex-1 bg-plum text-cream hover:bg-plum-light" onClick={() => navigate("/orders")}>متابعة الطلب</Button>
            <Button variant="outline" className="flex-1 border-plum text-plum hover:bg-plum-mist" onClick={() => navigate("/")}>الرئيسية</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl">
      <PageHeader title="إتمام الطلب" subtitle="أدخل بياناتك لإتمام عملية الشراء" />
      <div className="grid gap-6 lg:grid-cols-5">
        <div className="space-y-6 lg:col-span-3">
          {/* customer info */}
          <section className="space-y-4 rounded-2xl border border-sand bg-white p-5 card-shadow md:p-6">
            <h2 className="flex items-center gap-2 font-black text-ink"><User className="h-5 w-5 text-plum" /> معلومات العميل</h2>
            <div>
              <Label htmlFor="name">الاسم بالكامل <span className="text-red-600">*</span></Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="مثال: ياسمين محمود"
                className={cn("mt-1.5", errors.name && "border-red-500")} aria-invalid={!!errors.name} />
              {errors.name && <p className="mt-1.5 text-xs font-bold text-red-600">{errors.name}</p>}
            </div>
            <div>
              <Label htmlFor="phone" className="flex items-center gap-1"><Phone className="h-3.5 w-3.5" /> رقم الهاتف <span className="text-red-600">*</span></Label>
              <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="01xxxxxxxxx" dir="ltr" inputMode="tel"
                className={cn("mt-1.5 text-left", errors.phone && "border-red-500")} aria-invalid={!!errors.phone} />
              {errors.phone && <p className="mt-1.5 text-xs font-bold text-red-600">{errors.phone}</p>}
            </div>
          </section>

          {/* address */}
          <section className="space-y-4 rounded-2xl border border-sand bg-white p-5 card-shadow md:p-6">
            <h2 className="flex items-center gap-2 font-black text-ink"><MapPin className="h-5 w-5 text-plum" /> العنوان</h2>
            <div>
              <Label>المحافظة <span className="text-red-600">*</span></Label>
              <Select value={city} onValueChange={setCity}>
                <SelectTrigger className={cn("mt-1.5", errors.city && "border-red-500")} aria-invalid={!!errors.city}>
                  <SelectValue placeholder="اختر المحافظة" />
                </SelectTrigger>
                <SelectContent>
                  {CITIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
              {errors.city && <p className="mt-1.5 text-xs font-bold text-red-600">{errors.city}</p>}
            </div>
            <div>
              <Label htmlFor="address">العنوان بالتفصيل <span className="text-red-600">*</span></Label>
              <Input id="address" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="الشارع، رقم العمارة، الدور، الشقة"
                className={cn("mt-1.5", errors.address && "border-red-500")} aria-invalid={!!errors.address} />
              {errors.address && <p className="mt-1.5 text-xs font-bold text-red-600">{errors.address}</p>}
            </div>
          </section>

          {/* delivery method */}
          <section className="space-y-4 rounded-2xl border border-sand bg-white p-5 card-shadow md:p-6">
            <h2 className="font-black text-ink">طريقة التوصيل</h2>
            <div className="grid gap-3 sm:grid-cols-2" role="radiogroup" aria-label="طريقة التوصيل">
              {DELIVERY.map((d) => (
                <button key={d.key} role="radio" aria-checked={delivery === d.key} onClick={() => setDelivery(d.key)}
                  className={cn("rounded-2xl border-2 p-4 text-right transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold",
                    delivery === d.key ? "border-plum bg-plum-mist" : "border-sand bg-white hover:border-plum/40")}>
                  <div className="font-bold text-ink">{d.label}</div>
                  <div className="mt-1 text-xs text-mutedtext">{d.desc}</div>
                  <div className="mt-1 text-sm font-black text-plum">{formatPrice(d.price)}</div>
                </button>
              ))}
            </div>
          </section>

          {/* payment */}
          <section className="space-y-4 rounded-2xl border border-sand bg-white p-5 card-shadow md:p-6">
            <h2 className="font-black text-ink">طريقة الدفع</h2>
            <div className="space-y-3" role="radiogroup" aria-label="طريقة الدفع">
              {PAYMENTS.map((p) => {
                const Icon = p.icon;
                return (
                  <button key={p.key} role="radio" aria-checked={payment === p.key} onClick={() => setPayment(p.key)}
                    className={cn("flex w-full items-center gap-4 rounded-2xl border-2 p-4 text-right transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold",
                      payment === p.key ? "border-plum bg-plum-mist" : "border-sand bg-white hover:border-plum/40")}>
                    <div className={cn("flex h-11 w-11 shrink-0 items-center justify-center rounded-xl", payment === p.key ? "bg-plum text-gold" : "bg-plum-mist text-plum")}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-bold text-ink">{p.label}</div>
                      <div className="text-xs text-mutedtext">{p.desc}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>
        </div>

        {/* summary */}
        <aside className="lg:col-span-2">
          <div className="sticky top-24 rounded-2xl border border-sand bg-white p-6 card-shadow-lg">
            <h2 className="mb-4 font-black text-ink">ملخص الطلب</h2>
            <ul className="space-y-3">
              {cart.map((i) => (
                <li key={i.id} className="flex items-center gap-3 text-sm">
                  <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-sand">
                    {i.image ? <img src={i.image} alt="" className="h-full w-full object-cover" /> : <div className="h-full w-full" style={{ backgroundColor: i.swatch }} />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="line-clamp-1 font-bold text-ink">{i.name}</div>
                    <div className="text-xs text-mutedtext">الكمية: {i.qty}</div>
                  </div>
                  <span className="font-bold text-plum">{formatPrice(i.price * i.qty)}</span>
                </li>
              ))}
            </ul>
            <Separator className="my-4" />
            <dl className="space-y-2.5 text-sm">
              <div className="flex justify-between"><dt className="text-mutedtext">المجموع الفرعي</dt><dd className="font-bold">{formatPrice(subtotal)}</dd></div>
              <div className="flex justify-between"><dt className="text-mutedtext">التوصيل</dt><dd className="font-bold">{formatPrice(deliveryPrice)}</dd></div>
              {discount > 0 && <div className="flex justify-between"><dt className="text-mutedtext">الخصم</dt><dd className="font-bold text-green-600">− {formatPrice(discount)}</dd></div>}
              <Separator />
              <div className="flex justify-between text-base"><dt className="font-black">الإجمالي</dt><dd className="font-black text-plum">{formatPrice(total)}</dd></div>
            </dl>
            <Button className="mt-5 h-12 w-full bg-gold text-base font-black text-plum hover:bg-gold-light" onClick={confirm}>
              تأكيد الطلب
            </Button>
          </div>
        </aside>
      </div>
    </div>
  );
}
