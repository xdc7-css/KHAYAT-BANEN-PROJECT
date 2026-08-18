import { useState } from "react";
import { useNavigate } from "react-router";
import { User, Scissors, Shirt, Building2, Store, Eye, EyeOff, ArrowRight, ShieldCheck, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useApp, type AccountType } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

type Mode = "login" | "register" | "forgot" | "verify";

const ACCOUNT_TYPES: { key: AccountType; icon: LucideIcon; desc: string }[] = [
  { key: "عميل", icon: User, desc: "تصفح واطلب التصاميم والأقمشة" },
  { key: "خياط", icon: Scissors, desc: "اعرض خدماتك واستقبل الطلبات" },
  { key: "مصمم أزياء", icon: Shirt, desc: "انشر تصاميمك وبيعها" },
  { key: "شركة ملابس", icon: Building2, desc: "أدر منتجات شركتك وعروضها" },
  { key: "متجر مستلزمات", icon: Store, desc: "بِع أدوات ومستلزمات الخياطة" },
];

export default function AuthPage() {
  const navigate = useNavigate();
  const { login } = useApp();
  const [mode, setMode] = useState<Mode>("login");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [accountType, setAccountType] = useState<AccountType>("عميل");
  const [showPass, setShowPass] = useState(false);
  const [otp, setOtp] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validatePhone = (p: string) => /^01[0-9]{9}$/.test(p.replace(/\s/g, ""));

  const submit = () => {
    const e: Record<string, string> = {};
    if (mode === "login") {
      if (!validatePhone(phone)) e.phone = "أدخل رقم هاتف صحيح (١١ رقمًا يبدأ بـ 01)";
      if (password.length < 6) e.password = "كلمة المرور ٦ أحرف على الأقل";
    } else if (mode === "register") {
      if (name.trim().length < 3) e.name = "أدخل الاسم بالكامل";
      if (!validatePhone(phone)) e.phone = "أدخل رقم هاتف صحيح (١١ رقمًا يبدأ بـ 01)";
      if (password.length < 6) e.password = "كلمة المرور ٦ أحرف على الأقل";
    } else if (mode === "forgot") {
      if (!validatePhone(phone)) e.phone = "أدخل رقم هاتف صحيح (١١ رقمًا يبدأ بـ 01)";
    }
    setErrors(e);
    if (Object.keys(e).length) return;

    if (mode === "forgot" || mode === "register") {
      setMode("verify");
      return;
    }
    login();
    navigate("/");
  };

  const verify = () => {
    if (otp.length < 4) {
      setErrors({ otp: "أدخل رمز التحقق المكون من ٤ أرقام" });
      return;
    }
    login(name || undefined, accountType);
    navigate("/");
  };

  const err = (k: string) => errors[k] ? <p className="mt-1.5 text-xs font-bold text-red-600">{errors[k]}</p> : null;

  return (
    <div className="mx-auto max-w-md">
      <div className="overflow-hidden rounded-3xl border border-sand bg-white card-shadow-lg">
        {/* brand header */}
        <div className="bg-plum px-6 py-8 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gold text-2xl font-black text-plum">خ</div>
          <h1 className="mt-3 text-2xl font-black text-cream">خياط</h1>
          <p className="mt-1 text-xs text-cream/70">منصة الخياطين ومصممي الأزياء</p>
        </div>

        <div className="p-6 md:p-8">
          {mode !== "verify" && (
            <div className="mb-6 grid grid-cols-2 rounded-full bg-cream p-1">
              {(["login", "register"] as const).map((m) => (
                <button key={m} onClick={() => { setMode(m); setErrors({}); }}
                  className={cn("rounded-full py-2.5 text-sm font-black transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold",
                    mode === m ? "bg-plum text-gold shadow" : "text-mutedtext")}>
                  {m === "login" ? "تسجيل الدخول" : "إنشاء حساب"}
                </button>
              ))}
            </div>
          )}

          {mode === "forgot" && (
            <div className="mb-6 text-center">
              <h2 className="text-xl font-black text-ink">نسيت كلمة المرور</h2>
              <p className="mt-1 text-sm text-mutedtext">أدخل رقم هاتفك وسنرسل لك رمز تحقق</p>
            </div>
          )}

          {mode === "verify" ? (
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-plum-mist">
                <ShieldCheck className="h-7 w-7 text-plum" />
              </div>
              <h2 className="text-xl font-black text-ink">التحقق من رقم الهاتف</h2>
              <p className="mt-1 text-sm text-mutedtext">أدخل الرمز المرسل إلى <span dir="ltr" className="font-bold text-ink">{phone}</span></p>
              <div className="mt-6 flex justify-center" dir="ltr">
                <InputOTP maxLength={4} value={otp} onChange={setOtp}>
                  <InputOTPGroup>
                    {[0, 1, 2, 3].map((i) => <InputOTPSlot key={i} index={i} className="h-12 w-12 text-xl" />)}
                  </InputOTPGroup>
                </InputOTP>
              </div>
              {err("otp")}
              <Button className="mt-6 h-12 w-full bg-gold font-black text-plum hover:bg-gold-light" onClick={verify}>
                تأكيد الرمز
              </Button>
              <button onClick={() => setMode("login")} className="mt-4 flex w-full items-center justify-center gap-1 text-sm font-bold text-mutedtext hover:text-plum">
                <ArrowRight className="h-4 w-4" /> العودة لتسجيل الدخول
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {mode === "register" && (
                <div>
                  <Label htmlFor="name">الاسم بالكامل <span className="text-red-600">*</span></Label>
                  <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="مثال: بنين كاظم"
                    className={cn("mt-1.5", errors.name && "border-red-500")} aria-invalid={!!errors.name} />
                  {err("name")}
                </div>
              )}
              <div>
                <Label htmlFor="aphone">رقم الهاتف <span className="text-red-600">*</span></Label>
                <Input id="aphone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="01xxxxxxxxx" dir="ltr" inputMode="tel"
                  className={cn("mt-1.5 text-left", errors.phone && "border-red-500")} aria-invalid={!!errors.phone} />
                {err("phone")}
              </div>
              {mode !== "forgot" && (
                <div>
                  <Label htmlFor="apass">كلمة المرور <span className="text-red-600">*</span></Label>
                  <div className="relative mt-1.5">
                    <Input id="apass" type={showPass ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••" className={cn("pl-11", errors.password && "border-red-500")} aria-invalid={!!errors.password} />
                    <button type="button" onClick={() => setShowPass((s) => !s)} aria-label={showPass ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-mutedtext hover:text-plum">
                      {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {err("password")}
                </div>
              )}

              {mode === "register" && (
                <div>
                  <Label>نوع الحساب <span className="text-red-600">*</span></Label>
                  <div className="mt-2 grid gap-2" role="radiogroup" aria-label="نوع الحساب">
                    {ACCOUNT_TYPES.map((t) => {
                      const Icon = t.icon;
                      const active = accountType === t.key;
                      return (
                        <button key={t.key} role="radio" aria-checked={active} onClick={() => setAccountType(t.key)}
                          className={cn("flex items-center gap-3 rounded-2xl border-2 p-3.5 text-right transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold",
                            active ? "border-plum bg-plum-mist" : "border-sand bg-white hover:border-plum/40")}>
                          <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-xl", active ? "bg-plum text-gold" : "bg-plum-mist text-plum")}>
                            <Icon className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="text-sm font-black text-ink">{t.key}</div>
                            <div className="text-xs text-mutedtext">{t.desc}</div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {mode === "login" && (
                <div className="text-left">
                  <button onClick={() => { setMode("forgot"); setErrors({}); }} className="text-xs font-bold text-gold-dark hover:text-plum">
                    نسيت كلمة المرور؟
                  </button>
                </div>
              )}

              <Button className="h-12 w-full bg-gold font-black text-plum hover:bg-gold-light" onClick={submit}>
                {mode === "login" ? "تسجيل الدخول" : mode === "register" ? "إنشاء الحساب" : "إرسال رمز التحقق"}
              </Button>

              {mode === "register" && (
                <p className="text-center text-xs leading-relaxed text-mutedtext">
                  بإنشائك حسابًا فأنت توافق على <span className="font-bold text-plum">شروط الاستخدام</span> و<span className="font-bold text-plum">سياسة الخصوصية</span>
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
