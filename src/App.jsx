import React, { useState, useEffect, useMemo } from 'react';
import { isNative, nativePermissionStatus, nativeRequestPermission, nativeScheduleReminders, nativeCancelAll, nativeTestNotification } from './native.js';
import {
  Home,
  CheckSquare,
  BookOpen,
  Compass,
  MoreHorizontal,
  Calendar as CalendarIcon,
  Bell,
  User,
  Plus,
  Check,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  Music,
  Moon,
  HelpCircle,
  FileText,
  Sparkles,
  Copy,
  ChevronLeft,
  ChevronRight,
  Search,
  Bookmark,
  Highlighter,
  Trash2,
  Clock,
  X,
  TrendingUp,
  Palette,
  Settings,
  Mail,
  Info,
  ShieldCheck,
  Sun,
  Flame,
  Share2,
  MessageSquare,
} from 'lucide-react';

// ============================================================================
// 1. OFFICIAL TRANSFORMER BRAND EMBLEM (Pilgrim, Mountain, Cross & Bible)
// ============================================================================
function TransformerEmblem({ size = "md", showBorder = true }) {
  const dim = size === "lg" ? "w-14 h-14" : size === "sm" ? "w-8 h-8" : "w-10 h-10";
  return (
    <div
      className={`${dim} rounded-2xl bg-gradient-to-b from-[#1E4D40] to-[#0A1F1A] flex items-center justify-center relative shrink-0 shadow-lg overflow-hidden ${
        showBorder ? 'border-2 border-[#D5AD59]' : ''
      }`}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full p-0.5">
        <defs>
          <radialGradient id="crossGlow" cx="50%" cy="32%" r="40%">
            <stop offset="0%" stopColor="#FFFBEB" stopOpacity="0.95" />
            <stop offset="45%" stopColor="#D5AD59" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#173F35" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="goldMetallic" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FDE68A" />
            <stop offset="50%" stopColor="#D5AD59" />
            <stop offset="100%" stopColor="#B4862E" />
          </linearGradient>
        </defs>

        {/* Sunrise Sky Glow */}
        <circle cx="50" cy="32" r="32" fill="url(#crossGlow)" />

        {/* Mountain Silhouettes */}
        <path d="M0,68 L25,48 L50,65 L75,44 L100,68 L100,100 L0,100 Z" fill="#0D2B24" />
        <path d="M15,75 L38,58 L62,72 L85,55 L100,78 L100,100 L0,100 Z" fill="#071915" />

        {/* Radiant Golden Cross on Horizon */}
        <g fill="url(#goldMetallic)">
          {/* Vertical Cross Beam */}
          <rect x="47.5" y="14" width="5" height="30" rx="1" filter="drop-shadow(0 0 3px #FFFBEB)" />
          {/* Horizontal Cross Beam */}
          <rect x="39" y="22" width="22" height="4.5" rx="1" filter="drop-shadow(0 0 3px #FFFBEB)" />
        </g>

        {/* Pilgrim Silhouette on Summit with Lantern & Staff */}
        <g fill="#173F35">
          {/* Staff */}
          <line x1="28" y1="52" x2="28" y2="76" stroke="#D5AD59" strokeWidth="1.5" strokeLinecap="round" />
          {/* Pilgrim Head with Shawl */}
          <circle cx="23" cy="56" r="3.5" fill="#D5AD59" />
          {/* Cloak */}
          <path d="M19,60 C21,57 26,57 28,60 L29,74 L17,74 Z" fill="#D5AD59" opacity="0.9" />
          {/* Lantern Glow */}
          <circle cx="15" cy="67" r="3" fill="#FEF08A" filter="drop-shadow(0 0 2px #F59E0B)" />
          <rect x="14" y="65" width="2" height="4" fill="#78350F" />
        </g>

        {/* Open Golden Bible at Bottom with Sprouting Leaf */}
        <g transform="translate(26, 75) scale(0.48)">
          <path
            d="M5,22 Q25,8 45,22 Q65,8 85,22 L85,34 Q65,20 45,34 Q25,20 5,34 Z"
            fill="url(#goldMetallic)"
          />
          {/* Sprouting leaf in center */}
          <path d="M45,20 C42,12 40,5 45,0 C50,5 48,12 45,20 Z" fill="#FFFBEB" />
          <path d="M45,15 C48,11 53,8 57,8 C54,12 50,15 45,17 Z" fill="#FDE68A" />
        </g>
      </svg>
    </div>
  );
}

// ==========================================================================
// 2. THE 7 ROTATING WEEKLY THEMES
// ==========================================================================
const THEMES = [
  {
    dayIndex: 0,
    dayName: 'Sunday',
    themeName: 'Midnight Blue & Silver',
    purpose: 'Faith, Rest, and Gratitude',
    primary: '#0F172A',
    accent: '#94A3B8',
    readingBg: '#F8FAFC',
    cardBorder: '#E2E8F0',
    swatches: ['#0F172A', '#94A3B8', '#FFFFFF'],
    scenicType: 'night',
    verse: {
      ref: 'Psalm 27:14 · KJV',
      text: '“Wait on the LORD: be of good courage, and he shall strengthen thine heart: wait, I say, on the LORD.”',
      meaning: 'Rest in His quiet assurance and divine strength.',
      application: 'Quiet your anxious heart and surrender control into His capable hands.'
    },
    principles: [10, 7, 3],
    song: {
      titleEn: 'Ente Daivam Swargathilundu',
      titleMl: 'എന്റെ ദൈവം സ്വർഗ്ഗത്തിലുണ്ട്',
      artist: 'Pr. Blesson Memana',
      theme: 'Faith & Resting in God'
    }
  },
  {
    dayIndex: 1,
    dayName: 'Monday',
    themeName: 'Forest & Gold',
    purpose: 'Growth and New Beginnings',
    primary: '#173F35',
    accent: '#D5AD59',
    readingBg: '#F6F0E3',
    cardBorder: '#E7DEC8',
    swatches: ['#173F35', '#D5AD59', '#F6F0E3'],
    scenicType: 'forest',
    verse: {
      ref: 'Isaiah 22:22 · KJV',
      text: '“And the key of the house of David will I lay upon his shoulder; so he shall open, and none shall shut; and he shall shut, and none shall open.”',
      meaning: 'The Lord holds sovereign authority over your open doors, career, and every season of life.',
      application: 'Trust that God has prepared the way for you this week. Step forward with bold confidence.'
    },
    principles: [1, 9, 8],
    song: {
      titleEn: 'Aathmavin Shakthiyode',
      titleMl: 'ആത്മാവിൻ ശക്തിയോടെ',
      artist: 'Pr. Blesson Memana',
      theme: 'Spiritual Renewal & Empowerment'
    }
  },
  {
    dayIndex: 2,
    dayName: 'Tuesday',
    themeName: 'Ocean Blue',
    purpose: 'Peace and Trust',
    primary: '#0F2C59',
    accent: '#38BDF8',
    readingBg: '#F0F9FF',
    cardBorder: '#BAE6FD',
    swatches: ['#0F2C59', '#38BDF8', '#FFFFFF'],
    scenicType: 'ocean',
    verse: {
      ref: 'Psalm 46:10 · KJV',
      text: '“Be still, and know that I am God: I will be exalted among the heathen, I will be exalted in the earth.”',
      meaning: 'God is in command; striving in anxiety produces no lasting fruit.',
      application: 'Take five minutes of silence during your busiest study hour to acknowledge His peace.'
    },
    principles: [11, 5, 4],
    song: {
      titleEn: 'Athiparin Maravil',
      titleMl: 'അതിപരന്റെ മറവിലിരിക്കും ഞാൻ',
      artist: 'Lordson Antony',
      theme: 'Safety & Trust in God'
    }
  },
  {
    dayIndex: 3,
    dayName: 'Wednesday',
    themeName: 'Lavender',
    purpose: 'Reflection and Wisdom',
    primary: '#581C87',
    accent: '#C084FC',
    readingBg: '#FAF5FF',
    cardBorder: '#E9D5FF',
    swatches: ['#581C87', '#C084FC', '#FFFFFF'],
    scenicType: 'lavender',
    verse: {
      ref: 'Proverbs 3:5–6 · KJV',
      text: '“Trust in the LORD with all thine heart; and lean not unto thine own understanding. In all thy ways acknowledge him, and he shall direct thy paths.”',
      meaning: 'Human wisdom is finite; God provides clear guidance when we yield our will to Him.',
      application: 'Pray before making a choice today, committing the outcome completely to the Lord.'
    },
    principles: [3, 2, 7],
    song: {
      titleEn: 'Nanma Niranja Vane',
      titleMl: 'നന്മ നിറഞ്ഞവനേ എന്റെ യേശു നാഥാ',
      artist: 'Dr. Blesson Memana',
      theme: 'Gratitude & Divine Mercy'
    }
  },
  {
    dayIndex: 4,
    dayName: 'Thursday',
    themeName: 'Sunrise Peach',
    purpose: 'Motivation and Action',
    primary: '#9A3412',
    accent: '#FB923C',
    readingBg: '#FFF7ED',
    cardBorder: '#FFEDD5',
    swatches: ['#9A3412', '#FB923C', '#FFFDF9'],
    scenicType: 'sunrise',
    verse: {
      ref: 'Colossians 3:23 · KJV',
      text: '“And whatsoever ye do, do it heartily, as to the Lord, and not unto men; Knowing that of the Lord ye shall receive the reward of the inheritance: for ye serve the Lord Christ.”',
      meaning: 'Every daily duty, study assignment, or job task is a direct offering of worship to Christ.',
      application: 'Give wholehearted diligence to your most tedious responsibility today.'
    },
    principles: [4, 11, 9],
    song: {
      titleEn: 'Yahova Ente Idayan',
      titleMl: 'യഹോവ എന്റെ ഇടയനാകുന്നു',
      artist: 'Immanuel Ministries',
      theme: 'Provision & Heavenly Guidance'
    }
  },
  {
    dayIndex: 5,
    dayName: 'Friday',
    themeName: 'Amber & Brown',
    purpose: 'Discipline and Strength',
    primary: '#451A03',
    accent: '#D97706',
    readingBg: '#FFFBEB',
    cardBorder: '#FDE68A',
    swatches: ['#451A03', '#D97706', '#FFFDF5'],
    scenicType: 'amber',
    verse: {
      ref: 'Proverbs 4:25–27 · KJV',
      text: '“Let thine eyes look right on, and let thine eyelids look straight before thee. Ponder the path of thy feet, and let all thy ways be established.”',
      meaning: 'Distraction is the enemy of spiritual and personal growth. Fix your focus on worthwhile goals.',
      application: 'Turn off notification pings and finish one key project without interruption.'
    },
    principles: [5, 10, 1],
    song: {
      titleEn: 'Krooshile Snehame',
      titleMl: 'ക്രൂശിലെ സ്നേഹമോർക്കുമ്പോൾ',
      artist: 'Pr. Reji Narayanan',
      theme: 'The Love of Calvary'
    }
  },
  {
    dayIndex: 6,
    dayName: 'Saturday',
    themeName: 'Teal & Mint',
    purpose: 'Renewal and Balance',
    primary: '#134E4A',
    accent: '#2DD4BF',
    readingBg: '#F0FDFA',
    cardBorder: '#CCFBF1',
    swatches: ['#134E4A', '#2DD4BF', '#FFFFFF'],
    scenicType: 'teal',
    verse: {
      ref: 'James 2:17 · KJV',
      text: '“Even so faith, if it hath not works, is dead, being alone.”',
      meaning: 'Genuine spiritual conviction expresses itself through practical, consistent discipline.',
      application: 'Convert good intentions into action: start that postponed assignment or chore today.'
    },
    principles: [8, 12, 11],
    song: {
      titleEn: 'Anugrahathinte Uravakal',
      titleMl: 'അനുഗ്രഹത്തിന്റെ ഉറവകളെ',
      artist: 'Classical Pentecostal Hymn',
      theme: 'Spiritual Revivals & Blessings'
    }
  }
];

// ==========================================================================
// 3. THE 12 BIBLICAL PRINCIPLES DIRECTORY
// ==========================================================================
const ALL_PRINCIPLES = [
  { id: 1, title: 'Put God first', ref: 'Proverbs 3:5–6', meaning: 'Trust God and seek His guidance when making decisions.', action: 'Begin the day with prayer and Bible reading before becoming occupied with other activities.', scriptureText: 'Trust in the Lord with all thine heart; and lean not unto thine own understanding. In all thy ways acknowledge him, and he shall direct thy paths.' },
  { id: 2, title: 'Respect everyone', ref: 'Romans 12:10', meaning: 'Treat people with kindness, dignity, and consideration.', action: 'Listen carefully, speak respectfully, and avoid unnecessary arguments.', scriptureText: 'Be kindly affectioned one to another with brotherly love; in honour preferring one another.' },
  { id: 3, title: 'Speak less and wisely', ref: 'James 1:19', meaning: 'Be quick to listen, slow to speak, and slow to become angry.', action: 'Pause before responding when you feel frustrated or provoked.', scriptureText: 'Wherefore, my beloved brethren, let every man be swift to hear, slow to speak, slow to wrath.' },
  { id: 4, title: 'Be serious and responsible', ref: 'Colossians 3:23', meaning: 'Work sincerely and give your best effort in all assignments.', action: 'Complete an important responsibility without waiting for someone to remind you.', scriptureText: 'And whatsoever ye do, do it heartily, as to the Lord, and not unto men.' },
  { id: 5, title: 'Improve focus', ref: 'Proverbs 4:25–27', meaning: 'Keep your attention on worthwhile goals and avoid unnecessary distractions.', action: 'Complete one important task before spending time on entertainment or social feeds.', scriptureText: 'Let thine eyes look right on, and let thine eyelids look straight before thee. Turn not to the right hand nor to the left: remove thy foot from evil.' },
  { id: 6, title: 'Stop unnecessary reassurance-seeking', ref: 'Philippians 4:6–7', meaning: 'Bring concerns to God in prayer while taking sensible steps forward.', action: 'Pause, pray, and identify one practical step instead of seeking anxious validation.', scriptureText: 'Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God.' },
  { id: 7, title: 'Wait patiently', ref: 'Psalm 27:14', meaning: 'Wait with courage and avoid making decisions impulsively.', action: 'Give yourself time to think and pray before reacting to difficult situations.', scriptureText: 'Wait on the LORD: be of good courage, and he shall strengthen thine heart: wait, I say, on the LORD.' },
  { id: 8, title: 'Act toward your dreams', ref: 'James 2:17', meaning: 'Good intentions should lead to practical, daily execution.', action: 'Start one tangible task you have been postponing today.', scriptureText: 'Even so faith, if it hath not works, is dead, being alone.' },
  { id: 9, title: 'Plan wisely', ref: 'Proverbs 21:5', meaning: 'Thoughtful planning helps people use time and resources effectively.', action: 'Prepare a realistic timetable and priority checklist for the following day.', scriptureText: 'The thoughts of the diligent tend only to plenteousness; but of every one that is hasty only to want.' },
  { id: 10, title: "Trust God's plan", ref: 'Proverbs 16:3', meaning: 'Commit your plans to God while continuing to act responsibly.', action: 'Review your primary goal, pray over it, and take the next sensible step.', scriptureText: 'Commit thy works unto the LORD, and thy thoughts shall be established.' },
  { id: 11, title: 'Practise self-control', ref: 'Galatians 5:22–23', meaning: 'Develop discipline in your words, emotional choices, and behavior.', action: 'Avoid one habit or distraction that regularly interferes with your responsibilities.', scriptureText: 'But the fruit of the Spirit is love, joy, peace, longsuffering, gentleness, goodness, faith, Meekness, temperance: against such there is no law.' },
  { id: 12, title: 'Manage money wisely', ref: 'Luke 14:28', meaning: 'Consider costs and plan your material resources carefully.', action: 'Review your spending or plan how to use available resources responsibly.', scriptureText: 'For which of you, intending to build a tower, sitteth not down first, and counteth the cost, whether he have sufficient to finish it?' }
];

const BIBLE_BOOK_INDEX = [
  ['Genesis',50],['Exodus',40],['Leviticus',27],['Numbers',36],['Deuteronomy',34],['Joshua',24],['Judges',21],['Ruth',4],['1 Samuel',31],['2 Samuel',24],['1 Kings',22],['2 Kings',25],['1 Chronicles',29],['2 Chronicles',36],['Ezra',10],['Nehemiah',13],['Esther',10],['Job',42],['Psalms',150],['Proverbs',31],['Ecclesiastes',12],['Song of Solomon',8],['Isaiah',66],['Jeremiah',52],['Lamentations',5],['Ezekiel',48],['Daniel',12],['Hosea',14],['Joel',3],['Amos',9],['Obadiah',1],['Jonah',4],['Micah',7],['Nahum',3],['Habakkuk',3],['Zephaniah',3],['Haggai',2],['Zechariah',14],['Malachi',4],['Matthew',28],['Mark',16],['Luke',24],['John',21],['Acts',28],['Romans',16],['1 Corinthians',16],['2 Corinthians',13],['Galatians',6],['Ephesians',6],['Philippians',4],['Colossians',4],['1 Thessalonians',5],['2 Thessalonians',3],['1 Timothy',6],['2 Timothy',4],['Titus',3],['Philemon',1],['Hebrews',13],['James',5],['1 Peter',5],['2 Peter',3],['1 John',5],['2 John',1],['3 John',1],['Jude',1],['Revelation',22]
].map(([name, chapters], index) => ({ name, chapters, testament: index < 39 ? 'Old Testament' : 'New Testament' }));

const EXPANDED_BIBLE_BOOKS = [
  {
    id: 'isaiah22',
    nameEn: 'Isaiah 22',
    nameMl: 'യെശയ്യാവ് 22',
    testament: 'OT',
    topic: 'Divine Authority & The Key of David',
    verses: [
      { num: 20, en: 'And it shall come to pass in that day, that I will call my servant Eliakim the son of Hilkiah:', ml: 'അന്നാളിൽ ഞാൻ ഹിൽക്കീയാവിന്റെ മകനായ എല്യാക്കീം എന്ന എന്റെ ദാസനെ വിളിക്കും;' },
      { num: 21, en: 'And I will clothe him with thy robe, and strengthen him with thy girdle, and I will commit thy government into his hand: and he shall be a father to the inhabitants of Jerusalem, and to the house of Judah.', ml: 'ഞാൻ അവനെ നിന്റെ അങ്കി ധരിപ്പിച്ചു നിന്റെ കച്ചകൊണ്ടു അവനെ അരമുറുക്കും; അവൻ യിരുയേലേം നിവാസികൾക്കും യഹൂദാ വീട്ടിനും ഒരു പിതാവാകും.' },
      { num: 22, en: 'And the key of the house of David will I lay upon his shoulder; so he shall open, and none shall shut; and he shall shut, and none shall open.', ml: 'ഞാൻ ദാവീദ് ഗൃഹത്തിന്റെ താക്കോൽ അവന്റെ തോളിൽ വെക്കും; അവൻ തുറന്നാൽ ആരും അടക്കമറ്റില്ല; അടച്ചാൽ ആരും തുറക്കമറ്റില്ല.' },
      { num: 23, en: 'And I will fasten him as a nail in a sure place; and he shall be for a glorious throne to his father’s house.', ml: 'ഞാൻ അവനെ ഉറപ്പുള്ള സ്ഥലത്തു ഒരു ആണിയായി തറെക്കും; അവൻ തന്റെ പിതൃഭവനത്തിന്റെ മഹിമയുള്ള സിംഹാസനമായിരിക്കും.' }
    ]
  },
  {
    id: 'proverbs3',
    nameEn: 'Proverbs 3',
    nameMl: 'സദൃശവാക്യങ്ങൾ 3',
    testament: 'OT',
    topic: 'Wholehearted Trust & Divine Direction',
    verses: [
      { num: 1, en: 'My son, forget not my law; but let thine heart keep my commandments:', ml: 'മകനേ, എന്റെ ഉപദേശം മറക്കരുതു; നിന്റെ ഹൃദയം എന്റെ കല്പനകൾ സൂക്ഷിക്കട്ടെ:' },
      { num: 2, en: 'For length of days, and long life, and peace, shall they add to thee.', ml: 'അവ ദീർഘായുസ്സും ജീവകാലവും സമാധാനവും നിനക്കു കൂട്ടിച്ചേർക്കും.' },
      { num: 3, en: 'Let not mercy and truth forsake thee: bind them about thy neck; write them upon the table of thine heart:', ml: 'ദയയും സത്യം നിന്നെ വിട്ട് ഓടരുത്; അവയെ നിന്റെ കഴുത്തിൽ ചേർത്തു വയ്ക്ക; അവയെ നിന്റെ ഹൃദയപ്പന്തിയിൽ ചെപ്പും.' },
      { num: 4, en: 'So shalt thou find favour and good understanding in the sight of God and man.', ml: 'അങ്ങനെ നീ ദൈവത്തിന്റെയും മനുഷ്യർക്കുമുമ്പിൽ അനുകൃപയും നല്ല ബുദ്ധിയും കണ്ടെത്തും.' },
      { num: 5, en: 'Trust in the LORD with all thine heart; and lean not unto thine own understanding.', ml: 'പൂർണ്ണഹൃദയത്തോടെ യഹോവയിൽ ആശ്രയിക്ക; നിന്റെ സ്വന്തം ബുദ്ധിയിലും ചാരരുത്.' },
      { num: 6, en: 'In all thy ways acknowledge him, and he shall direct thy paths.', ml: 'നിന്റെ എല്ലാ വഴികളിലും അവനെ നിനച്ചുകൊൾക; അവൻ നിന്റെ പാതകൾ നേര്വഴിയിക്കും.' },
      { num: 7, en: 'Be not wise in thine own eyes: fear the LORD, and depart from evil.', ml: 'നിനക്കു തന്നേ നീ ജ്ഞാനിയായി തോന്നരുത്; യഹോവത്തിൽ ഭയം പുലർത്തി തിന്മയിൽ നിന്ന് വിട്ടു നിന്നു.' },
      { num: 8, en: 'It shall be health to thy navel, and marrow to thy bones.', ml: 'അതു നിന്റെ ശരീരത്തിന്നു സൌഖ്യവും നിന്റെ അസ്ഥികളിലേക്കു കരുത്തും തരട്ടെ.' }
    ]
  }
];

const SCRIPTURE_TOPICS = [
  { name: 'Faith & Trust', verse: 'Proverbs 3:5–6', bookId: 'proverbs3' },
  { name: 'Fear & Worry', verse: 'Philippians 4:6–7', bookId: 'philippians4' },
  { name: 'Divine Protection', verse: 'Psalm 91:1–4', bookId: 'psalm91' },
  { name: 'The Shepherd', verse: 'Psalm 23:1–6', bookId: 'psalm23' },
  { name: 'Focus & Diligence', verse: 'Proverbs 4:23–27', bookId: 'proverbs4' },
  { name: 'Renewed Strength', verse: 'Isaiah 40:29–31', bookId: 'isaiah40' },
  { name: 'Inner Peace', verse: 'John 1:1–5', bookId: 'john1' },
  { name: 'Speech & Listening', verse: 'James 1:19', bookId: 'james1' },
  { name: 'Work as Unto God', verse: 'Colossians 3:23', bookId: 'colossians3' },
  { name: 'Fruit & Self-Control', verse: 'Galatians 5:22–23', bookId: 'galatians5' },
  { name: 'Financial Prudence', verse: 'Luke 14:28', bookId: 'luke14' },
  { name: 'Action Over Delay', verse: 'James 2:17', bookId: 'james2' }
];

function ScenicCanvas({ type, className = "w-full h-full object-cover" }) {
  const scenes = {
    forest: { src: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1800&q=85', alt: 'Natural evergreen forest with soft morning light' },
    ocean: { src: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1800&q=85', alt: 'Blue ocean waves beneath a natural sky' },
    lavender: { src: 'https://images.unsplash.com/photo-1499002238440-d264edd596ec?auto=format&fit=crop&w=1800&q=85', alt: 'Quiet countryside in soft lavender evening light' },
    sunrise: { src: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1800&q=85', alt: 'Mountain lake at sunrise with natural warm light' },
    amber: { src: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=85', alt: 'Golden-hour natural mountain landscape' },
    teal: { src: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=1800&q=85', alt: 'Waterfall flowing through a lush green landscape' },
    night: { src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1800&q=85', alt: 'Mountain peaks beneath a deep blue evening sky' }
  };
  const scene = scenes[type] || scenes.forest;
  return (
    <img
      className={className}
      src={scene.src}
      alt={scene.alt}
      loading="eager"
      decoding="async"
      onError={(event) => {
        event.currentTarget.style.display = 'none';
        if (event.currentTarget.parentElement) {
          event.currentTarget.parentElement.style.background = 'linear-gradient(145deg, var(--theme-primary, #173F35), var(--theme-accent, #D5AD59), #10251f)';
        }
      }}
    />
  );
}

function getLocalDateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export default function App() {
  const [clockNow, setClockNow] = useState(() => new Date());
  const todayKey = getLocalDateKey(clockNow);
  const greeting = clockNow.getHours() < 12 ? 'Good morning!' : clockNow.getHours() < 17 ? 'Good afternoon!' : clockNow.getHours() < 21 ? 'Good evening!' : 'Good night!';
  useEffect(() => {
    const refreshClock = () => setClockNow(new Date());
    const timer = window.setInterval(refreshClock, 30_000);
    window.addEventListener('focus', refreshClock);
    document.addEventListener('visibilitychange', refreshClock);
    return () => { window.clearInterval(timer); window.removeEventListener('focus', refreshClock); document.removeEventListener('visibilitychange', refreshClock); };
  }, []);

  const [activeTab, setActiveTab] = useState('home');
  const [moreSubView, setMoreSubView] = useState(null);

  const [autoTheme, setAutoTheme] = useState(() => { try { return localStorage.getItem('transformer_auto_theme') !== 'false'; } catch { return true; } });
  const [manualThemeIndex, setManualThemeIndex] = useState(() => { try { const n = Number(localStorage.getItem('transformer_manual_theme')); return Number.isInteger(n) && n >= 0 && n < THEMES.length ? n : 1; } catch { return 1; } });
  useEffect(() => { try { localStorage.setItem('transformer_auto_theme', String(autoTheme)); localStorage.setItem('transformer_manual_theme', String(manualThemeIndex)); } catch {} }, [autoTheme, manualThemeIndex]);

  const [toast, setToast] = useState(null);
  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3200);
  };

  const DEFAULT_REMINDERS = [
    { id: 'morning', title: 'Morning Prayer & Bible reading', time: '07:25', enabled: true },
    { id: 'progress', title: 'Check Task Progress & Focus', time: '13:00', enabled: true },
    { id: 'unfinished', title: 'Review Unfinished Tasks', time: '17:00', enabled: true },
    { id: 'reflection', title: "Evening Reflection & Tomorrow's Plan", time: '21:00', enabled: true }
  ];
  const [reminders, setReminders] = useState(() => {
    try { const saved = JSON.parse(localStorage.getItem('transformer_reminders') || 'null'); return Array.isArray(saved) ? saved : DEFAULT_REMINDERS; }
    catch { return DEFAULT_REMINDERS; }
  });
  const [notificationsEnabled, setNotificationsEnabled] = useState(() => {
    try { return localStorage.getItem('transformer_notifications_enabled') === 'true'; } catch { return false; }
  });
  const [notificationPermission, setNotificationPermission] = useState(() => (isNative() ? 'default' : ('Notification' in window ? Notification.permission : 'unsupported')));
  useEffect(() => { try { localStorage.setItem('transformer_reminders', JSON.stringify(reminders)); localStorage.setItem('transformer_notifications_enabled', String(notificationsEnabled)); } catch {} }, [reminders, notificationsEnabled]);
  useEffect(() => {
    if (!isNative()) return;
    nativePermissionStatus().then(p => setNotificationPermission(p === 'granted' ? 'granted' : p === 'denied' ? 'denied' : 'default'));
  }, []);
  useEffect(() => {
    if (!isNative()) return;
    if (notificationsEnabled && notificationPermission === 'granted') nativeScheduleReminders(reminders);
    else if (!notificationsEnabled) nativeCancelAll();
  }, [notificationsEnabled, notificationPermission, reminders]);
  const enableNotifications = async () => {
    if (isNative()) {
      const permission = await nativeRequestPermission();
      setNotificationPermission(permission);
      if (permission === 'granted') { setNotificationsEnabled(true); showToast('Daily reminders scheduled on this device.'); await nativeTestNotification(); }
      else { setNotificationsEnabled(false); showToast('Notifications were not allowed. Enable them in Android Settings > Apps > Transformer.'); }
      return;
    }
    if (!('Notification' in window)) { showToast('This browser does not support notifications. Try Chrome on HTTPS or localhost.'); return; }
    try {
      const permission = Notification.permission === 'granted' ? 'granted' : await Notification.requestPermission();
      setNotificationPermission(permission);
      if (permission === 'granted') { setNotificationsEnabled(true); showToast('Notifications enabled while Transformer is open.'); new Notification('Transformer reminders enabled', { body: 'You will receive scheduled reminders while this tab is open.' }); }
      else { setNotificationsEnabled(false); showToast('Notifications were not allowed. Enable them in your browser settings.'); }
    } catch { showToast('Could not enable notifications in this browser.'); }
  };
  useEffect(() => {
    if (isNative() || !notificationsEnabled || notificationPermission !== 'granted') return undefined;
    const checkReminders = () => {
      const now = new Date();
      const dateKey = getLocalDateKey(now);
      const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      reminders.forEach(reminder => {
        if (!reminder.enabled || reminder.time !== currentTime) return;
        const sentKey = `transformer_reminder_sent_${dateKey}_${reminder.id}`;
        try { if (localStorage.getItem(sentKey)) return; localStorage.setItem(sentKey, '1'); } catch {}
        try { new Notification(`Transformer: ${reminder.title}`, { body: 'Take a moment to pause, pray, and continue with intention.', tag: sentKey }); } catch {}
      });
    };
    checkReminders();
    const timer = window.setInterval(checkReminders, 15_000);
    return () => window.clearInterval(timer);
  }, [notificationsEnabled, notificationPermission, reminders]);

  const activeTheme = useMemo(() => {
    if (autoTheme) {
      const today = clockNow.getDay();
      return THEMES.find(t => t.dayIndex === today) || THEMES[1];
    }
    return THEMES[manualThemeIndex] || THEMES[1];
  }, [autoTheme, manualThemeIndex, clockNow]);

  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem('transformer_tasks');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [
      { id: '1', title: 'Morning prayer & Bible reading', time: '6:30 AM', deadline: '7:30 AM', category: 'Faith & Prayer', priority: 'High', principleId: 1, completed: true, date: todayKey },
      { id: '2', title: 'Study Nursing Foundation chapter 4', time: '9:00 AM', deadline: '11:30 AM', category: 'Studies', priority: 'High', principleId: 4, completed: false, date: todayKey },
      { id: '3', title: 'Complete pharmacology clinical notes', time: '2:00 PM', deadline: '4:00 PM', category: 'Assignments', priority: 'Medium', principleId: 8, completed: false, date: todayKey },
      { id: '4', title: 'Evening reflection & next day plan', time: '8:00 PM', deadline: '9:00 PM', category: 'Personal Dev', priority: 'Low', principleId: 9, completed: false, date: todayKey }
    ];
  });

  useEffect(() => {
    try {
      localStorage.setItem('transformer_tasks', JSON.stringify(tasks));
    } catch (e) {}
  }, [tasks]);

  const [timetableChecks, setTimetableChecks] = useState({ '6:30 AM': true, '9:00 AM': false, '1:00 PM': false, '2:00 PM': false, '8:00 PM': false });
  const [selectedCalendarDate, setSelectedCalendarDate] = useState(getLocalDateKey());
  const [viewMonthOffset, setViewMonthOffset] = useState(0);

  const [principleActionChecks, setPrincipleActionChecks] = useState({ [`${getLocalDateKey()}-1`]: true, [`${getLocalDateKey()}-9`]: false, [`${getLocalDateKey()}-8`]: false });
  const [principleNotes, setPrincipleNotes] = useState({});

  const [journalEntries, setJournalEntries] = useState(() => {
    try {
      const saved = localStorage.getItem('transformer_journal');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [
      { id: 'j1', date: todayKey, title: 'Beginning the week with God', category: 'Reflection', reflection: 'Lord, give me strength to stay consistent with clinical duties and guard my time from distractions.', prayer: 'Praying for wisdom in studies and peace at home.', gratitude: 'Grateful for good health, family, and open doors.' }
    ];
  });

  useEffect(() => { try { localStorage.setItem('transformer_journal', JSON.stringify(journalEntries)); } catch (e) {} }, [journalEntries]);

  const [questionAnswers, setQuestionAnswers] = useState(() => {
    try {
      const saved = localStorage.getItem('transformer_questions');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return {
      q1_task1: 'Complete Nursing Foundation chapter 4',
      q1_task2: 'Pharmacology clinical notes',
      q1_task3: 'Evening family prayer',
      q2_faithTime: 'Yes, 6:30 AM prayer completed',
      q3_distraction: 'Endless short video scrolling during breaks',
      q4_progress: 'Finished morning study module',
      q5_reflection: 'Accomplished morning routine; tomorrow begins with clinical posting.'
    };
  });

  useEffect(() => { try { localStorage.setItem('transformer_questions', JSON.stringify(questionAnswers)); } catch (e) {} }, [questionAnswers]);

  const [selectedBook, setSelectedBook] = useState(EXPANDED_BIBLE_BOOKS[0]);
  const [bibleLanguage, setBibleLanguage] = useState('bilingual');
  const [bibleFontSize, setBibleFontSize] = useState('text-sm');
  const [savedVerses, setSavedVerses] = useState(['Isaiah 22:22', 'Proverbs 3:5–6', 'Psalm 23:1']);
  const [verseHighlights, setVerseHighlights] = useState({});
  const [bibleSearchQuery, setBibleSearchQuery] = useState('');
  const [readingPlanProgress, setReadingPlanProgress] = useState(19);
  const [fullBibleBook, setFullBibleBook] = useState('Genesis');
  const [fullBibleChapter, setFullBibleChapter] = useState(1);
  const [fullBibleVerses, setFullBibleVerses] = useState([]);
  const [fullBibleLoading, setFullBibleLoading] = useState(false);
  const [fullBibleError, setFullBibleError] = useState('');
  const [fullBibleRetry, setFullBibleRetry] = useState(0);
  const [questionReviewVisible, setQuestionReviewVisible] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function loadChapter() {
      setFullBibleLoading(true);
      setFullBibleError('');
      setFullBibleVerses([]);
      try {
        const bookSlug = fullBibleBook.replace(/ /g, '%20');
        const response = await fetch(`https://bible-api.com/${bookSlug}%20${fullBibleChapter}?translation=kjv`);
        if (!response.ok) throw new Error(`Bible service returned ${response.status}`);
        const data = await response.json();
        if (!Array.isArray(data.verses) || !data.verses.length) throw new Error('No verses were returned for this chapter.');
        if (!cancelled) setFullBibleVerses(data.verses.map(v => ({ num: v.verse, en: String(v.text || '').trim() })));
      } catch (error) {
        if (!cancelled) setFullBibleError('Could not load this chapter. Check your internet connection and try again. The curated excerpts below may still be available.');
      } finally {
        if (!cancelled) setFullBibleLoading(false);
      }
    }
    loadChapter();
    return () => { cancelled = true; };
  }, [fullBibleBook, fullBibleChapter, fullBibleRetry]);

  const [activePrincipleModal, setActivePrincipleModal] = useState(null);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [taskForm, setTaskForm] = useState({ title: '', time: '09:00 AM', deadline: '', priority: 'Medium', category: 'Studies', principleId: 1 });
  const [shareVerseModal, setShareVerseModal] = useState(null);

  const [feedbackCategory, setFeedbackCategory] = useState('Feature suggestion');
  const [feedbackRating, setFeedbackRating] = useState(5);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const todayTasks = tasks.filter(t => t.date === todayKey);
  const completedToday = todayTasks.filter(t => t.completed).length;
  const totalToday = todayTasks.length;
  const progressPercent = totalToday > 0 ? Math.round((completedToday / totalToday) * 100) : 0;

  const filteredVerses = useMemo(() => {
    if (!bibleSearchQuery.trim()) return selectedBook.verses;
    const q = bibleSearchQuery.toLowerCase();
    return selectedBook.verses.filter(v => v.en.toLowerCase().includes(q) || v.ml.toLowerCase().includes(q));
  }, [selectedBook, bibleSearchQuery]);

  const toggleTask = (id) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const handleSaveTask = () => {
    if (!taskForm.title.trim()) {
      showToast('Please enter a task title');
      return;
    }
    const newTask = {
      id: Date.now().toString(),
      title: taskForm.title,
      time: taskForm.time || '10:00 AM',
      deadline: taskForm.deadline || '',
      category: taskForm.category,
      priority: taskForm.priority,
      principleId: Number(taskForm.principleId),
      completed: false,
      date: todayKey
    };
    setTasks([newTask, ...tasks]);
    setIsTaskModalOpen(false);
    setTaskForm({ title: '', time: '09:00 AM', deadline: '', priority: 'Medium', category: 'Studies', principleId: 1 });
    showToast('Task added successfully');
  };

  const pushMorningPrioritiesToTasks = () => {
    const newItems = [
      questionAnswers.q1_task1 && { title: questionAnswers.q1_task1, priority: 'High', category: 'Studies' },
      questionAnswers.q1_task2 && { title: questionAnswers.q1_task2, priority: 'Medium', category: 'Assignments' },
      questionAnswers.q1_task3 && { title: questionAnswers.q1_task3, priority: 'Medium', category: 'Faith & Prayer' }
    ].filter(Boolean);

    if (newItems.length === 0) {
      showToast('Enter priorities in Question 1 first');
      return;
    }

    const created = newItems.map((item, idx) => ({
      id: (Date.now() + idx).toString(),
      title: item.title,
      time: idx === 0 ? '09:00 AM' : idx === 1 ? '02:00 PM' : '07:00 PM',
      deadline: '',
      category: item.category,
      priority: item.priority,
      principleId: 1,
      completed: false,
      date: todayKey
    }));

    setTasks(prev => [...created, ...prev]);
    showToast('Priorities pushed directly into Tasks!');
  };

  const copyEmail = () => navigator.clipboard?.writeText('jestinp843@gmail.com') && showToast('Email jestinp843@gmail.com copied to clipboard!');

  const handleFeedbackSubmit = () => {
    if (!feedbackMessage.trim()) {
      showToast('Please enter your feedback message');
      return;
    }
    const subject = encodeURIComponent(`Transformer feedback — ${feedbackCategory}`);
    const body = encodeURIComponent(`Category: ${feedbackCategory}\nRating: ${feedbackRating}/5\n\n${feedbackMessage.trim()}`);
    window.location.href = `mailto:jestinp843@gmail.com?subject=${subject}&body=${body}`;
    showToast('Email draft opened. Review it and press Send in your email app.');
  };

  const cycleHighlight = (verseKey) => {
    const colors = ['gold', 'green', 'blue', 'peach', null];
    const current = verseHighlights[verseKey] || null;
    const nextIndex = (colors.indexOf(current) + 1) % colors.length;
    const nextColor = colors[nextIndex];
    setVerseHighlights({ ...verseHighlights, [verseKey]: nextColor });
    showToast(nextColor ? `Highlighted in ${nextColor}` : 'Highlight cleared');
  };

  const handleLogout = () => {
    setMoreSubView(null);
    setActiveTab('home');
  };

  return (
    <div
      data-theme={activeTheme.dayName.toLowerCase()}
      className="theme-app min-h-screen bg-[#F6F0E3]/40 text-slate-900 font-sans antialiased flex flex-col justify-between selection:bg-[#D5AD59]/30"
      style={{
        '--theme-primary': activeTheme.primary,
        '--theme-accent': activeTheme.accent,
        '--theme-reading-bg': activeTheme.readingBg,
        '--theme-border': activeTheme.cardBorder,
        backgroundColor: activeTheme.readingBg
      }}
    >
      <style>{`
        .theme-app .border-slate-100, .theme-app .border-slate-200, .theme-app [class~="border-[#E7DEC8]"] { border-color: var(--theme-border) !important; }
        .theme-app [class~="bg-white"] { background-color: color-mix(in srgb, var(--theme-reading-bg) 30%, white) !important; }
        .theme-app [class~="bg-slate-50"] { background-color: color-mix(in srgb, var(--theme-reading-bg) 65%, white) !important; }
        .theme-app [class~="bg-slate-100"] { background-color: color-mix(in srgb, var(--theme-reading-bg) 45%, var(--theme-accent) 8%) !important; }
        .theme-app [class~="text-[#173F35]"] { color: var(--theme-primary) !important; }
        .theme-app [class~="bg-[#173F35]"] { background-color: var(--theme-primary) !important; }
        .theme-app [class~="border-[#173F35]"] { border-color: var(--theme-primary) !important; }
        .theme-app [class~="text-[#D5AD59]"], .theme-app [class~="text-[#B88F3E]"] { color: var(--theme-accent) !important; }
        .theme-app [class~="bg-[#D5AD59]"] { background-color: var(--theme-accent) !important; }
        .theme-app .theme-reading-surface { background-color: var(--theme-reading-bg) !important; border-color: var(--theme-border) !important; }
        .theme-app .theme-topline { box-shadow: inset 0 3px 0 var(--theme-accent); }
        .theme-app [class~="bg-emerald-50"] { background-color: color-mix(in srgb, var(--theme-reading-bg) 70%, var(--theme-primary) 8%) !important; }
        .theme-app [class~="text-emerald-800"], .theme-app [class~="text-emerald-950"] { color: var(--theme-primary) !important; }
        .theme-app button:focus-visible, .theme-app input:focus-visible, .theme-app select:focus-visible { outline: 2px solid var(--theme-accent); outline-offset: 2px; }
      `}</style>

      {toast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-[#173F35] text-white px-5 py-2.5 rounded-full shadow-2xl border border-[#D5AD59] flex items-center space-x-2 text-xs font-bold">
          <Sparkles className="w-4 h-4 text-[#D5AD59]" />
          <span>{toast}</span>
        </div>
      )}

      <div className="w-full max-w-md mx-auto bg-white min-h-screen shadow-2xl flex flex-col relative pb-20">
        <header className="h-[74px] bg-[#173F35] border-b border-[#D5AD59]/30 px-4 flex items-center justify-between text-white shrink-0 sticky top-0 z-30 shadow-md">
          <div
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => { setActiveTab('home'); setMoreSubView(null); }}
          >
            <TransformerEmblem size="md" />
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-serif font-black tracking-widest text-lg text-white group-hover:text-[#D5AD59] transition-colors">TRANSFORMER</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#D5AD59]" />
              </div>
              <p className="text-[10px] text-[#D5AD59] font-medium tracking-wide uppercase">Faith • Discipline • Growth</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button onClick={() => { setActiveTab('more'); setMoreSubView('reminders'); }} className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/15 flex items-center justify-center text-white relative transition" title="Notifications">
              <Bell className="w-4 h-4" />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#D5AD59] ring-2 ring-[#173F35]" />
            </button>
            <button onClick={() => { setActiveTab('more'); setMoreSubView(null); }} className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#D5AD59] to-amber-200 p-[1.5px] shadow-sm hover:scale-105 transition" title="Profile">
              <div className="w-full h-full rounded-full bg-[#173F35] flex items-center justify-center text-[#D5AD59]">
                <User className="w-4 h-4" />
              </div>
            </button>
            <button onClick={handleLogout} className="rounded-full border border-[#D5AD59]/50 bg-white/10 px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#D5AD59] transition hover:bg-white/20" title="Log out">Logout</button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto no-scrollbar">
          {activeTab === 'home' && (
            <div className="space-y-4 pb-6 animate-in fade-in duration-150">
              <div className="px-4 pt-4">
                <div className="rounded-3xl overflow-hidden border border-[#E7DEC8] bg-[#F6F0E3] shadow-sm">
                  <div className="p-4 bg-[#173F35] text-white">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.18em] text-[#D5AD59]">Today</p>
                        <h2 className="mt-2 text-xl font-black font-serif">{greeting}</h2>
                      </div>
                      <button onClick={() => setActiveTab('more')} className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#D5AD59]">View plan</button>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between text-xs uppercase tracking-[0.12em] text-slate-500">
                      <span>Daily rhythm</span>
                      <span>{progressPercent}% complete</span>
                    </div>
                    <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-slate-200">
                      <div className="h-full rounded-full bg-[#173F35]" style={{ width: `${progressPercent}%` }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto h-16 bg-[#173F35] border-t border-[#D5AD59]/30 px-2 flex items-center justify-between text-white z-40 shadow-2xl">
          <button onClick={() => { setActiveTab('home'); setMoreSubView(null); }} className={`flex-1 flex flex-col items-center justify-center py-1 transition relative ${activeTab === 'home' ? 'text-[#D5AD59] font-black' : 'text-slate-300 hover:text-white'}`}>
            <Home className="w-5 h-5" />
            <span className="text-[10px] mt-0.5">Home</span>
            {activeTab === 'home' && <span className="w-6 h-0.5 bg-[#D5AD59] rounded-full absolute bottom-1" />}
          </button>
          <button onClick={() => { setActiveTab('tasks'); setMoreSubView(null); }} className={`flex-1 flex flex-col items-center justify-center py-1 transition relative ${activeTab === 'tasks' ? 'text-[#D5AD59] font-black' : 'text-slate-300 hover:text-white'}`}>
            <CheckSquare className="w-5 h-5" />
            <span className="text-[10px] mt-0.5">Tasks</span>
            {activeTab === 'tasks' && <span className="w-6 h-0.5 bg-[#D5AD59] rounded-full absolute bottom-1" />}
          </button>
          <button onClick={() => { setActiveTab('bible'); setMoreSubView(null); }} className={`flex-1 flex flex-col items-center justify-center py-1 transition relative ${activeTab === 'bible' ? 'text-[#D5AD59] font-black' : 'text-slate-300 hover:text-white'}`}>
            <BookOpen className="w-5 h-5" />
            <span className="text-[10px] mt-0.5">Bible</span>
            {activeTab === 'bible' && <span className="w-6 h-0.5 bg-[#D5AD59] rounded-full absolute bottom-1" />}
          </button>
          <button onClick={() => { setActiveTab('principles'); setMoreSubView(null); }} className={`flex-1 flex flex-col items-center justify-center py-1 transition relative ${activeTab === 'principles' ? 'text-[#D5AD59] font-black' : 'text-slate-300 hover:text-white'}`}>
            <Compass className="w-5 h-5" />
            <span className="text-[10px] mt-0.5">Principles</span>
            {activeTab === 'principles' && <span className="w-6 h-0.5 bg-[#D5AD59] rounded-full absolute bottom-1" />}
          </button>
          <button onClick={() => { setActiveTab('more'); setMoreSubView(null); }} className={`flex-1 flex flex-col items-center justify-center py-1 transition relative ${activeTab === 'more' ? 'text-[#D5AD59] font-black' : 'text-slate-300 hover:text-white'}`}>
            <MoreHorizontal className="w-5 h-5" />
            <span className="text-[10px] mt-0.5">More</span>
            {activeTab === 'more' && <span className="w-6 h-0.5 bg-[#D5AD59] rounded-full absolute bottom-1" />}
          </button>
        </nav>
      </div>
    </div>
  );
}
