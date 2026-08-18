export interface Designer {
  id: string;
  name: string;
  username: string;
  specialty: string;
  rating: number;
  reviewsCount: number;
  followers: number;
  city: string;
  bio: string;
  verified: boolean;
}

export interface Design {
  id: string;
  title: string;
  designerId: string;
  category: string;
  price: number;
  discountPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  colors: string[];
  sizes: string[];
  materials: string[];
  description: string;
  city: string;
  deliveryDays: string;
  tags: string[];
  isNew?: boolean;
}

export interface Company {
  id: string;
  name: string;
  city: string;
  specialty: string;
  clothingType: string;
  description: string;
  rating: number;
  reviewsCount: number;
  productsCount: number;
  followers: number;
  phone: string;
  address: string;
  founded: number;
}

export interface Fabric {
  id: string;
  name: string;
  type: string;
  pricePerMeter: number;
  colors: { name: string; hex: string }[];
  rating: number;
  reviewsCount: number;
  seller: string;
  city: string;
  material: string;
  swatch: string;
}

export interface Supply {
  id: string;
  name: string;
  category: string;
  seller: string;
  price: number;
  discountPrice?: number;
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  icon: string;
  tint: string;
}

export interface Lesson {
  title: string;
  duration: string;
  free?: boolean;
}

export interface Course {
  id: string;
  title: string;
  instructor: string;
  level: "مبتدئ" | "متوسط" | "متقدم";
  duration: string;
  lessonsCount: number;
  rating: number;
  reviewsCount: number;
  price: number;
  discountPrice?: number;
  image: string;
  overview: string;
  curriculum: { section: string; lessons: Lesson[] }[];
}

export interface CartItem {
  id: string;
  kind: "design" | "supply" | "fabric";
  name: string;
  seller: string;
  price: number;
  image?: string;
  swatch?: string;
  qty: number;
  meta?: string;
}

export type OrderStatus = "قيد المعالجة" | "قيد التوصيل" | "مكتملة" | "ملغاة";

export interface Order {
  id: string;
  number: string;
  date: string;
  items: { name: string; qty: number; price: number }[];
  total: number;
  status: OrderStatus;
  address: string;
  payment: string;
  timeline: { label: string; date: string; done: boolean }[];
}

export interface Message {
  id: string;
  fromMe: boolean;
  text: string;
  time: string;
}

export interface Conversation {
  id: string;
  name: string;
  role: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
  messages: Message[];
}

export interface AppNotification {
  id: string;
  category: "طلبات" | "رسائل" | "تصاميم" | "عروض" | "النظام";
  title: string;
  body: string;
  time: string;
  read: boolean;
}
