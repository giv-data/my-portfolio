

import { 
  Send, 
  Twitter, 
  BookOpen, 
  Github, 
  Linkedin, 
  Mail,
  Youtube
} from 'lucide-react';
import { SocialLink, Skill, Translation } from './types';

// =========================================================================================
// راهنمای ویرایش کلی:
// در این فایل تمام داده‌های ثابت سایت قرار دارد. شما می‌توانید متن‌ها، لینک‌ها و مهارت‌ها را تغییر دهید.
// تغییرات شما بلافاصله در سایت اعمال می‌شود.
// =========================================================================================

// --- لیست شبکه های اجتماعی ---
export const SOCIAL_LINKS: SocialLink[] = [
  {
    id: 'telegram', 
    url: 'https://t.me/givdata', 
    icon: Send, 
    color: '#229ED9' 
  },
  {
    id: 'twitter',
    url: 'https://x.com/givdata',
    icon: Twitter,
    color: '#ffffff'
  },
  {
    id: 'youtube',
    url: 'https://www.youtube.com/@GivData',
    icon: Youtube,
    color: '#FF0000'
  },
  {
    id: 'medium',
    url: 'https://medium.com/@givdata',
    icon: BookOpen,
    color: '#FFC017'
  },
  {
    id: 'github',
    url: 'https://github.com/giv-data',
    icon: Github,
    color: '#f0f6fc'
  },
  {
    id: 'linkedin',
    url: 'https://linkedin.com/in/ali-givshadi',
    icon: Linkedin,
    color: '#0077b5'
  },
  {
    id: 'gmail',
    url: 'mailto:ali.givshadi.mail@gmail.com',
    icon: Mail,
    color: '#EA4335'
  }
];

// =========================================================================================
// --- بخش مهارت ها (SKILLS) ---
// راهنمای اضافه کردن مهارت:
// لیست مهارت های انگلیسی و فارسی جدا شده است تا بتوانید نام ها را ترجمه کنید.
// =========================================================================================

// مهارت ها به انگلیسی
const EN_SKILLS: Skill[] = [
  // آیتم ویژه برای دانلود رزومه
  // لینک را در اینجا قرار دهید. فعلا # است.
  { name: 'Download Resume (PDF)', link: '#', highlight: true },
  { name: 'SQL' },
  // { name: 'Python' },
  // { name: 'Machine Learning' },
  // { name: 'Big Data' },
  // { name: 'React / Frontend' },
  // { name: 'Backend Development' },
  // { name: 'DevOps' },
  // { name: 'Cloud Computing' },
  // { name: 'Java' },
];

// مهارت ها به فارسی
const FA_SKILLS: Skill[] = [
  // آیتم ویژه برای دانلود رزومه
  { name: 'دانلود رزومه (PDF)', link: '#', highlight: true },
  { name: 'اس کیو ال (SQL)' },
  // { name: 'پایتون (Python)' },
  // { name: 'یادگیری ماشین (ML)' },
  // { name: 'کلان داده (Big Data)' },
  // { name: 'فرانت‌اند / React' },
  // { name: 'توسعه بک‌‌اند' },
  // { name: 'دواپس (DevOps)' },
  // { name: 'رایانش ابری' },
  // { name: 'جاوا' },
];

// --- داده های شخصیت شناسی (انگلیسی) ---
const EN_PERSONALITY = [
  {
    title: "Big Five Personality Traits (OCEAN)",
    traits: [
      { label: "Openness to Experience", value: "87", subValue: "High" },
      { label: "Conscientiousness", value: "95", subValue: "Very High" },
      { label: "Extraversion", value: "83", subValue: "High" },
      { label: "Agreeableness", value: "59", subValue: "Moderate" },
      { label: "Neuroticism", value: "56", subValue: "Moderate" },
    ]
  },
  {
    title: "DISC Personality Profile",
    traits: [
      { label: "Primary Type", value: "D (Dominant)" },
      { label: "Secondary Type", value: "DC (Dominant-Compliant)" },
      { label: "Key Traits", value: "Assertive, Results-Driven, Dynamic, Precise" },
    ]
  },
  {
    title: "Emotional Intelligence (EQ)",
    traits: [
      { label: "Self-Regard", value: "Very High" },
      { label: "Problem-Solving", value: "High" },
      { label: "Stress Tolerance", value: "Very High" },
      { label: "Optimism", value: "High" },
    ]
  },
  {
    title: "MBTI Personality Type",
    traits: [
      { label: "Type", value: "INTJ-A (Architect)" },
      { label: "Key Strengths", value: "Strategic, Analytical, Independent" },
    ]
  },
  {
    title: "Enneagram Type",
    traits: [
      { label: "Type", value: "8w7 (Challenger)" },
    ]
  }
];

// --- داده های شخصیت شناسی (فارسی) ---
const FA_PERSONALITY = [
  {
    title: "مدل پنج عاملی شخصیت (OCEAN)",
    traits: [
      { label: "گشودگی به تجربه", value: "۸۷", subValue: "بالا" },
      { label: "وظیفه‌شناسی", value: "۹۵", subValue: "بسیار بالا" },
      { label: "برون‌گرایی", value: "۸۳", subValue: "بالا" },
      { label: "توافق‌پذیری", value: "۵۹", subValue: "متوسط" },
      { label: "روان‌رنجوری", value: "۵۶", subValue: "متوسط" },
    ]
  },
  {
    title: "پروفایل شخصیتی دیسک (DISC)",
    traits: [
      { label: "تیپ اصلی", value: "D (سلطه‌گر)" },
      { label: "تیپ فرعی", value: "DC (سلطه‌گر-تطبیق‌پذیر)" },
      { label: "ویژگی‌های کلیدی", value: "قاطع، نتیجه‌گرا، پویا، دقیق" },
    ]
  },
  {
    title: "هوش هیجانی (EQ)",
    traits: [
      { label: "عزت نفس", value: "بسیار بالا" },
      { label: "حل مسئله", value: "بالا" },
      { label: "تحمل استرس", value: "بسیار بالا" },
      { label: "خوش‌بینی", value: "بالا" },
    ]
  },
  {
    title: "تیپ شخصیتی MBTI",
    traits: [
      { label: "تیپ", value: "INTJ-A (معمار)" },
      { label: "نقاط قوت", value: "استراتژیک، تحلیل‌گر، مستقل" },
    ]
  },
  {
    title: "انیاگرام (Enneagram)",
    traits: [
      { label: "تیپ", value: "8w7 (چالش‌گر)" },
    ]
  }
];

// --- ترجمه متون سایت ---
export const TRANSLATIONS: Record<'en' | 'fa', Translation> = {
  en: {
    name: 'Ali Givshadi',
    role: 'Data Engineer & Tech Lover',
    aboutTitle: 'About Me',
    aboutText: "Hello friends! I'm **Ali Givshadi**, just a simple Computer Engineering student.\nData Engineering is an extremely attractive field for me, and I strive to dive deeper into it as much as possible.\nBesides this, I love helping others grow in this profession. You can follow me on the networks listed in the 'Connect With Me' section.\nIf you have a personal or work-related matter requiring direct contact, please email me—you'll get a reply soon.\nI extremely enjoy teamwork and try to adapt to the team. As I believe in nature, the organism with the most adaptability minimizes its risk of extinction.",
    skillsTitle: 'My Skills',
    skills: EN_SKILLS,
    socialsTitle: 'Connect With Me',
    personalityTitle: 'Personality Analysis',
    socialNames: {
      telegram: 'Telegram',
      twitter: 'X (Twitter)',
      youtube: 'YouTube',
      medium: 'Medium',
      github: 'GitHub',
      linkedin: 'LinkedIn',
      gmail: 'Gmail'
    },
    copyright: '© All rights reserved to Ali Givshadi. Created in December 2025.',
    changeLang: 'FA',
    personality: EN_PERSONALITY,
    menu: {
      home: 'Home',
      about: 'About',
      skills: 'Skills',
      personality: 'Personality',
      contact: 'Contact'
    }
  },
  fa: {
    name: 'علی گیوشادی',
    role: 'مهندس داده و عاشق تکنولوژی',
    aboutTitle: 'درباره من',
    aboutText: "سلام رفقا! من **علی گیوشادی** هستم، یه دانشجوی مهندسی کامیپوتر ساده.\nحوزه مهندسی داده برام حوزه بشدت جذابیه و تمام تلاشم بر اینه هرچقدر بیشتر تا جای ممکن توش عمیق بشم.\nعلاوه بر این دوست دارم به بقیه هم کمک کنم توی این حرفه از آب و گل در بیان. میتونید من رو در شبکه هایی که در بخش ارتباط بامن قرار دادم دنبال کنید.\nاگر موضوع شخصی یا کاری بود که نیاز به ارتباط مستقیم با من داشتین حتما به ایمیل من پیام بدین، بزودی جواب میگیرین.\nاز کار تیمی هم فوق‌العاده لذت میبرم و کلا سعی میکنم سازگار بشم با تیم. چه بسا که معتقدم در طبیعت موجودی که بیشترین سازگاری رو داره میتونه انقراض نسلش رو به حداقل برسونه.",
    skillsTitle: 'مهارت‌های من',
    skills: FA_SKILLS,
    socialsTitle: 'ارتباط با من',
    personalityTitle: 'تحلیل شخصیتی',
    socialNames: {
      telegram: 'تلگرام',
      twitter: 'ایکس (توییتر)',
      youtube: 'یوتیوب',
      medium: 'مدیوم',
      github: 'گیت‌هاب',
      linkedin: 'لینکدین',
      gmail: 'جیمیل'
    },
    copyright: '© تمام حقوق متعلق به علی گیوشادی است. ایجاد شده در آذر ۱۴۰۴.',
    changeLang: 'EN',
    personality: FA_PERSONALITY,
    menu: {
      home: 'خانه',
      about: 'درباره من',
      skills: 'مهارت‌ها',
      personality: 'شخصیت‌شناسی',
      contact: 'ارتباط با من'
    }
  }
};