import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { MapPin, PenLine, Settings2, Users, Package, Heart, Shirt } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { designs, designers, formatNum } from "@/data/mockData";
import { Rating, InitialsAvatar, EmptyState } from "@/components/common";
import { ProductCard } from "@/components/cards";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function ProfilePage() {
  const { user, orders, favorites, follows, updateProfile } = useApp();
  const navigate = useNavigate();
  const [editOpen, setEditOpen] = useState(false);
  const [name, setName] = useState(user.name);
  const [bio, setBio] = useState(user.bio);
  const [city, setCity] = useState(user.city);

  useEffect(() => {
    setName(user.name);
    setBio(user.bio);
    setCity(user.city);
  }, [user.name, user.bio, user.city]);

  const myDesigns = designs.slice(0, 2);
  const followersList = designers.slice(0, 4);
  const followingList = designers.filter((d) => follows.includes(d.id));

  return (
    <div className="space-y-6">
      {/* profile header */}
      <section className="overflow-hidden rounded-3xl border border-sand bg-white card-shadow">
        <div className="h-28 bg-gradient-to-l from-plum via-plum-light to-plum md:h-36" />
        <div className="px-5 pb-6 md:px-8">
          <div className="-mt-10 flex flex-wrap items-end justify-between gap-4 md:-mt-12">
            <div className="flex items-end gap-4">
              <InitialsAvatar name={user.name} size="xl" className="border-4 border-white card-shadow" />
              <div className="pb-1">
                <h1 className="text-xl font-black text-ink md:text-2xl">{user.name}</h1>
                <p className="text-sm text-mutedtext">{user.username} · {user.accountType}</p>
                <p className="mt-0.5 flex items-center gap-1 text-xs text-mutedtext"><MapPin className="h-3.5 w-3.5" />{user.city}</p>
              </div>
            </div>
            <div className="flex gap-2 pb-1">
              <Button variant="outline" className="border-plum text-plum hover:bg-plum-mist" onClick={() => setEditOpen(true)}>
                <PenLine className="ml-1.5 h-4 w-4" /> تعديل الملف الشخصي
              </Button>
              <Button variant="outline" className="border-sand text-ink hover:bg-plum-mist" onClick={() => navigate("/settings")}>
                <Settings2 className="ml-1.5 h-4 w-4" /> إعدادات الحساب
              </Button>
            </div>
          </div>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-mutedtext">{user.bio}</p>
          <div className="mt-5 grid grid-cols-4 gap-3 sm:max-w-lg">
            {[
              { label: "التقييم", value: <Rating value={user.rating} size="md" /> },
              { label: "تصاميمي", value: myDesigns.length },
              { label: "طلباتي", value: orders.length },
              { label: "المفضلة", value: favorites.length },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl bg-cream p-3 text-center">
                <div className="flex justify-center text-lg font-black text-plum">{s.value}</div>
                <div className="mt-1 text-[11px] text-mutedtext">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* tabs */}
      <Tabs defaultValue="designs" dir="rtl">
        <TabsList className="w-full justify-start overflow-x-auto rounded-full border border-sand bg-white p-1 no-scrollbar">
          <TabsTrigger value="designs" className="rounded-full data-[state=active]:bg-plum data-[state=active]:text-gold"><Shirt className="ml-1 h-4 w-4" />تصاميمي</TabsTrigger>
          <TabsTrigger value="orders" className="rounded-full data-[state=active]:bg-plum data-[state=active]:text-gold"><Package className="ml-1 h-4 w-4" />طلباتي</TabsTrigger>
          <TabsTrigger value="favorites" className="rounded-full data-[state=active]:bg-plum data-[state=active]:text-gold"><Heart className="ml-1 h-4 w-4" />المفضلة</TabsTrigger>
          <TabsTrigger value="followers" className="rounded-full data-[state=active]:bg-plum data-[state=active]:text-gold"><Users className="ml-1 h-4 w-4" />المتابَعون</TabsTrigger>
          <TabsTrigger value="following" className="rounded-full data-[state=active]:bg-plum data-[state=active]:text-gold"><Users className="ml-1 h-4 w-4" />أتابعهم</TabsTrigger>
        </TabsList>

        <TabsContent value="designs" className="mt-5">
          {myDesigns.length === 0 ? (
            <EmptyState type="search" title="لم تنشر تصاميم بعد" actionLabel="نشر تصميم" onAction={() => navigate("/publish")} />
          ) : (
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5 xl:grid-cols-4">
              {myDesigns.map((d) => <ProductCard key={d.id} design={d} />)}
            </div>
          )}
        </TabsContent>

        <TabsContent value="orders" className="mt-5">
          <div className="space-y-3">
            {orders.slice(0, 3).map((o) => (
              <button key={o.id} onClick={() => navigate(`/order/${o.id}`)}
                className="flex w-full items-center justify-between rounded-2xl border border-sand bg-white p-4 text-right card-shadow transition hover:card-shadow-lg">
                <div>
                  <div className="font-black text-ink" dir="ltr">{o.number}</div>
                  <div className="text-xs text-mutedtext">{o.date} · {o.status}</div>
                </div>
                <span className="font-black text-plum">{formatNum(o.total)} ج.م</span>
              </button>
            ))}
          </div>
          <Button variant="outline" className="mt-4 w-full border-plum text-plum hover:bg-plum-mist" onClick={() => navigate("/orders")}>
            عرض كل الطلبات
          </Button>
        </TabsContent>

        <TabsContent value="favorites" className="mt-5">
          <EmptyState type="favorites" title="إدارة المفضلة من صفحتها" desc="تجد كل عناصرك المحفوظة مصنّفة في صفحة المفضلة"
            actionLabel="فتح المفضلة" onAction={() => navigate("/favorites")} />
        </TabsContent>

        <TabsContent value="followers" className="mt-5">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {followersList.map((d) => (
              <div key={d.id} className="flex items-center gap-3 rounded-2xl border border-sand bg-white p-4 card-shadow">
                <InitialsAvatar name={d.name} size="sm" />
                <div className="min-w-0">
                  <div className="truncate text-sm font-bold text-ink">{d.name}</div>
                  <div className="text-xs text-mutedtext">{d.specialty}</div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="following" className="mt-5">
          {followingList.length === 0 ? (
            <EmptyState type="favorites" title="لا تتابع أحدًا بعد" desc="تابع المصممين والشركات ليصلك جديدهم"
              actionLabel="اكتشف المصممين" onAction={() => navigate("/designers")} />
          ) : (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {followingList.map((d) => (
                <div key={d.id} className="flex items-center gap-3 rounded-2xl border border-sand bg-white p-4 card-shadow">
                  <InitialsAvatar name={d.name} size="sm" />
                  <div className="min-w-0">
                    <div className="truncate text-sm font-bold text-ink">{d.name}</div>
                    <div className="text-xs text-mutedtext">{d.specialty}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* edit dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent dir="rtl">
          <DialogHeader><DialogTitle>تعديل الملف الشخصي</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="pname">الاسم</Label>
              <Input id="pname" value={name} onChange={(e) => setName(e.target.value)} className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="pbio">نبذة عنك</Label>
              <Textarea id="pbio" value={bio} onChange={(e) => setBio(e.target.value)} rows={3} className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="pcity">المدينة</Label>
              <Input id="pcity" value={city} onChange={(e) => setCity(e.target.value)} className="mt-1.5" />
            </div>
            <Button className="w-full bg-plum text-cream hover:bg-plum-light" onClick={() => {
              updateProfile({ name, bio, city });
              setEditOpen(false);
            }}>
              حفظ التعديلات
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
