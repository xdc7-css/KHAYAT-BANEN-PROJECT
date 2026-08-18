import { useState } from "react";
import { useNavigate } from "react-router";
import { useApp } from "@/context/AppContext";
import { designs, designers, companies, fabrics } from "@/data/mockData";
import { PageHeader, EmptyState } from "@/components/common";
import { ProductCard, DesignerCard, CompanyCard, FabricCard } from "@/components/cards";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function FavoritesPage() {
  const { favorites } = useApp();
  const navigate = useNavigate();
  const [tab, setTab] = useState("designs");

  const favDesigns = designs.filter((d) => favorites.includes(d.id));
  const favDesigners = designers.filter((d) => favorites.includes(d.id));
  const favCompanies = companies.filter((c) => favorites.includes(c.id));
  const favFabrics = fabrics.filter((f) => favorites.includes(f.id));

  const empty = (label: string) => (
    <EmptyState type="favorites" title={`لا توجد ${label} في المفضلة`} desc="اضغط على رمز القلب في أي بطاقة لإضافتها إلى مفضلتك"
      actionLabel="تصفح التصاميم" onAction={() => navigate("/designs")} />
  );

  return (
    <div>
      <PageHeader title="المفضلة" subtitle={`${favorites.length} عنصر محفوظ`} />
      <Tabs value={tab} onValueChange={setTab} dir="rtl">
        <TabsList className="w-full justify-start overflow-x-auto rounded-full border border-sand bg-white p-1 no-scrollbar">
          <TabsTrigger value="designs" className="rounded-full data-[state=active]:bg-plum data-[state=active]:text-gold">التصاميم ({favDesigns.length})</TabsTrigger>
          <TabsTrigger value="fabrics" className="rounded-full data-[state=active]:bg-plum data-[state=active]:text-gold">الأقمشة ({favFabrics.length})</TabsTrigger>
          <TabsTrigger value="designers" className="rounded-full data-[state=active]:bg-plum data-[state=active]:text-gold">المصممون ({favDesigners.length})</TabsTrigger>
          <TabsTrigger value="companies" className="rounded-full data-[state=active]:bg-plum data-[state=active]:text-gold">الشركات ({favCompanies.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="designs" className="mt-5">
          {favDesigns.length === 0 ? empty("تصاميم") : (
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5 xl:grid-cols-4">
              {favDesigns.map((d) => <ProductCard key={d.id} design={d} />)}
            </div>
          )}
        </TabsContent>
        <TabsContent value="fabrics" className="mt-5">
          {favFabrics.length === 0 ? empty("أقمشة") : (
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5 xl:grid-cols-4">
              {favFabrics.map((f) => <FabricCard key={f.id} fabric={f} />)}
            </div>
          )}
        </TabsContent>
        <TabsContent value="designers" className="mt-5">
          {favDesigners.length === 0 ? empty("مصممين") : (
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5 xl:grid-cols-4">
              {favDesigners.map((d) => <DesignerCard key={d.id} designer={d} />)}
            </div>
          )}
        </TabsContent>
        <TabsContent value="companies" className="mt-5">
          {favCompanies.length === 0 ? empty("شركات") : (
            <div className="grid gap-4 md:grid-cols-2">
              {favCompanies.map((c) => <CompanyCard key={c.id} company={c} />)}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
