import { useNavigate } from "react-router";
import { Trash2, ShoppingBag } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { formatPrice } from "@/data/mockData";
import { PageHeader, EmptyState, QtySelector } from "@/components/common";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function CartPage() {
  const { cart, updateQty, removeFromCart } = useApp();
  const navigate = useNavigate();

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const delivery = subtotal > 0 ? 60 : 0;
  const discount = subtotal > 2000 ? Math.round(subtotal * 0.05) : 0;
  const total = subtotal + delivery - discount;

  if (cart.length === 0) {
    return (
      <div>
        <PageHeader title="سلة التسوق" />
        <EmptyState type="cart" title="سلتك فارغة" desc="تصفح التصاميم والمستلزمات وأضف ما يعجبك إلى السلة"
          actionLabel="تصفح التصاميم" onAction={() => navigate("/designs")} />
      </div>
    );
  }

  return (
    <div>
      <PageHeader title="سلة التسوق" subtitle={`${cart.length} منتجات في السلة`} />
      <div className="grid gap-6 lg:grid-cols-3">
        {/* items */}
        <div className="space-y-3 lg:col-span-2">
          {cart.map((item) => (
            <div key={item.id} className="flex gap-4 rounded-2xl border border-sand bg-white p-3.5 card-shadow">
              <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-sand">
                {item.image ? (
                  <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center" style={{ backgroundColor: item.swatch }}>
                    <ShoppingBag className="h-8 w-8 text-plum/40" />
                  </div>
                )}
              </div>
              <div className="flex min-w-0 flex-1 flex-col justify-between py-0.5">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="line-clamp-1 text-sm font-bold text-ink md:text-base">{item.name}</h3>
                    <p className="mt-0.5 text-xs text-mutedtext">{item.seller}{item.meta ? ` · ${item.meta}` : ""}</p>
                  </div>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <button className="rounded-full p-2 text-mutedtext transition hover:bg-red-50 hover:text-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold" aria-label="حذف من السلة">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent dir="rtl">
                      <AlertDialogHeader>
                        <AlertDialogTitle>حذف المنتج من السلة؟</AlertDialogTitle>
                        <AlertDialogDescription>سيتم حذف «{item.name}» من سلة التسوق نهائيًا.</AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter className="flex-row-reverse gap-2">
                        <AlertDialogAction onClick={() => removeFromCart(item.id)} className="bg-red-600 hover:bg-red-700">حذف</AlertDialogAction>
                        <AlertDialogCancel>إلغاء</AlertDialogCancel>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
                <div className="flex items-center justify-between">
                  <QtySelector qty={item.qty} onChange={(q) => updateQty(item.id, q)} small />
                  <span className="text-base font-black text-plum">{formatPrice(item.price * item.qty)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* summary */}
        <aside>
          <div className="sticky top-24 rounded-2xl border border-sand bg-white p-6 card-shadow-lg">
            <h2 className="mb-4 font-black text-ink">ملخص الطلب</h2>
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between"><dt className="text-mutedtext">المجموع الفرعي</dt><dd className="font-bold text-ink">{formatPrice(subtotal)}</dd></div>
              <div className="flex justify-between"><dt className="text-mutedtext">التوصيل</dt><dd className="font-bold text-ink">{formatPrice(delivery)}</dd></div>
              {discount > 0 && (
                <div className="flex justify-between"><dt className="text-mutedtext">الخصم (٥٪ للطلبات +٢٠٠٠)</dt><dd className="font-bold text-green-600">− {formatPrice(discount)}</dd></div>
              )}
              <Separator />
              <div className="flex justify-between text-base"><dt className="font-black text-ink">الإجمالي</dt><dd className="font-black text-plum">{formatPrice(total)}</dd></div>
            </dl>
            <Button className="mt-5 h-12 w-full bg-gold text-base font-black text-plum hover:bg-gold-light" onClick={() => navigate("/checkout")}>
              متابعة الدفع
            </Button>
            <Button variant="ghost" className="mt-2 w-full text-mutedtext" onClick={() => navigate("/designs")}>
              متابعة التسوق
            </Button>
          </div>
        </aside>
      </div>
    </div>
  );
}
