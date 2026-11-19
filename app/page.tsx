'use client';

import { useState, useEffect, type MouseEventHandler } from 'react';

// ============================================================================
// SELF-CONTAINED INLINE SVG ICONS (ปลอดจากปัญหา external icon dependency)
// ============================================================================
const IconMapPin = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const IconSearch = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

const IconUser = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const IconChevronLeft = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="m15 18-6-6 6-6" />
  </svg>
);

const IconChevronDown = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const IconStar = ({ className = 'w-3.5 h-3.5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const IconUsers = ({ className = 'w-3.5 h-3.5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const IconPlus = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14" />
    <path d="M12 5v14" />
  </svg>
);

const IconMinus = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14" />
  </svg>
);

const IconX = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

const IconBookOpen = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);

const IconClock = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const IconAlertCircle = ({ className = 'w-3.5 h-3.5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

const IconHome = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const IconTag = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z" />
    <circle cx="7.5" cy="7.5" r="1.5" fill="currentColor" />
  </svg>
);

const IconClipboardList = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
    <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <path d="M12 11h4" />
    <path d="M12 16h4" />
    <path d="M8 11h.01" />
    <path d="M8 16h.01" />
  </svg>
);

const IconCode2 = ({ className = 'w-3.5 h-3.5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m18 16 4-4-4-4" />
    <path d="m6 8-4 4 4 4" />
    <path d="m14.5 4-5 16" />
  </svg>
);

const IconSmartphone = ({ className = 'w-3.5 h-3.5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
    <path d="M12 18h.01" />
  </svg>
);

const IconCopy = ({ className = 'w-3.5 h-3.5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
  </svg>
);

const IconCheck = ({ className = 'w-3.5 h-3.5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

const IconNavigation = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="3 11 22 2 13 21 11 13 3 11" />
  </svg>
);

const IconUtensils = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
    <path d="M7 2v20" />
    <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
  </svg>
);

const IconSparkles = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z" />
  </svg>
);

const IconRefreshCw = ({ className = 'w-3 h-3' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
    <path d="M21 3v5h-5" />
    <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
    <path d="M8 16H3v5" />
  </svg>
);

const IconBell = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
  </svg>
);

const IconPhone = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const IconAward = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="6" />
    <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
  </svg>
);

const IconHeart = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  </svg>
);

// สร้าง Data URI SVG สำรองเมื่อโหลดรูปภาพไม่ได้ (ปลอดจาก network error ตอน build/preview)
const createFallbackFoodDataUri = (label = 'เมนูอร่อย') => {
  const safeLabel = label.replace(/[<>&"]/g, '');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#135D66"/>
        <stop offset="100%" stop-color="#269A8E"/>
      </linearGradient>
    </defs>
    <rect width="400" height="300" fill="url(#bg)"/>
    <circle cx="200" cy="130" r="56" fill="#FFE082" opacity="0.9"/>
    <circle cx="200" cy="130" r="42" fill="#FFF8E1"/>
    <text x="200" y="137" text-anchor="middle" font-family="sans-serif" font-size="22" font-weight="bold" fill="#135D66">อาหารไทย</text>
    <text x="200" y="220" text-anchor="middle" font-family="sans-serif" font-size="18" font-weight="bold" fill="#FFFFFF">${safeLabel}</text>
  </svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};

// คอมโพเนนต์รูปภาพพร้อม fallback อัตโนมัติและไม่ให้เกิด error บนหน้าเว็บ
type SafeImageProps = {
  src?: string;
  alt: string;
  className?: string;
  onClick?: MouseEventHandler<HTMLImageElement>;
  fallbackLabel?: string;
};

const SafeImage = ({ src, alt, className = '', onClick, fallbackLabel = 'ร้านเด็ดเลย' }: SafeImageProps) => {
  const fallbackSrc = createFallbackFoodDataUri(fallbackLabel);
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const imgSrc = failedSrc === src ? fallbackSrc : src || fallbackSrc;

  return (
    <img
      src={imgSrc}
      alt={alt}
      onClick={onClick}
      onError={() => {
        if (src && imgSrc !== fallbackSrc) {
          setFailedSrc(src);
        }
      }}
      className={className}
    />
  );
};

// ข้อมูลจำลองร้านอาหารในสุโขทัยและร้านดังตามภาพตัวอย่าง
const RESTAURANTS_DATA = [
  {
    id: 'r1',
    name: 'ร้านเด็ดเลย (สาขาสุโขทัย)',
    shortName: 'ร้านเด็ดเลย',
    category: 'อาหารไทย & พื้นเมือง',
    tagType: 'Food',
    distance: '1.2 กม.',
    distanceNum: 1.2,
    waitMinutes: 25,
    waitQueues: 8,
    currentQueue: 'A-15',
    rating: 4.8,
    reviews: 342,
    isHot: true,
    noWait: false,
    location: 'ถ.จรดวิถีถ่อง อ.เมือง จ.สุโขทัย',
    heroImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    foodImage: 'https://images.unsplash.com/photo-1569562211093-4ed0d0758f12?auto=format&fit=crop&w=400&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1569562211093-4ed0d0758f12?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80',
    ],
    menu: [
      { id: 'm1', name: 'ก๋วยเตี๋ยวสุโขทัยต้มยำโบราณ', price: 65, desc: 'เส้นเล็กเหนียวนุ่ม หมูแดง ถั่วฝักยาวซอย มะนาวสด', popular: true },
      { id: 'm2', name: 'ผัดไทยสุโขทัยสูตรดั้งเดิม', price: 75, desc: 'ผัดซอสมะขามเข้มข้น กุ้งสดตัวโต', popular: true },
      { id: 'm3', name: 'ข้าวเปิ๊บโบราณบ้านนาต้นจั่น', price: 60, desc: 'แป้งนึ่งสดห่อผักพื้นบ้าน น้ำซุปกระดูกหมูหวานกลมกล่อม', popular: false },
      { id: 'm4', name: 'หมูสะเต๊ะย่างเตาถ่าน (10 ไม้)', price: 90, desc: 'เสิร์ฟพร้อมน้ำจิ้มถั่วคั่วหอมและอาจาด', popular: false },
    ]
  },
  {
    id: 'r2',
    name: 'ครัวต้มยำกุ้งแม่น้ำ',
    shortName: 'ต้มยำกุ้ง',
    category: 'อาหารทะเล & ต้มยำ',
    tagType: 'Food',
    distance: '1.2 กม.',
    distanceNum: 1.2,
    waitMinutes: 15,
    waitQueues: 2,
    currentQueue: 'B-08',
    rating: 4.7,
    reviews: 215,
    isHot: true,
    noWait: false,
    location: 'ริมแม่น้ำยม อ.เมือง จ.สุโขทัย',
    heroImage: 'https://images.unsplash.com/photo-1548943487-a2e4e43b4853?auto=format&fit=crop&w=800&q=80',
    foodImage: 'https://images.unsplash.com/photo-1548943487-a2e4e43b4853?auto=format&fit=crop&w=400&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1548943487-a2e4e43b4853?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1559314809-0d155014e29e?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80',
    ],
    menu: [
      { id: 'm5', name: 'ต้มยำกุ้งแม่น้ำหม้อไฟ', price: 280, desc: 'มันกุ้งเยิ้มๆ รสจัดจ้านถึงเครื่องสมุนไพรไทย', popular: true },
      { id: 'm6', name: 'ปลากะพงทอดน้ำปลา', price: 320, desc: 'ทอดกรอบนอกนุ่มใน พร้อมยำมะม่วงรสเด็ด', popular: true },
      { id: 'm7', name: 'ทอดมันปลากรายแท้', price: 140, desc: 'เนื้อเหนียวหนึบ เครื่องแกงตำเอง', popular: false },
    ]
  },
  {
    id: 'r3',
    name: 'เรือนแกงเขียวหวานชาววัง',
    shortName: 'แกงเขียวหวาน',
    category: 'อาหารไทยต้นตำรับ',
    tagType: 'Food',
    distance: '1.5 กม.',
    distanceNum: 1.5,
    waitMinutes: 0,
    waitQueues: 0,
    currentQueue: 'C-04',
    rating: 4.9,
    reviews: 189,
    isHot: false,
    noWait: true,
    location: 'ใกล้อุทยานประวัติศาสตร์สุโขทัย',
    heroImage: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&w=800&q=80',
    foodImage: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&w=400&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=600&q=80',
    ],
    menu: [
      { id: 'm8', name: 'แกงเขียวหวานไก่ยอดมะพร้าวอ่อน', price: 160, desc: 'พริกแกงโขลกสด กะทิคั้นสดเข้มข้น', popular: true },
      { id: 'm9', name: 'โรตีกรอบทานคู่แกงเขียวหวาน', price: 45, desc: 'แป้งโรตีทอดกรอบไม่อมน้ำมัน', popular: true },
      { id: 'm10', name: 'น้ำพริกลงเรือทรงเครื่อง', price: 150, desc: 'เสิร์ฟพร้อมผักสดและไข่เค็มไชยา', popular: false },
    ]
  },
  {
    id: 'r4',
    name: 'แซ่บเวอร์ ส้มตำ-ไก่ย่าง',
    shortName: 'ส้มตำ',
    category: 'อาหารอีสาน & ส้มตำ',
    tagType: 'Food',
    distance: '0.8 กม.',
    distanceNum: 0.8,
    waitMinutes: 15,
    waitQueues: 2,
    currentQueue: 'D-21',
    rating: 4.6,
    reviews: 410,
    isHot: true,
    noWait: false,
    location: 'แยกคลองโพธิ์ อ.เมือง จ.สุโขทัย',
    heroImage: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=800&q=80',
    foodImage: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=400&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
    ],
    menu: [
      { id: 'm11', name: 'ส้มตำไทยไข่เค็ม', price: 70, desc: 'เส้นมะละกอกรอบ ปรุงรสสามรสกลมกล่อม', popular: true },
      { id: 'm12', name: 'ตำหลวงพระบางปลาร้านัว', price: 80, desc: 'น้ำปลาร้าต้มสุกสูตรเฉพาะของทางร้าน', popular: true },
      { id: 'm13', name: 'ไก่ย่างเขาสวนกวาง (ครึ่งตัว)', price: 130, desc: 'หนังกรอบเนื้อนุ่ม หมักสมุนไพรข้ามคืน', popular: true },
    ]
  }
];

type Restaurant = (typeof RESTAURANTS_DATA)[number];

interface QueueTicket {
  id: string;
  restaurant: Restaurant;
  queueNumber: string;
  aheadCount: number;
  estimatedTime: string;
  guests: number;
  zone: string;
  note: string;
  statusStep: 1 | 2 | 3;
  bookedAt: string;
}

const BANNERS = [
  {
    id: 1,
    title: 'ร้านเด็ดคิวยาวที่ไม่ควรพลาด',
    subtitle: 'จองคิวล่วงหน้า ไม่ต้องยืนรอหน้าร้าน',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
    targetId: 'r1'
  },
  {
    id: 2,
    title: 'รวมร้านก๋วยเตี๋ยวสุโขทัยเจ้าดัง',
    subtitle: 'รับคิวด่วน พร้อมดูเมนูล่วงหน้าได้ทันที',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    targetId: 'r1'
  },
  {
    id: 3,
    title: 'อิ่มอร่อยริมแม่น้ำยม ยามเย็น',
    subtitle: 'เลือกโซน Outdoors บรรยากาศสุดชิล',
    image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=800&q=80',
    targetId: 'r2'
  },
  {
    id: 4,
    title: 'รับส่วนลด 10% เมื่อจองคิวผ่านแอป',
    subtitle: 'สำหรับร้านอาหารที่ร่วมรายการในสุโขทัย',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
    targetId: 'r3'
  }
];

const INITIAL_HISTORY = [
  {
    id: 'h1',
    restaurantId: 'r1',
    restaurantName: 'ร้านเด็ดเลย (สาขาสุโขทัย)',
    date: '24 ต.ค. 2569 - 18:30 น.',
    guests: 3,
    status: 'เสร็จสิ้น',
    image: 'https://images.unsplash.com/photo-1569562211093-4ed0d0758f12?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'h2',
    restaurantId: 'r4',
    restaurantName: 'แซ่บเวอร์ ส้มตำ-ไก่ย่าง',
    date: '18 ต.ค. 2569 - 12:15 น.',
    guests: 2,
    status: 'เสร็จสิ้น',
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'h3',
    restaurantId: 'r2',
    restaurantName: 'ครัวต้มยำกุ้งแม่น้ำ',
    date: '10 ต.ค. 2569 - 19:00 น.',
    guests: 2,
    status: 'เสร็จสิ้น',
    image: 'https://images.unsplash.com/photo-1548943487-a2e4e43b4853?auto=format&fit=crop&w=300&q=80'
  }
];

const NEXTJS_CODE_SNIPPET = `'use client';

// โครงสร้างโปรเจกต์ Next.js 14/15/16+ (App Router + Tailwind CSS)
// 1. สร้างโปรเจกต์: npx create-next-app@latest queue-sukhothai --typescript --tailwind --eslint
// 2. วางโค้ดนี้ลงที่ไฟล์ src/app/page.tsx แล้วรัน npm run build ได้ทันที (ไม่ต้องลงแพ็กเกจไอคอนเพิ่ม)

import React, { useState } from 'react';

type ScreenType = 'home' | 'detail' | 'ticket' | 'myQueues';

interface ActiveTicketState {
  queueNumber: string;
  restaurantName: string;
  aheadCount: number;
  estimatedTime: string;
  guests: number;
  zone: string;
  statusStep: 1 | 2 | 3;
}

export default function RestaurantQueuePage() {
  const [activeScreen, setActiveScreen] = useState<ScreenType>('home');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [guests, setGuests] = useState<number>(4);
  const [zone, setZone] = useState<string>('ด้านใน');
  const [specialRequest, setSpecialRequest] = useState<string>('');
  const [ticket, setTicket] = useState<ActiveTicketState>({
    queueNumber: 'A - 18',
    restaurantName: 'ร้านเด็ดเลย',
    aheadCount: 3,
    estimatedTime: '18:45 น.',
    guests: 4,
    zone: 'ด้านใน',
    statusStep: 2,
  });

  const handleConfirmQueue = () => {
    setTicket({
      queueNumber: 'A - 18',
      restaurantName: 'ร้านเด็ดเลย',
      aheadCount: 3,
      estimatedTime: '18:45 น.',
      guests,
      zone,
      statusStep: 2,
    });
    setActiveScreen('ticket');
  };

  return (
    <main className="min-h-screen bg-[#D6E6EB] flex items-center justify-center p-4 text-slate-800">
      <div className="w-full max-w-[400px] h-[820px] bg-[#EBF5FA] rounded-[36px] shadow-2xl overflow-hidden flex flex-col border-[6px] border-[#135D66]/20">
        <header className="bg-[#D9EEF7] px-4 py-3 flex items-center justify-between border-b border-[#135D66]/10">
          <span className="text-xs font-bold text-[#135D66]">สุโขทัย, ประเทศไทย</span>
          <span className="text-[11px] font-semibold bg-[#135D66] text-white px-2.5 py-1 rounded-full">
            {activeScreen}
          </span>
        </header>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {activeScreen === 'home' && (
            <>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ค้นหาร้านอาหาร, ประเภทอาหาร, หรือโซน..."
                className="w-full bg-white rounded-full px-4 py-2 text-xs border border-[#135D66]/20 focus:outline-none"
              />
              <div className="bg-white rounded-2xl p-3 shadow-sm border border-[#135D66]/10">
                <h2 className="font-bold text-sm text-[#135D66]">ร้านเด็ดเลย</h2>
                <p className="text-xs text-slate-500">Food • 1.2 กม. • รอประมาณ 25 นาที (8 คิว)</p>
                <button
                  type="button"
                  onClick={() => setActiveScreen('detail')}
                  className="mt-2 bg-[#135D66] text-white text-xs font-semibold px-4 py-1.5 rounded-full"
                >
                  จองคิวทันที
                </button>
              </div>
            </>
          )}

          {activeScreen === 'detail' && (
            <div className="space-y-3">
              <div className="bg-[#8BC34A] text-white rounded-2xl p-3 text-xs">
                <p className="font-bold text-[#1B3B1A]">Live Queue Dashboard</p>
                <p>คิวปัจจุบัน: A-15 | รออีก: 8 คิว | เวลาโดยประมาณ: ~25 นาที</p>
              </div>
              <div className="flex items-center justify-between bg-white p-3 rounded-xl">
                <span className="text-xs font-bold">จำนวนผู้ใช้บริการ: {guests} คน</span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setGuests((g) => Math.max(1, g - 1))}
                    className="w-7 h-7 rounded bg-[#8BC34A] text-white font-bold"
                  >
                    -
                  </button>
                  <button
                    type="button"
                    onClick={() => setGuests((g) => Math.min(20, g + 1))}
                    className="w-7 h-7 rounded bg-[#1976D2] text-white font-bold"
                  >
                    +
                  </button>
                </div>
              </div>
              <select
                value={zone}
                onChange={(e) => setZone(e.target.value)}
                className="w-full bg-[#8BC34A]/80 text-xs font-semibold p-2.5 rounded-xl"
              >
                <option value="ด้านใน">ด้านใน</option>
                <option value="Outdoors">Outdoors</option>
                <option value="ไม่ระบุ">ไม่ระบุ</option>
              </select>
              <textarea
                rows={2}
                value={specialRequest}
                onChange={(e) => setSpecialRequest(e.target.value)}
                placeholder="คำขอพิเศษ..."
                className="w-full bg-[#DCEDC8] text-xs p-2.5 rounded-xl"
              />
              <button
                type="button"
                onClick={handleConfirmQueue}
                className="w-full py-2.5 rounded-xl bg-[#4CAF50] text-white font-bold text-xs"
              >
                ยืนยันขอรับคิว
              </button>
            </div>
          )}

          {activeScreen === 'ticket' && (
            <div className="bg-white rounded-3xl p-4 text-center shadow-md space-y-2">
              <p className="text-xs text-slate-500">หมายเลขคิวของคุณ</p>
              <p className="text-5xl font-black text-[#135D66]">{ticket.queueNumber}</p>
              <p className="text-xs">จำนวนคิวข้างหน้า: เหลืออีก {ticket.aheadCount} คิว</p>
              <p className="text-xs">เวลาที่คาดว่าจะถึงคิว: {ticket.estimatedTime}</p>
              <button
                type="button"
                onClick={() => setActiveScreen('myQueues')}
                className="mt-2 w-full py-2 rounded-xl bg-[#2B8A9E] text-white text-xs font-semibold"
              >
                ดูคิวของฉัน / ประวัติ
              </button>
            </div>
          )}

          {activeScreen === 'myQueues' && (
            <div className="bg-white rounded-2xl p-3 shadow-sm flex items-center justify-between">
              <div>
                <p className="font-bold text-xs text-[#135D66]">{ticket.restaurantName}</p>
                <p className="text-[11px] text-slate-500">คิวปัจจุบัน: {ticket.queueNumber}</p>
              </div>
              <button
                type="button"
                onClick={() => setActiveScreen('ticket')}
                className="bg-[#135D66] text-white text-[11px] px-3 py-1 rounded-full"
              >
                ดูบัตรคิวเต็ม
              </button>
            </div>
          )}
        </div>

        <nav className="bg-white border-t border-slate-200 grid grid-cols-4 py-2 text-[10px] font-semibold text-[#135D66]">
          <button type="button" onClick={() => setActiveScreen('home')}>หน้าแรก</button>
          <button type="button" onClick={() => setActiveScreen('detail')}>จองคิว</button>
          <button type="button" onClick={() => setActiveScreen('myQueues')}>คิวของฉัน</button>
          <button type="button" onClick={() => setActiveScreen('ticket')}>บัตรคิว</button>
        </nav>
      </div>
    </main>
  );
}`;

export default function App() {
  // โหมดแสดงผล: 'prototype' (กรอบมือถือ) หรือ 'code' (ดูโค้ด Next.js)
  const [viewMode, setViewMode] = useState('prototype');
  const [copiedCode, setCopiedCode] = useState(false);

  // Navigation States
  // screens: 'home' | 'detail' | 'ticket' | 'myQueues' | 'privileges' | 'profile'
  const [activeScreen, setActiveScreen] = useState('home');
  const [myQueuesTab, setMyQueuesTab] = useState('current'); // 'current' | 'history'

  // Location & Search & Filters
  const [selectedProvince, setSelectedProvince] = useState('สุโขทัย, ประเทศไทย');
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'nearby' | 'nowait' | 'hot' | 'category'
  const [selectedCategory, setSelectedCategory] = useState('ทั้งหมด');
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  // Banner Carousel
  const [currentBanner, setCurrentBanner] = useState(0);

  // Selected Restaurant & Booking Form
  const [selectedRestaurant, setSelectedRestaurant] = useState(RESTAURANTS_DATA[0]);
  const [activeGalleryIdx, setActiveGalleryIdx] = useState(0);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [guestCount, setGuestCount] = useState(4);
  const [selectedZone, setSelectedZone] = useState('ด้านใน');
  const [specialRequest, setSpecialRequest] = useState('');

  // Live Dashboard Simulation
  const [liveQueueOffset, setLiveQueueOffset] = useState(0);

  // Active Ticket State (เริ่มต้นมีคิว A-18 ตามภาพตัวอย่างเพื่อให้กดดูได้ทันที หรือจองใหม่ทับได้)
  const [activeTicket, setActiveTicket] = useState<QueueTicket | null>({
    id: 'T-1018',
    restaurant: RESTAURANTS_DATA[0],
    queueNumber: 'A - 18',
    aheadCount: 3,
    estimatedTime: '18:45 น.',
    guests: 4,
    zone: 'ด้านใน',
    note: '',
    statusStep: 2, // 1 = รับคิวแล้ว, 2 = กำลังรอ, 3 = ถึงคิวของคุณ
    bookedAt: '18:10 น.'
  });

  // Booking History
  const [historyList, setHistoryList] = useState(INITIAL_HISTORY);

  // Modals & Toasts
  const [showMapModal, setShowMapModal] = useState(false);
  const [mapTargetRestaurant, setMapTargetRestaurant] = useState(RESTAURANTS_DATA[0]);
  const [showMenuModal, setShowMenuModal] = useState(false);
  const [showManageQueueModal, setShowManageQueueModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [claimedCoupons, setClaimedCoupons] = useState(['CPN1']);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Auto-rotate banner carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % BANNERS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  // Real-time queue simulation on Detail screen
  useEffect(() => {
    if (activeScreen !== 'detail') return;
    const interval = setInterval(() => {
      setLiveQueueOffset((prev) => (prev === 0 ? 1 : 0));
    }, 6000);
    return () => clearInterval(interval);
  }, [activeScreen]);

  // กรองรายการร้านอาหารตามคำค้นหาและตัวกรอง
  const filteredRestaurants = RESTAURANTS_DATA.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.shortName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (activeFilter === 'nearby') return item.distanceNum <= 1.2;
    if (activeFilter === 'nowait') return item.noWait || item.waitMinutes <= 10;
    if (activeFilter === 'hot') return item.isHot;
    if (activeFilter === 'category' && selectedCategory !== 'ทั้งหมด') {
      return item.category.includes(selectedCategory);
    }
    return true;
  });

  // เปิดหน้ารายละเอียดร้าน
  const openRestaurantDetail = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
    setActiveGalleryIdx(0);
    setGuestCount(4);
    setSelectedZone('ด้านใน');
    setSpecialRequest('');
    setActiveScreen('detail');
  };

  // ยืนยันการขอรับคิว
  const handleConfirmBooking = () => {
    // คำนวณเลขคิวใหม่ต่อจากคิวปัจจุบัน
    const prefix = selectedRestaurant.currentQueue.split('-')[0] || 'A';
    const baseNum = parseInt(selectedRestaurant.currentQueue.split('-')[1] || '15', 10);
    const newNum = baseNum + selectedRestaurant.waitQueues + 1;
    const formattedQueue = `${prefix} - ${newNum}`;

    // คำนวณเวลาคาดว่าจะถึงคิว
    const now = new Date();
    now.setMinutes(now.getMinutes() + selectedRestaurant.waitMinutes);
    const estHours = String(now.getHours()).padStart(2, '0');
    const estMins = String(now.getMinutes()).padStart(2, '0');

    const newTicket: QueueTicket = {
      id: `T-${Date.now()}`,
      restaurant: selectedRestaurant,
      queueNumber: formattedQueue,
      aheadCount: selectedRestaurant.waitQueues,
      estimatedTime: `${estHours}:${estMins} น.`,
      guests: guestCount,
      zone: selectedZone,
      note: specialRequest,
      statusStep: selectedRestaurant.waitQueues === 0 ? 3 : 2,
      bookedAt: 'เมื่อสักครู่'
    };

    setActiveTicket(newTicket);
    setActiveScreen('ticket');
    triggerToast(`รับบัตรคิวหมายเลข ${formattedQueue} สำเร็จ!`);
  };

  // จำลองการเลื่อนสถานะคิว (สำหรับทดสอบในหน้าบัตรคิว)
  const handleSimulateQueueProgress = () => {
    if (!activeTicket) return;
    if (activeTicket.aheadCount > 1) {
      const nextAhead = activeTicket.aheadCount - 1;
      setActiveTicket({
        ...activeTicket,
        aheadCount: nextAhead,
        statusStep: 2
      });
      if (nextAhead === 2) {
        triggerToast('แจ้งเตือน: เหลืออีก 2 คิวจะถึงคิวของคุณแล้ว!');
      } else {
        triggerToast(`อัปเดตสถานะ: เหลืออีก ${nextAhead} คิวข้างหน้า`);
      }
    } else if (activeTicket.aheadCount === 1) {
      setActiveTicket({
        ...activeTicket,
        aheadCount: 0,
        statusStep: 3
      });
      triggerToast('ถึงคิวของคุณแล้ว! กรุณาแสดงบัตรคิวที่หน้าร้าน');
    } else {
      // รีเซ็ตกลับไปทดสอบใหม่
      setActiveTicket({
        ...activeTicket,
        aheadCount: 3,
        statusStep: 2
      });
      triggerToast('รีเซ็ตสถานะคิวจำลองเรียบร้อย');
    }
  };

  // เลื่อนคิวออกไป 2 คิว
  const handlePostponeQueue = () => {
    if (!activeTicket) return;
    const currentNum = parseInt(activeTicket.queueNumber.split('-')[1].trim(), 10);
    const prefix = activeTicket.queueNumber.split('-')[0].trim();
    const newQueueStr = `${prefix} - ${currentNum + 2}`;

    setActiveTicket({
      ...activeTicket,
      queueNumber: newQueueStr,
      aheadCount: activeTicket.aheadCount + 2,
      statusStep: 2
    });
    setShowManageQueueModal(false);
    triggerToast(`เลื่อนคิวเรียบร้อย หมายเลขใหม่ของคุณคือ ${newQueueStr}`);
  };

  // ยกเลิกคิว
  const handleCancelQueue = () => {
    if (!activeTicket) return;
    const canceledRecord = {
      id: `h-${Date.now()}`,
      restaurantId: activeTicket.restaurant.id,
      restaurantName: activeTicket.restaurant.name,
      date: 'วันนี้ - ยกเลิกคิว',
      guests: activeTicket.guests,
      status: 'ยกเลิกแล้ว',
      image: activeTicket.restaurant.foodImage
    };
    setHistoryList([canceledRecord, ...historyList]);
    setActiveTicket(null);
    setShowManageQueueModal(false);
    setActiveScreen('myQueues');
    setMyQueuesTab('history');
    triggerToast('ยกเลิกคิวเรียบร้อยแล้ว');
  };

  // คัดลอกโค้ด Next.js
  const handleCopyCode = () => {
    navigator.clipboard.writeText(NEXTJS_CODE_SNIPPET);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  // คำนวณเลขคิวปัจจุบันแบบ Real-time บนหน้า Detail
  const getLiveCurrentQueue = () => {
    const parts = selectedRestaurant.currentQueue.split('-');
    const prefix = parts[0];
    const num = parseInt(parts[1], 10) + liveQueueOffset;
    return `${prefix}-${num}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#C8DCE3] via-[#D8E9EF] to-[#BFD7DF] flex flex-col items-center justify-center p-2 sm:p-4 font-sans text-slate-800 select-none">
      {/* Top Control Bar (Outside Mobile Frame) */}
      <div className="w-full max-w-[430px] md:max-w-4xl flex flex-wrap items-center justify-between gap-2 mb-3 px-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-[#135D66] text-white flex items-center justify-center shadow-md">
            <IconUtensils className="w-4 h-4" />
          </div>
          <div>
            <h1 className="text-sm sm:text-base font-bold text-[#135D66] leading-tight">
              Sukhothai Queue UI Prototype
            </h1>
            <p className="text-[11px] text-[#135D66]/80">
              Interactive Next.js Mobile App Design
            </p>
          </div>
        </div>

        {/* Quick Screen Switcher + Next.js Code Toggle */}
        <div className="flex items-center gap-1.5">
          {viewMode === 'prototype' && (
            <div className="hidden md:flex items-center bg-white/70 backdrop-blur-sm p-1 rounded-xl border border-[#135D66]/15 text-xs">
              <button
                onClick={() => setActiveScreen('home')}
                className={`px-2.5 py-1 rounded-lg font-medium transition ${
                  activeScreen === 'home' ? 'bg-[#135D66] text-white shadow-sm' : 'text-[#135D66] hover:bg-white/60'
                }`}
              >
                1. หน้าแรก
              </button>
              <button
                onClick={() => setActiveScreen('detail')}
                className={`px-2.5 py-1 rounded-lg font-medium transition ${
                  activeScreen === 'detail' ? 'bg-[#135D66] text-white shadow-sm' : 'text-[#135D66] hover:bg-white/60'
                }`}
              >
                2. จองคิว
              </button>
              <button
                onClick={() => {
                  if (!activeTicket) {
                    setActiveTicket({
                      id: 'T-1018',
                      restaurant: RESTAURANTS_DATA[0],
                      queueNumber: 'A - 18',
                      aheadCount: 3,
                      estimatedTime: '18:45 น.',
                      guests: 4,
                      zone: 'ด้านใน',
                      note: '',
                      statusStep: 2,
                      bookedAt: '18:10 น.'
                    });
                  }
                  setActiveScreen('ticket');
                }}
                className={`px-2.5 py-1 rounded-lg font-medium transition ${
                  activeScreen === 'ticket' ? 'bg-[#135D66] text-white shadow-sm' : 'text-[#135D66] hover:bg-white/60'
                }`}
              >
                3. บัตรคิว
              </button>
              <button
                onClick={() => setActiveScreen('myQueues')}
                className={`px-2.5 py-1 rounded-lg font-medium transition ${
                  activeScreen === 'myQueues' ? 'bg-[#135D66] text-white shadow-sm' : 'text-[#135D66] hover:bg-white/60'
                }`}
              >
                4. คิวของฉัน
              </button>
            </div>
          )}

          <button
            onClick={() => setViewMode(viewMode === 'prototype' ? 'code' : 'prototype')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#135D66] hover:bg-[#0e4850] text-white text-xs font-semibold shadow-md transition active:scale-95"
          >
            {viewMode === 'prototype' ? (
              <>
                <IconCode2 className="w-3.5 h-3.5" />
                <span>โค้ด Next.js</span>
              </>
            ) : (
              <>
                <IconSmartphone className="w-3.5 h-3.5" />
                <span>กลับสู่หน้าจอมือถือ</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* VIEW MODE 2: NEXT.JS CODE VIEWER                                      */}
      {/* ===================================================================== */}
      {viewMode === 'code' ? (
        <div className="w-full max-w-3xl bg-[#0F172A] text-slate-100 rounded-3xl shadow-2xl border border-slate-700 overflow-hidden flex flex-col h-[780px]">
          <div className="px-5 py-3.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500"></span>
              <span className="w-3 h-3 rounded-full bg-amber-400"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
              <span className="ml-2 text-xs font-mono text-slate-300">src/app/page.tsx (Next.js App Router)</span>
            </div>
            <button
              onClick={handleCopyCode}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#4CAF50] hover:bg-[#43a047] text-white text-xs font-semibold transition"
            >
              {copiedCode ? <IconCheck className="w-3.5 h-3.5" /> : <IconCopy className="w-3.5 h-3.5" />}
              <span>{copiedCode ? 'คัดลอกโค้ดแล้ว' : 'คัดลอกโค้ด'}</span>
            </button>
          </div>
          <div className="p-5 overflow-auto flex-1 font-mono text-xs leading-relaxed text-emerald-300 select-text">
            <pre>{NEXTJS_CODE_SNIPPET}</pre>
          </div>
        </div>
      ) : (
        /* ===================================================================== */
        /* VIEW MODE 1: MOBILE FRAME PREVIEW                                     */
        /* ===================================================================== */
        <div className="relative w-full max-w-[395px] h-[815px] bg-[#EBF5FA] rounded-[42px] shadow-[0_25px_60px_-15px_rgba(19,93,102,0.35)] border-[8px] border-[#183A42] overflow-hidden flex flex-col">
          {/* Dynamic Notch / Status Bar */}
          <div className="bg-[#D6ECF5] px-6 pt-2 pb-1 flex items-center justify-between text-[11px] font-semibold text-[#135D66] shrink-0">
            <span>09:41</span>
            <div className="w-24 h-4 bg-[#183A42] rounded-full"></div>
            <div className="flex items-center gap-1">
              <span>5G</span>
              <div className="w-4 h-2.5 border border-[#135D66] rounded-[3px] p-[1px]">
                <div className="w-full h-full bg-[#135D66] rounded-[1px]"></div>
              </div>
            </div>
          </div>

          {/* Toast Notification Banner */}
          {toastMessage && (
            <div className="absolute top-12 left-4 right-4 z-50 bg-[#135D66] text-white px-3.5 py-2.5 rounded-2xl shadow-lg flex items-center gap-2 text-xs font-medium animate-bounce">
              <IconBell className="w-4 h-4 text-[#8BC34A] shrink-0" />
              <span>{toastMessage}</span>
            </div>
          )}

          {/* ================================================================= */}
          {/* SCREEN 1: หน้าแรก / ค้นหา (HOME & SEARCH VIEW)                    */}
          {/* ================================================================= */}
          {activeScreen === 'home' && (
            <div className="flex-1 flex flex-col overflow-hidden bg-gradient-to-b from-[#D6ECF5] via-[#EBF5FA] to-[#F4F9FC]">
              {/* Top Bar */}
              <div className="px-4 pt-2 pb-2.5 flex items-center justify-between shrink-0">
                <div className="relative">
                  <button
                    onClick={() => setShowLocationPicker(!showLocationPicker)}
                    className="flex items-center gap-1.5 text-[#135D66] font-bold text-sm hover:opacity-80 transition py-1"
                  >
                    <IconMapPin className="w-4 h-4 text-[#00897B]" />
                    <span>{selectedProvince}</span>
                    <IconChevronDown className="w-4 h-4 text-[#135D66]" />
                  </button>

                  {/* Location Dropdown */}
                  {showLocationPicker && (
                    <div className="absolute left-0 top-9 w-52 bg-white rounded-2xl shadow-xl border border-[#135D66]/15 py-1.5 z-40 text-xs">
                      {[
                        'สุโขทัย, ประเทศไทย',
                        'อ.เมืองสุโขทัย, สุโขทัย',
                        'อ.ศรีสัชนาลัย, สุโขทัย',
                        'พิษณุโลก, ประเทศไทย',
                        'กรุงเทพมหานคร, ประเทศไทย'
                      ].map((loc) => (
                        <button
                          key={loc}
                          onClick={() => {
                            setSelectedProvince(loc);
                            setShowLocationPicker(false);
                            triggerToast(`เปลี่ยนพื้นที่เป็น ${loc}`);
                          }}
                          className={`w-full text-left px-3.5 py-2 hover:bg-[#E3F2FD] flex items-center justify-between ${
                            selectedProvince === loc ? 'font-bold text-[#135D66] bg-[#E3F2FD]/60' : 'text-slate-700'
                          }`}
                        >
                          <span>{loc}</span>
                          {selectedProvince === loc && <IconCheck className="w-3.5 h-3.5 text-[#4CAF50]" />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Profile Avatar Button */}
                <button
                  onClick={() => setActiveScreen('profile')}
                  className="w-8 h-8 rounded-full bg-[#135D66] text-white flex items-center justify-center shadow-sm hover:scale-105 transition"
                  title="โปรไฟล์ของฉัน"
                >
                  <IconUser className="w-4 h-4" />
                </button>
              </div>

              {/* Search Bar */}
              <div className="px-4 pb-2.5 shrink-0">
                <div className="relative flex items-center bg-white rounded-full shadow-sm border border-[#135D66]/15 px-3.5 py-2">
                  <IconSearch className="w-4 h-4 text-[#135D66]/60 mr-2 shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="ค้นหาร้านอาหาร, ประเภทอาหาร, หรือโซน..."
                    className="w-full text-xs text-slate-700 placeholder-slate-400 bg-transparent focus:outline-none"
                  />
                  {searchQuery && (
                    <button onClick={() => setSearchQuery('')} className="text-slate-400 hover:text-slate-600">
                      <IconX className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Filter Chips */}
              <div className="px-4 pb-2.5 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0 relative">
                <button
                  onClick={() => setActiveFilter(activeFilter === 'nearby' ? 'all' : 'nearby')}
                  className={`px-3 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap transition shadow-xs ${
                    activeFilter === 'nearby'
                      ? 'bg-[#4CAF50] text-white ring-2 ring-[#4CAF50]/30'
                      : 'bg-[#5BB360] text-white hover:bg-[#4CAF50]'
                  }`}
                >
                  ใกล้ฉัน
                </button>
                <button
                  onClick={() => setActiveFilter(activeFilter === 'nowait' ? 'all' : 'nowait')}
                  className={`px-3 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap transition shadow-xs ${
                    activeFilter === 'nowait'
                      ? 'bg-[#00796B] text-white ring-2 ring-[#00897B]/30'
                      : 'bg-[#269A8E] text-white hover:bg-[#1e8278]'
                  }`}
                >
                  ไม่ต้องรอคิว
                </button>
                <button
                  onClick={() => setActiveFilter(activeFilter === 'hot' ? 'all' : 'hot')}
                  className={`px-3 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap transition shadow-xs ${
                    activeFilter === 'hot'
                      ? 'bg-[#0288D1] text-white ring-2 ring-[#03A9F4]/30'
                      : 'bg-[#29B6F6] text-white hover:bg-[#039BE5]'
                  }`}
                >
                  มาแรง
                </button>
                <button
                  onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                  className={`px-3 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap flex items-center gap-1 transition shadow-xs ${
                    activeFilter === 'category'
                      ? 'bg-[#0D47A1] text-white'
                      : 'bg-[#1E88E5] text-white hover:bg-[#1976D2]'
                  }`}
                >
                  <span>{selectedCategory === 'ทั้งหมด' ? 'ประเภทอาหาร' : selectedCategory}</span>
                  <IconChevronDown className="w-3 h-3" />
                </button>
              </div>

              {/* Category Dropdown Popover */}
              {showCategoryDropdown && (
                <div className="mx-4 mb-2 bg-white rounded-2xl p-2 shadow-md border border-[#135D66]/15 flex flex-wrap gap-1.5 z-30">
                  {['ทั้งหมด', 'อาหารไทย', 'อาหารทะเล', 'อาหารอีสาน'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setSelectedCategory(cat);
                        setActiveFilter(cat === 'ทั้งหมด' ? 'all' : 'category');
                        setShowCategoryDropdown(false);
                      }}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-medium ${
                        selectedCategory === cat
                          ? 'bg-[#135D66] text-white'
                          : 'bg-[#E3F2FD] text-[#135D66] hover:bg-[#BBDEFB]'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}

              {/* Scrollable Main Content */}
              <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-3">
                {/* Featured Banner Carousel */}
                <div className="pt-0.5">
                  <div
                    onClick={() => {
                      const target = RESTAURANTS_DATA.find((r) => r.id === BANNERS[currentBanner].targetId) || RESTAURANTS_DATA[0];
                      openRestaurantDetail(target);
                    }}
                    className="relative h-28 rounded-2xl overflow-hidden shadow-md cursor-pointer group"
                  >
                    <SafeImage
                      src={BANNERS[currentBanner].image}
                      alt={BANNERS[currentBanner].title}
                      fallbackLabel="ร้านเด็ดคิวขาวที่ไม่ควรพลาด"
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent flex flex-col justify-end p-3">
                      <span className="inline-block w-fit px-2 py-0.5 bg-[#4CAF50] text-white text-[9px] font-bold rounded-full mb-1">
                        แนะนำในสุโขทัย
                      </span>
                      <h2 className="text-white font-bold text-sm leading-snug drop-shadow">
                        {BANNERS[currentBanner].title}
                      </h2>
                      <p className="text-white/85 text-[10px]">{BANNERS[currentBanner].subtitle}</p>
                    </div>
                  </div>

                  {/* Carousel Indicator Dots */}
                  <div className="flex items-center justify-center gap-1.5 mt-2">
                    {BANNERS.map((b, idx) => (
                      <button
                        key={b.id}
                        onClick={() => setCurrentBanner(idx)}
                        className={`h-1.5 rounded-full transition-all ${
                          currentBanner === idx ? 'w-4 bg-[#135D66]' : 'w-1.5 bg-[#135D66]/30'
                        }`}
                        aria-label={`สไลด์ที่ ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Active Queue Floating Shortcut (ถ้ามีคิวค้างอยู่) */}
                {activeTicket && (
                  <div
                    onClick={() => setActiveScreen('ticket')}
                    className="bg-gradient-to-r from-[#135D66] to-[#1A7A86] text-white rounded-2xl p-2.5 shadow-md flex items-center justify-between cursor-pointer hover:brightness-105 transition"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="bg-white/20 px-2.5 py-1 rounded-xl font-extrabold text-sm tracking-wide">
                        {activeTicket.queueNumber}
                      </div>
                      <div>
                        <p className="text-[11px] font-bold leading-tight">{activeTicket.restaurant.shortName}</p>
                        <p className="text-[10px] text-[#B2EBF2]">
                          {activeTicket.aheadCount === 0
                            ? 'ถึงคิวของคุณแล้ว!'
                            : `เหลืออีก ${activeTicket.aheadCount} คิว • คาดว่า ${activeTicket.estimatedTime}`}
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] bg-white text-[#135D66] font-bold px-2.5 py-1 rounded-full">
                      ดูบัตรคิว
                    </span>
                  </div>
                )}

                {/* Restaurant List Cards */}
                <div className="space-y-2.5">
                  {filteredRestaurants.length === 0 ? (
                    <div className="bg-white rounded-2xl p-6 text-center shadow-xs">
                      <p className="text-sm font-semibold text-slate-600">ไม่พบร้านอาหารที่ค้นหา</p>
                      <button
                        onClick={() => {
                          setSearchQuery('');
                          setActiveFilter('all');
                          setSelectedCategory('ทั้งหมด');
                        }}
                        className="mt-2 text-xs text-[#135D66] underline font-semibold"
                      >
                        ล้างตัวกรองทั้งหมด
                      </button>
                    </div>
                  ) : (
                    filteredRestaurants.map((restaurant) => (
                      <div
                        key={restaurant.id}
                        className="bg-white rounded-2xl p-2.5 shadow-sm border border-[#135D66]/10 flex gap-3 hover:shadow-md transition"
                      >
                        {/* Food Thumbnail */}
                        <div
                          onClick={() => openRestaurantDetail(restaurant)}
                          className="w-24 h-24 rounded-xl overflow-hidden shrink-0 cursor-pointer relative"
                        >
                          <SafeImage
                            src={restaurant.foodImage}
                            alt={restaurant.name}
                            fallbackLabel={restaurant.shortName}
                            className="w-full h-full object-cover hover:scale-105 transition"
                          />
                          {restaurant.isHot && (
                            <span className="absolute top-1 left-1 bg-amber-500/95 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md">
                              ฮิต
                            </span>
                          )}
                        </div>

                        {/* Card Details */}
                        <div className="flex-1 flex flex-col justify-between min-w-0">
                          <div>
                            <div className="flex items-start justify-between gap-1">
                              <h3
                                onClick={() => openRestaurantDetail(restaurant)}
                                className="font-bold text-[13px] text-[#135D66] truncate cursor-pointer hover:underline"
                              >
                                {restaurant.name}
                              </h3>
                              <span className="flex items-center gap-0.5 text-[10px] font-bold text-amber-500 shrink-0">
                                <IconStar className="w-3 h-3 text-amber-400" />
                                {restaurant.rating}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-500 truncate">{restaurant.category}</p>

                            <div className="flex items-center gap-1 text-[11px] text-slate-600 mt-0.5">
                              <IconMapPin className="w-3 h-3 text-[#135D66] shrink-0" />
                              <span>{restaurant.distance}</span>
                            </div>

                            <div className="flex items-center gap-1 text-[11px] mt-0.5">
                              <span
                                className={`w-2 h-2 rounded-full shrink-0 ${
                                  restaurant.waitMinutes === 0 ? 'bg-[#4CAF50]' : 'bg-[#00897B]'
                                }`}
                              ></span>
                              {restaurant.waitMinutes === 0 ? (
                                <span className="text-[#4CAF50] font-semibold">พร้อมให้บริการทันที (0 คิว)</span>
                              ) : (
                                <span className="text-slate-600">
                                  รอประมาณ{' '}
                                  <strong className="text-[#00897B] font-bold">{restaurant.waitMinutes} นาที</strong> (
                                  {restaurant.waitQueues} คิว)
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Book Now Button */}
                          <div className="flex justify-end mt-1.5">
                            <button
                              onClick={() => openRestaurantDetail(restaurant)}
                              className="bg-[#135D66] hover:bg-[#0e4850] text-white text-[11px] font-semibold px-3.5 py-1.5 rounded-full shadow-xs transition active:scale-95"
                            >
                              จองคิวทันที
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* SCREEN 2: หน้ารายละเอียดร้าน / จองคิว (RESTAURANT DETAIL & BOOKING) */}
          {/* ================================================================= */}
          {activeScreen === 'detail' && (
            <div className="flex-1 flex flex-col overflow-hidden bg-[#F2F8FB]">
              {/* Top Hero Header with Restaurant Banner */}
              <div className="relative h-40 shrink-0">
                <SafeImage
                  src={selectedRestaurant.gallery[activeGalleryIdx] || selectedRestaurant.heroImage}
                  alt={selectedRestaurant.name}
                  fallbackLabel={selectedRestaurant.shortName}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/20 to-black/65" />

                {/* Top Navigation Overlay */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <button
                    onClick={() => setActiveScreen('home')}
                    className="w-8 h-8 rounded-full bg-white/90 text-[#135D66] flex items-center justify-center shadow-md hover:bg-white transition"
                  >
                    <IconChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setActiveScreen('profile')}
                    className="w-8 h-8 rounded-full bg-[#135D66]/90 text-white flex items-center justify-center shadow-md"
                  >
                    <IconUser className="w-4 h-4" />
                  </button>
                </div>

                {/* Restaurant Wooden Signboard Style Overlay (ตามภาพตัวอย่าง) */}
                <div className="absolute inset-x-10 bottom-5 bg-[#3E2723]/90 border-2 border-[#D7CCC8]/70 rounded-xl py-2 px-3 text-center shadow-lg backdrop-blur-xs">
                  <h2 className="text-[#FFE082] font-extrabold text-lg tracking-wide drop-shadow">
                    {selectedRestaurant.shortName}
                  </h2>
                  <p className="text-[10px] text-[#D7CCC8] truncate">{selectedRestaurant.location}</p>
                </div>
              </div>

              {/* Scrollable Body */}
              <div className="flex-1 overflow-y-auto px-4 pt-3 pb-5 space-y-3">
                {/* 3 Sub-Gallery Thumbnails */}
                <div className="grid grid-cols-3 gap-2">
                  {selectedRestaurant.gallery.map((imgUrl, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        setActiveGalleryIdx(idx);
                        setLightboxImage(imgUrl);
                      }}
                      className={`h-16 rounded-xl overflow-hidden cursor-pointer border-2 transition ${
                        activeGalleryIdx === idx ? 'border-[#135D66] shadow-sm' : 'border-transparent opacity-85 hover:opacity-100'
                      }`}
                    >
                      <SafeImage
                        src={imgUrl}
                        alt={`รูปภาพที่ ${idx + 1}`}
                        fallbackLabel={selectedRestaurant.shortName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>

                {/* Title, Rating & Map Button */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-base text-[#135D66] leading-tight">{selectedRestaurant.name}</h3>
                    <div className="flex items-center gap-1 mt-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <IconStar key={star} className="w-3.5 h-3.5 text-amber-400" />
                      ))}
                      <span className="text-xs font-bold text-slate-700 ml-1">{selectedRestaurant.rating}/5</span>
                      <span className="text-[11px] text-slate-400">({selectedRestaurant.reviews} รีวิว)</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setMapTargetRestaurant(selectedRestaurant);
                      setShowMapModal(true);
                    }}
                    className="flex items-center gap-1 bg-[#D6ECF5] hover:bg-[#BFE2F2] text-[#135D66] text-xs font-semibold px-3 py-1.5 rounded-full transition shrink-0"
                  >
                    <IconMapPin className="w-3.5 h-3.5 text-[#00897B]" />
                    <span>แผนที่</span>
                  </button>
                </div>

                {/* Live Queue Dashboard (การ์ดสีเขียวตามภาพตัวอย่าง) */}
                <div className="bg-gradient-to-r from-[#8BC34A] to-[#7CB342] rounded-2xl p-3 text-white shadow-sm">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-extrabold tracking-wide text-[#1B3B1A]">Live Queue Dashboard</span>
                    <span className="flex items-center gap-1 text-[10px] bg-white/25 px-2 py-0.5 rounded-full font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
                      อัปเดตสด
                    </span>
                  </div>

                  <div className="space-y-1 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-[#1B3B1A] font-semibold">
                        คิวปัจจุบัน: <strong className="text-white text-sm">{getLiveCurrentQueue()}</strong>
                      </span>
                      <span className="flex items-center gap-1 font-bold text-[#135D66] bg-white/85 px-2 py-0.5 rounded-md text-[11px]">
                        <IconUsers className="w-3 h-3" /> {getLiveCurrentQueue()}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-[#1B3B1A] font-semibold">
                        รออีก: <strong className="text-white">{selectedRestaurant.waitQueues} คิว</strong>
                      </span>
                      <span className="flex items-center gap-1 font-bold text-[#1B3B1A] text-[11px]">
                        <IconUsers className="w-3.5 h-3.5" /> {selectedRestaurant.waitQueues} คิว
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-0.5 border-t border-white/25">
                      <span className="text-[#1B3B1A] font-semibold">เวลาโดยประมาณ:</span>
                      <span className="font-extrabold text-sm text-[#135D66] bg-white/90 px-2 py-0.5 rounded-md">
                        {selectedRestaurant.waitMinutes === 0 ? 'ทันที' : `~${selectedRestaurant.waitMinutes} นาที`}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Booking Form */}
                <div className="space-y-2.5 pt-1">
                  {/* Guest Count Selector */}
                  <div className="flex items-center justify-between bg-white px-3.5 py-2.5 rounded-2xl border border-[#135D66]/10 shadow-2xs">
                    <span className="text-xs font-bold text-slate-700">จำนวนผู้ใช้บริการ</span>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                        className="w-7 h-7 rounded-lg bg-[#8BC34A] hover:bg-[#7CB342] text-white flex items-center justify-center font-bold transition active:scale-90"
                      >
                        <IconMinus className="w-4 h-4" />
                      </button>
                      <span className="text-sm font-extrabold text-[#135D66] w-11 text-center">{guestCount} คน</span>
                      <button
                        onClick={() => setGuestCount(Math.min(20, guestCount + 1))}
                        className="w-7 h-7 rounded-lg bg-[#1976D2] hover:bg-[#1565C0] text-white flex items-center justify-center font-bold transition active:scale-90"
                      >
                        <IconPlus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Zone Selector */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">เลือกโซน</label>
                    <div className="relative">
                      <select
                        value={selectedZone}
                        onChange={(e) => setSelectedZone(e.target.value)}
                        className="w-full appearance-none bg-[#8BC34A]/85 text-[#1B3B1A] font-semibold text-xs px-3.5 py-2.5 rounded-xl border border-[#7CB342] focus:outline-none cursor-pointer"
                      >
                        <option value="ด้านใน">ด้านใน</option>
                        <option value="Outdoors">Outdoors</option>
                        <option value="ไม่ระบุ">ไม่ระบุ</option>
                      </select>
                      <IconChevronDown className="w-4 h-4 text-[#1B3B1A] absolute right-3 top-2.5 pointer-events-none" />
                    </div>
                  </div>

                  {/* Special Request */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">คำขอพิเศษ</label>
                    <textarea
                      rows={2}
                      value={specialRequest}
                      onChange={(e) => setSpecialRequest(e.target.value)}
                      placeholder="เช่น ขอเก้าอี้เด็ก, แพ้อาหารทะเล, โต๊ะริมหน้าต่าง..."
                      className="w-full bg-[#DCEDC8]/80 placeholder-[#558B2F]/70 text-slate-800 text-xs p-2.5 rounded-xl border border-[#AED581] focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
                    />
                  </div>

                  {/* Confirm Green CTA Button */}
                  <button
                    onClick={handleConfirmBooking}
                    className="w-full py-3 rounded-xl bg-[#4CAF50] hover:bg-[#43A047] text-white font-bold text-sm shadow-md transition active:scale-[0.98] mt-1"
                  >
                    ยืนยันขอรับคิว
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* SCREEN 3: หน้าบัตรคิวของคุณ (ACTIVE QUEUE TICKET VIEW)             */}
          {/* ================================================================= */}
          {activeScreen === 'ticket' && activeTicket && (
            <div className="flex-1 flex flex-col justify-between bg-gradient-to-b from-[#D6ECF5] via-[#E8F4FA] to-[#F5FAFC] px-4 py-3 overflow-y-auto">
              {/* Header with Close Button */}
              <div className="flex items-center justify-between">
                <div className="w-7" />
                <h2 className="text-sm font-bold text-[#135D66]">บัตรคิวของคุณ</h2>
                <button
                  onClick={() => setActiveScreen('myQueues')}
                  className="w-7 h-7 rounded-full bg-white/80 hover:bg-white text-slate-600 flex items-center justify-center shadow-2xs transition"
                  title="ปิดหน้าต่าง"
                >
                  <IconX className="w-4 h-4" />
                </button>
              </div>

              {/* Main Ticket Card */}
              <div className="bg-white rounded-3xl shadow-lg border border-[#135D66]/10 overflow-hidden my-2">
                {/* Soft Blue Ticket Top Header */}
                <div className="bg-gradient-to-r from-[#CBE8F6] to-[#BCE0F2] py-2.5 px-4 text-center border-b border-dashed border-[#135D66]/25">
                  <span className="text-xs font-extrabold text-[#135D66] tracking-wider uppercase">
                    Ticket Card • {activeTicket.restaurant.shortName}
                  </span>
                </div>

                {/* Ticket Body */}
                <div className="p-4 text-center relative">
                  {/* Decorative Ticket Cutouts */}
                  <div className="w-5 h-5 rounded-full bg-[#E6F3F9] absolute -left-2.5 top-1/2 -translate-y-1/2" />
                  <div className="w-5 h-5 rounded-full bg-[#E6F3F9] absolute -right-2.5 top-1/2 -translate-y-1/2" />

                  <p className="text-xs font-semibold text-slate-500">หมายเลขคิวของคุณ</p>
                  <div className="text-5xl font-black text-[#135D66] tracking-wider my-2 drop-shadow-xs">
                    {activeTicket.queueNumber}
                  </div>

                  <div className="inline-flex items-center gap-2 bg-[#E3F2FD] text-[#135D66] text-[11px] font-semibold px-3 py-1 rounded-full mb-3">
                    <span>{activeTicket.guests} ท่าน</span>
                    <span>•</span>
                    <span>{activeTicket.zone}</span>
                  </div>

                  <div className="space-y-1 text-xs text-slate-700 border-t border-slate-100 pt-3">
                    <p>
                      จำนวนคิวข้างหน้า:{' '}
                      <strong className="text-[#135D66] font-extrabold">
                        {activeTicket.aheadCount === 0 ? 'ถึงคิวของคุณแล้ว!' : `เหลืออีก ${activeTicket.aheadCount} คิว`}
                      </strong>
                    </p>
                    <p>
                      เวลาที่คาดว่าจะถึงคิว:{' '}
                      <strong className="text-[#00897B] font-extrabold">{activeTicket.estimatedTime}</strong>
                    </p>
                  </div>

                  {/* 3-Step Progress Stepper */}
                  <div className="mt-5 mb-2 px-2">
                    <div className="relative flex items-center justify-between">
                      {/* Line Background */}
                      <div className="absolute left-4 right-4 top-2.5 h-1 bg-slate-200 rounded-full" />
                      {/* Active Line Fill */}
                      <div
                        className="absolute left-4 top-2.5 h-1 bg-[#26A69A] rounded-full transition-all duration-500"
                        style={{
                          width: activeTicket.statusStep === 3 ? '85%' : '45%'
                        }}
                      />

                      {/* Step 1: รับคิวแล้ว */}
                      <div className="relative z-10 flex flex-col items-center">
                        <div className="w-5 h-5 rounded-full bg-[#26A69A] border-2 border-white shadow flex items-center justify-center">
                          <IconCheck className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-[10px] font-semibold text-slate-600 mt-1.5">รับคิวแล้ว</span>
                      </div>

                      {/* Step 2: กำลังรอ */}
                      <div className="relative z-10 flex flex-col items-center">
                        <div
                          className={`w-5 h-5 rounded-full border-2 border-white shadow flex items-center justify-center ${
                            activeTicket.statusStep >= 2 ? 'bg-[#00897B] ring-4 ring-[#00897B]/20' : 'bg-slate-300'
                          }`}
                        >
                          <div className="w-2 h-2 rounded-full bg-white" />
                        </div>
                        <span
                          className={`text-[10px] font-bold mt-1.5 ${
                            activeTicket.statusStep === 2 ? 'text-[#00897B]' : 'text-slate-600'
                          }`}
                        >
                          กำลังรอ
                        </span>
                      </div>

                      {/* Step 3: ถึงคิวของคุณ */}
                      <div className="relative z-10 flex flex-col items-center">
                        <div
                          className={`w-5 h-5 rounded-full border-2 border-white shadow flex items-center justify-center ${
                            activeTicket.statusStep === 3
                              ? 'bg-[#4CAF50] ring-4 ring-[#4CAF50]/30 animate-bounce'
                              : 'bg-slate-200'
                          }`}
                        >
                          {activeTicket.statusStep === 3 && <IconCheck className="w-3 h-3 text-white" />}
                        </div>
                        <span
                          className={`text-[10px] font-bold mt-1.5 ${
                            activeTicket.statusStep === 3 ? 'text-[#4CAF50]' : 'text-slate-400'
                          }`}
                        >
                          ถึงคิวของคุณ
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Interactive Demo Button: จำลองคิวถัดไป */}
                  <button
                    onClick={handleSimulateQueueProgress}
                    className="mt-2 inline-flex items-center gap-1 text-[10px] bg-slate-100 hover:bg-slate-200 text-[#135D66] font-semibold px-2.5 py-1 rounded-full transition"
                  >
                    <IconRefreshCw className="w-3 h-3" />
                    <span>จำลองคิวถัดไป</span>
                  </button>

                  {/* 3 Action Buttons ตามภาพตัวอย่าง */}
                  <div className="space-y-2 mt-4">
                    <button
                      onClick={() => {
                        setMapTargetRestaurant(activeTicket.restaurant);
                        setShowMapModal(true);
                      }}
                      className="w-full py-2.5 rounded-xl bg-[#2B8A9E] hover:bg-[#227283] text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-xs transition"
                    >
                      <IconMapPin className="w-4 h-4" />
                      <span>ดูตำแหน่งร้าน</span>
                    </button>

                    <button
                      onClick={() => setShowMenuModal(true)}
                      className="w-full py-2.5 rounded-xl bg-[#8BC34A] hover:bg-[#7CB342] text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-xs transition"
                    >
                      <IconBookOpen className="w-4 h-4" />
                      <span>ดูเมนูอาหารล่วงหน้า</span>
                    </button>

                    <button
                      onClick={() => setShowManageQueueModal(true)}
                      className="w-full py-2.5 rounded-xl bg-[#5C8D3E] hover:bg-[#4d7733] text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-xs transition"
                    >
                      <span>เลื่อนคิว / ยกเลิกคิว</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Bottom Notification Bar */}
              <div className="bg-[#78909C]/90 text-white rounded-full py-2 px-3.5 flex items-center justify-center gap-1.5 text-[11px] font-medium shadow-xs">
                <IconAlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>*ระบบจะแจ้งเตือนเมื่อเหลืออีก 2 คิว</span>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* SCREEN 4: หน้าคิวของฉัน / ประวัติ (MY QUEUES & HISTORY VIEW)       */}
          {/* ================================================================= */}
          {activeScreen === 'myQueues' && (
            <div className="flex-1 flex flex-col overflow-hidden bg-[#F2F8FB]">
              {/* Top Teal Header with Tabs */}
              <div className="bg-[#135D66] text-white pt-3 px-4 shrink-0 shadow-sm">
                <h2 className="text-center font-bold text-sm mb-3">คิวของฉัน / ประวัติ</h2>
                <div className="grid grid-cols-2 text-xs font-semibold">
                  <button
                    onClick={() => setMyQueuesTab('current')}
                    className={`pb-2.5 text-center border-b-2 transition ${
                      myQueuesTab === 'current'
                        ? 'border-white text-white'
                        : 'border-transparent text-white/65 hover:text-white'
                    }`}
                  >
                    คิวปัจจุบัน ({activeTicket ? 1 : 0})
                  </button>
                  <button
                    onClick={() => setMyQueuesTab('history')}
                    className={`pb-2.5 text-center border-b-2 transition ${
                      myQueuesTab === 'history'
                        ? 'border-white text-white'
                        : 'border-transparent text-white/65 hover:text-white'
                    }`}
                  >
                    ประวัติการจอง ({historyList.length})
                  </button>
                </div>
              </div>

              {/* Content Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {/* Mini Ticket Card Section (แสดงเมื่ออยู่แท็บคิวปัจจุบัน) */}
                {myQueuesTab === 'current' && (
                  <div>
                    {activeTicket ? (
                      <div className="bg-white rounded-2xl shadow-sm border border-[#135D66]/15 overflow-hidden">
                        <div className="bg-[#D6ECF5] py-1.5 px-3 text-center text-[11px] font-bold text-[#135D66]">
                          Mini Ticket Card
                        </div>
                        <div className="p-3 flex items-center justify-between gap-2.5">
                          <div className="flex items-center gap-2.5 min-w-0">
                            <SafeImage
                              src={activeTicket.restaurant.heroImage}
                              alt={activeTicket.restaurant.name}
                              fallbackLabel={activeTicket.restaurant.shortName}
                              className="w-16 h-16 rounded-xl object-cover shrink-0"
                            />
                            <div className="min-w-0">
                              <h3 className="font-bold text-xs text-[#135D66] truncate">
                                {activeTicket.restaurant.shortName}
                              </h3>
                              <p className="text-[10px] text-slate-500">{activeTicket.restaurant.tagType}</p>
                              <p className="text-[10px] text-slate-600 flex items-center gap-0.5 mt-0.5">
                                <IconMapPin className="w-3 h-3 text-[#135D66]" /> {activeTicket.restaurant.distance}
                              </p>
                            </div>
                          </div>

                          <div className="text-right shrink-0">
                            <div className="text-xl font-black text-[#135D66] leading-none mb-1.5">
                              {activeTicket.queueNumber}
                            </div>
                            <button
                              onClick={() => setActiveScreen('ticket')}
                              className="bg-[#135D66] hover:bg-[#0e4850] text-white text-[10px] font-semibold px-2.5 py-1 rounded-full transition"
                            >
                              ดูบัตรคิวเต็ม
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-white rounded-2xl p-6 text-center border border-slate-100 shadow-2xs">
                        <IconClipboardList className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                        <p className="text-xs font-semibold text-slate-600">ไม่มีคิวที่กำลังรอในขณะนี้</p>
                        <button
                          onClick={() => setActiveScreen('home')}
                          className="mt-3 bg-[#135D66] text-white text-xs font-semibold px-4 py-1.5 rounded-full"
                        >
                          ค้นหาร้านอาหารเพื่อจองคิว
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Booking History Section */}
                <div>
                  <h3 className="font-bold text-xs text-[#135D66] mb-2.5">ประวัติการจอง</h3>
                  <div className="space-y-2.5">
                    {historyList.map((hist) => (
                      <div
                        key={hist.id}
                        className="bg-white rounded-2xl p-2.5 shadow-2xs border border-slate-100 flex items-center gap-3"
                      >
                        <SafeImage
                          src={hist.image}
                          alt={hist.restaurantName}
                          fallbackLabel={hist.restaurantName}
                          className="w-16 h-16 rounded-xl object-cover shrink-0 grayscale-[20%]"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-xs text-slate-800 truncate">{hist.restaurantName}</h4>
                          <p className="text-[10px] text-slate-500 mt-0.5">• {hist.date}</p>
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-[10px] text-slate-600 flex items-center gap-1">
                              <IconUsers className="w-3 h-3 text-slate-400" /> {hist.guests} คน
                            </span>
                            <span
                              className={`text-[10px] font-bold ${
                                hist.status === 'เสร็จสิ้น' ? 'text-[#4CAF50]' : 'text-rose-500'
                              }`}
                            >
                              {hist.status}
                            </span>
                          </div>
                          <div className="flex justify-end mt-1.5">
                            <button
                              onClick={() => {
                                const found =
                                  RESTAURANTS_DATA.find((r) => r.id === hist.restaurantId) || RESTAURANTS_DATA[0];
                                openRestaurantDetail(found);
                              }}
                              className="bg-[#135D66] hover:bg-[#0e4850] text-white text-[10px] font-semibold px-3 py-1 rounded-full transition"
                            >
                              จองซ้ำร้านนี้
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* SCREEN 5: หน้าสิทธิพิเศษ (PRIVILEGES / COUPONS VIEW)               */}
          {/* ================================================================= */}
          {activeScreen === 'privileges' && (
            <div className="flex-1 flex flex-col overflow-hidden bg-[#F2F8FB]">
              <div className="bg-[#135D66] text-white p-4 shrink-0">
                <h2 className="font-bold text-base flex items-center gap-2">
                  <IconSparkles className="w-4 h-4 text-amber-300" />
                  <span>สิทธิพิเศษ & คูปองส่วนลด</span>
                </h2>
                <p className="text-[11px] text-white/80 mt-0.5">ใช้คู่กับการจองคิวร้านอาหารในจังหวัดสุโขทัย</p>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {[
                  {
                    id: 'CPN1',
                    title: 'ส่วนลด 15% เมนูก๋วยเตี๋ยวสุโขทัย',
                    shop: 'ร้านเด็ดเลย (สาขาสุโขทัย)',
                    expire: 'ใช้ได้ถึง 31 ธ.ค. 2569',
                    badge: 'ยอดนิยม'
                  },
                  {
                    id: 'CPN2',
                    title: 'ฟรี! เครื่องดื่มสมุนไพร 2 แก้ว',
                    shop: 'ครัวต้มยำกุ้งแม่น้ำ',
                    expire: 'เมื่อมียอดทานครบ 500 บาท',
                    badge: 'จำนวนจำกัด'
                  },
                  {
                    id: 'CPN3',
                    title: 'รับสิทธิ์คิวด่วน Fast Track 1 ครั้ง',
                    shop: 'ทุกร้านอาหารที่ร่วมรายการ',
                    expire: 'สำหรับสมาชิกใหม่',
                    badge: 'VIP'
                  }
                ].map((cpn) => {
                  const isClaimed = claimedCoupons.includes(cpn.id);
                  return (
                    <div
                      key={cpn.id}
                      className="bg-white rounded-2xl p-3.5 shadow-xs border border-[#135D66]/15 flex items-center justify-between gap-3"
                    >
                      <div className="space-y-1">
                        <span className="inline-block bg-[#E3F2FD] text-[#135D66] text-[10px] font-bold px-2 py-0.5 rounded-md">
                          {cpn.badge}
                        </span>
                        <h3 className="font-bold text-xs text-slate-800">{cpn.title}</h3>
                        <p className="text-[11px] text-[#00897B] font-medium">{cpn.shop}</p>
                        <p className="text-[10px] text-slate-400">{cpn.expire}</p>
                      </div>
                      <button
                        onClick={() => {
                          if (!isClaimed) {
                            setClaimedCoupons([...claimedCoupons, cpn.id]);
                            triggerToast('เก็บคูปองเรียบร้อยแล้ว!');
                          } else {
                            setActiveScreen('home');
                          }
                        }}
                        className={`px-3 py-1.5 rounded-xl text-[11px] font-bold shrink-0 transition ${
                          isClaimed
                            ? 'bg-[#E3F2FD] text-[#135D66]'
                            : 'bg-[#4CAF50] hover:bg-[#43A047] text-white shadow-xs'
                        }`}
                      >
                        {isClaimed ? 'ใช้คูปอง' : 'เก็บสิทธิ์'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* SCREEN 6: หน้าโปรไฟล์ (PROFILE VIEW)                              */}
          {/* ================================================================= */}
          {activeScreen === 'profile' && (
            <div className="flex-1 flex flex-col overflow-hidden bg-[#F2F8FB]">
              <div className="bg-gradient-to-br from-[#135D66] to-[#1D7E8A] text-white p-5 shrink-0 text-center">
                <div className="w-16 h-16 rounded-full bg-white/20 border-2 border-white mx-auto flex items-center justify-center mb-2">
                  <IconUser className="w-8 h-8 text-white" />
                </div>
                <h2 className="font-bold text-base">คุณสุโขทัย ใจดี</h2>
                <p className="text-xs text-white/80">089-xxx-4567 • สมาชิกระดับ Gold</p>

                <div className="grid grid-cols-3 gap-2 bg-white/15 rounded-2xl p-2.5 mt-4 text-xs">
                  <div>
                    <div className="font-extrabold text-sm">12</div>
                    <div className="text-[10px] text-white/80">จองคิวแล้ว</div>
                  </div>
                  <div className="border-x border-white/20">
                    <div className="font-extrabold text-sm">340</div>
                    <div className="text-[10px] text-white/80">คะแนนสะสม</div>
                  </div>
                  <div>
                    <div className="font-extrabold text-sm">{claimedCoupons.length}</div>
                    <div className="text-[10px] text-white/80">คูปองของฉัน</div>
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-2.5 text-xs">
                {[
                  { IconComp: IconHeart, label: 'ร้านอาหารโปรดของฉัน', sub: '3 ร้านที่บันทึกไว้' },
                  { IconComp: IconBell, label: 'การตั้งค่าแจ้งเตือนคิว', sub: 'แจ้งเตือนล่วงหน้า 2 คิว (เปิดอยู่)' },
                  { IconComp: IconAward, label: 'สิทธิประโยชน์สมาชิก Gold', sub: 'รับส่วนลดพิเศษทุกวันศุกร์' },
                  { IconComp: IconPhone, label: 'ศูนย์ช่วยเหลือ & ติดต่อเรา', sub: 'สอบถามปัญหาการใช้งาน' }
                ].map((menu, i) => {
                  const MenuIcon = menu.IconComp;
                  return (
                    <div
                      key={i}
                      onClick={() => triggerToast(`เปิดเมนู: ${menu.label}`)}
                      className="bg-white p-3.5 rounded-2xl border border-slate-100 shadow-2xs flex items-center justify-between cursor-pointer hover:bg-[#E3F2FD]/40 transition"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-[#E3F2FD] text-[#135D66] flex items-center justify-center">
                          <MenuIcon className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-bold text-slate-800">{menu.label}</p>
                          <p className="text-[10px] text-slate-500">{menu.sub}</p>
                        </div>
                      </div>
                      <IconChevronLeft className="w-4 h-4 text-slate-400 rotate-180" />
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* BOTTOM NAVIGATION BAR (4 แท็บหลักตามภาพตัวอย่าง)                   */}
          {/* ================================================================= */}
          <nav className="bg-white border-t border-slate-200 px-2 py-2 grid grid-cols-4 shrink-0 z-20">
            <button
              onClick={() => setActiveScreen('home')}
              className={`flex flex-col items-center justify-center gap-0.5 py-1 rounded-xl transition ${
                activeScreen === 'home' || activeScreen === 'detail'
                  ? 'text-[#135D66] font-bold'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <IconHome className="w-5 h-5" />
              <span className="text-[10px]">หน้าแรก</span>
            </button>

            <button
              onClick={() => setActiveScreen('privileges')}
              className={`flex flex-col items-center justify-center gap-0.5 py-1 rounded-xl transition ${
                activeScreen === 'privileges' ? 'text-[#135D66] font-bold' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <IconTag className="w-5 h-5" />
              <span className="text-[10px]">สิทธิพิเศษ</span>
            </button>

            <button
              onClick={() => setActiveScreen('myQueues')}
              className={`relative flex flex-col items-center justify-center gap-0.5 py-1 rounded-xl transition ${
                activeScreen === 'myQueues' || activeScreen === 'ticket'
                  ? 'text-[#135D66] font-bold'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {activeTicket && (
                <span className="absolute top-0.5 right-5 w-2 h-2 rounded-full bg-[#4CAF50] ring-2 ring-white" />
              )}
              <IconClipboardList className="w-5 h-5" />
              <span className="text-[10px]">คิวของฉัน</span>
            </button>

            <button
              onClick={() => setActiveScreen('profile')}
              className={`flex flex-col items-center justify-center gap-0.5 py-1 rounded-xl transition ${
                activeScreen === 'profile' ? 'text-[#135D66] font-bold' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <IconUser className="w-5 h-5" />
              <span className="text-[10px]">โปรไฟล์</span>
            </button>
          </nav>

          {/* ================================================================= */}
          {/* MODALS & DIALOGS (แผนที่ / เมนูอาหารล่วงหน้า / เลื่อน-ยกเลิกคิว)     */}
          {/* ================================================================= */}

          {/* 1. Map Modal */}
          {showMapModal && (
            <div className="absolute inset-0 bg-black/55 backdrop-blur-xs z-50 flex items-end sm:items-center justify-center p-3">
              <div className="bg-white w-full rounded-3xl overflow-hidden shadow-2xl animate-fade-in">
                <div className="bg-[#135D66] text-white px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-bold">
                    <IconNavigation className="w-4 h-4 text-[#8BC34A]" />
                    <span>ตำแหน่งร้านอาหาร</span>
                  </div>
                  <button onClick={() => setShowMapModal(false)} className="text-white/80 hover:text-white">
                    <IconX className="w-4 h-4" />
                  </button>
                </div>

                {/* Simulated Interactive Map Canvas */}
                <div className="relative h-48 bg-[#E3F2FD] overflow-hidden flex items-center justify-center">
                  <svg className="w-full h-full opacity-40" viewBox="0 0 400 200">
                    <path d="M0,40 Q150,80 400,30" stroke="#90CAF9" strokeWidth="14" fill="none" />
                    <path d="M60,0 L120,200" stroke="#FFFFFF" strokeWidth="10" fill="none" />
                    <path d="M0,130 L400,110" stroke="#FFFFFF" strokeWidth="12" fill="none" />
                    <path d="M260,0 L240,200" stroke="#FFFFFF" strokeWidth="8" fill="none" />
                  </svg>
                  <div className="absolute flex flex-col items-center animate-bounce">
                    <div className="bg-[#135D66] text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md mb-1">
                      {mapTargetRestaurant.shortName} ({mapTargetRestaurant.distance})
                    </div>
                    <IconMapPin className="w-8 h-8 text-rose-500" />
                  </div>
                </div>

                <div className="p-4 space-y-2.5">
                  <h4 className="font-bold text-sm text-[#135D66]">{mapTargetRestaurant.name}</h4>
                  <p className="text-xs text-slate-600">{mapTargetRestaurant.location}</p>
                  <div className="flex gap-2 pt-1">
                    <button
                      onClick={() => {
                        setShowMapModal(false);
                        triggerToast('เปิดระบบนำทางไปยังร้านอาหารแล้ว');
                      }}
                      className="flex-1 py-2.5 rounded-xl bg-[#4CAF50] text-white font-bold text-xs shadow-xs"
                    >
                      เริ่มนำทาง (Google Maps)
                    </button>
                    <button
                      onClick={() => setShowMapModal(false)}
                      className="px-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-semibold text-xs"
                    >
                      ปิด
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 2. Pre-order Menu Modal */}
          {showMenuModal && activeTicket && (
            <div className="absolute inset-0 bg-black/55 backdrop-blur-xs z-50 flex items-end justify-center">
              <div className="bg-white w-full max-h-[82%] rounded-t-3xl overflow-hidden shadow-2xl flex flex-col">
                <div className="bg-[#135D66] text-white px-4 py-3.5 flex items-center justify-between shrink-0">
                  <div>
                    <h4 className="font-bold text-sm">เมนูแนะนำ • {activeTicket.restaurant.shortName}</h4>
                    <p className="text-[10px] text-white/80">เลือกดูรายการอาหารล่วงหน้าระหว่างรอคิว</p>
                  </div>
                  <button
                    onClick={() => setShowMenuModal(false)}
                    className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center"
                  >
                    <IconX className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-4 overflow-y-auto space-y-2.5 flex-1">
                  {activeTicket.restaurant.menu.map((dish) => (
                    <div
                      key={dish.id}
                      className="p-3 rounded-2xl bg-[#F4F9FC] border border-[#135D66]/10 flex items-start justify-between gap-2"
                    >
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h5 className="font-bold text-xs text-slate-800">{dish.name}</h5>
                          {dish.popular && (
                            <span className="bg-amber-100 text-amber-700 text-[9px] font-bold px-1.5 py-0.5 rounded">
                              แนะนำ
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">{dish.desc}</p>
                      </div>
                      <span className="font-extrabold text-xs text-[#135D66] shrink-0">฿{dish.price}</span>
                    </div>
                  ))}
                </div>

                <div className="p-3 border-t border-slate-100 shrink-0">
                  <button
                    onClick={() => {
                      setShowMenuModal(false);
                      triggerToast('บันทึกเมนูที่สนใจไว้ในบัตรคิวแล้ว');
                    }}
                    className="w-full py-2.5 rounded-xl bg-[#4CAF50] text-white font-bold text-xs"
                  >
                    ตกลง / ปิดหน้าต่างเมนู
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 3. Postpone / Cancel Queue Dialog */}
          {showManageQueueModal && activeTicket && (
            <div className="absolute inset-0 bg-black/55 backdrop-blur-xs z-50 flex items-center justify-center p-4">
              <div className="bg-white w-full rounded-3xl p-5 shadow-2xl space-y-3 text-center">
                <div className="w-12 h-12 rounded-full bg-[#E3F2FD] text-[#135D66] flex items-center justify-center mx-auto">
                  <IconClock className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-base text-[#135D66]">จัดการคิว {activeTicket.queueNumber}</h4>
                <p className="text-xs text-slate-600">
                  หากคุณยังเดินทางมาไม่ถึงหน้าร้าน สามารถเลือกเลื่อนคิวออกไป 2 คิว หรือยกเลิกคิวได้
                </p>

                <div className="space-y-2 pt-2">
                  <button
                    onClick={handlePostponeQueue}
                    className="w-full py-2.5 rounded-xl bg-[#135D66] hover:bg-[#0e4850] text-white font-bold text-xs transition"
                  >
                    เลื่อนคิวออกไป (+2 คิว)
                  </button>
                  <button
                    onClick={handleCancelQueue}
                    className="w-full py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold text-xs transition"
                  >
                    ยืนยันการยกเลิกคิวนี้
                  </button>
                  <button
                    onClick={() => setShowManageQueueModal(false)}
                    className="w-full py-2 text-xs text-slate-400 font-semibold"
                  >
                    กลับไปหน้าบัตรคิว
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 4. Image Lightbox Modal */}
          {lightboxImage && (
            <div
              onClick={() => setLightboxImage(null)}
              className="absolute inset-0 bg-black/85 z-50 flex items-center justify-center p-4 cursor-pointer"
            >
              <SafeImage
                src={lightboxImage}
                alt="ขยายรูปภาพ"
                fallbackLabel={selectedRestaurant.shortName}
                className="max-w-full max-h-[70%] rounded-2xl shadow-2xl"
              />
              <button className="absolute top-6 right-6 w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center">
                <IconX className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}