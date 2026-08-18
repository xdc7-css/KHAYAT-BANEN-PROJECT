import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { toast } from "sonner";
import type { CartItem, Conversation, AppNotification, Order } from "@/types";
import { initialCart, initialConversations, initialNotifications, initialOrders } from "@/data/mockData";

export type AccountType = "عميل" | "خياط" | "مصمم أزياء" | "شركة ملابس" | "متجر مستلزمات";

export interface User {
  name: string;
  username: string;
  bio: string;
  city: string;
  rating: number;
  accountType: AccountType;
}

export const DEFAULT_USER_PROFILE: User = {
  name: "بنين كاظم",
  username: "@banen_k",
  bio: "عاشقة للأزياء والتصاميم الراقية 🎀",
  city: "البصرة",
  rating: 4.8,
  accountType: "عميل",
};

export function sanitizeUser(userData?: Partial<User> | null): User {
  return {
    name: userData?.name && userData.name.trim() !== "" ? userData.name : DEFAULT_USER_PROFILE.name,
    username: userData?.username && userData.username.trim() !== "" ? userData.username : DEFAULT_USER_PROFILE.username,
    bio: userData?.bio && userData.bio.trim() !== "" ? userData.bio : DEFAULT_USER_PROFILE.bio,
    city: userData?.city && userData.city.trim() !== "" ? userData.city : DEFAULT_USER_PROFILE.city,
    rating: userData?.rating ?? DEFAULT_USER_PROFILE.rating,
    accountType: userData?.accountType ?? DEFAULT_USER_PROFILE.accountType,
  };
}

interface AppState {
  user: User;
  isAuthed: boolean;
  login: (name?: string, type?: AccountType) => void;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "qty">, qty?: number) => void;
  removeFromCart: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;
  favorites: string[];
  toggleFavorite: (id: string, label?: string) => void;
  isFavorite: (id: string) => boolean;
  follows: string[];
  toggleFollow: (id: string, label?: string) => void;
  isFollowing: (id: string) => boolean;
  notifications: AppNotification[];
  markAllRead: () => void;
  markRead: (id: string) => void;
  conversations: Conversation[];
  sendMessage: (convId: string, text: string) => void;
  orders: Order[];
  addOrder: (order: Order) => void;
  cartCount: number;
  unreadNotifications: number;
  unreadMessages: number;
}

const Ctx = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [isAuthed, setIsAuthed] = useState(false);
  const [user, setUser] = useState<User>(() => {
    try {
      const saved = localStorage.getItem("khayat_user_profile");
      if (saved) {
        return sanitizeUser(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Failed to parse user state", e);
    }
    return sanitizeUser(null);
  });

  useEffect(() => {
    try {
      localStorage.setItem("khayat_user_profile", JSON.stringify(user));
    } catch (e) {
      console.error("Failed to save user state", e);
    }
  }, [user]);

  const updateProfile = useCallback((updates: Partial<User>) => {
    setUser((prev) => sanitizeUser({ ...prev, ...updates }));
  }, []);

  const [cart, setCart] = useState<CartItem[]>(initialCart);
  const [favorites, setFavorites] = useState<string[]>(["p2", "p5", "d1", "c4", "f1"]);
  const [follows, setFollows] = useState<string[]>(["d5"]);
  const [notifications, setNotifications] = useState<AppNotification[]>(initialNotifications);
  const [conversations, setConversations] = useState<Conversation[]>(initialConversations);
  const [orders, setOrders] = useState<Order[]>(initialOrders);

  const login = useCallback((name?: string, type?: AccountType) => {
    setIsAuthed(true);
    setUser((prev) =>
      sanitizeUser({
        ...prev,
        name: name && name.trim() !== "" ? name : prev.name,
        accountType: type ?? prev.accountType,
      })
    );
    toast.success("تم تسجيل الدخول بنجاح", { description: "أهلًا بك في منصة خياط" });
  }, []);

  const logout = useCallback(() => {
    setIsAuthed(false);
    toast.success("تم تسجيل الخروج");
  }, []);

  const addToCart = useCallback((item: Omit<CartItem, "qty">, qty = 1) => {
    setCart((c) => {
      const ex = c.find((i) => i.id === item.id);
      if (ex) return c.map((i) => (i.id === item.id ? { ...i, qty: i.qty + qty } : i));
      return [...c, { ...item, qty }];
    });
    toast.success("تمت الإضافة إلى السلة", { description: item.name });
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCart((c) => c.filter((i) => i.id !== id));
    toast.success("تم حذف المنتج من السلة");
  }, []);

  const updateQty = useCallback((id: string, qty: number) => {
    setCart((c) => (qty <= 0 ? c.filter((i) => i.id !== id) : c.map((i) => (i.id === id ? { ...i, qty } : i))));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const toggleFavorite = useCallback((id: string, label?: string) => {
    setFavorites((f) => {
      const has = f.includes(id);
      toast.success(has ? "تمت الإزالة من المفضلة" : "تمت الإضافة إلى المفضلة", { description: label });
      return has ? f.filter((x) => x !== id) : [...f, id];
    });
  }, []);

  const isFavorite = useCallback((id: string) => favorites.includes(id), [favorites]);

  const toggleFollow = useCallback((id: string, label?: string) => {
    setFollows((f) => {
      const has = f.includes(id);
      toast.success(has ? "تم إلغاء المتابعة" : "تمت المتابعة", { description: label });
      return has ? f.filter((x) => x !== id) : [...f, id];
    });
  }, []);

  const isFollowing = useCallback((id: string) => follows.includes(id), [follows]);

  const markAllRead = useCallback(() => {
    setNotifications((n) => n.map((x) => ({ ...x, read: true })));
    toast.success("تم تعليم جميع الإشعارات كمقروءة");
  }, []);

  const markRead = useCallback((id: string) => {
    setNotifications((n) => n.map((x) => (x.id === id ? { ...x, read: true } : x)));
  }, []);

  const sendMessage = useCallback((convId: string, text: string) => {
    const time = new Date().toLocaleTimeString("ar-EG-u-nu-latn", { hour: "2-digit", minute: "2-digit" });
    setConversations((cs) =>
      cs.map((c) =>
        c.id === convId
          ? { ...c, messages: [...c.messages, { id: `mm${Date.now()}`, fromMe: true, text, time }], lastMessage: text, time: "الآن" }
          : c
      )
    );
    // simulated auto reply
    setTimeout(() => {
      setConversations((cs) =>
        cs.map((c) =>
          c.id === convId
            ? {
                ...c,
                messages: [...c.messages, { id: `mm${Date.now()}r`, fromMe: false, text: "شكرًا لتواصلك، سنرد عليك في أقرب وقت", time }],
                lastMessage: "شكرًا لتواصلك، سنرد عليك في أقرب وقت",
              }
            : c
        )
      );
    }, 1500);
  }, []);

  const addOrder = useCallback((order: Order) => {
    setOrders((o) => [order, ...o]);
  }, []);

  const value = useMemo<AppState>(
    () => ({
      user, isAuthed, login, logout, updateProfile,
      cart, addToCart, removeFromCart, updateQty, clearCart,
      favorites, toggleFavorite, isFavorite,
      follows, toggleFollow, isFollowing,
      notifications, markAllRead, markRead,
      conversations, sendMessage,
      orders, addOrder,
      cartCount: cart.reduce((s, i) => s + i.qty, 0),
      unreadNotifications: notifications.filter((n) => !n.read).length,
      unreadMessages: conversations.reduce((s, c) => s + c.unread, 0),
    }),
    [user, isAuthed, login, logout, updateProfile, cart, addToCart, removeFromCart, updateQty, clearCart, favorites, toggleFavorite, isFavorite, follows, toggleFollow, isFollowing, notifications, markAllRead, markRead, conversations, sendMessage, orders, addOrder]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useApp() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
}
