'use client';

import { useState, useEffect, type MouseEventHandler, type CSSProperties } from 'react';

// ============================================================================
// SYSTEM THEME TOKENS (ธีมระบบ: Deep Slate Navy + Warm Amber + Semantic Colors)
// ใช้ทั้ง Inline CSS Styles และ Tailwind เพื่อให้สีแสดงผลตรงตามระบบ 100%
// ============================================================================
const PALETTE = {
  pageBg: '#E2E8F0',          // พื้นหลังรอบนอก (Cool Slate)
  appBg: '#F8FAFC',           // พื้นหลังภายในแอป
  cardBg: '#FFFFFF',          // การ์ดเนื้อหา
  inkPrimary: '#0F172A',      // ตัวอักษรหลัก (Deep Slate Navy)
  inkSecondary: '#475569',    // ตัวอักษรรอง
  border: '#CBD5E1',          // เส้นขอบเชิงระบบ
  primary: '#0F172A',         // สีหลักของระบบ (Slate Navy)
  accent: '#D97706',          // สีเน้นแอคชัน/เลขคิว (Warm Amber)
  accentSoft: '#FEF3C7',      // พื้นหลังป้ายเน้น
  accentText: '#92400E',
  infoBg: '#EFF6FF',          // สถานะข้อมูล/คิวสด
  infoBorder: '#BFDBFE',
  infoText: '#1E40AF',
  successBg: '#ECFDF5',       // สถานะยืนยัน/สำเร็จ
  successBorder: '#A7F3D0',
  successText: '#065F46',
  dangerBg: '#FEF2F2',        // สถานะยกเลิก/แจ้งเตือน
  dangerBorder: '#FECACA',
  dangerText: '#991B1B',
} as const;

const btnPrimaryStyle: CSSProperties = {
  backgroundColor: PALETTE.primary,
  color: '#FFFFFF',
};

const btnAccentStyle: CSSProperties = {
  backgroundColor: PALETTE.accent,
  color: '#FFFFFF',
};

const btnSuccessStyle: CSSProperties = {
  backgroundColor: '#047857',
  color: '#FFFFFF',
};

const btnSecondaryStyle: CSSProperties = {
  backgroundColor: '#F1F5F9',
  color: PALETTE.inkPrimary,
  border: `1px solid ${PALETTE.border}`,
};

const btnDangerStyle: CSSProperties = {
  backgroundColor: PALETTE.dangerBg,
  color: PALETTE.dangerText,
  border: `1px solid ${PALETTE.dangerBorder}`,
};

// ============================================================================
// SELF-CONTAINED INLINE SVG ICONS
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

const IconRefreshCw = ({ className = 'w-3.5 h-3.5' }) => (
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

// สร้าง Data URI SVG สำรองเมื่อโหลดรูปภาพไม่ได้
const createFallbackFoodDataUri = (label = 'เมนูอร่อย') => {
  const safeLabel = label.replace(/[<>&"]/g, '');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#0F172A"/>
        <stop offset="100%" stop-color="#D97706"/>
      </linearGradient>
    </defs>
    <rect width="400" height="300" fill="url(#bg)"/>
    <circle cx="200" cy="126" r="54" fill="#FEF3C7" opacity="0.95"/>
    <text x="200" y="133" text-anchor="middle" font-family="sans-serif" font-size="20" font-weight="bold" fill="#0F172A">คิวพร้อม</text>
    <text x="200" y="218" text-anchor="middle" font-family="sans-serif" font-size="18" font-weight="bold" fill="#FFFFFF">${safeLabel}</text>
  </svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};

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

// ข้อมูลจำลองร้านอาหารในสุโขทัย
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
    phone: '055-612-889',
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
    phone: '055-614-210',
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
    phone: '055-697-441',
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
    phone: '089-704-5521',
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

// โครงสร้างโปรเจกต์ Next.js (App Router + Tailwind CSS + Inline System Tokens)
// ชุดสีเชิงระบบ: Deep Slate Navy (#0F172A) + Warm Amber (#D97706) + Semantic Status Colors

import React, { useState } from 'react';

type ScreenType = 'home' | 'detail' | 'ticket' | 'myQueues';

export default function RestaurantQueuePage() {
  const [activeScreen, setActiveScreen] = useState<ScreenType>('home');
  const [guests, setGuests] = useState<number>(4);
  const [zone, setZone] = useState<string>('ด้านใน');
  const [ticket, setTicket] = useState({
    queueNumber: 'A - 18',
    restaurantName: 'ร้านเด็ดเลย',
    aheadCount: 3,
    estimatedTime: '18:45 น.',
  });

  return (
    <main style={{ backgroundColor: '#E2E8F0', color: '#0F172A' }} className="min-h-screen flex items-center justify-center p-4">
      <div style={{ backgroundColor: '#FFFFFF', borderColor: '#CBD5E1' }} className="w-full max-w-[400px] h-[820px] rounded-[36px] shadow-2xl overflow-hidden flex flex-col border-[6px]">
        <header style={{ backgroundColor: '#0F172A', color: '#FFFFFF' }} className="px-4 py-3 flex items-center justify-between">
          <span className="text-xs font-bold">สุโขทัย, ประเทศไทย</span>
          <span style={{ backgroundColor: '#D97706', color: '#FFFFFF' }} className="text-[11px] font-semibold px-2.5 py-1 rounded-full">
            {activeScreen}
          </span>
        </header>

        <div style={{ backgroundColor: '#F8FAFC' }} className="flex-1 overflow-y-auto p-4 space-y-3">
          {activeScreen === 'home' && (
            <div style={{ backgroundColor: '#FFFFFF', borderColor: '#CBD5E1' }} className="rounded-2xl p-3 border">
              <h2 className="font-bold text-sm">ร้านเด็ดเลย</h2>
              <p className="text-xs text-slate-500">Food • 1.2 กม. • รอประมาณ 25 นาที (8 คิว)</p>
              <button
                type="button"
                onClick={() => setActiveScreen('detail')}
                style={{ backgroundColor: '#0F172A', color: '#FFFFFF' }}
                className="mt-2 text-xs font-semibold px-4 py-1.5 rounded-xl"
              >
                จองคิวทันที
              </button>
            </div>
          )}

          {activeScreen === 'detail' && (
            <div className="space-y-3">
              <div style={{ backgroundColor: '#EFF6FF', borderColor: '#BFDBFE', color: '#1E40AF' }} className="border rounded-2xl p-3 text-xs">
                คิวปัจจุบัน: A-15 | รออีก: 8 คิว | เวลาโดยประมาณ: ~25 นาที
              </div>
              <div className="flex items-center justify-between bg-white border border-slate-300 p-3 rounded-xl">
                <span className="text-xs font-bold">จำนวนผู้ใช้บริการ: {guests} คน</span>
                <div className="flex gap-2">
                  <button type="button" onClick={() => setGuests((g) => Math.max(1, g - 1))} className="w-7 h-7 rounded-lg bg-slate-200 font-bold">-</button>
                  <button type="button" onClick={() => setGuests((g) => Math.min(20, g + 1))} style={{ backgroundColor: '#D97706', color: '#FFFFFF' }} className="w-7 h-7 rounded-lg font-bold">+</button>
                </div>
              </div>
              <select value={zone} onChange={(e) => setZone(e.target.value)} className="w-full bg-white border border-slate-300 text-xs font-semibold p-2.5 rounded-xl">
                <option value="ด้านใน">ด้านใน</option>
                <option value="Outdoors">Outdoors</option>
              </select>
              <button
                type="button"
                onClick={() => setActiveScreen('ticket')}
                style={{ backgroundColor: '#047857', color: '#FFFFFF' }}
                className="w-full py-2.5 rounded-xl font-bold text-xs"
              >
                ยืนยันขอรับคิว
              </button>
            </div>
          )}

          {activeScreen === 'ticket' && (
            <div className="bg-white border border-slate-300 rounded-3xl p-4 text-center space-y-2">
              <p className="text-xs text-slate-500">หมายเลขคิวของคุณ</p>
              <p style={{ color: '#D97706' }} className="text-5xl font-black">{ticket.queueNumber}</p>
              <p className="text-xs">เหลืออีก {ticket.aheadCount} คิว • ถึงคิวเวลา {ticket.estimatedTime}</p>
            </div>
          )}
        </div>

        <nav className="bg-white border-t border-slate-300 grid grid-cols-4 py-2 text-[10px] font-semibold">
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
  const [viewMode, setViewMode] = useState<'prototype' | 'code'>('prototype');
  const [copiedCode, setCopiedCode] = useState(false);

  const [activeScreen, setActiveScreen] = useState<'home' | 'detail' | 'ticket' | 'myQueues' | 'privileges' | 'profile'>('home');
  const [myQueuesTab, setMyQueuesTab] = useState<'current' | 'history'>('current');

  const [selectedProvince, setSelectedProvince] = useState('สุโขทัย, ประเทศไทย');
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'nearby' | 'nowait' | 'hot' | 'category'>('all');
  const [selectedCategory, setSelectedCategory] = useState('ทั้งหมด');
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  const [currentBanner, setCurrentBanner] = useState(0);

  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant>(RESTAURANTS_DATA[0]);
  const [activeGalleryIdx, setActiveGalleryIdx] = useState(0);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [guestCount, setGuestCount] = useState(4);
  const [selectedZone, setSelectedZone] = useState('ด้านใน');
  const [specialRequest, setSpecialRequest] = useState('');

  const [liveQueueOffset, setLiveQueueOffset] = useState(0);

  const [activeTicket, setActiveTicket] = useState<QueueTicket | null>({
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

  const [historyList, setHistoryList] = useState(INITIAL_HISTORY);

  const [showMapModal, setShowMapModal] = useState(false);
  const [mapTargetRestaurant, setMapTargetRestaurant] = useState<Restaurant>(RESTAURANTS_DATA[0]);
  const [showMenuModal, setShowMenuModal] = useState(false);
  const [showManageQueueModal, setShowManageQueueModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [claimedCoupons, setClaimedCoupons] = useState(['CPN1']);
  const [notifyBeforeQueue, setNotifyBeforeQueue] = useState(true);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % BANNERS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (activeScreen !== 'detail') return;
    const interval = setInterval(() => {
      setLiveQueueOffset((prev) => (prev === 0 ? 1 : 0));
    }, 6000);
    return () => clearInterval(interval);
  }, [activeScreen]);

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

  const openRestaurantDetail = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
    setActiveGalleryIdx(0);
    setGuestCount(4);
    setSelectedZone('ด้านใน');
    setSpecialRequest('');
    setActiveScreen('detail');
  };

  const openMapForRestaurant = (restaurant: Restaurant) => {
    setMapTargetRestaurant(restaurant);
    setShowMapModal(true);
  };

  const handleConfirmBooking = () => {
    const prefix = selectedRestaurant.currentQueue.split('-')[0] || 'A';
    const baseNum = parseInt(selectedRestaurant.currentQueue.split('-')[1] || '15', 10);
    const newNum = baseNum + selectedRestaurant.waitQueues + 1;
    const formattedQueue = `${prefix} - ${newNum}`;

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

  const handleSimulateQueueProgress = () => {
    if (!activeTicket) return;
    if (activeTicket.aheadCount > 1) {
      const nextAhead = activeTicket.aheadCount - 1;
      setActiveTicket({
        ...activeTicket,
        aheadCount: nextAhead,
        statusStep: 2,
      });
      triggerToast(`คิวขยับแล้ว! เหลือคิวข้างหน้าอีก ${nextAhead} คิว`);
    } else if (activeTicket.aheadCount === 1) {
      setActiveTicket({
        ...activeTicket,
        aheadCount: 0,
        statusStep: 3,
      });
      triggerToast(`ถึงคิว ${activeTicket.queueNumber} แล้ว กรุณาแสดงบัตรคิวหน้าร้าน`);
    } else {
      setHistoryList((prev) => [
        {
          id: `h-${Date.now()}`,
          restaurantId: activeTicket.restaurant.id,
          restaurantName: activeTicket.restaurant.name,
          date: 'วันนี้ - เสร็จสิ้นล่าสุด',
          guests: activeTicket.guests,
          status: 'เสร็จสิ้น',
          image: activeTicket.restaurant.foodImage,
        },
        ...prev,
      ]);
      setActiveTicket(null);
      setMyQueuesTab('history');
      setActiveScreen('myQueues');
      triggerToast('เช็กอินเข้าใช้บริการและบันทึกประวัติเรียบร้อย');
    }
  };

  const handlePostponeQueue = () => {
    if (!activeTicket) return;
    setActiveTicket({
      ...activeTicket,
      aheadCount: activeTicket.aheadCount + 2,
      statusStep: 2,
    });
    setShowManageQueueModal(false);
    triggerToast('เลื่อนคิวออกไปอีก 2 คิวเรียบร้อยแล้ว');
  };

  const handleCancelQueue = () => {
    if (!activeTicket) return;
    setHistoryList((prev) => [
      {
        id: `h-${Date.now()}`,
        restaurantId: activeTicket.restaurant.id,
        restaurantName: activeTicket.restaurant.name,
        date: 'วันนี้ - ยกเลิกโดยผู้ใช้',
        guests: activeTicket.guests,
        status: 'ยกเลิกแล้ว',
        image: activeTicket.restaurant.foodImage,
      },
      ...prev,
    ]);
    setActiveTicket(null);
    setShowManageQueueModal(false);
    setMyQueuesTab('history');
    setActiveScreen('myQueues');
    triggerToast('ยกเลิกบัตรคิวเรียบร้อยแล้ว');
  };

  const handleCopyCode = () => {
    navigator.clipboard?.writeText(NEXTJS_CODE_SNIPPET);
    setCopiedCode(true);
    triggerToast('คัดลอกโค้ด Next.js สำเร็จ');
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const dynamicWaitQueues = Math.max(0, selectedRestaurant.waitQueues - liveQueueOffset);
  const dynamicWaitMinutes = Math.max(0, selectedRestaurant.waitMinutes - liveQueueOffset * 3);

  return (
    <div
      style={{ backgroundColor: PALETTE.pageBg, color: PALETTE.inkPrimary }}
      className="min-h-screen py-5 px-3 flex flex-col items-center"
    >
      {/* แถบสลับโหมดด้านบน (Prototype / Next.js Code) */}
      <div
        style={{ backgroundColor: PALETTE.cardBg, borderColor: PALETTE.border }}
        className="mb-4 flex items-center gap-2 border p-1 rounded-full shadow-sm"
      >
        <button
          type="button"
          onClick={() => setViewMode('prototype')}
          style={viewMode === 'prototype' ? btnPrimaryStyle : { color: PALETTE.inkSecondary }}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition"
        >
          <IconSmartphone className="w-3.5 h-3.5" />
          หน้าจอแอป (Slate Navy + Amber)
        </button>
        <button
          type="button"
          onClick={() => setViewMode('code')}
          style={viewMode === 'code' ? btnPrimaryStyle : { color: PALETTE.inkSecondary }}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition"
        >
          <IconCode2 className="w-3.5 h-3.5" />
          ดูโค้ด Next.js
        </button>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div
          style={{ backgroundColor: PALETTE.primary, color: '#FFFFFF', borderColor: PALETTE.accent }}
          className="fixed top-5 z-50 text-xs font-medium px-4 py-2.5 rounded-full shadow-lg border"
        >
          {toastMessage}
        </div>
      )}

      {viewMode === 'code' ? (
        <div
          style={{ backgroundColor: '#0F172A', color: '#F8FAFC', borderColor: '#334155' }}
          className="w-full max-w-3xl rounded-2xl border shadow-xl overflow-hidden"
        >
          <div
            style={{ backgroundColor: '#020617', borderColor: '#1E293B' }}
            className="flex items-center justify-between px-4 py-3 border-b"
          >
            <span style={{ color: '#FBBF24' }} className="text-xs font-semibold">
              src/app/page.tsx (Next.js + System Theme Tokens)
            </span>
            <button
              type="button"
              onClick={handleCopyCode}
              style={{ backgroundColor: '#1E293B', color: '#FFFFFF' }}
              className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition hover:opacity-90"
            >
              {copiedCode ? <IconCheck className="w-3.5 h-3.5 text-emerald-400" /> : <IconCopy className="w-3.5 h-3.5" />}
              {copiedCode ? 'คัดลอกแล้ว' : 'คัดลอกโค้ด'}
            </button>
          </div>
          <pre className="p-4 text-xs overflow-x-auto leading-relaxed max-h-[75vh]">
            <code>{NEXTJS_CODE_SNIPPET}</code>
          </pre>
        </div>
      ) : (
        /* กรอบสมาร์ทโฟนหลัก */
        <div
          style={{ backgroundColor: PALETTE.cardBg, borderColor: '#94A3B8' }}
          className="w-full max-w-[400px] h-[810px] rounded-[36px] border-[6px] shadow-2xl overflow-hidden flex flex-col relative"
        >
          {/* Top App Header (Deep Slate Navy Header) */}
          <header
            style={{ backgroundColor: PALETTE.primary, color: '#FFFFFF' }}
            className="px-4 py-3.5 flex items-center justify-between z-20 shrink-0 shadow-sm"
          >
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowLocationPicker((prev) => !prev)}
                className="flex items-center gap-2 text-left group"
              >
                <span
                  style={{ backgroundColor: 'rgba(217, 119, 6, 0.2)', color: '#FBBF24', borderColor: 'rgba(251, 191, 36, 0.35)' }}
                  className="w-8 h-8 rounded-full flex items-center justify-center border"
                >
                  <IconMapPin className="w-4 h-4" />
                </span>
                <div>
                  <p className="text-[10px] font-medium text-slate-300 leading-none">พื้นที่ให้บริการ</p>
                  <div className="flex items-center gap-1 text-xs font-bold text-white mt-0.5">
                    <span>{selectedProvince}</span>
                    <IconChevronDown className="w-3.5 h-3.5 text-slate-300" />
                  </div>
                </div>
              </button>

              {showLocationPicker && (
                <div
                  style={{ backgroundColor: PALETTE.cardBg, borderColor: PALETTE.border }}
                  className="absolute left-0 mt-2 w-56 rounded-2xl border shadow-lg p-1.5 z-30"
                >
                  {['สุโขทัย, ประเทศไทย', 'ศรีสัชนาลัย, สุโขทัย', 'สวรรคโลก, สุโขทัย', 'กงไกรลาศ, สุโขทัย'].map((loc) => (
                    <button
                      key={loc}
                      type="button"
                      onClick={() => {
                        setSelectedProvince(loc);
                        setShowLocationPicker(false);
                        triggerToast(`อัปเดตตำแหน่งเป็น ${loc}`);
                      }}
                      style={
                        selectedProvince === loc
                          ? { backgroundColor: PALETTE.accentSoft, color: PALETTE.accentText, fontWeight: 700 }
                          : { color: PALETTE.inkPrimary }
                      }
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition hover:bg-slate-100"
                    >
                      {loc}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              {activeTicket && (
                <button
                  type="button"
                  onClick={() => setActiveScreen('ticket')}
                  style={btnAccentStyle}
                  className="px-2.5 py-1 rounded-full text-[11px] font-bold shadow-xs transition hover:opacity-95"
                >
                  คิว {activeTicket.queueNumber}
                </button>
              )}
              <button
                type="button"
                onClick={() => setActiveScreen('profile')}
                style={
                  activeScreen === 'profile'
                    ? btnAccentStyle
                    : { backgroundColor: 'rgba(255,255,255,0.12)', color: '#FFFFFF', borderColor: 'rgba(255,255,255,0.2)' }
                }
                className="w-8 h-8 rounded-full flex items-center justify-center border transition"
                aria-label="โปรไฟล์ผู้ใช้"
              >
                <IconUser className="w-4 h-4" />
              </button>
            </div>
          </header>

          {/* Main Scrollable Screen */}
          <main style={{ backgroundColor: PALETTE.appBg }} className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* ==============================================================
                1. หน้าแรก (HOME)
               ============================================================== */}
            {activeScreen === 'home' && (
              <>
                {/* Search Bar */}
                <div className="relative">
                  <IconSearch className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="ค้นหาร้านอาหาร, ประเภทอาหาร, หรือโซน..."
                    style={{ backgroundColor: PALETTE.cardBg, borderColor: PALETTE.border, color: PALETTE.inkPrimary }}
                    className="w-full text-xs rounded-2xl pl-9 pr-8 py-2.5 border focus:outline-none transition"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      <IconX className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Filter Pills + Category Dropdown */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                  {[
                    { id: 'all', label: 'ทั้งหมด' },
                    { id: 'hot', label: 'ร้านฮิต' },
                    { id: 'nearby', label: 'ใกล้ฉัน' },
                    { id: 'nowait', label: 'ไม่ต้องรอคิว' },
                  ].map((pill) => (
                    <button
                      key={pill.id}
                      type="button"
                      onClick={() => {
                        setActiveFilter(pill.id as typeof activeFilter);
                        setShowCategoryDropdown(false);
                      }}
                      style={
                        activeFilter === pill.id
                          ? btnPrimaryStyle
                          : { backgroundColor: PALETTE.cardBg, color: PALETTE.inkSecondary, borderColor: PALETTE.border }
                      }
                      className="px-3 py-1.5 rounded-full text-[11px] font-semibold whitespace-nowrap border transition"
                    >
                      {pill.label}
                    </button>
                  ))}

                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setShowCategoryDropdown((prev) => !prev)}
                      style={
                        activeFilter === 'category'
                          ? btnPrimaryStyle
                          : { backgroundColor: PALETTE.cardBg, color: PALETTE.inkSecondary, borderColor: PALETTE.border }
                      }
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-[11px] font-semibold whitespace-nowrap border transition"
                    >
                      <span>{selectedCategory === 'ทั้งหมด' ? 'หมวดหมู่' : selectedCategory}</span>
                      <IconChevronDown className="w-3 h-3" />
                    </button>
                    {showCategoryDropdown && (
                      <div
                        style={{ backgroundColor: PALETTE.cardBg, borderColor: PALETTE.border }}
                        className="absolute right-0 mt-1.5 w-44 rounded-2xl border shadow-lg p-1.5 z-30"
                      >
                        {['ทั้งหมด', 'อาหารไทย', 'อาหารทะเล', 'ส้มตำ'].map((cat) => (
                          <button
                            key={cat}
                            type="button"
                            onClick={() => {
                              setSelectedCategory(cat);
                              setActiveFilter(cat === 'ทั้งหมด' ? 'all' : 'category');
                              setShowCategoryDropdown(false);
                            }}
                            style={
                              selectedCategory === cat
                                ? { backgroundColor: PALETTE.accentSoft, color: PALETTE.accentText, fontWeight: 700 }
                                : { color: PALETTE.inkPrimary }
                            }
                            className="w-full text-left px-3 py-1.5 rounded-xl text-xs font-medium hover:bg-slate-100"
                          >
                            {cat}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Banner Carousel */}
                <div
                  style={{ borderColor: PALETTE.border }}
                  className="relative rounded-2xl overflow-hidden border shadow-sm h-36 bg-slate-900"
                >
                  <SafeImage
                    src={BANNERS[currentBanner].image}
                    alt={BANNERS[currentBanner].title}
                    fallbackLabel={BANNERS[currentBanner].title}
                    className="w-full h-full object-cover opacity-60"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-900/45 to-transparent p-4 flex flex-col justify-between">
                    <div className="flex justify-between items-center">
                      <span
                        style={btnAccentStyle}
                        className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded"
                      >
                        แนะนำในสุโขทัย
                      </span>
                      <div className="flex gap-1">
                        {BANNERS.map((b, i) => (
                          <button
                            key={b.id}
                            type="button"
                            onClick={() => setCurrentBanner(i)}
                            style={{ backgroundColor: currentBanner === i ? '#FBBF24' : 'rgba(255,255,255,0.45)' }}
                            className={`h-1.5 rounded-full transition-all ${currentBanner === i ? 'w-4' : 'w-1.5'}`}
                            aria-label={`แบนเนอร์ ${i + 1}`}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="flex items-end justify-between gap-2">
                      <div>
                        <h2 className="text-white font-bold text-sm leading-snug">{BANNERS[currentBanner].title}</h2>
                        <p className="text-slate-200 text-[11px]">{BANNERS[currentBanner].subtitle}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          const target = RESTAURANTS_DATA.find((r) => r.id === BANNERS[currentBanner].targetId) || RESTAURANTS_DATA[0];
                          openRestaurantDetail(target);
                        }}
                        style={{ backgroundColor: '#FFFFFF', color: PALETTE.primary }}
                        className="shrink-0 text-[11px] font-bold px-2.5 py-1 rounded-lg shadow-xs hover:opacity-95"
                      >
                        ดูร้าน
                      </button>
                    </div>
                  </div>
                </div>

                {/* Restaurant Cards */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 style={{ color: PALETTE.inkPrimary }} className="text-xs font-bold uppercase tracking-wide">
                      ร้านอาหารที่เปิดรับคิว ({filteredRestaurants.length})
                    </h3>
                  </div>

                  {filteredRestaurants.length === 0 ? (
                    <div
                      style={{ backgroundColor: PALETTE.cardBg, borderColor: PALETTE.border, color: PALETTE.inkSecondary }}
                      className="rounded-2xl border p-6 text-center text-xs"
                    >
                      ไม่พบร้านอาหารที่ตรงกับเงื่อนไขการค้นหา
                    </div>
                  ) : (
                    filteredRestaurants.map((res) => (
                      <div
                        key={res.id}
                        style={{ backgroundColor: PALETTE.cardBg, borderColor: PALETTE.border }}
                        className="rounded-2xl border p-3 flex gap-3 items-center shadow-xs transition"
                      >
                        <SafeImage
                          src={res.foodImage}
                          alt={res.name}
                          fallbackLabel={res.shortName}
                          onClick={() => openRestaurantDetail(res)}
                          className="w-20 h-20 rounded-xl object-cover shrink-0 border border-slate-200 cursor-pointer"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <h4
                              onClick={() => openRestaurantDetail(res)}
                              style={{ color: PALETTE.inkPrimary }}
                              className="font-bold text-sm truncate cursor-pointer hover:underline"
                            >
                              {res.name}
                            </h4>
                            <span style={{ color: PALETTE.accent }} className="inline-flex items-center gap-0.5 text-[11px] font-bold shrink-0">
                              <IconStar className="w-3 h-3" />
                              {res.rating}
                            </span>
                          </div>
                          <p style={{ color: PALETTE.inkSecondary }} className="text-[11px] truncate mt-0.5">
                            {res.category} • {res.distance}
                          </p>
                          <div className="mt-2 flex items-center justify-between gap-1.5">
                            <span
                              style={
                                res.waitQueues === 0
                                  ? { backgroundColor: PALETTE.successBg, color: PALETTE.successText, borderColor: PALETTE.successBorder }
                                  : { backgroundColor: PALETTE.infoBg, color: PALETTE.infoText, borderColor: PALETTE.infoBorder }
                              }
                              className="text-[10px] font-semibold px-2 py-0.5 rounded-md border"
                            >
                              {res.waitQueues === 0 ? 'ว่างพร้อมนั่ง' : `รอ ${res.waitQueues} คิว (~${res.waitMinutes} น.)`}
                            </span>
                            <div className="flex items-center gap-1">
                              <button
                                type="button"
                                onClick={() => openMapForRestaurant(res)}
                                style={btnSecondaryStyle}
                                className="p-1.5 rounded-xl"
                                title="ดูพิกัดร้าน"
                              >
                                <IconMapPin className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => openRestaurantDetail(res)}
                                style={btnPrimaryStyle}
                                className="px-3 py-1.5 rounded-xl text-[11px] font-semibold transition hover:opacity-90"
                              >
                                จองคิว
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </>
            )}

            {/* ==============================================================
                2. หน้าจองคิว & รายละเอียดร้าน (DETAIL & BOOKING)
               ============================================================== */}
            {activeScreen === 'detail' && (
              <div className="space-y-3.5">
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setActiveScreen('home')}
                    style={btnSecondaryStyle}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-semibold"
                  >
                    <IconChevronLeft className="w-4 h-4" />
                    กลับหน้าร้าน
                  </button>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => openMapForRestaurant(selectedRestaurant)}
                      style={btnSecondaryStyle}
                      className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-xl"
                    >
                      <IconMapPin className="w-3.5 h-3.5" />
                      แผนที่
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowMenuModal(true)}
                      style={{ backgroundColor: PALETTE.accentSoft, color: PALETTE.accentText, borderColor: '#FCD34D' }}
                      className="inline-flex items-center gap-1 text-xs font-semibold border px-3 py-1.5 rounded-xl"
                    >
                      <IconBookOpen className="w-3.5 h-3.5" />
                      ดูเมนู
                    </button>
                  </div>
                </div>

                {/* Hero & Gallery */}
                <div style={{ backgroundColor: PALETTE.cardBg, borderColor: PALETTE.border }} className="rounded-2xl border overflow-hidden">
                  <div className="relative">
                    <SafeImage
                      src={selectedRestaurant.gallery[activeGalleryIdx] || selectedRestaurant.heroImage}
                      alt={selectedRestaurant.name}
                      fallbackLabel={selectedRestaurant.shortName}
                      onClick={() => setLightboxImage(selectedRestaurant.gallery[activeGalleryIdx] || selectedRestaurant.heroImage)}
                      className="w-full h-40 object-cover cursor-zoom-in"
                    />
                    <span className="absolute bottom-2 right-2 bg-slate-950/80 text-white text-[10px] px-2 py-0.5 rounded-md">
                      แตะรูปเพื่อขยาย
                    </span>
                  </div>
                  <div className="p-3.5">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h2 style={{ color: PALETTE.inkPrimary }} className="font-bold text-base">{selectedRestaurant.name}</h2>
                        <p style={{ color: PALETTE.inkSecondary }} className="text-xs mt-0.5">{selectedRestaurant.location}</p>
                      </div>
                      <span
                        style={{ backgroundColor: PALETTE.accentSoft, color: PALETTE.accentText, borderColor: '#FCD34D' }}
                        className="inline-flex items-center gap-1 text-xs font-bold border px-2 py-0.5 rounded-lg shrink-0"
                      >
                        <IconStar className="w-3.5 h-3.5" />
                        {selectedRestaurant.rating}
                      </span>
                    </div>

                    <div className="flex gap-2 mt-3">
                      {selectedRestaurant.gallery.map((img, idx) => (
                        <button
                          key={img}
                          type="button"
                          onClick={() => setActiveGalleryIdx(idx)}
                          style={{ borderColor: activeGalleryIdx === idx ? PALETTE.accent : 'transparent' }}
                          className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition ${
                            activeGalleryIdx === idx ? 'opacity-100' : 'opacity-65'
                          }`}
                        >
                          <SafeImage src={img} alt="แกลเลอรีร้าน" className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Live Queue Status Dashboard */}
                <div
                  style={{ backgroundColor: PALETTE.infoBg, borderColor: PALETTE.infoBorder, color: PALETTE.infoText }}
                  className="rounded-2xl border p-3.5 flex items-center justify-between"
                >
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span style={{ backgroundColor: PALETTE.infoText }} className="w-2 h-2 rounded-full animate-pulse" />
                      <p className="text-[11px] font-bold uppercase tracking-wider">สถานะคิวสด (Live)</p>
                    </div>
                    <p className="text-sm font-extrabold mt-0.5">
                      คิวปัจจุบัน {selectedRestaurant.currentQueue} • รอ {dynamicWaitQueues} คิว
                    </p>
                  </div>
                  <span
                    style={{ backgroundColor: '#FFFFFF', color: PALETTE.infoText, borderColor: PALETTE.infoBorder }}
                    className="text-xs font-bold px-2.5 py-1 rounded-lg border"
                  >
                    ~{dynamicWaitMinutes} นาที
                  </span>
                </div>

                {/* Booking Form */}
                <div style={{ backgroundColor: PALETTE.cardBg, borderColor: PALETTE.border }} className="rounded-2xl border p-3.5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span style={{ color: PALETTE.inkPrimary }} className="text-xs font-bold flex items-center gap-1.5">
                      <IconUsers className="w-4 h-4" />
                      จำนวนผู้รับบริการ
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setGuestCount((g) => Math.max(1, g - 1))}
                        style={btnSecondaryStyle}
                        className="w-7 h-7 rounded-lg flex items-center justify-center"
                      >
                        <IconMinus className="w-3.5 h-3.5" />
                      </button>
                      <span style={{ color: PALETTE.inkPrimary }} className="w-10 text-center text-xs font-bold">{guestCount} คน</span>
                      <button
                        type="button"
                        onClick={() => setGuestCount((g) => Math.min(20, g + 1))}
                        style={btnAccentStyle}
                        className="w-7 h-7 rounded-lg flex items-center justify-center"
                      >
                        <IconPlus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div>
                    <label style={{ color: PALETTE.inkPrimary }} className="block text-xs font-bold mb-1">โซนที่นั่ง</label>
                    <select
                      value={selectedZone}
                      onChange={(e) => setSelectedZone(e.target.value)}
                      style={{ backgroundColor: PALETTE.appBg, borderColor: PALETTE.border, color: PALETTE.inkPrimary }}
                      className="w-full border rounded-xl px-3 py-2 text-xs font-medium focus:outline-none"
                    >
                      <option value="ด้านใน">ด้านในห้องแอร์</option>
                      <option value="Outdoors">Outdoors / ริมน้ำ</option>
                      <option value="ไม่ระบุ">โซนใดก็ได้ที่ว่างก่อน</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ color: PALETTE.inkPrimary }} className="block text-xs font-bold mb-1">คำขอเพิ่มเติม (ถ้ามี)</label>
                    <textarea
                      rows={2}
                      value={specialRequest}
                      onChange={(e) => setSpecialRequest(e.target.value)}
                      placeholder="เช่น ขอเก้าอี้เด็ก, ไม่รับผักชี..."
                      style={{ backgroundColor: PALETTE.appBg, borderColor: PALETTE.border, color: PALETTE.inkPrimary }}
                      className="w-full border rounded-xl px-3 py-2 text-xs focus:outline-none"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={handleConfirmBooking}
                    style={btnSuccessStyle}
                    className="w-full py-2.5 rounded-xl font-bold text-xs shadow-xs transition hover:opacity-95"
                  >
                    ยืนยันขอรับบัตรคิว
                  </button>
                </div>
              </div>
            )}

            {/* ==============================================================
                3. หน้าบัตรคิวอิเล็กทรอนิกส์ (ACTIVE TICKET)
               ============================================================== */}
            {activeScreen === 'ticket' && (
              <div className="space-y-3.5">
                {activeTicket ? (
                  <div style={{ backgroundColor: PALETTE.cardBg, borderColor: PALETTE.border }} className="rounded-3xl border p-5 text-center space-y-3.5">
                    <div className="flex items-center justify-between">
                      <span
                        style={{ backgroundColor: PALETTE.accentSoft, color: PALETTE.accentText, borderColor: '#FCD34D' }}
                        className="text-[11px] font-bold px-3 py-1 rounded-full border"
                      >
                        {activeTicket.restaurant.shortName}
                      </span>
                      <button
                        type="button"
                        onClick={() => setShowManageQueueModal(true)}
                        style={btnSecondaryStyle}
                        className="text-[11px] font-semibold px-2.5 py-1 rounded-lg"
                      >
                        จัดการคิว
                      </button>
                    </div>

                    <div>
                      <p style={{ color: PALETTE.inkSecondary }} className="text-xs font-medium">หมายเลขบัตรคิวของคุณ</p>
                      <p style={{ color: PALETTE.accent }} className="text-5xl font-black tracking-tight mt-1">{activeTicket.queueNumber}</p>
                    </div>

                    {/* Step Progress Bar */}
                    <div className="grid grid-cols-3 gap-1.5 text-[10px] font-bold">
                      {[
                        { step: 1, label: '1. รับคิวแล้ว' },
                        { step: 2, label: '2. กำลังรอเรียก' },
                        { step: 3, label: '3. ถึงคิวคุณแล้ว' },
                      ].map((s) => {
                        const reached = activeTicket.statusStep >= s.step;
                        return (
                          <div
                            key={s.step}
                            style={
                              reached
                                ? { backgroundColor: PALETTE.primary, color: '#FFFFFF', borderColor: PALETTE.primary }
                                : { backgroundColor: PALETTE.appBg, color: '#94A3B8', borderColor: PALETTE.border }
                            }
                            className="py-1.5 px-2 rounded-lg border"
                          >
                            {s.label}
                          </div>
                        );
                      })}
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-left">
                      <div
                        style={{ backgroundColor: PALETTE.infoBg, borderColor: PALETTE.infoBorder, color: PALETTE.infoText }}
                        className="rounded-2xl border p-3"
                      >
                        <p className="text-[10px] font-semibold">คิวรอข้างหน้า</p>
                        <p className="text-sm font-extrabold mt-0.5">
                          {activeTicket.aheadCount === 0 ? 'ถึงคิวคุณแล้ว!' : `อีก ${activeTicket.aheadCount} คิว`}
                        </p>
                      </div>
                      <div
                        style={{ backgroundColor: PALETTE.successBg, borderColor: PALETTE.successBorder, color: PALETTE.successText }}
                        className="rounded-2xl border p-3"
                      >
                        <p className="text-[10px] font-semibold">เวลาคาดการณ์</p>
                        <p className="text-sm font-extrabold mt-0.5">{activeTicket.estimatedTime}</p>
                      </div>
                    </div>

                    <div
                      style={{ backgroundColor: PALETTE.appBg, borderColor: PALETTE.border, color: PALETTE.inkSecondary }}
                      className="rounded-2xl border p-3 text-xs space-y-1 text-left"
                    >
                      <p>จำนวนผู้รับบริการ: <strong style={{ color: PALETTE.inkPrimary }}>{activeTicket.guests} คน</strong></p>
                      <p>โซนที่นั่ง: <strong style={{ color: PALETTE.inkPrimary }}>{activeTicket.zone}</strong></p>
                      {activeTicket.note && (
                        <p>คำขอพิเศษ: <strong style={{ color: PALETTE.inkPrimary }}>{activeTicket.note}</strong></p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => openMapForRestaurant(activeTicket.restaurant)}
                        style={btnSecondaryStyle}
                        className="py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5"
                      >
                        <IconNavigation className="w-3.5 h-3.5" />
                        นำทางไปร้าน
                      </button>
                      <button
                        type="button"
                        onClick={handleSimulateQueueProgress}
                        style={btnPrimaryStyle}
                        className="py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition hover:opacity-95"
                      >
                        <IconRefreshCw className="w-3.5 h-3.5" />
                        {activeTicket.aheadCount === 0 ? 'เช็กอินเข้าโต๊ะ' : 'จำลองคิวขยับ'}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div style={{ backgroundColor: PALETTE.cardBg, borderColor: PALETTE.border }} className="rounded-2xl border p-6 text-center space-y-2.5">
                    <IconClock className="w-8 h-8 text-slate-400 mx-auto" />
                    <p style={{ color: PALETTE.inkPrimary }} className="text-sm font-bold">ยังไม่มีบัตรคิวที่กำลังใช้งาน</p>
                    <p style={{ color: PALETTE.inkSecondary }} className="text-xs">เลือกร้านอาหารเพื่อรับคิวล่วงหน้าได้เลย</p>
                    <button
                      type="button"
                      onClick={() => setActiveScreen('home')}
                      style={btnPrimaryStyle}
                      className="px-4 py-2 rounded-xl text-xs font-semibold"
                    >
                      ไปเลือกร้านอาหาร
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* ==============================================================
                4. หน้าคิวของฉัน & ประวัติ (MY QUEUES)
               ============================================================== */}
            {activeScreen === 'myQueues' && (
              <div className="space-y-3">
                <div style={{ backgroundColor: '#E2E8F0' }} className="grid grid-cols-2 gap-1.5 p-1 rounded-2xl">
                  <button
                    type="button"
                    onClick={() => setMyQueuesTab('current')}
                    style={
                      myQueuesTab === 'current'
                        ? { backgroundColor: PALETTE.primary, color: '#FFFFFF' }
                        : { color: PALETTE.inkSecondary }
                    }
                    className="py-1.5 rounded-xl text-xs font-bold transition"
                  >
                    คิวปัจจุบัน
                  </button>
                  <button
                    type="button"
                    onClick={() => setMyQueuesTab('history')}
                    style={
                      myQueuesTab === 'history'
                        ? { backgroundColor: PALETTE.primary, color: '#FFFFFF' }
                        : { color: PALETTE.inkSecondary }
                    }
                    className="py-1.5 rounded-xl text-xs font-bold transition"
                  >
                    ประวัติ ({historyList.length})
                  </button>
                </div>

                {myQueuesTab === 'current' ? (
                  activeTicket ? (
                    <div
                      style={{ backgroundColor: PALETTE.cardBg, borderColor: PALETTE.border }}
                      className="rounded-2xl border p-3.5 flex items-center justify-between gap-2"
                    >
                      <div>
                        <span
                          style={{ backgroundColor: PALETTE.accentSoft, color: PALETTE.accentText, borderColor: '#FCD34D' }}
                          className="text-[10px] font-bold px-2 py-0.5 rounded border"
                        >
                          กำลังรอคิว
                        </span>
                        <h4 style={{ color: PALETTE.inkPrimary }} className="font-bold text-sm mt-1">{activeTicket.restaurant.name}</h4>
                        <p style={{ color: PALETTE.inkSecondary }} className="text-xs">
                          คิว {activeTicket.queueNumber} • เหลือ {activeTicket.aheadCount} คิว
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setActiveScreen('ticket')}
                        style={btnPrimaryStyle}
                        className="px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0"
                      >
                        เปิดบัตรคิว
                      </button>
                    </div>
                  ) : (
                    <div
                      style={{ backgroundColor: PALETTE.cardBg, borderColor: PALETTE.border, color: PALETTE.inkSecondary }}
                      className="rounded-2xl border p-5 text-center text-xs"
                    >
                      ไม่มีคิวที่กำลังรออยู่ในขณะนี้
                    </div>
                  )
                ) : (
                  <div className="space-y-2.5">
                    {historyList.map((item) => (
                      <div
                        key={item.id}
                        style={{ backgroundColor: PALETTE.cardBg, borderColor: PALETTE.border }}
                        className="rounded-2xl border p-3 flex items-center gap-3"
                      >
                        <SafeImage
                          src={item.image}
                          alt={item.restaurantName}
                          fallbackLabel={item.restaurantName}
                          className="w-12 h-12 rounded-xl object-cover shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p style={{ color: PALETTE.inkPrimary }} className="font-bold text-xs truncate">{item.restaurantName}</p>
                          <p style={{ color: PALETTE.inkSecondary }} className="text-[11px]">{item.date} • {item.guests} คน</p>
                        </div>
                        <span
                          style={
                            item.status === 'เสร็จสิ้น'
                              ? { backgroundColor: PALETTE.successBg, color: PALETTE.successText, borderColor: PALETTE.successBorder }
                              : { backgroundColor: PALETTE.dangerBg, color: PALETTE.dangerText, borderColor: PALETTE.dangerBorder }
                          }
                          className="text-[10px] font-bold px-2 py-1 rounded-lg border shrink-0"
                        >
                          {item.status}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ==============================================================
                5. หน้าสิทธิพิเศษ (PRIVILEGES)
               ============================================================== */}
            {activeScreen === 'privileges' && (
              <div className="space-y-3">
                <div style={{ backgroundColor: PALETTE.primary, color: '#FFFFFF' }} className="rounded-2xl p-4">
                  <div style={{ color: '#FBBF24' }} className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider">
                    <IconAward className="w-3.5 h-3.5" />
                    Sukhothai Queue Member
                  </div>
                  <h3 className="text-base font-bold mt-1">สิทธิพิเศษสำหรับผู้จองคิว</h3>
                  <p className="text-xs text-slate-300 mt-0.5">กดเก็บคูปองเพื่อใช้แสดงคู่กับบัตรคิวหน้าร้าน</p>
                </div>

                {[
                  { id: 'CPN1', title: 'ส่วนลด 10% เมนูอาหารหลัก', desc: 'ใช้ได้เมื่อจองคิวผ่านแอปและมาถึงตรงเวลา', code: 'SKT10' },
                  { id: 'CPN2', title: 'ฟรีเครื่องดื่มสมุนไพร 1 แก้ว', desc: 'สำหรับโต๊ะ 3 ท่านขึ้นไปในโซนสุโขทัย', code: 'DRINKFREE' },
                  { id: 'CPN3', title: 'รับสิทธิ์ลัดคิว 1 อันดับในครั้งถัดไป', desc: 'เมื่อสะสมการเช็กอินครบ 3 ครั้ง', code: 'FASTPASS' },
                ].map((cpn) => {
                  const isClaimed = claimedCoupons.includes(cpn.id);
                  return (
                    <div
                      key={cpn.id}
                      style={{ backgroundColor: PALETTE.cardBg, borderColor: PALETTE.border }}
                      className="rounded-2xl border p-3.5 flex items-center justify-between gap-3"
                    >
                      <div>
                        <span
                          style={{ backgroundColor: PALETTE.accentSoft, color: PALETTE.accentText, borderColor: '#FCD34D' }}
                          className="text-[10px] font-bold px-2 py-0.5 rounded border"
                        >
                          โค้ด: {cpn.code}
                        </span>
                        <h4 style={{ color: PALETTE.inkPrimary }} className="font-bold text-xs mt-1">{cpn.title}</h4>
                        <p style={{ color: PALETTE.inkSecondary }} className="text-[11px]">{cpn.desc}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          if (!isClaimed) {
                            setClaimedCoupons((prev) => [...prev, cpn.id]);
                            triggerToast(`เก็บคูปอง ${cpn.code} สำเร็จ`);
                          }
                        }}
                        style={
                          isClaimed
                            ? { backgroundColor: PALETTE.successBg, color: PALETTE.successText, borderColor: PALETTE.successBorder }
                            : btnPrimaryStyle
                        }
                        className="px-3 py-1.5 rounded-xl text-[11px] font-semibold shrink-0 border transition"
                      >
                        {isClaimed ? 'เก็บแล้ว' : 'เก็บสิทธิ์'}
                      </button>
                    </div>
                  );
                })}
              </div>
            )}

            {/* ==============================================================
                6. หน้าโปรไฟล์และการตั้งค่า (PROFILE)
               ============================================================== */}
            {activeScreen === 'profile' && (
              <div className="space-y-3">
                <div style={{ backgroundColor: PALETTE.cardBg, borderColor: PALETTE.border }} className="rounded-2xl border p-4 flex items-center gap-3">
                  <div
                    style={btnPrimaryStyle}
                    className="w-12 h-12 rounded-full font-bold text-base flex items-center justify-center shrink-0"
                  >
                    SK
                  </div>
                  <div>
                    <h3 style={{ color: PALETTE.inkPrimary }} className="font-bold text-sm">ผู้ใช้งานสุโขทัย</h3>
                    <p style={{ color: PALETTE.inkSecondary }} className="text-xs">สมาชิกระดับ Silver • ใช้บริการ {historyList.length} ครั้ง</p>
                  </div>
                </div>

                <div style={{ backgroundColor: PALETTE.cardBg, borderColor: PALETTE.border }} className="rounded-2xl border p-3.5 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span style={{ color: PALETTE.accent }}>
                        <IconBell className="w-4 h-4" />
                      </span>
                      <div>
                        <p style={{ color: PALETTE.inkPrimary }} className="text-xs font-bold">แจ้งเตือนเมื่อเหลืออีก 2 คิว</p>
                        <p style={{ color: PALETTE.inkSecondary }} className="text-[11px]">ส่งการแจ้งเตือนล่วงหน้าก่อนถึงโต๊ะ</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setNotifyBeforeQueue((v) => !v);
                        triggerToast('อัปเดตการตั้งค่าแจ้งเตือนแล้ว');
                      }}
                      style={{ backgroundColor: notifyBeforeQueue ? PALETTE.primary : '#CBD5E1' }}
                      className="w-10 h-5 rounded-full transition p-0.5"
                    >
                      <span
                        className={`block w-4 h-4 rounded-full bg-white transition-transform ${
                          notifyBeforeQueue ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveScreen('home')}
                  style={btnSecondaryStyle}
                  className="w-full py-2.5 rounded-xl text-xs font-semibold"
                >
                  กลับหน้าหลัก
                </button>
              </div>
            )}
          </main>

          {/* Bottom Navigation Bar */}
          <nav
            style={{ backgroundColor: PALETTE.cardBg, borderColor: PALETTE.border }}
            className="border-t px-2 py-2 grid grid-cols-4 gap-1 shrink-0 z-20"
          >
            {[
              { id: 'home', label: 'หน้าแรก', icon: IconHome },
              { id: 'myQueues', label: 'คิวของฉัน', icon: IconClipboardList },
              { id: 'privileges', label: 'สิทธิพิเศษ', icon: IconTag },
              { id: 'ticket', label: 'บัตรคิว', icon: IconNavigation },
            ].map((tab) => {
              const IconComp = tab.icon;
              const isActive = activeScreen === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveScreen(tab.id as typeof activeScreen)}
                  style={
                    isActive
                      ? { backgroundColor: PALETTE.primary, color: '#FFFFFF' }
                      : { color: PALETTE.inkSecondary }
                  }
                  className="flex flex-col items-center justify-center py-1.5 rounded-xl text-[10px] font-semibold transition"
                >
                  <IconComp className="w-4 h-4 mb-0.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>

          {/* ================================================================
              MODALS & LIGHTBOX
             ================================================================ */}

          {/* Modal 1: ดูเมนูแนะนำ */}
          {showMenuModal && (
            <div className="absolute inset-0 bg-slate-950/60 z-40 flex items-end">
              <div
                style={{ backgroundColor: PALETTE.cardBg, borderColor: PALETTE.border }}
                className="w-full rounded-t-3xl p-4 max-h-[72%] overflow-y-auto border-t space-y-3"
              >
                <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
                  <div>
                    <h3 style={{ color: PALETTE.inkPrimary }} className="font-bold text-sm">เมนูแนะนำประจำร้าน</h3>
                    <p style={{ color: PALETTE.inkSecondary }} className="text-[11px]">{selectedRestaurant.name}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowMenuModal(false)}
                    style={btnSecondaryStyle}
                    className="w-7 h-7 rounded-full flex items-center justify-center"
                  >
                    <IconX className="w-4 h-4" />
                  </button>
                </div>

                {selectedRestaurant.menu.map((m) => (
                  <div key={m.id} className="flex items-start justify-between gap-2 py-1.5 border-b border-slate-100 last:border-none">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <p style={{ color: PALETTE.inkPrimary }} className="text-xs font-bold">{m.name}</p>
                        {m.popular && (
                          <span
                            style={{ backgroundColor: PALETTE.accentSoft, color: PALETTE.accentText, borderColor: '#FCD34D' }}
                            className="text-[9px] font-bold px-1.5 py-0.5 rounded border"
                          >
                            ขายดี
                          </span>
                        )}
                      </div>
                      <p style={{ color: PALETTE.inkSecondary }} className="text-[11px] mt-0.5">{m.desc}</p>
                    </div>
                    <span style={{ color: PALETTE.accent }} className="text-xs font-extrabold shrink-0">฿{m.price}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Modal 2: แผนที่และข้อมูลติดต่อร้าน */}
          {showMapModal && (
            <div className="absolute inset-0 bg-slate-950/60 z-40 flex items-center justify-center p-4">
              <div
                style={{ backgroundColor: PALETTE.cardBg, borderColor: PALETTE.border }}
                className="w-full rounded-3xl p-4 border shadow-xl space-y-3"
              >
                <div className="flex items-center justify-between">
                  <h3 style={{ color: PALETTE.inkPrimary }} className="font-bold text-sm">พิกัดและการเดินทาง</h3>
                  <button
                    type="button"
                    onClick={() => setShowMapModal(false)}
                    style={btnSecondaryStyle}
                    className="w-7 h-7 rounded-full flex items-center justify-center"
                  >
                    <IconX className="w-4 h-4" />
                  </button>
                </div>

                <div
                  style={{ backgroundColor: PALETTE.appBg, borderColor: PALETTE.border }}
                  className="rounded-2xl p-4 border text-center space-y-1.5"
                >
                  <div
                    style={btnPrimaryStyle}
                    className="w-10 h-10 rounded-full flex items-center justify-center mx-auto"
                  >
                    <IconMapPin className="w-5 h-5" />
                  </div>
                  <p style={{ color: PALETTE.inkPrimary }} className="font-bold text-xs">{mapTargetRestaurant.name}</p>
                  <p style={{ color: PALETTE.inkSecondary }} className="text-[11px]">{mapTargetRestaurant.location}</p>
                  <p style={{ color: PALETTE.accentText }} className="text-[11px] font-semibold">ระยะทาง {mapTargetRestaurant.distance}</p>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => triggerToast(`โทรติดต่อ ${mapTargetRestaurant.phone}`)}
                    style={btnSecondaryStyle}
                    className="py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5"
                  >
                    <IconPhone className="w-3.5 h-3.5" />
                    โทรหาทางร้าน
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowMapModal(false);
                      triggerToast(`เปิดเส้นทางไปยัง ${mapTargetRestaurant.shortName} แล้ว`);
                    }}
                    style={btnPrimaryStyle}
                    className="py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5"
                  >
                    <IconNavigation className="w-3.5 h-3.5" />
                    เริ่มนำทาง
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Modal 3: จัดการบัตรคิว (เลื่อนคิว / ยกเลิกคิว) */}
          {showManageQueueModal && activeTicket && (
            <div className="absolute inset-0 bg-slate-950/60 z-40 flex items-end">
              <div
                style={{ backgroundColor: PALETTE.cardBg, borderColor: PALETTE.border }}
                className="w-full rounded-t-3xl p-4 border-t space-y-3"
              >
                <div className="flex items-center justify-between">
                  <h3 style={{ color: PALETTE.inkPrimary }} className="font-bold text-sm">จัดการคิว {activeTicket.queueNumber}</h3>
                  <button
                    type="button"
                    onClick={() => setShowManageQueueModal(false)}
                    style={btnSecondaryStyle}
                    className="w-7 h-7 rounded-full flex items-center justify-center"
                  >
                    <IconX className="w-4 h-4" />
                  </button>
                </div>

                <div
                  style={{ backgroundColor: PALETTE.accentSoft, borderColor: '#FCD34D', color: PALETTE.accentText }}
                  className="rounded-2xl border p-3 flex items-start gap-2 text-xs"
                >
                  <IconAlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <p>หากยังเดินทางมาไม่ถึง สามารถขอเลื่อนคิวออกไปด้านหลังได้โดยไม่ต้องกดรับบัตรคิวใหม่</p>
                </div>

                <button
                  type="button"
                  onClick={handlePostponeQueue}
                  style={btnSecondaryStyle}
                  className="w-full py-2.5 rounded-xl text-xs font-bold"
                >
                  ขอเลื่อนคิวออกไปอีก 2 คิว
                </button>
                <button
                  type="button"
                  onClick={handleCancelQueue}
                  style={btnDangerStyle}
                  className="w-full py-2.5 rounded-xl text-xs font-bold"
                >
                  ยกเลิกบัตรคิวนี้
                </button>
              </div>
            </div>
          )}

          {/* Lightbox ขยายรูปภาพ */}
          {lightboxImage && (
            <div
              onClick={() => setLightboxImage(null)}
              className="absolute inset-0 bg-slate-950/90 z-50 flex flex-col items-center justify-center p-4"
            >
              <button
                type="button"
                onClick={() => setLightboxImage(null)}
                className="self-end mb-2 w-8 h-8 rounded-full bg-white/15 text-white flex items-center justify-center"
              >
                <IconX className="w-4 h-4" />
              </button>
              <SafeImage
                src={lightboxImage}
                alt="ขยายรูปภาพ"
                className="w-full max-h-[70%] object-contain rounded-2xl"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}