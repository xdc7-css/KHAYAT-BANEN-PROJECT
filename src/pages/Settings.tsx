import { useState } from "react";
import { useNavigate } from "react-router";
import { User, Bell, Lock, ShieldCheck, CreditCard, MapPin, Globe, Moon, HelpCircle, LogOut, ChevronLeft, type LucideIcon } from "lucide-react";
import { toast } from "sonner";
import { useApp } from "@/context/AppContext";
import { PageHeader } from "@/components/common";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Section { icon: LucideIcon; title: string; desc: string; content: React.ReactNode }

export default function SettingsPage() {
  const { logout, user } = useApp();
  const navigate = useNavigate();
  const [switches, setSwitches] = useState<Record<string, boolean>>({
    ordersNotif: true, offersNotif: true, messagesNotif: true, emailNotif: false,
    profilePublic: true, showCity: true, twoFactor: false, darkMode: false,
  });
  const toggle = (k: string, label: string) => {
    setSwitches((s) => ({ ...s, [k]: !s[k] }));
    toast.success(`تم ${switches[k] ? "إيقاف" : "تفعيل"} ${label}`);
  };

  const ToggleRow = ({ k, label, desc }: { k: string; label: string; desc: string }) => (
    <div className="flex items-center justify-between gap-4 py-3">
      <div>
        <div className="text-sm font-bold text-ink">{label}</div>
        <div className="text-xs text-mutedtext">{desc}</div>
      </div>
      <Switch checked={switches[k]} onCheckedChange={() => toggle(k, label)} aria-label={label} />
    </div>
  );

  const sections: Section[] = [
    {
      icon: User, title: "الحساب", desc: "بياناتك الأساسية ونوع الحساب",
      content: (
        <div className="divide-y divide-sand">
          <div className="flex items-center justify-between py-3 text-sm"><span className="text-mutedtext">الاسم</span><span className="font-bold text-ink">{user.name}</span></div>
          <div className="flex items-center justify-between py-3 text-sm"><span className="text-mutedtext">اسم المستخدم</span><span className="font-bold text-ink">{user.username}</span></div>
          <div className="flex items-center justify-between py-3 text-sm"><span className="text-mutedtext">نوع الحساب</span><span className="rounded-full bg-gold-mist px-3 py-1 text-xs font-black text-gold-dark">{user.accountType}</span></div>
          <Button variant="outline" className="mt-3 w-full border-plum text-plum hover:bg-plum-mist" onClick={() => navigate("/profile")}>تعديل الملف الشخصي</Button>
        </div>
      ),
    },
    {
      icon: Bell, title: "الإشعارات", desc: "تحكم فيما يصلك من تنبيهات",
      content: (
        <div className="divide-y divide-sand">
          <ToggleRow k="ordersNotif" label="إشعارات الطلبات" desc="تحديثات حالة الطلب والتوصيل" />
          <ToggleRow k="messagesNotif" label="إشعارات الرسائل" desc="رسائل المصممين والشركات" />
          <ToggleRow k="offersNotif" label="العروض والخصومات" desc="تنبيهات العروض من من تتابعهم" />
          <ToggleRow k="emailNotif" label="البريد الإلكتروني" desc="ملخص أسبوعي بالبريد" />
        </div>
      ),
    },
    {
      icon: ShieldCheck, title: "الخصوصية", desc: "من يمكنه رؤية بياناتك",
      content: (
        <div className="divide-y divide-sand">
          <ToggleRow k="profilePublic" label="ملف عام" desc="يمكن للجميع رؤية ملفك وتصاميمك" />
          <ToggleRow k="showCity" label="إظهار المدينة" desc="عرض مدينتك في ملفك الشخصي" />
        </div>
      ),
    },
    {
      icon: Lock, title: "الأمان", desc: "كلمة المرور والحماية",
      content: (
        <div className="divide-y divide-sand">
          <ToggleRow k="twoFactor" label="التحقق بخطوتين" desc="رمز تحقق عند تسجيل الدخول" />
          <Button variant="outline" className="mt-3 w-full border-plum text-plum hover:bg-plum-mist" onClick={() => toast.success("تم إرسال رابط تغيير كلمة المرور", { description: "تحقق من بريدك الإلكتروني" })}>
            تغيير كلمة المرور
          </Button>
        </div>
      ),
    },
    {
      icon: CreditCard, title: "طرق الدفع", desc: "بطاقاتك ومحافظك المحفوظة",
      content: (
        <div className="space-y-3">
          <div className="flex items-center justify-between rounded-xl bg-cream p-4">
            <div className="flex items-center gap-3">
              <CreditCard className="h-6 w-6 text-plum" />
              <div><div className="text-sm font-bold text-ink" dir="ltr">•••• 4532</div><div className="text-xs text-mutedtext">فيزا — تنتهي ٠٩/٢٧</div></div>
            </div>
            <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-bold text-green-700">افتراضية</span>
          </div>
          <Button variant="outline" className="w-full border-dashed border-plum text-plum hover:bg-plum-mist" onClick={() => toast.success("تمت إضافة البطاقة (تجريبي)")}>
            + إضافة بطاقة جديدة
          </Button>
        </div>
      ),
    },
    {
      icon: MapPin, title: "العناوين", desc: "عناوين التوصيل المحفوظة",
      content: (
        <div className="space-y-3">
          <div className="flex items-center justify-between rounded-xl bg-cream p-4">
            <div className="flex items-center gap-3">
              <MapPin className="h-6 w-6 text-plum" />
              <div><div className="text-sm font-bold text-ink">المنزل</div><div className="text-xs text-mutedtext">١٢ شارع الجامعة، الدقي، الجيزة</div></div>
            </div>
            <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-bold text-green-700">افتراضي</span>
          </div>
          <Button variant="outline" className="w-full border-dashed border-plum text-plum hover:bg-plum-mist" onClick={() => toast.success("تمت إضافة العنوان (تجريبي)")}>
            + إضافة عنوان جديد
          </Button>
        </div>
      ),
    },
    {
      icon: Globe, title: "اللغة", desc: "لغة واجهة التطبيق",
      content: (
        <div className="flex gap-2">
          {["العربية", "English"].map((l, i) => (
            <button key={l} onClick={() => i === 0 || toast.info("النسخة الإنجليزية قريبًا")}
              className={i === 0 ? "flex-1 rounded-xl border-2 border-plum bg-plum px-4 py-3 text-sm font-black text-gold" : "flex-1 rounded-xl border-2 border-sand bg-white px-4 py-3 text-sm font-bold text-mutedtext"}>
              {l}
            </button>
          ))}
        </div>
      ),
    },
    {
      icon: Moon, title: "المظهر", desc: "الوضع الفاتح والداكن",
      content: (
        <div className="divide-y divide-sand">
          <ToggleRow k="darkMode" label="الوضع الداكن" desc="مظهر داكن مريح للعين (تجريبي)" />
        </div>
      ),
    },
    {
      icon: HelpCircle, title: "المساعدة", desc: "الدعم والأسئلة الشائعة",
      content: (
        <div className="space-y-1">
          {["الأسئلة الشائعة", "تواصل مع الدعم", "سياسة الاستخدام", "سياسة الخصوصية"].map((l) => (
            <button key={l} onClick={() => toast.info(l, { description: "صفحة تعريفية تجريبية" })}
              className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-sm font-bold text-ink transition hover:bg-plum-mist">
              {l} <ChevronLeft className="h-4 w-4 text-mutedtext" />
            </button>
          ))}
        </div>
      ),
    },
  ];

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader title="الإعدادات" subtitle="إدارة حسابك وتفضيلاتك" />
      <div className="space-y-4">
        {sections.map((s) => {
          const Icon = s.icon;
          return (
            <section key={s.title} className="rounded-2xl border border-sand bg-white p-5 card-shadow md:p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-plum-mist">
                  <Icon className="h-5 w-5 text-plum" />
                </div>
                <div>
                  <h2 className="font-black text-ink">{s.title}</h2>
                  <p className="text-xs text-mutedtext">{s.desc}</p>
                </div>
              </div>
              {s.content}
            </section>
          );
        })}

        {/* logout */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" className="w-full border-red-300 text-red-600 hover:bg-red-50">
              <LogOut className="ml-2 h-4 w-4" /> تسجيل الخروج
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent dir="rtl">
            <AlertDialogHeader>
              <AlertDialogTitle>تسجيل الخروج؟</AlertDialogTitle>
              <AlertDialogDescription>يمكنك تسجيل الدخول مرة أخرى في أي وقت. ستحتفظ سلة التسوق والمفضلة ببياناتها.</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex-row-reverse gap-2">
              <AlertDialogAction onClick={() => { logout(); navigate("/auth"); }} className="bg-red-600 hover:bg-red-700">تسجيل الخروج</AlertDialogAction>
              <AlertDialogCancel>إلغاء</AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
