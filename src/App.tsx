import { Routes, Route } from "react-router";
import { Toaster } from "@/components/ui/sonner";
import { AppProvider } from "@/context/AppContext";
import AppShell from "@/layout/AppShell";
import HomePage from "@/pages/Home";
import DesignsPage from "@/pages/Designs";
import DesignDetailsPage from "@/pages/DesignDetails";
import DesignersPage from "@/pages/Designers";
import DesignerProfilePage from "@/pages/DesignerProfile";
import CompaniesPage from "@/pages/Companies";
import CompanyDetailsPage from "@/pages/CompanyDetails";
import FabricsPage from "@/pages/Fabrics";
import SuppliesPage from "@/pages/Supplies";
import CoursesPage from "@/pages/Courses";
import CourseDetailsPage from "@/pages/CourseDetails";
import PublishPage from "@/pages/Publish";
import CartPage from "@/pages/Cart";
import CheckoutPage from "@/pages/Checkout";
import OrdersPage from "@/pages/Orders";
import OrderDetailsPage from "@/pages/OrderDetails";
import FavoritesPage from "@/pages/Favorites";
import MessagesPage from "@/pages/Messages";
import NotificationsPage from "@/pages/Notifications";
import ProfilePage from "@/pages/Profile";
import SettingsPage from "@/pages/Settings";
import AuthPage from "@/pages/Auth";
import { EmptyState } from "@/components/common";
import { useNavigate } from "react-router";

function NotFound() {
  const navigate = useNavigate();
  return (
    <EmptyState type="search" title="الصفحة غير موجودة" desc="الرابط الذي تحاول الوصول إليه غير متاح"
      actionLabel="العودة للرئيسية" onAction={() => navigate("/")} />
  );
}

export default function App() {
  return (
    <AppProvider>
      <Routes>
        <Route element={<AppShell />}>
          <Route index element={<HomePage />} />
          <Route path="designs" element={<DesignsPage />} />
          <Route path="design/:id" element={<DesignDetailsPage />} />
          <Route path="designers" element={<DesignersPage />} />
          <Route path="designer/:id" element={<DesignerProfilePage />} />
          <Route path="companies" element={<CompaniesPage />} />
          <Route path="company/:id" element={<CompanyDetailsPage />} />
          <Route path="fabrics" element={<FabricsPage />} />
          <Route path="supplies" element={<SuppliesPage />} />
          <Route path="courses" element={<CoursesPage />} />
          <Route path="course/:id" element={<CourseDetailsPage />} />
          <Route path="publish" element={<PublishPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="order/:id" element={<OrderDetailsPage />} />
          <Route path="favorites" element={<FavoritesPage />} />
          <Route path="messages" element={<MessagesPage />} />
          <Route path="messages/:id" element={<MessagesPage />} />
          <Route path="notifications" element={<NotificationsPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="auth" element={<AuthPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <Toaster position="top-center" dir="rtl" richColors closeButton />
    </AppProvider>
  );
}
