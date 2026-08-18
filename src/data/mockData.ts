import type {
  Designer, Design, Company, Fabric, Supply, Course, Order, Conversation, AppNotification, CartItem,
} from "@/types";

export const CITIES = ["القاهرة", "الإسكندرية", "الجيزة", "المنصورة", "طنطا", "أسيوط", "الإسماعيلية"];

export const DESIGN_CATEGORIES = [
  "فساتين", "عبايات", "بدلات", "ملابس رجالية", "ملابس أطفال", "ملابس نسائية", "ملابس مناسبات", "تصاميم خاصة",
];

export const SIZES = ["S", "M", "L", "XL", "XXL"];

export const COLOR_OPTIONS = [
  { name: "عنابي", hex: "#5B2333" },
  { name: "ذهبي", hex: "#D7B45A" },
  { name: "أسود", hex: "#1C1A1C" },
  { name: "كريمي", hex: "#F1E7D7" },
  { name: "كحلي", hex: "#1F2A44" },
  { name: "زيتي", hex: "#4A5540" },
  { name: "بودري", hex: "#D9A7A0" },
  { name: "أبيض", hex: "#FFFFFF" },
];

export const designers: Designer[] = [
  { id: "d1", name: "سارة النجار", username: "@sara_najjar", specialty: "فساتين سهرة ومناسبات", rating: 4.9, reviewsCount: 342, followers: 12800, city: "القاهرة", bio: "مصممة أزياء متخصصة في فساتين السهرة والزفاف بخبرة ١٢ عامًا، أعمل بأجود الأقمشة الفرنسية والإيطالية.", verified: true },
  { id: "d2", name: "أحمد الشريف", username: "@ahmed_tailor", specialty: "بدلات رجالية كلاسيكية", rating: 4.8, reviewsCount: 518, followers: 21400, city: "الإسكندرية", bio: "خياط رجالي بخبرة عائلية تمتد لثلاثة أجيال، متخصص في البدلات الإيطالية القصّة والتفصيل الملكي.", verified: true },
  { id: "d3", name: "منى عبد الرحمن", username: "@mona_abaya", specialty: "عبايات خليجية فاخرة", rating: 4.7, reviewsCount: 289, followers: 9600, city: "الجيزة", bio: "مصممة عبايات تجمع بين الأصالة والحداثة، تطريز يدوي وخامات مستوردة.", verified: true },
  { id: "d4", name: "هبة فؤاد", username: "@heba_kids", specialty: "ملابس أطفال راقية", rating: 4.6, reviewsCount: 167, followers: 5400, city: "المنصورة", bio: "مصممة ملابس أطفال، أهتم بالراحة والجودة والتفاصيل المبهجة.", verified: false },
  { id: "d5", name: "ليلى حسان", username: "@laila_hassan", specialty: "تصاميم خاصة وهوت كوتور", rating: 4.9, reviewsCount: 203, followers: 18200, city: "القاهرة", bio: "دار أزياء خاصة للقطع الفريدة، كل تصميم يُنفذ مرة واحدة فقط.", verified: true },
  { id: "d6", name: "خالد مراد", username: "@khaled_mourad", specialty: "قمصان وملابس رجالية", rating: 4.5, reviewsCount: 431, followers: 7800, city: "طنطا", bio: "تفصيل قمصان وأطقم رجالية بمقاسات دقيقة وخدمة تعديل مجانية.", verified: false },
];

const img = (n: string) => `/images/${n}`;

export const designs: Design[] = [
  { id: "p1", title: "فستان سهرة مخملي بتطريز ذهبي", designerId: "d1", category: "فساتين", price: 2850, discountPrice: 2280, rating: 4.9, reviewsCount: 128, image: img("design-evening-dress.jpg"), colors: ["#5B2333", "#1F2A44", "#1C1A1C"], sizes: ["S", "M", "L"], materials: ["مخمل إيطالي", "خيوط تطريز ذهبية", "بطانة حرير"], description: "فستان سهرة فاخر من المخمل الإيطالي بلون عنابي عميق، مزيّن بتطريز ذهبي يدوي على الصدر والأكمام. قصّة انسيابية تناسب جميع القوام، مع بطانة حرير ناعمة.", city: "القاهرة", deliveryDays: "٥ - ٧ أيام عمل", tags: ["سهرة", "مخمل", "تطريز"], isNew: true },
  { id: "p2", title: "عباية كلاسيكية بأكمام مطرزة", designerId: "d3", category: "عبايات", price: 1450, rating: 4.8, reviewsCount: 96, image: img("design-abaya.jpg"), colors: ["#1C1A1C"], sizes: ["S", "M", "L", "XL"], materials: ["كريب ياباني", "تطريز ذهبي"], description: "عباية سوداء كلاسيكية بقصّة خليجية انسيابية، أكمام مطرزة بخيوط ذهبية فاخرة، خامة كريب ياباني لا تحتاج كيّ.", city: "الجيزة", deliveryDays: "٣ - ٥ أيام عمل", tags: ["عباية", "خليجي", "تطريز"] },
  { id: "p3", title: "بدلة رجالية إيطالية القصّة", designerId: "d2", category: "بدلات", price: 5200, rating: 4.9, reviewsCount: 214, image: img("design-suit.jpg"), colors: ["#1F2A44", "#3A3A3A", "#5B2333"], sizes: ["M", "L", "XL", "XXL"], materials: ["صوف إيطالي ١٥٠s", "بطانة فيسكوز"], description: "بدلة رجالية بقصّة إيطالية حديثة، صوف فاخر ١٥٠s، تفصيل دقيق على المقاس مع بروفة مجانية وتعديلات غير محدودة.", city: "الإسكندرية", deliveryDays: "١٠ - ١٤ يوم عمل", tags: ["بدلة", "رجالي", "صوف"] },
  { id: "p4", title: "فستان أطفال للمناسبات", designerId: "d4", category: "ملابس أطفال", price: 780, discountPrice: 620, rating: 4.7, reviewsCount: 58, image: img("design-kids.jpg"), colors: ["#F1E7D7", "#D9A7A0"], sizes: ["S", "M", "L"], materials: ["قطن مضلع", "تول ناعم"], description: "فستان أطفال أنيق للمناسبات بلون كريمي مع تفاصيل ذهبية ناعمة، خامات قطنية آمنة على بشرة الأطفال.", city: "المنصورة", deliveryDays: "٢ - ٤ أيام عمل", tags: ["أطفال", "مناسبات"], isNew: true },
  { id: "p5", title: "فستان زفاف بدانتيل فرنسي", designerId: "d1", category: "ملابس مناسبات", price: 12500, rating: 5.0, reviewsCount: 41, image: img("design-bridal.jpg"), colors: ["#FFFFFF", "#F1E7D7"], sizes: ["S", "M", "L"], materials: ["دانتيل فرنسي", "ساتان دوقس", "لؤلؤ صناعي"], description: "فستان زفاف ملكي بدانتيل فرنسي مطرز باللؤلؤ، ذيل طويل قابل للفصل، يشمل بروفتين وتعديلات مجانية.", city: "القاهرة", deliveryDays: "٢١ - ٣٠ يوم عمل", tags: ["زفاف", "دانتيل", "هوت كوتور"] },
  { id: "p6", title: "فستان سهرة ساتان بقصّة حورية", designerId: "d5", category: "فساتين", price: 3400, rating: 4.6, reviewsCount: 73, image: img("design-evening-dress.jpg"), colors: ["#1F2A44", "#4A5540"], sizes: ["S", "M", "L", "XL"], materials: ["ساتان دوقس"], description: "فستان سهرة من الساتان اللامع بقصّة حورية تبرز القوام بأناقة، متوفر بالكحلي والزيتي.", city: "القاهرة", deliveryDays: "٥ - ٧ أيام عمل", tags: ["سهرة", "ساتان"] },
  { id: "p7", title: "عباية كاجوال يومية عملية", designerId: "d3", category: "عبايات", price: 890, discountPrice: 750, rating: 4.5, reviewsCount: 142, image: img("design-abaya.jpg"), colors: ["#1C1A1C", "#4A5540", "#5B2333"], sizes: ["S", "M", "L", "XL", "XXL"], materials: ["ندى كوري"], description: "عباية يومية خفيفة بجيوب جانبية وسحّاب أمامي، مثالية للمشاوير والعمل.", city: "الجيزة", deliveryDays: "٢ - ٣ أيام عمل", tags: ["عباية", "يومي"] },
  { id: "p8", title: "قميص رجالي قطن مفصّل", designerId: "d6", category: "ملابس رجالية", price: 650, rating: 4.6, reviewsCount: 187, image: img("design-suit.jpg"), colors: ["#FFFFFF", "#1F2A44", "#F1E7D7"], sizes: ["M", "L", "XL", "XXL"], materials: ["قطن مصري ١٠٠٪"], description: "قميص قطن مصري فاخر بتفصيل دقيق على المقاس، ياقة إيطالية وأزرار صدف طبيعي.", city: "طنطا", deliveryDays: "٣ - ٥ أيام عمل", tags: ["قميص", "قطن"] },
  { id: "p9", title: "طقم أطفال ولادي أنيق", designerId: "d4", category: "ملابس أطفال", price: 540, rating: 4.4, reviewsCount: 39, image: img("design-kids.jpg"), colors: ["#1F2A44", "#F1E7D7"], sizes: ["S", "M", "L"], materials: ["قطن", "كتان خفيف"], description: "طقم ولادي من قطعتين بقميص كتان وبنطال قطن، مريح وأنيق للمناسبات العائلية.", city: "المنصورة", deliveryDays: "٢ - ٤ أيام عمل", tags: ["أطفال", "طقم"] },
  { id: "p10", title: "فستان خطوبة مزخرف بالترتر", designerId: "d5", category: "ملابس مناسبات", price: 4600, discountPrice: 3900, rating: 4.8, reviewsCount: 52, image: img("design-bridal.jpg"), colors: ["#D9A7A0", "#D7B45A"], sizes: ["S", "M", "L"], materials: ["تول مطرز", "ترتر فاخر"], description: "فستان خطوبة حالم من التول المطرز بالترتر اللامع، تصميم حصري يُنفذ مرة واحدة.", city: "القاهرة", deliveryDays: "١٤ - ٢١ يوم عمل", tags: ["خطوبة", "ترتر", "حصري"] },
  { id: "p11", title: "بليزر نسائي رسمي بقصّة عصرية", designerId: "d1", category: "ملابس نسائية", price: 1650, rating: 4.7, reviewsCount: 88, image: img("design-evening-dress.jpg"), colors: ["#1C1A1C", "#5B2333", "#F1E7D7"], sizes: ["S", "M", "L", "XL"], materials: ["كريب إيطالي"], description: "بليزر نسائي رسمي بقصّة عصرية مناسبة للعمل والمناسبات، خياطة متقنة وبطانة ناعمة.", city: "القاهرة", deliveryDays: "٤ - ٦ أيام عمل", tags: ["بليزر", "رسمي"] },
  { id: "p12", title: "تصميم خاص حسب الطلب", designerId: "d5", category: "تصاميم خاصة", price: 6000, rating: 4.9, reviewsCount: 34, image: img("hero.jpg"), colors: ["#5B2333", "#1C1A1C", "#D7B45A"], sizes: ["S", "M", "L", "XL"], materials: ["حسب الاختيار"], description: "خدمة تصميم خاص بالكامل: جلسة استشارة، رسم التصميم، اختيار الخامات، وتنفيذ قطعة فريدة لا تتكرر.", city: "القاهرة", deliveryDays: "حسب التصميم", tags: ["خاص", "هوت كوتور"], isNew: true },
];

export const companies: Company[] = [
  { id: "c1", name: "مفروشات الأناقة", city: "القاهرة", specialty: "مفروشات وستائر فاخرة", clothingType: "منزلية", description: "شركة متخصصة في المفروشات الفندقية والستائر المفصّلة، خامات مستوردة وتشطيب راقٍ للمنازل والفنادق.", rating: 4.7, reviewsCount: 320, productsCount: 145, followers: 8900, phone: "0100 123 4567", address: "١٥ شارع التحرير، الدقي، الجيزة", founded: 2009 },
  { id: "c2", name: "مصنع النخبة للملابس", city: "العاشر من رمضان", specialty: "تصنيع ملابس بالجملة", clothingType: "رجالية ونسائية", description: "مصنع ملابس جاهزة بقدرة إنتاجية ٥٠ ألف قطعة شهريًا، نخدم البراندات الناشئة والمتاجر بجودة تصدير.", rating: 4.5, reviewsCount: 512, productsCount: 380, followers: 15600, phone: "0111 234 5678", address: "المنطقة الصناعية الثالثة، العاشر من رمضان", founded: 2001 },
  { id: "c3", name: "شركة زهرة الربيع", city: "الإسكندرية", specialty: "ملابس نسائية كاجوال", clothingType: "نسائية", description: "براند نسائي يقدم تشكيلات موسمية عصرية بأسعار مناسبة، تصميمات شبابية وخامات مريحة.", rating: 4.3, reviewsCount: 278, productsCount: 210, followers: 6200, phone: "0122 345 6789", address: "٢٣ شارع فؤاد، محطة الرمل، الإسكندرية", founded: 2015 },
  { id: "c4", name: "دار الكوثر للعبايات", city: "الجيزة", specialty: "عبايات وملابس محتشمة", clothingType: "عبايات", description: "دار متخصصة في العبايات الفاخرة والملابس المحتشمة، تطريز يدوي وتصميمات خليجية أصيلة.", rating: 4.8, reviewsCount: 194, productsCount: 96, followers: 11400, phone: "0100 987 6543", address: "٧ شارع الهرم الرئيسي، الجيزة", founded: 2012 },
  { id: "c5", name: "ورشة الفن للتطريز", city: "طنطا", specialty: "تطريز يدوي وماكينات", clothingType: "خدمات تطريز", description: "ورشة تطريز متكاملة تخدم المصممين والمصانع، تطريز يدوي فاخر وتطريز ماكينات كمبيوتر بدقة عالية.", rating: 4.6, reviewsCount: 147, productsCount: 62, followers: 4300, phone: "0106 555 1234", address: "شارع سعيد، طنطا، الغربية", founded: 2018 },
  { id: "c6", name: "شركة النسيج الحديث", city: "المحلة الكبرى", specialty: "أقمشة وتجهيز مصانع", clothingType: "أقمشة", description: "مورّد أقمشة للمصانع ودور الأزياء، قطن مصري وخامات مستوردة بأسعار الجملة.", rating: 4.4, reviewsCount: 236, productsCount: 175, followers: 5100, phone: "0122 777 8899", address: "المنطقة الصناعية، المحلة الكبرى", founded: 2005 },
];

export const fabrics: Fabric[] = [
  { id: "f1", name: "حرير طبيعي فاخر", type: "حرير", pricePerMeter: 850, colors: [{ name: "عنابي", hex: "#5B2333" }, { name: "ذهبي", hex: "#D7B45A" }, { name: "كحلي", hex: "#1F2A44" }], rating: 4.9, reviewsCount: 87, seller: "محلات الحرير الملكي", city: "القاهرة", material: "حرير ١٠٠٪", swatch: "#5B2333" },
  { id: "f2", name: "قطن مصري طويل التيلة", type: "قطن", pricePerMeter: 220, colors: [{ name: "أبيض", hex: "#FFFFFF" }, { name: "كريمي", hex: "#F1E7D7" }, { name: "سماوي", hex: "#A8C3D1" }], rating: 4.8, reviewsCount: 154, seller: "شركة النسيج الحديث", city: "المحلة الكبرى", material: "قطن ١٠٠٪", swatch: "#F1E7D7" },
  { id: "f3", name: "ساتان دوقس لامع", type: "ساتان", pricePerMeter: 340, colors: [{ name: "بودري", hex: "#D9A7A0" }, { name: "عنابي", hex: "#5B2333" }, { name: "زيتي", hex: "#4A5540" }], rating: 4.6, reviewsCount: 93, seller: "أقمشة باريس", city: "القاهرة", material: "بوليستر ساتان", swatch: "#D9A7A0" },
  { id: "f4", name: "كتان طبيعي للصيف", type: "كتان", pricePerMeter: 280, colors: [{ name: "بيج", hex: "#D8C9AE" }, { name: "أبيض", hex: "#FFFFFF" }, { name: "زيتي", hex: "#4A5540" }], rating: 4.7, reviewsCount: 66, seller: "بيت الكتان", city: "الإسكندرية", material: "كتان ١٠٠٪", swatch: "#D8C9AE" },
  { id: "f5", name: "شيفون حرير انسيابي", type: "شيفون", pricePerMeter: 190, colors: [{ name: "أسود", hex: "#1C1A1C" }, { name: "بودري", hex: "#D9A7A0" }, { name: "كحلي", hex: "#1F2A44" }], rating: 4.5, reviewsCount: 112, seller: "أقمشة باريس", city: "القاهرة", material: "شيفون بولي", swatch: "#1C1A1C" },
  { id: "f6", name: "مخمل إيطالي قطيفة", type: "مخمل", pricePerMeter: 520, colors: [{ name: "عنابي", hex: "#5B2333" }, { name: "كحلي", hex: "#1F2A44" }, { name: "أسود", hex: "#1C1A1C" }], rating: 4.8, reviewsCount: 71, seller: "محلات الحرير الملكي", city: "القاهرة", material: "مخمل قطن", swatch: "#1F2A44" },
  { id: "f7", name: "جورجيت مطرز بالخيوط الفضية", type: "جورجيت", pricePerMeter: 460, colors: [{ name: "كريمي", hex: "#F1E7D7" }, { name: "بودري", hex: "#D9A7A0" }], rating: 4.7, reviewsCount: 45, seller: "دار الأقمشة الفاخرة", city: "الجيزة", material: "جورجيت مطرز", swatch: "#D9A7A0" },
  { id: "f8", name: "تول مطرز بالترتر", type: "أقمشة مطرزة", pricePerMeter: 610, colors: [{ name: "ذهبي", hex: "#D7B45A" }, { name: "فضي", hex: "#C9C9CF" }], rating: 4.9, reviewsCount: 38, seller: "دار الأقمشة الفاخرة", city: "الجيزة", material: "تول + ترتر", swatch: "#D7B45A" },
];

export const supplies: Supply[] = [
  { id: "s1", name: "ماكينة خياطة سنجر كهربائية", category: "ماكينات خياطة", seller: "مستلزمات البرنس", price: 7500, discountPrice: 6750, rating: 4.8, reviewsCount: 231, inStock: true, icon: "cog", tint: "#EFE9F2" },
  { id: "s2", name: "طقم خيوط بوليستر ٤٠ لون", category: "خيوط", seller: "بيت الخياطة", price: 240, rating: 4.6, reviewsCount: 418, inStock: true, icon: "spool", tint: "#F6EDD8" },
  { id: "s3", name: "إبر يدوية وماكينة (٥٠ قطعة)", category: "إبر", seller: "بيت الخياطة", price: 85, rating: 4.7, reviewsCount: 356, inStock: true, icon: "pin", tint: "#EFE9F2" },
  { id: "s4", name: "مقص خياط احترافي ١٠ بوصة", category: "مقصات", seller: "عدد وأدوات", price: 320, discountPrice: 265, rating: 4.9, reviewsCount: 189, inStock: true, icon: "scissors", tint: "#F6EDD8" },
  { id: "s5", name: "أزرار صدف طبيعي (١٠٠ قطعة)", category: "أزرار", seller: "إكسسوارات الأناقة", price: 150, rating: 4.5, reviewsCount: 97, inStock: true, icon: "circle-dot", tint: "#EFE9F2" },
  { id: "s6", name: "سحابات نايلون ألوان (٢٥ قطعة)", category: "سحابات", seller: "إكسسوارات الأناقة", price: 175, rating: 4.4, reviewsCount: 143, inStock: false, icon: "archive", tint: "#F6EDD8" },
  { id: "s7", name: "شريط قياس + مسطرة تفصيل", category: "أدوات قياس", seller: "عدد وأدوات", price: 95, rating: 4.8, reviewsCount: 264, inStock: true, icon: "ruler", tint: "#EFE9F2" },
  { id: "s8", name: "طقم دبابيس وكشتبان وطباشير", category: "إكسسوارات الخياطة", seller: "بيت الخياطة", price: 120, discountPrice: 99, rating: 4.6, reviewsCount: 178, inStock: true, icon: "gem", tint: "#F6EDD8" },
];

export const courses: Course[] = [
  {
    id: "k1", title: "أساسيات الخياطة من الصفر", instructor: "أ. سميرة عبد العزيز", level: "مبتدئ", duration: "٨ ساعات", lessonsCount: 24, rating: 4.9, reviewsCount: 1240, price: 450, discountPrice: 299, image: img("hero.jpg"),
    overview: "دورة شاملة للمبتدئين تمامًا: تتعلمين التعامل مع الماكينة، الغرز الأساسية، قراءة الباترون البسيط، وتنفيذ أول قطعة كاملة بنفسك.",
    curriculum: [
      { section: "التعرف على الماكينة والأدوات", lessons: [{ title: "مكونات ماكينة الخياطة", duration: "١٨ دقيقة", free: true }, { title: "أدوات القياس والقص", duration: "١٥ دقيقة", free: true }, { title: "أنواع الإبر والخيوط", duration: "١٢ دقيقة" }] },
      { section: "الغرز الأساسية", lessons: [{ title: "الغرزة المستقيمة والتعرج", duration: "٢٠ دقيقة" }, { title: "السرفلة والتنظيف", duration: "١٦ دقيقة" }, { title: "تثبيت الأزرار والسحابات", duration: "٢٢ دقيقة" }] },
      { section: "مشروعك الأول", lessons: [{ title: "تنفيذ مريلة مطبخ", duration: "٣٥ دقيقة" }, { title: "تنفيذ تنورة بسيطة", duration: "٤٥ دقيقة" }] },
    ],
  },
  {
    id: "k2", title: "فن تفصيل الباترون الاحترافي", instructor: "م. هشام رمزي", level: "متوسط", duration: "١٢ ساعة", lessonsCount: 32, rating: 4.8, reviewsCount: 860, price: 750, image: img("design-suit.jpg"),
    overview: "تعلم رسم الباترون الأساسي والتحويلات، باترون الفساتين والبنطلونات والجاكيت، مع تطبيقات عملية على مقاسات حقيقية.",
    curriculum: [
      { section: "أساسيات الباترون", lessons: [{ title: "أخذ المقاسات بدقة", duration: "٢٥ دقيقة", free: true }, { title: "رسم الباترون الأساسي", duration: "٤٠ دقيقة" }] },
      { section: "التحويلات والموديلات", lessons: [{ title: "تحويل البنسات", duration: "٣٠ دقيقة" }, { title: "باترون الكم بأنواعه", duration: "٣٥ دقيقة" }, { title: "باترون الياقات", duration: "٢٨ دقيقة" }] },
      { section: "تطبيقات متقدمة", lessons: [{ title: "باترون الجاكيت النسائي", duration: "٥٠ دقيقة" }, { title: "باترون البنطلون", duration: "٤٥ دقيقة" }] },
    ],
  },
  {
    id: "k3", title: "التطريز اليدوي الفاخر", instructor: "أ. فاطمة الزهراء", level: "متقدم", duration: "٦ ساعات", lessonsCount: 18, rating: 4.9, reviewsCount: 530, price: 600, image: img("design-bridal.jpg"),
    overview: "احترفي التطريز اليدوي بخيوط الذهب واللؤلؤ والترتر: تقنيات دور الأزياء العالمية لتزيين الفساتين والعبايات.",
    curriculum: [
      { section: "أدوات وخامات التطريز", lessons: [{ title: "الخيوط والإبر الخاصة", duration: "١٤ دقيقة", free: true }, { title: "تجهيز القماش والطارة", duration: "١٠ دقائق" }] },
      { section: "تقنيات التطريز", lessons: [{ title: "غرزة السلسلة والحشو", duration: "٢٥ دقيقة" }, { title: "تطريز الترتر واللؤلؤ", duration: "٣٠ دقيقة" }, { title: "التطريز بخيط الذهب", duration: "٣٥ دقيقة" }] },
    ],
  },
  {
    id: "k4", title: "تصميم الأزياء بالحاسوب", instructor: "م. يوسف النقيب", level: "متوسط", duration: "١٠ ساعات", lessonsCount: 28, rating: 4.7, reviewsCount: 690, price: 850, discountPrice: 640, image: img("design-evening-dress.jpg"),
    overview: "من الرسم اليدوي إلى التصميم الرقمي: تعلم برامج تصميم الأزياء، إنشاء الباترونات الرقمية، وعرض التصميم ثلاثي الأبعاد.",
    curriculum: [
      { section: "مدخل للتصميم الرقمي", lessons: [{ title: "واجهة البرنامج والأدوات", duration: "٢٠ دقيقة", free: true }] },
      { section: "رسم التصاميم", lessons: [{ title: "رسم المجسم والبورتريه", duration: "٣٥ دقيقة" }, { title: "تلوين وإضافة الخامات", duration: "٣٠ دقيقة" }] },
      { section: "الباترون الرقمي", lessons: [{ title: "إنشاء باترون رقمي كامل", duration: "٥٥ دقيقة" }] },
    ],
  },
  {
    id: "k5", title: "خياطة العبايات خطوة بخطوة", instructor: "أ. منى عبد الرحمن", level: "مبتدئ", duration: "٥ ساعات", lessonsCount: 15, rating: 4.8, reviewsCount: 445, price: 380, image: img("design-abaya.jpg"),
    overview: "دورة عملية لتفصيل وخياطة العبايات بقصّات مختلفة: الخليجية، والكاجوال، والمطرزة، من القماش حتى القطعة النهائية.",
    curriculum: [
      { section: "الباترون والقص", lessons: [{ title: "باترون العباية الأساسي", duration: "٣٠ دقيقة", free: true }, { title: "القص على القماش", duration: "٢٥ دقيقة" }] },
      { section: "التجميع والتشطيب", lessons: [{ title: "خياطة الأكتاف والأكمام", duration: "٣٥ دقيقة" }, { title: "إضافة التطريز والإكسسوار", duration: "٣٠ دقيقة" }] },
    ],
  },
  {
    id: "k6", title: "إدارة مشغل خياطة ناجح", instructor: "د. كريم عادل", level: "متقدم", duration: "٧ ساعات", lessonsCount: 20, rating: 4.6, reviewsCount: 310, price: 950, image: img("design-kids.jpg"),
    overview: "دورة إدارية لأصحاب المشاغل: التسعير، إدارة العمالة والطلبيات، التسويق، وتوسيع النشاط باحترافية.",
    curriculum: [
      { section: "التأسيس والتسعير", lessons: [{ title: "دراسة الجدوى المبسطة", duration: "٢٥ دقيقة", free: true }, { title: "تسعير الخدمات بدقة", duration: "٣٠ دقيقة" }] },
      { section: "التشغيل والتسويق", lessons: [{ title: "إدارة الطلبيات والمواعيد", duration: "٣٥ دقيقة" }, { title: "التسويق عبر السوشيال ميديا", duration: "٤٠ دقيقة" }] },
    ],
  },
];

export const initialCart: CartItem[] = [
  { id: "cart-1", kind: "design", name: "فستان سهرة مخملي بتطريز ذهبي", seller: "سارة النجار", price: 2280, image: img("design-evening-dress.jpg"), qty: 1, meta: "مقاس M — عنابي" },
  { id: "cart-2", kind: "supply", name: "طقم خيوط بوليستر ٤٠ لون", seller: "بيت الخياطة", price: 240, swatch: "#F6EDD8", qty: 2, meta: "قطعة" },
];

export const initialOrders: Order[] = [
  { id: "o1", number: "KH-2024-1847", date: "١٢ أغسطس ٢٠٢٤", items: [{ name: "عباية كلاسيكية بأكمام مطرزة", qty: 1, price: 1450 }, { name: "شريط قياس + مسطرة تفصيل", qty: 1, price: 95 }], total: 1595, status: "قيد التوصيل", address: "١٢ شارع الجامعة، الدقي، الجيزة", payment: "الدفع عند الاستلام", timeline: [
    { label: "تم استلام الطلب", date: "١٢ أغسطس، ١٠:٢٣ ص", done: true },
    { label: "جاري التجهيز", date: "١٢ أغسطس، ٠٢:٤٥ م", done: true },
    { label: "تم الشحن", date: "١٣ أغسطس، ١١:١٠ ص", done: true },
    { label: "قيد التوصيل", date: "اليوم، ٠٩:٣٠ ص", done: true },
    { label: "تم التسليم", date: "—", done: false },
  ] },
  { id: "o2", number: "KH-2024-1802", date: "٥ أغسطس ٢٠٢٤", items: [{ name: "حرير طبيعي فاخر (٣ أمتار)", qty: 3, price: 850 }], total: 2550, status: "قيد المعالجة", address: "١٢ شارع الجامعة، الدقي، الجيزة", payment: "بطاقة مصرفية", timeline: [
    { label: "تم استلام الطلب", date: "٥ أغسطس، ٠٨:١٥ م", done: true },
    { label: "جاري التجهيز", date: "—", done: false },
    { label: "تم الشحن", date: "—", done: false },
    { label: "قيد التوصيل", date: "—", done: false },
    { label: "تم التسليم", date: "—", done: false },
  ] },
  { id: "o3", number: "KH-2024-1654", date: "٢١ يوليو ٢٠٢٤", items: [{ name: "قميص رجالي قطن مفصّل", qty: 2, price: 650 }], total: 1300, status: "مكتملة", address: "١٢ شارع الجامعة، الدقي، الجيزة", payment: "الدفع الإلكتروني", timeline: [
    { label: "تم استلام الطلب", date: "٢١ يوليو، ١٢:٠٠ م", done: true },
    { label: "جاري التجهيز", date: "٢١ يوليو، ٠٤:٢٠ م", done: true },
    { label: "تم الشحن", date: "٢٢ يوليو، ١٠:٠٠ ص", done: true },
    { label: "قيد التوصيل", date: "٢٣ يوليو، ٠١:٣٠ م", done: true },
    { label: "تم التسليم", date: "٢٣ يوليو، ٠٥:١٥ م", done: true },
  ] },
  { id: "o4", number: "KH-2024-1521", date: "٣ يوليو ٢٠٢٤", items: [{ name: "مقص خياط احترافي ١٠ بوصة", qty: 1, price: 265 }], total: 265, status: "ملغاة", address: "١٢ شارع الجامعة، الدقي، الجيزة", payment: "الدفع عند الاستلام", timeline: [
    { label: "تم استلام الطلب", date: "٣ يوليو، ٠٩:٤٠ ص", done: true },
    { label: "تم الإلغاء بناءً على طلبك", date: "٣ يوليو، ١٢:٠٥ م", done: true },
  ] },
];

export const initialConversations: Conversation[] = [
  { id: "m1", name: "سارة النجار", role: "مصممة أزياء", lastMessage: "تمام، هجهز لك البروفة يوم الخميس إن شاء الله", time: "١٠:٤٢ ص", unread: 2, online: true, messages: [
    { id: "mm1", fromMe: false, text: "أهلًا بك، شفت طلبك لفستان السهرة. محتاجة تأكيد المقاسات", time: "١٠:١٥ ص" },
    { id: "mm2", fromMe: true, text: "أهلًا أستاذة سارة، المقاس M زي ما هو مكتوب في الطلب", time: "١٠:٢٨ ص" },
    { id: "mm3", fromMe: false, text: "ممتاز. الطول حيبقى ١٤٥ سم، مناسب لك؟", time: "١٠:٣٥ ص" },
    { id: "mm4", fromMe: true, text: "نعم مناسب جدًا، شكرًا", time: "١٠:٤٠ ص" },
    { id: "mm5", fromMe: false, text: "تمام، هجهز لك البروفة يوم الخميس إن شاء الله", time: "١٠:٤٢ ص" },
  ] },
  { id: "m2", name: "دار الكوثر للعبايات", role: "شركة ملابس", lastMessage: "وصلك خصم ١٥٪ على تشكيلة العبايات الجديدة", time: "أمس", unread: 1, online: false, messages: [
    { id: "mm6", fromMe: false, text: "مساء الخير، تشكيلتنا الجديدة للعبايات الخليجية وصلت", time: "أمس ٠٨:٠٠ م" },
    { id: "mm7", fromMe: false, text: "وصلك خصم ١٥٪ على تشكيلة العبايات الجديدة", time: "أمس ٠٨:٠١ م" },
  ] },
  { id: "m3", name: "أحمد الشريف", role: "خياط رجالي", lastMessage: "البدلة جاهزة، ممكن تستلمها من المحل أي وقت", time: "الإثنين", unread: 0, online: false, messages: [
    { id: "mm8", fromMe: true, text: "أستاذ أحمد، البدلة خلصت؟", time: "الإثنين ١١:٠٠ ص" },
    { id: "mm9", fromMe: false, text: "البدلة جاهزة، ممكن تستلمها من المحل أي وقت", time: "الإثنين ٠١:٢٠ م" },
  ] },
  { id: "m4", name: "بيت الخياطة", role: "متجر مستلزمات", lastMessage: "شكرًا لتسوقك معنا", time: "١٠ يوليو", unread: 0, online: true, messages: [
    { id: "mm10", fromMe: false, text: "شكرًا لتسوقك معنا", time: "١٠ يوليو ٠٣:٠٠ م" },
  ] },
];

export const initialNotifications: AppNotification[] = [
  { id: "n1", category: "طلبات", title: "طلبك في الطريق", body: "الطلب KH-2024-1847 خرج للتوصيل وسيصلك اليوم", time: "منذ ساعة", read: false },
  { id: "n2", category: "رسائل", title: "رسالة جديدة من سارة النجار", body: "تمام، هجهز لك البروفة يوم الخميس إن شاء الله", time: "منذ ساعتين", read: false },
  { id: "n3", category: "عروض", title: "خصم ١٥٪ على العبايات", body: "دار الكوثر للعبايات تقدم خصمًا على التشكيلة الجديدة", time: "أمس", read: false },
  { id: "n4", category: "تصاميم", title: "تصميم جديد من مصمم تتابعه", body: "ليلى حسان نشرت تصميمًا جديدًا: فستان خطوبة مزخرف", time: "أمس", read: true },
  { id: "n5", category: "النظام", title: "أكمل ملفك الشخصي", body: "أضف صورتك ونبذة عنك لزيادة ثقة العملاء", time: "قبل ٣ أيام", read: true },
  { id: "n6", category: "طلبات", title: "تم تسليم طلبك", body: "الطلب KH-2024-1654 تم تسليمه بنجاح، قيّم تجربتك", time: "قبل أسبوعين", read: true },
];

export const FEATURES = [
  { icon: "headset", title: "دعم متواصل 24/7", desc: "فريقنا في خدمتك دائمًا" },
  { icon: "truck", title: "توصيل لجميع المحافظات", desc: "شحن سريع وآمن" },
  { icon: "wallet", title: "أسعار مناسبة", desc: "قيمة حقيقية مقابل السعر" },
  { icon: "award", title: "جودة عالية", desc: "خامات وتشطيب مضمون" },
  { icon: "shield", title: "طرق دفع آمنة", desc: "بياناتك محمية بالكامل" },
];

export const formatPrice = (n: number) =>
  `${n.toLocaleString("ar-EG-u-nu-latn").replace(/,/g, "٬")} ج.م`;

export const formatNum = (n: number) => {
  if (n >= 1000) return `${(n / 1000).toFixed(1).replace(".", "٫")} ألف`;
  return n.toLocaleString("ar-EG-u-nu-latn");
};
