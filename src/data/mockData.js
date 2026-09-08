import {
  Armchair,
  BadgeCheck,
  BedDouble,
  Layers3,
  Leaf,
  RefreshCw,
  Sparkles,
  Truck,
  Waves,
} from "lucide-react";

export const headerNavigationItems = [
  { label: "Cảm hứng", href: "#stories" },
  { label: "Về Everon", href: "#about" },
];

export const productTypes = [
  {
    id: "bedding",
    name: "Chăn ga gối",
    icon: BedDouble,
    href: "/products?type=bedding",
    groups: [
      {
        id: "product",
        title: "Theo sản phẩm",
        options: [
          ["Bộ chăn ga", "category=bedding-set"],
          ["Chăn và vỏ chăn", "category=duvet"],
          ["Ga", "category=sheet"],
          ["Vỏ gối", "category=pillowcase"],
          ["Vỏ gối tựa", "category=cushion-cover"],
          ["Chăn ga gối trẻ em", "category=kids-bedding"],
        ],
      },
      {
        id: "set",
        title: "Bộ chăn ga",
        options: [
          ["Bộ chăn ga 4 món", "set=4-piece"],
          ["Bộ chăn ga 5 món", "set=5-piece"],
          ["Bộ chăn ga 6 món", "set=6-piece"],
          ["Bộ chăn ga trẻ em", "set=kids"],
        ],
      },
      {
        id: "material",
        title: "Theo chất liệu",
        options: [
          ["Hanji Modal", "material=hanji-modal"],
          ["Tencel", "material=tencel"],
          ["Modal", "material=modal"],
          ["Cotton", "material=cotton"],
          ["Bamboo", "material=bamboo"],
        ],
      },
      {
        id: "size",
        title: "Theo kích thước",
        options: [
          ["1m2", "size=120"],
          ["1m4", "size=140"],
          ["1m6", "size=160"],
          ["1m8", "size=180"],
          ["2m", "size=200"],
        ],
      },
    ],
  },
  {
    id: "fillings",
    name: "Ruột",
    icon: Layers3,
    href: "/products?type=fillings",
    groups: [
      {
        id: "product",
        title: "Theo sản phẩm",
        options: [
          ["Ruột chăn", "category=duvet-insert"],
          ["Ruột gối", "category=pillow-insert"],
          ["Ruột gối ôm", "category=bolster-insert"],
          ["Ruột gối tựa", "category=cushion-insert"],
        ],
      },
      {
        id: "material",
        title: "Theo chất liệu",
        options: [
          ["Microfiber", "material=microfiber"],
          ["Cotton", "material=cotton"],
          ["Tencel", "material=tencel"],
          ["Bamboo", "material=bamboo"],
          ["Lông vũ", "material=down"],
        ],
      },
      {
        id: "comfort",
        title: "Theo nhu cầu",
        options: [
          ["Thoáng mát", "need=cooling"],
          ["Êm mềm", "need=soft"],
          ["Nâng đỡ", "need=support"],
          ["Dễ vệ sinh", "need=easy-care"],
        ],
      },
    ],
  },
  {
    id: "mattress",
    name: "Đệm",
    icon: Waves,
    href: "/products?type=mattress",
    groups: [
      {
        id: "kind",
        title: "Theo loại đệm",
        options: [
          ["Đệm lò xo", "category=spring"],
          ["Đệm bông ép", "category=fiber"],
          ["Đệm foam", "category=foam"],
          ["Đệm cao su", "category=latex"],
          ["Đệm hybrid", "category=hybrid"],
        ],
      },
      {
        id: "size",
        title: "Theo kích thước",
        options: [
          ["1m2", "size=120"],
          ["1m4", "size=140"],
          ["1m6", "size=160"],
          ["1m8", "size=180"],
          ["2m", "size=200"],
        ],
      },
      {
        id: "thickness",
        title: "Theo độ dày",
        options: [
          ["5cm", "thickness=5"],
          ["10cm", "thickness=10"],
          ["15cm", "thickness=15"],
          ["20cm", "thickness=20"],
          ["25cm", "thickness=25"],
        ],
      },
      {
        id: "need",
        title: "Theo nhu cầu",
        options: [
          ["Cho người lớn", "need=adult"],
          ["Cho trẻ em", "need=kids"],
          ["Dành cho khách sạn", "need=hotel"],
          ["Dòng cao cấp", "need=premium"],
        ],
      },
    ],
  },
  {
    id: "accessories",
    name: "Phụ kiện",
    icon: Armchair,
    href: "/products?type=accessories",
    groups: [
      {
        id: "product",
        title: "Theo sản phẩm",
        options: [
          ["Gối trang trí", "category=decorative-pillow"],
          ["Tấm bảo vệ đệm", "category=mattress-protector"],
          ["Topper", "category=topper"],
          ["Chiếu", "category=mat"],
        ],
      },
      {
        id: "room",
        title: "Theo không gian",
        options: [
          ["Phòng ngủ", "room=bedroom"],
          ["Phòng khách", "room=living-room"],
          ["Phòng trẻ em", "room=kids-room"],
        ],
      },
      {
        id: "style",
        title: "Theo phong cách",
        options: [
          ["Tối giản", "style=minimal"],
          ["Hiện đại", "style=modern"],
          ["Thanh lịch", "style=elegant"],
        ],
      },
    ],
  },
  {
    id: "towels",
    name: "Khăn",
    icon: Sparkles,
    href: "/products?type=towels",
    groups: [
      {
        id: "product",
        title: "Theo sản phẩm",
        options: [
          ["Khăn tắm", "category=bath-towel"],
          ["Khăn mặt", "category=face-towel"],
          ["Khăn tay", "category=hand-towel"],
          ["Bộ khăn", "category=towel-set"],
        ],
      },
      {
        id: "material",
        title: "Theo chất liệu",
        options: [
          ["Cotton", "material=cotton"],
          ["Bamboo", "material=bamboo"],
          ["Sợi microfiber", "material=microfiber"],
        ],
      },
    ],
  },
];

export const productOptionHref = (productType, query) =>
  `${productType.href}&${query}`;

export const headerCollections = [
  {
    id: "artemis",
    name: "Everon Artemis",
    note: "Thanh nhã & an yên",
    href: "/collections/artemis",
    products: [
      {
        id: "artemis-silk",
        name: "Bộ chăn ga Artemis Silk",
        price: "2.450.000₫",
        image: "/assets/product.png",
      },
      {
        id: "artemis-cloud",
        name: "Bộ ga Cloud Ivory",
        price: "1.890.000₫",
        image: "/assets/raw-8.jpeg",
      },
      {
        id: "artemis-touch",
        name: "Chăn hè Natural Touch",
        price: "1.690.000₫",
        image: "/assets/raw-9.png",
      },
      {
        id: "artemis-soft",
        name: "Gối tựa Artemis Soft",
        price: "690.000₫",
        image: "/assets/logo.png",
      },
    ],
  },
  {
    id: "epitex",
    name: "Everon Epitex",
    note: "Êm dịu mỗi ngày",
    href: "/collections/epitex",
    products: [
      {
        id: "epitex-breeze",
        name: "Bộ chăn ga Epitex Breeze",
        price: "2.190.000₫",
        image: "/assets/raw-10.jpeg",
      },
      {
        id: "epitex-cotton",
        name: "Ga phủ Epitex Cotton",
        price: "1.490.000₫",
        image: "/assets/raw-9.png",
      },
      {
        id: "epitex-comfort",
        name: "Chăn Epitex Comfort",
        price: "1.850.000₫",
        image: "/assets/hero.png",
      },
      {
        id: "epitex-pillow",
        name: "Gối Epitex Air",
        price: "650.000₫",
        image: "/assets/product.png",
      },
    ],
  },
  {
    id: "premium",
    name: "Everon Premium",
    note: "Chất liệu tuyển chọn",
    href: "/collections/premium",
    products: [
      {
        id: "premium-set",
        name: "Bộ chăn ga Premium",
        price: "3.290.000₫",
        image: "/assets/hero.png",
      },
      {
        id: "premium-heritage",
        name: "Chăn chần Heritage",
        price: "2.150.000₫",
        image: "/assets/product.png",
      },
      {
        id: "premium-sateen",
        name: "Ga phủ Premium Sateen",
        price: "2.490.000₫",
        image: "/assets/raw-8.jpeg",
      },
      {
        id: "premium-pillow",
        name: "Gối Premium Comfort",
        price: "890.000₫",
        image: "/assets/logo.png",
      },
    ],
  },
  {
    id: "signature",
    name: "Everon Signature",
    note: "Tinh tế vượt thời gian",
    href: "/collections/signature",
    products: [
      {
        id: "signature-linen",
        name: "Bộ chăn ga Signature",
        price: "3.650.000₫",
        image: "/assets/raw-9.png",
      },
      {
        id: "signature-cotton",
        name: "Ga chun Signature Cotton",
        price: "1.750.000₫",
        image: "/assets/raw-10.jpeg",
      },
      {
        id: "signature-quilt",
        name: "Chăn Signature Comfort",
        price: "2.290.000₫",
        image: "/assets/product.png",
      },
      {
        id: "signature-pillow",
        name: "Gối Signature Balance",
        price: "920.000₫",
        image: "/assets/hero.png",
      },
    ],
  },
];

export const featuredProducts = [
  {
    id: "silk",
    name: "Bộ Chăn Ga Gối Lụa Tự Nhiên",
    category: "Bộ chăn ga",
    price: "2.450.000đ",
    badge: "Bán chạy",
    image: "/assets/logo.png",
    imageAlt: "Ba chiếc gối màu kem xếp trên ghế gỗ",
  },
  {
    id: "cotton",
    name: "Gối Nằm Cotton Premium",
    category: "Gối & phụ kiện",
    price: "690.000đ",
    badge: "Mới",
    image: "/assets/logo.png",
    imageAlt: "Ba chiếc gối màu kem xếp trên ghế gỗ",
  },
  {
    id: "summer",
    name: "Bộ Chăn Hè Mềm Mát",
    category: "Bộ chăn hè",
    price: "1.890.000đ",
    image: "/assets/logo.png",
    imageAlt: "Ba chiếc gối màu kem xếp trên ghế gỗ",
  },
  {
    id: "comfort",
    name: "Ruột Gối Êm Ái Comfort",
    category: "Ruột gối",
    price: "520.000đ",
    image: "/assets/logo.png",
    imageAlt: "Ba chiếc gối màu kem xếp trên ghế gỗ",
  },
];

export const showcaseCollections = [
  {
    id: "serene",
    name: "Everon Serene",
    note: "Thanh nhã & an yên",
    banner: "/assets/raw-8.jpeg",
    products: [
      {
        id: "serene-silk",
        name: "Bộ chăn ga Serene Silk",
        price: "2.450.000₫",
        image: "/assets/product.png",
      },
      {
        id: "serene-cloud",
        name: "Bộ ga Cloud Ivory",
        price: "1.890.000₫",
        image: "/assets/raw-8.jpeg",
      },
      {
        id: "serene-touch",
        name: "Chăn hè Natural Touch",
        price: "1.690.000₫",
        image: "/assets/raw-9.png",
      },
      {
        id: "serene-pillow",
        name: "Gối tựa Serene Soft",
        price: "690.000₫",
        image: "/assets/logo.png",
      },
    ],
  },
  {
    id: "botanical",
    name: "Everon Botanical",
    note: "Cảm hứng thiên nhiên",
    banner: "/assets/raw-10.jpeg",
    products: [
      {
        id: "botanical-duvet",
        name: "Bộ chăn ga Botanical",
        price: "2.790.000₫",
        image: "/assets/raw-10.jpeg",
      },
      {
        id: "botanical-meadow",
        name: "Ga phủ Meadow Cotton",
        price: "1.590.000₫",
        image: "/assets/raw-9.png",
      },
      {
        id: "botanical-garden",
        name: "Chăn Garden Dream",
        price: "2.150.000₫",
        image: "/assets/hero.png",
      },
      {
        id: "botanical-pillow",
        name: "Gối ôm Botanical",
        price: "750.000₫",
        image: "/assets/product.png",
      },
    ],
  },
  {
    id: "signature",
    name: "Everon Signature",
    note: "Tinh tế vượt thời gian",
    banner: "/assets/hero.png",
    products: [
      {
        id: "signature-set",
        name: "Bộ chăn ga Signature",
        price: "3.290.000₫",
        image: "/assets/hero.png",
      },
      {
        id: "signature-heritage",
        name: "Chăn chần Heritage",
        price: "2.150.000₫",
        image: "/assets/product.png",
      },
      {
        id: "signature-premium",
        name: "Ga phủ Premium Sateen",
        price: "2.490.000₫",
        image: "/assets/raw-8.jpeg",
      },
      {
        id: "signature-pillow",
        name: "Gối Premium Comfort",
        price: "890.000₫",
        image: "/assets/logo.png",
      },
    ],
  },
  {
    id: "natural",
    name: "Everon Natural",
    note: "Mộc mạc & thư thái",
    banner: "/assets/raw-9.png",
    products: [
      {
        id: "natural-linen",
        name: "Bộ chăn ga Natural Linen",
        price: "2.650.000₫",
        image: "/assets/raw-9.png",
      },
      {
        id: "natural-cotton",
        name: "Ga chun Organic Cotton",
        price: "1.350.000₫",
        image: "/assets/raw-10.jpeg",
      },
      {
        id: "natural-quilt",
        name: "Chăn hè Pure Comfort",
        price: "1.790.000₫",
        image: "/assets/product.png",
      },
      {
        id: "natural-pillow",
        name: "Gối Natural Balance",
        price: "720.000₫",
        image: "/assets/hero.png",
      },
    ],
  },
];

export const benefits = [
  { icon: Leaf, title: "Chất liệu tuyển chọn", text: "Mềm mại, thoáng khí" },
  {
    icon: BadgeCheck,
    title: "Chính hãng Everon",
    text: "Chất lượng được đảm bảo",
  },
  { icon: Truck, title: "Giao hàng tận nơi", text: "Miễn phí từ 1.500.000đ" },
  { icon: RefreshCw, title: "Đổi trả linh hoạt", text: "Trong vòng 7 ngày" },
];

export const footerGroups = [
  {
    title: "Sản phẩm",
    items: ["Bộ chăn ga", "Bộ chăn hè", "Ruột chăn", "Gối & phụ kiện"],
  },
  {
    title: "Hỗ trợ",
    items: ["Giao nhận", "Đổi trả", "Bảo hành", "Hướng dẫn chọn size"],
  },
  {
    title: "Everon",
    items: ["Về chúng tôi", "Cửa hàng", "Tin tức", "Liên hệ"],
  },
];

export const editorialStories = [
  {
    id: "sleep",
    category: "Cẩm nang giấc ngủ",
    title: "5 cách tạo nên một phòng ngủ thật sự thư giãn",
    image: "/assets/raw-8.jpeg",
  },
  {
    id: "fabric",
    category: "Chất liệu",
    title: "Chọn chất liệu chăn ga phù hợp với từng mùa",
    image: "/assets/raw-10.jpeg",
  },
];

export const shoppingCollections = [
  {
    id: "bedding",
    name: "Chăn ga",
    note: "Trọn bộ cho phòng ngủ",
    image: "/assets/raw-9.png",
  },
  {
    id: "pillows",
    name: "Gối",
    note: "Nâng niu từng giấc ngủ",
    image: "/assets/logo.png",
  },
  {
    id: "mattress",
    name: "Đệm",
    note: "Nền tảng của sự thư thái",
    image: "/assets/hero.png",
  },
];

export const deliveryCheckins = [
  {
    id: "linen-bedroom",
    image: "/assets/hero.png",
    alt: "Bộ chăn ga màu be đã được hoàn thiện trong phòng ngủ ngập nắng",
    caption: "Đã giao và hoàn thiện",
    location: "Quận 2, TP.HCM",
    objectPosition: "50% 50%",
  },
  {
    id: "soft-grey-suite",
    image: "/assets/raw-9.png",
    alt: "Bộ chăn ga xám nhạt trong không gian phòng ngủ của khách hàng",
    caption: "Không gian sau bàn giao",
    location: "Tây Hồ, Hà Nội",
    objectPosition: "64% 50%",
  },
  {
    id: "bright-home",
    image: "/assets/raw-8.jpeg",
    alt: "Không gian sống sáng thoáng sau khi đơn hàng được giao thành công",
    caption: "Giao hàng thành công",
    location: "Thủ Đức, TP.HCM",
    objectPosition: "52% 50%",
  },
  {
    id: "calm-bedroom",
    image: "/assets/collection.png",
    alt: "Phòng ngủ hoàn thiện với bộ chăn ga sáng màu và nội thất gỗ",
    caption: "Một góc nhà đã hoàn thiện",
    location: "Cầu Giấy, Hà Nội",
    objectPosition: "68% 50%",
  },
  {
    id: "sunlit-linen",
    image: "/assets/hero.png",
    alt: "Chăn ga linen màu tự nhiên trong phòng ngủ của khách hàng",
    caption: "Đã giao tận nơi",
    location: "Quận 7, TP.HCM",
    objectPosition: "30% 50%",
  },
  {
    id: "compact-interior",
    image: "/assets/raw-10.jpeg",
    alt: "Không gian căn hộ nhỏ sau khi hoàn tất giao hàng",
    caption: "Hoàn thiện đơn hàng",
    location: "Hải Châu, Đà Nẵng",
    objectPosition: "38% 50%",
  },
];
