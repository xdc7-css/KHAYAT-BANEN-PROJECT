import { useNavigate, useParams } from "react-router";
import { MapPin, CreditCard, CheckCircle2, Circle, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useApp } from "@/context/AppContext";
import { formatPrice } from "@/data/mockData";
import { PageHeader, EmptyState, StatusBadge } from "@/components/common";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function OrderDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { orders } = useApp();
  const order = orders.find((o) => o.id === id);

  if (!order) {
    return <EmptyState type="orders" title="الطلب غير موجود" actionLabel="عرض الطلبات" onAction={() => navigate("/orders")} />;
  }

  const subtotal = order.items.reduce((s, i) => s + i.price * i.qty, 0);
  const deliveryFee = order.total - subtotal;

  return (
    <div className="mx-auto max-w-3xl">
      <button onClick={() => navigate("/orders")} className="mb-4 flex items-center gap-1 text-sm font-bold text-mutedtext hover:text-plum focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-md">
        <ArrowRight className="h-4 w-4" /> العودة إلى الطلبات
      </button>

      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <PageHeader title={`طلب ${order.number}`} subtitle={order.date} />
        <StatusBadge status={order.status} />
      </div>

      {/* timeline */}
      <section className="rounded-2xl border border-sand bg-white p-6 card-shadow">
        <h2 className="mb-6 font-black text-ink">تتبع الطلب</h2>
        <ol className="relative space-y-0">
          {order.timeline.map((step, i) => (
            <li key={i} className="relative flex gap-4 pb-8 last:pb-0">
              {i < order.timeline.length - 1 && (
                <span className={cn("absolute right-[13px] top-8 h-full w-0.5", step.done && order.timeline[i + 1]?.done ? "bg-plum" : "bg-sand")} />
              )}
              {step.done ? (
                <CheckCircle2 className="relative z-10 h-7 w-7 shrink-0 rounded-full bg-white fill-plum text-gold" />
              ) : (
                <Circle className="relative z-10 h-7 w-7 shrink-0 rounded-full bg-white text-sand" />
              )}
              <div className={cn(step.done ? "text-ink" : "text-mutedtext")}>
                <div className="font-bold">{step.label}</div>
                <div className="text-xs text-mutedtext">{step.date}</div>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* items */}
      <section className="mt-6 rounded-2xl border border-sand bg-white p-6 card-shadow">
        <h2 className="mb-4 font-black text-ink">المنتجات</h2>
        <ul className="divide-y divide-sand">
          {order.items.map((item, i) => (
            <li key={i} className="flex items-center justify-between gap-3 py-3 text-sm">
              <div>
                <div className="font-bold text-ink">{item.name}</div>
                <div className="text-xs text-mutedtext">الكمية: {item.qty}</div>
              </div>
              <span className="font-black text-plum">{formatPrice(item.price * item.qty)}</span>
            </li>
          ))}
        </ul>
        <Separator className="my-4" />
        <dl className="space-y-2 text-sm">
          <div className="flex justify-between"><dt className="text-mutedtext">المجموع الفرعي</dt><dd className="font-bold">{formatPrice(subtotal)}</dd></div>
          <div className="flex justify-between"><dt className="text-mutedtext">التوصيل</dt><dd className="font-bold">{deliveryFee > 0 ? formatPrice(deliveryFee) : "مجاني"}</dd></div>
          <div className="flex justify-between text-base"><dt className="font-black">الإجمالي</dt><dd className="font-black text-plum">{formatPrice(order.total)}</dd></div>
        </dl>
      </section>

      {/* address & payment */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="flex items-start gap-3 rounded-2xl border border-sand bg-white p-5 card-shadow">
          <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-plum" />
          <div>
            <div className="text-sm font-black text-ink">عنوان التوصيل</div>
            <div className="mt-1 text-sm text-mutedtext">{order.address}</div>
          </div>
        </div>
        <div className="flex items-start gap-3 rounded-2xl border border-sand bg-white p-5 card-shadow">
          <CreditCard className="mt-0.5 h-5 w-5 shrink-0 text-plum" />
          <div>
            <div className="text-sm font-black text-ink">طريقة الدفع</div>
            <div className="mt-1 text-sm text-mutedtext">{order.payment}</div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <Button variant="outline" className="flex-1 border-plum text-plum hover:bg-plum-mist" onClick={() => navigate("/messages")}>
          تواصل مع الدعم
        </Button>
        {order.status === "قيد المعالجة" && (
          <Button variant="outline" className="flex-1 border-red-300 text-red-600 hover:bg-red-50">إلغاء الطلب</Button>
        )}
      </div>
    </div>
  );
}
