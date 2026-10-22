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
  Eye,
  EyeOff
} from 'lucide-react';

// Minimal auth prototype only.
// No backend is configured in this project.
// This screen must be replaced by a real auth provider before production use.
const AUTH_SESSION_KEY = 'transformer_auth_session';

function validateLoginIdentifier(value) {
  const trimmed = (value || '').trim();
  if (!trimmed) return 'Enter your email or username.';
  if (trimmed.includes('@')) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(trimmed) ? '' : 'Use a valid email address.';
  }
  if (trimmed.length < 3 || /\s/.test(trimmed)) {
    return 'Username must be at least 3 characters and contain no spaces.';
  }
  return '';
}

function validateLoginPassword(value) {
  if (!value) return 'Password is required.';
  if (value.length < 8) return 'Password must be at least 8 characters long.';
  if ((value || '').trim() !== value) return 'Password cannot start or end with spaces.';
  return '';
}

function LoginScreen({
  loginForm,
  setLoginForm,
  showPassword,
  setShowPassword,
  loginError,
  loginLoading,
  onSubmit,
}) {
  return (
    <div className="min-h-screen bg-[#F6F0E3] text-slate-900 antialiased">
      <div className="mx-auto flex min-h-screen max-w-md items-center justify-center p-4 sm:p-6">
        <div className="w-full overflow-hidden rounded-[32px] border border-[#E7DEC8] bg-white shadow-2xl shadow-[#173F35]/10">
          <div className="bg-[#173F35] px-6 py-7 text-white">
            <div className="flex items-center gap-3">
              <TransformerEmblem size="lg" />
              <div>
                <div className="font-serif text-xl font-black tracking-[0.18em] text-[#D5AD59]">TRANSFORMER</div>
                <p className="mt-1 text-[11px] uppercase tracking-[0.22em] text-white/70">Faith • Discipline • Growth</p>
              </div>
            </div>
          </div>

          <div className="space-y-6 p-6">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#173F35]">Secure sign in</p>
              <h1 className="mt-2 font-serif text-2xl font-black text-slate-900">Welcome back</h1>
              <p className="mt-2 text-sm text-slate-600">
                No authentication backend is currently configured in this project.
                This screen is a demo UI gate only and cannot be treated as production authentication.
              </p>
            </div>

            <form onSubmit={onSubmit} className="space-y-4" noValidate>
              <div className="space-y-2">
                <label htmlFor="login-identifier" className="block text-[11px] font-bold uppercase tracking-[0.15em] text-slate-500">
                  Email or username
                </label>
                <input
                  id="login-identifier"
                  type="text"
                  value={loginForm.identifier}
                  onChange={(event) => setLoginForm((prev) => ({ ...prev, identifier: event.target.value }))}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#173F35] focus:outline-none"
                  placeholder="you@example.com or username"
                  autoComplete="username"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="login-password" className="block text-[11px] font-bold uppercase tracking-[0.15em] text-slate-500">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="login-password"
                    type={showPassword ? 'text' : 'password'}
                    value={loginForm.password}
                    onChange={(event) => setLoginForm((prev) => ({ ...prev, password: event.target.value }))}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 pr-11 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#173F35] focus:outline-none"
                    placeholder="Enter your password"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    className="absolute inset-y-0 right-3 flex items-center text-slate-500 hover:text-[#173F35]"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {loginError && (
                <div className="rounded-2xl border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700" role="alert">
                  {loginError}
                </div>
              )}

              <button
                type="submit"
                disabled={loginLoading}
                className="w-full rounded-2xl bg-[#173F35] px-4 py-3 text-sm font-black text-[#D5AD59] transition hover:bg-[#1f4e42] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loginLoading ? 'Signing in...' : 'Log in'}
              </button>
            </form>

            <div className="rounded-2xl border border-[#E7DEC8] bg-[#F6F0E3] p-3 text-xs leading-relaxed text-slate-700">
              <strong className="font-black text-[#173F35]">Important:</strong> This demo gate is intentionally not secure until a real authentication backend is connected.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TransformerEmblem({ size = 'md', showBorder = true }) {
  const dim = size === 'lg' ? 'w-14 h-14' : size === 'sm' ? 'w-8 h-8' : 'w-10 h-10';
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
        <circle cx="50" cy="32" r="32" fill="url(#crossGlow)" />
        <path d="M0,68 L25,48 L50,65 L75,44 L100,68 L100,100 L0,100 Z" fill="#0D2B24" />
        <path d="M15,75 L38,58 L62,72 L85,55 L100,78 L100,100 L0,100 Z" fill="#071915" />
        <g fill="url(#goldMetallic)">
          <rect x="47.5" y="14" width="5" height="30" rx="1" filter="drop-shadow(0 0 3px #FFFBEB)" />
          <rect x="39" y="22" width="22" height="4.5" rx="1" filter="drop-shadow(0 0 3px #FFFBEB)" />
        </g>
        <g fill="#173F35">
          <line x1="28" y1="52" x2="28" y2="76" stroke="#D5AD59" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="23" cy="56" r="3.5" fill="#D5AD59" />
          <path d="M19,60 C21,57 26,57 28,60 L29,74 L17,74 Z" fill="#D5AD59" opacity="0.9" />
          <circle cx="15" cy="67" r="3" fill="#FEF08A" filter="drop-shadow(0 0 2px #F59E0B)" />
          <rect x="14" y="65" width="2" height="4" fill="#78350F" />
        </g>
        <g transform="translate(26, 75) scale(0.48)">
          <path d="M5,22 Q25,8 45,22 Q65,8 85,22 L85,34 Q65,20 45,34 Q25,20 5,34 Z" fill="url(#goldMetallic)" />
          <path d="M45,20 C42,12 40,5 45,0 C50,5 48,12 45,20 Z" fill="#FFFBEB" />
          <path d="M45,15 C48,11 53,8 57,8 C54,12 50,15 45,17 Z" fill="#FDE68A" />
        </g>
      </svg>
    </div>
  );
}

const THEMES = [
  { dayIndex: 0, dayName: 'Sunday', themeName: 'Midnight Blue & Silver', purpose: 'Faith, Rest, and Gratitude', primary: '#0F172A', accent: '#94A3B8', readingBg: '#F8FAFC', cardBorder: '#E2E8F0', swatches: ['#0F172A', '#94A3B8', '#FFFFFF'], scenicType: 'night', verse: { ref: 'Psalm 27:14 · KJV', text: '“Wait on the LORD: be of good courage, and he shall strengthen thine heart: wait, I say, on the LORD.”', meaning: 'Rest in His quiet assurance and divine strength.', application: 'Quiet your anxious heart and surrender control into His capable hands.' }, principles: [10, 7, 3], song: { titleEn: 'Ente Daivam Swargathilundu', titleMl: 'എന്റെ ദൈവം സ്വർഗ്ഗത്തിലുണ്ട്', artist: 'Pr. Blesson Memana', theme: 'Faith & Resting in God' } },
  { dayIndex: 1, dayName: 'Monday', themeName: 'Forest & Gold', purpose: 'Growth and New Beginnings', primary: '#173F35', accent: '#D5AD59', readingBg: '#F6F0E3', cardBorder: '#E7DEC8', swatches: ['#173F35', '#D5AD59', '#F6F0E3'], scenicType: 'forest', verse: { ref: 'Isaiah 22:22 · KJV', text: '“And the key of the house of David will I lay upon his shoulder; so he shall open, and none shall shut; and he shall shut, and none shall open.”', meaning: 'The Lord holds sovereign authority over your open doors, career, and every season of life.', application: 'Trust that God has prepared the way for you this week. Step forward with bold confidence.' }, principles: [1, 9, 8], song: { titleEn: 'Aathmavin Shakthiyode', titleMl: 'ആത്മാവിൻ ശക്തിയോടെ', artist: 'Pr. Blesson Memana', theme: 'Spiritual Renewal & Empowerment' } },
  { dayIndex: 2, dayName: 'Tuesday', themeName: 'Ocean Blue', purpose: 'Peace and Trust', primary: '#0F2C59', accent: '#38BDF8', readingBg: '#F0F9FF', cardBorder: '#BAE6FD', swatches: ['#0F2C59', '#38BDF8', '#FFFFFF'], scenicType: 'ocean', verse: { ref: 'Psalm 46:10 · KJV', text: '“Be still, and know that I am God: I will be exalted among the heathen, I will be exalted in the earth.”', meaning: 'God is in command; striving in anxiety produces no lasting fruit.', application: 'Take five minutes of silence during your busiest study hour to acknowledge His peace.' }, principles: [11, 5, 4], song: { titleEn: 'Athiparin Maravil', titleMl: 'അതിപരന്റെ മറവിലിരിക്കും ഞാൻ', artist: 'Lordson Antony', theme: 'Safety & Trust in God' } },
  { dayIndex: 3, dayName: 'Wednesday', themeName: 'Lavender', purpose: 'Reflection and Wisdom', primary: '#581C87', accent: '#C084FC', readingBg: '#FAF5FF', cardBorder: '#E9D5FF', swatches: ['#581C87', '#C084FC', '#FFFFFF'], scenicType: 'lavender', verse: { ref: 'Proverbs 3:5–6 · KJV', text: '“Trust in the LORD with all thine heart; and lean not unto thine own understanding. In all thy ways acknowledge him, and he shall direct thy paths.”', meaning: 'Human wisdom is finite; God provides clear guidance when we yield our will to Him.', application: 'Pray before making a choice today, committing the outcome completely to the Lord.' }, principles: [3, 2, 7], song: { titleEn: 'Nanma Niranja Vane', titleMl: 'നന്മ നിറഞ്ഞവനേ എന്റെ യേശു നാഥാ', artist: 'Dr. Blesson Memana', theme: 'Gratitude & Divine Mercy' } },
  { dayIndex: 4, dayName: 'Thursday', themeName: 'Sunrise Peach', purpose: 'Motivation and Action', primary: '#9A3412', accent: '#FB923C', readingBg: '#FFF7ED', cardBorder: '#FFEDD5', swatches: ['#9A3412', '#FB923C', '#FFFDF9'], scenicType: 'sunrise', verse: { ref: 'Colossians 3:23 · KJV', text: '“And whatsoever ye do, do it heartily, as to the Lord, and not unto men; Knowing that of the Lord ye shall receive the reward of the inheritance: for ye serve the Lord Christ.”', meaning: 'Every daily duty, study assignment, or job task is a direct offering of worship to Christ.', application: 'Give wholehearted diligence to your most tedious responsibility today.' }, principles: [4, 11, 9], song: { titleEn: 'Yahova Ente Idayan', titleMl: 'യഹോവ എന്റെ ഇടയനാകുന്നു', artist: 'Immanuel Ministries', theme: 'Provision & Heavenly Guidance' } },
  { dayIndex: 5, dayName: 'Friday', themeName: 'Amber & Brown', purpose: 'Discipline and Strength', primary: '#451A03', accent: '#D97706', readingBg: '#FFFBEB', cardBorder: '#FDE68A', swatches: ['#451A03', '#D97706', '#FFFDF5'], scenicType: 'amber', verse: { ref: 'Proverbs 4:25–27 · KJV', text: '“Let thine eyes look right on, and let thine eyelids look straight before thee. Ponder the path of thy feet, and let all thy ways be established.”', meaning: 'Distraction is the enemy of spiritual and personal growth. Fix your focus on worthwhile goals.', application: 'Turn off notification pings and finish one key project without interruption.' }, principles: [5, 10, 1], song: { titleEn: 'Krooshile Snehame', titleMl: 'ക്രൂശിലെ സ്നേഹമോർക്കുമ്പോൾ', artist: 'Pr. Reji Narayanan', theme: 'The Love of Calvary' } },
  { dayIndex: 6, dayName: 'Saturday', themeName: 'Teal & Mint', purpose: 'Renewal and Balance', primary: '#134E4A', accent: '#2DD4BF', readingBg: '#F0FDFA', cardBorder: '#CCFBF1', swatches: ['#134E4A', '#2DD4BF', '#FFFFFF'], scenicType: 'teal', verse: { ref: 'James 2:17 · KJV', text: '“Even so faith, if it hath not works, is dead, being alone.”', meaning: 'Genuine spiritual conviction expresses itself through practical, consistent discipline.', application: 'Convert good intentions into action: start that postponed assignment or chore today.' }, principles: [8, 12, 11], song: { titleEn: 'Anugrahathinte Uravakal', titleMl: 'അനുഗ്രഹത്തിന്റെ ഉറവകളെ', artist: 'Classical Pentecostal Hymn', theme: 'Spiritual Revivals & Blessings' } }
];

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

const EXPANDED_BIBLE_BOOKS = [
  { id: 'isaiah22', nameEn: 'Isaiah 22', nameMl: 'യെശയ്യാവ് 22', testament: 'OT', topic: 'Divine Authority & The Key of David', verses: [{ num: 20, en: 'And it shall come to pass in that day, that I will call my servant Eliakim the son of Hilkiah:', ml: 'അന്നാളിൽ ഞാൻ ഹിൽക്കീയാവിന്റെ മകനായ എല്യാക്കീം എന്ന എന്റെ ദാസനെ വിളിക്കും.' }, { num: 21, en: 'And I will clothe him with thy robe, and strengthen him with thy girdle, and I will commit thy government into his hand: and he shall be a father to the inhabitants of Jerusalem, and to the house of Judah.', ml: 'ഞാൻ അവനെ നിന്റെ അങ്കി ധരിപ്പിച്ചു നിന്റെ കച്ചകൊണ്ടു അവനെ ഉറപ്പിച്ചു; ഞാൻ അവന്റെ കൈയിൽ നിന്റെ ഭരണം കൊടുക്കും; അവൻ എരുസലേംവാസികളോടും യെഹൂദാസനങ്ങളോടും ഒരു പിതാവാകും.' }, { num: 22, en: 'And the key of the house of David will I lay upon his shoulder; so he shall open, and none shall shut; and he shall shut, and none shall open.', ml: 'ഞാൻ ദാവീദിന്റെ വാസസ്ഥലത്തിന്റെ താക്കോൽ അവന്റെ തോളിൽ വെക്കും; അവൻ തുറന്നാൽ ആരും അടയ്ക്കുകയില്ല; അടച്ചാൽ ആരും തുറക്കുകയില്ല.' }, { num: 23, en: 'And I will fasten him as a nail in a sure place; and he shall be for a glorious throne to his father’s house.', ml: 'ഞാൻ അവനെ ഉറപ്പുള്ള സ്ഥലത്തു ഒരു ആണിയായി തറെക്കും; അവൻ തന്റെ പിതൃഭവനത്തിന്റെ ബഹുമാനപൂർവ്വം നിറഞ്ഞ സിംഹാസനമായിരിക്കും.' }] },
  { id: 'proverbs3', nameEn: 'Proverbs 3', nameMl: 'സദൃശവാക്യങ്ങൾ 3', testament: 'OT', topic: 'Wholehearted Trust & Divine Direction', verses: [{ num: 1, en: 'My son, forget not my law; but let thine heart keep my commandments:', ml: 'മകനേ, എന്റെ ഉപദേശം മറക്കരുതു; നിന്റെ ഹൃദയം എന്റെ കല്പനകളെ സൂക്ഷിക്കട്ടെ.' }, { num: 2, en: 'For length of days, and long life, and peace, shall they add to thee.', ml: 'അവ ദീർഘായുസ്സും ജീവകാലവും സമാധാനവും നിനക്കു കൂട്ടിച്ചേർക്കും.' }, { num: 5, en: 'Trust in the LORD with all thine heart; and lean not unto thine own understanding.', ml: 'പൂർണ്ണഹൃദയത്തോടെ യഹോവയിൽ ആശ്രയിക്ക; നിന്റെ സ്വയം മനസ്സിന്റെ ബുദ്ധിയിലേക്കു ചുമരണ്ടു പോകരുത്.' }, { num: 6, en: 'In all thy ways acknowledge him, and he shall direct thy paths.', ml: 'നിന്റെ എല്ലാ വഴികളിലും അവനെക്കുറിച്ചു ഓർമ്മിക്ക; അവൻ നിന്റെ പാതകൾ നേരെ നടത്തും.' }] },
  { id: 'proverbs4', nameEn: 'Proverbs 4', nameMl: 'സദൃശവാക്യങ്ങൾ 4', testament: 'OT', topic: 'Guarding Your Heart & Unshakable Focus', verses: [{ num: 23, en: 'Keep thy heart with all diligence; for out of it are the issues of life.', ml: 'സകല ജാഗ്രതയോടും നിന്റെ ഹൃദയം സൂക്ഷിക്ക; കാരണം അതിൽ നിന്നാണ് ജീവന്റെ സ്രോതസുകൾ വരുന്നതു.' }, { num: 25, en: 'Let thine eyes look right on, and let thine eyelids look straight before thee.', ml: 'നിന്റെ കണ്ണ് നേരെ നോക്കട്ടെ; നിന്റെ കപോൾ നേരെ മുന്നിലേക്കു നോക്കട്ടെ.' }, { num: 26, en: 'Ponder the path of thy feet, and let all thy ways be established.', ml: 'നിന്റെ കാലിന്റെ പാതയെ കുറിച്ച് ചിന്തിക്ക; നിന്റെ എല്ലാ വഴികളും ഉറപ്പാക്കപ്പെട്ടിരിക്കട്ടെ.' }, { num: 27, en: 'Turn not to the right hand nor to the left: remove thy foot from evil.', ml: 'വലതുഭാഗത്തേക്കോ ഇടതുഭാഗത്തേക്കോ തിരിഞ്ഞുപോകരുത്; നിന്റെ കാൽ തിന്മയിൽ നിന്ന് നീക്കിക്കൾക്കൂ.' }] }
];

function getLocalDateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      return sessionStorage.getItem(AUTH_SESSION_KEY) === 'true';
    } catch {
      return false;
    }
  });
  const [loginForm, setLoginForm] = useState({ identifier: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  useEffect(() => {
    try {
      sessionStorage.setItem(AUTH_SESSION_KEY, String(isAuthenticated));
    } catch {}
  }, [isAuthenticated]);

  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    const identifierError = validateLoginIdentifier(loginForm.identifier);
    const passwordError = validateLoginPassword(loginForm.password);
    const nextError = identifierError || passwordError;

    if (nextError) {
      setLoginError(nextError);
      return;
    }

    setLoginLoading(true);
    setLoginError('');
    await new Promise((resolve) => setTimeout(resolve, 300));
    setLoginLoading(false);
    setIsAuthenticated(true);
    setLoginForm({ identifier: '', password: '' });
    setShowPassword(false);
  };

  const [clockNow, setClockNow] = useState(() => new Date());
  const todayKey = getLocalDateKey(clockNow);
  const greeting = clockNow.getHours() < 12 ? 'Good morning!' : clockNow.getHours() < 17 ? 'Good afternoon!' : clockNow.getHours() < 21 ? 'Good evening!' : 'Good night!';

  useEffect(() => {
    const refreshClock = () => setClockNow(new Date());
    const timer = window.setInterval(refreshClock, 30_000);
    window.addEventListener('focus', refreshClock);
    document.addEventListener('visibilitychange', refreshClock);
    return () => {
      window.clearInterval(timer);
      window.removeEventListener('focus', refreshClock);
      document.removeEventListener('visibilitychange', refreshClock);
    };
  }, []);

  const [activeTab, setActiveTab] = useState('home');
  const [moreSubView, setMoreSubView] = useState(null);

  const handleLogout = () => {
    setIsAuthenticated(false);
    setLoginForm({ identifier: '', password: '' });
    setLoginError('');
    setShowPassword(false);
    setMoreSubView(null);
    setActiveTab('home');
  };

  const [autoTheme, setAutoTheme] = useState(() => {
    try { return localStorage.getItem('transformer_auto_theme') !== 'false'; } catch { return true; }
  });
  const [manualThemeIndex, setManualThemeIndex] = useState(() => {
    try {
      const n = Number(localStorage.getItem('transformer_manual_theme'));
      return Number.isInteger(n) && n >= 0 && n < THEMES.length ? n : 1;
    } catch { return 1; }
  });

  useEffect(() => {
    try {
      localStorage.setItem('transformer_auto_theme', String(autoTheme));
      localStorage.setItem('transformer_manual_theme', String(manualThemeIndex));
    } catch {}
  }, [autoTheme, manualThemeIndex]);

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

  useEffect(() => {
    try { localStorage.setItem('transformer_reminders', JSON.stringify(reminders)); localStorage.setItem('transformer_notifications_enabled', String(notificationsEnabled)); } catch {}
  }, [reminders, notificationsEnabled]);

  useEffect(() => {
    if (!isNative()) return;
    nativePermissionStatus().then((p) => setNotificationPermission(p === 'granted' ? 'granted' : p === 'denied' ? 'denied' : 'default'));
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
      if (permission === 'granted') { setNotificationsEnabled(true); showToast('Notifications enabled while Transformer is open.'); new Notification('Transformer reminders enabled', { body: 'You are ready to keep your daily rhythm with gentle prompts.' }); }
      else { setNotificationsEnabled(false); showToast('Notifications were not allowed. Enable them in your browser settings.'); }
    } catch { showToast('Could not enable notifications in this browser.'); }
  };

  useEffect(() => {
    if (isNative() || !notificationsEnabled || notificationPermission !== 'granted') return undefined;
    const checkReminders = () => {
      const now = new Date();
      const dateKey = getLocalDateKey(now);
      const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      reminders.forEach((reminder) => {
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
      return THEMES.find((t) => t.dayIndex === today) || THEMES[1];
    }
    return THEMES[manualThemeIndex] || THEMES[1];
  }, [autoTheme, manualThemeIndex, clockNow]);

  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem('transformer_tasks');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [
      { id: '1', title: 'Morning prayer & Bible reading', time: '6:30 AM', deadline: '7:30 AM', category: 'Faith & Prayer', priority: 'High', principleId: 1, completed: true, date: todayKey },
      { id: '2', title: 'Study Nursing Foundation chapter 4', time: '9:00 AM', deadline: '11:30 AM', category: 'Studies', priority: 'High', principleId: 4, completed: false, date: todayKey },
      { id: '3', title: 'Complete pharmacology clinical notes', time: '2:00 PM', deadline: '4:00 PM', category: 'Assignments', priority: 'Medium', principleId: 8, completed: false, date: todayKey },
      { id: '4', title: 'Evening reflection & next day plan', time: '8:00 PM', deadline: '9:00 PM', category: 'Personal Dev', priority: 'Low', principleId: 9, completed: false, date: todayKey }
    ];
  });

  useEffect(() => {
    try { localStorage.setItem('transformer_tasks', JSON.stringify(tasks)); } catch {}
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
    } catch {}
    return [{ id: 'j1', date: todayKey, title: 'Beginning the week with God', category: 'Reflection', reflection: 'Lord, give me strength to stay consistent with clinical duties and guard my time from distractions.', prayer: 'Praying for wisdom in studies and peace at home.', gratitude: 'Grateful for good health, family, and open doors.' }];
  });

  useEffect(() => {
    try { localStorage.setItem('transformer_journal', JSON.stringify(journalEntries)); } catch {}
  }, [journalEntries]);

  const [questionAnswers, setQuestionAnswers] = useState(() => {
    try {
      const saved = localStorage.getItem('transformer_questions');
      if (saved) return JSON.parse(saved);
    } catch {}
    return { q1_task1: 'Complete Nursing Foundation chapter 4', q1_task2: 'Pharmacology clinical notes', q1_task3: 'Evening family prayer', q2_faithTime: 'Yes, 6:30 AM prayer completed', q3_distraction: 'Endless short video scrolling during breaks', q4_progress: 'Finished morning study module', q5_reflection: 'Accomplished morning routine; tomorrow begins with clinical posting.' };
  });

  useEffect(() => {
    try { localStorage.setItem('transformer_questions', JSON.stringify(questionAnswers)); } catch {}
  }, [questionAnswers]);

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
        if (!cancelled) setFullBibleVerses(data.verses.map((v) => ({ num: v.verse, en: String(v.text || '').trim() })));
      } catch {
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

  const todayTasks = tasks.filter((t) => t.date === todayKey);
  const completedToday = todayTasks.filter((t) => t.completed).length;
  const totalToday = todayTasks.length;
  const progressPercent = totalToday > 0 ? Math.round((completedToday / totalToday) * 100) : 0;

  const filteredVerses = useMemo(() => {
    if (!bibleSearchQuery.trim()) return selectedBook.verses;
    const q = bibleSearchQuery.toLowerCase();
    return selectedBook.verses.filter((v) => v.en.toLowerCase().includes(q) || v.ml.toLowerCase().includes(q));
  }, [selectedBook, bibleSearchQuery]);

  const toggleTask = (id) => {
    setTasks((prev) => prev.map((t) => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  if (!isAuthenticated) {
    return (
      <LoginScreen
        loginForm={loginForm}
        setLoginForm={setLoginForm}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        loginError={loginError}
        loginLoading={loginLoading}
        onSubmit={handleLoginSubmit}
      />
    );
  }

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
    setTasks((prev) => [newTask, ...prev]);
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

    setTasks((prev) => [...created, ...prev]);
    showToast('Priorities pushed directly into Tasks!');
  };

  const copyEmail = () => {
    navigator.clipboard?.writeText('jestinp843@gmail.com');
    showToast('Email jestinp843@gmail.com copied to clipboard!');
  };

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
    setVerseHighlights((prev) => ({ ...prev, [verseKey]: nextColor }));
    showToast(nextColor ? `Highlighted in ${nextColor}` : 'Highlight cleared');
  };

  const renderHomeSection = () => (
    <div className="space-y-4 pb-6 animate-in fade-in duration-150">
      <section className="px-4 pt-4">
        <div className="rounded-[28px] border border-[#E7DEC8] bg-gradient-to-br from-[#173F35] via-[#1a463f] to-[#0f2b2a] p-4 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.22em] text-[#D5AD59]">Today</p>
              <h2 className="mt-2 font-serif text-3xl font-black">{greeting}</h2>
            </div>
            <div className="rounded-2xl bg-white/10 px-3 py-2 text-right">
              <p className="text-[10px] uppercase tracking-[0.18em] text-[#D5AD59]">Theme</p>
              <p className="mt-1 text-sm font-bold">{activeTheme.dayName}</p>
            </div>
          </div>
          <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-3">
            <p className="text-[10px] uppercase tracking-[0.18em] text-[#D5AD59]">Focus verse</p>
            <p className="mt-2 text-sm font-medium text-white/90">{activeTheme.verse.ref}</p>
            <p className="mt-2 text-sm leading-relaxed text-white/90">{activeTheme.verse.text}</p>
          </div>
        </div>
      </section>

      <section className="px-4">
        <div className="rounded-[24px] border border-[#E7DEC8] bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Progress</p>
              <h3 className="mt-1 text-xl font-black text-[#173F35]">Daily rhythm</h3>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-[#173F35]/5 px-3 py-1.5 text-xs font-bold text-[#173F35]">
              <CheckCircle2 className="h-4 w-4 text-[#173F35]" />
              {progressPercent}%
            </div>
          </div>
          <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-100">
            <div className="h-full rounded-full bg-[#D5AD59]" style={{ width: `${progressPercent}%` }} />
          </div>
          <div className="mt-3 flex items-center justify-between text-xs text-slate-600">
            <span>{completedToday} of {totalToday} tasks complete</span>
            <button className="font-bold text-[#173F35]" onClick={() => setActiveTab('tasks')}>Open tasks</button>
          </div>
        </div>
      </section>

      <section className="px-4">
        <div className="rounded-[24px] border border-[#E7DEC8] bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-black text-[#173F35]">Priority tasks</h3>
            <button onClick={() => setIsTaskModalOpen(true)} className="inline-flex items-center gap-1 rounded-full bg-[#173F35] px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#D5AD59]">
              <Plus className="h-3.5 w-3.5" /> Add
            </button>
          </div>
          <div className="mt-3 space-y-2">
            {todayTasks.slice(0, 3).map((task) => (
              <button key={task.id} onClick={() => toggleTask(task.id)} className="flex w-full items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3 text-left transition hover:border-[#D5AD59] hover:bg-white">
                <div className={`flex h-5 w-5 items-center justify-center rounded-full border ${task.completed ? 'border-[#173F35] bg-[#173F35]' : 'border-slate-300'}`}>
                  {task.completed && <Check className="h-3 w-3 text-white" />}
                </div>
                <div className="min-w-0 flex-1">
                  <p className={`truncate text-sm font-semibold ${task.completed ? 'text-slate-400 line-through' : 'text-slate-800'}`}>{task.title}</p>
                  <p className="text-[11px] text-slate-500">{task.time}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4">
        <div className="rounded-[24px] border border-[#E7DEC8] bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-black text-[#173F35]">Daily principles</h3>
            <button onClick={() => setActiveTab('principles')} className="text-xs font-bold text-[#173F35]">View all</button>
          </div>
          <div className="mt-3 space-y-2">
            {activeTheme.principles.map((principleId) => {
              const principle = ALL_PRINCIPLES.find((p) => p.id === principleId);
              if (!principle) return null;
              return (
                <div key={principle.id} className="rounded-2xl border border-[#E7DEC8] bg-[#F6F0E3] p-3">
                  <p className="text-[10px] uppercase tracking-[0.16em] text-[#173F35]">Principle {principle.id}</p>
                  <p className="mt-1 font-bold text-slate-900">{principle.title}</p>
                  <p className="mt-1 text-sm text-slate-600">{principle.meaning}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );

  const renderTasksSection = () => (
    <div className="space-y-4 p-4 pb-28">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">Tasks</p>
          <h2 className="text-2xl font-black text-[#173F35]">Today’s rhythm</h2>
        </div>
        <button onClick={() => setIsTaskModalOpen(true)} className="rounded-full bg-[#173F35] p-2 text-[#D5AD59]">
          <Plus className="h-5 w-5" />
        </button>
      </div>

      <div className="space-y-3">
        {tasks.map((task) => (
          <button key={task.id} onClick={() => toggleTask(task.id)} className="flex w-full items-center gap-3 rounded-[22px] border border-[#E7DEC8] bg-white p-3 text-left shadow-sm">
            <div className={`flex h-5 w-5 items-center justify-center rounded-full border ${task.completed ? 'border-[#173F35] bg-[#173F35]' : 'border-slate-300'}`}>
              {task.completed && <Check className="h-3 w-3 text-white" />}
            </div>
            <div className="min-w-0 flex-1">
              <p className={`truncate text-sm font-bold ${task.completed ? 'text-slate-400 line-through' : 'text-slate-800'}`}>{task.title}</p>
              <p className="text-[11px] text-slate-500">{task.category} • {task.time}</p>
            </div>
            <span className={`rounded-full px-2 py-1 text-[10px] font-bold uppercase tracking-[0.12em] ${task.priority === 'High' ? 'bg-red-100 text-red-700' : task.priority === 'Medium' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
              {task.priority}
            </span>
          </button>
        ))}
      </div>
    </div>
  );

  const renderBibleSection = () => (
    <div className="space-y-4 p-4 pb-28">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">Bible</p>
          <h2 className="text-2xl font-black text-[#173F35]">Scripture time</h2>
        </div>
        <button onClick={() => setMoreSubView('bibleBridge')} className="rounded-full bg-[#173F35] px-3 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#D5AD59]">Read</button>
      </div>

      <div className="rounded-[24px] border border-[#E7DEC8] bg-white p-4 shadow-sm">
        <div className="flex items-center gap-2">
          <Search className="h-4 w-4 text-[#173F35]" />
          <input value={bibleSearchQuery} onChange={(e) => setBibleSearchQuery(e.target.value)} placeholder="Search this passage" className="w-full bg-transparent text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none" />
        </div>
      </div>

      <div className="rounded-[24px] border border-[#E7DEC8] bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.16em] text-slate-500">Selected passage</p>
            <h3 className="mt-1 text-lg font-black text-[#173F35]">{selectedBook.nameEn}</h3>
          </div>
          <div className="flex gap-2">
            {['bilingual', 'en', 'ml'].map((mode) => (
              <button key={mode} onClick={() => setBibleLanguage(mode)} className={`rounded-full px-2 py-1 text-[10px] font-bold uppercase tracking-[0.12em] ${bibleLanguage === mode ? 'bg-[#173F35] text-[#D5AD59]' : 'bg-slate-100 text-slate-600'}`}>
                {mode}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 space-y-3">
          {filteredVerses.map((verse) => (
            <div key={`${selectedBook.id}-${verse.num}`} className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">Verse {verse.num}</span>
                <button onClick={() => cycleHighlight(`${selectedBook.id}-${verse.num}`)} className="rounded-full bg-[#173F35]/5 px-2 py-1 text-[10px] font-bold text-[#173F35]">Highlight</button>
              </div>
              {(bibleLanguage === 'bilingual' || bibleLanguage === 'en') && <p className="text-sm leading-relaxed text-slate-800">{verse.en}</p>}
              {(bibleLanguage === 'bilingual' || bibleLanguage === 'ml') && <p className="mt-2 text-sm leading-relaxed text-slate-600">{verse.ml}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPrinciplesSection = () => (
    <div className="space-y-4 p-4 pb-28">
      <div>
        <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">Principles</p>
        <h2 className="text-2xl font-black text-[#173F35]">The Transforming habits</h2>
      </div>
      <div className="space-y-3">
        {ALL_PRINCIPLES.map((principle) => (
          <button key={principle.id} onClick={() => setActivePrincipleModal(principle)} className="w-full rounded-[24px] border border-[#E7DEC8] bg-white p-4 text-left shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[10px] uppercase tracking-[0.16em] text-[#173F35]">Principle {principle.id}</p>
                <h3 className="mt-1 text-lg font-black text-slate-900">{principle.title}</h3>
              </div>
              <ArrowRight className="h-4 w-4 text-[#173F35]" />
            </div>
            <p className="mt-2 text-sm text-slate-600">{principle.meaning}</p>
          </button>
        ))}
      </div>
    </div>
  );

  const renderMoreSection = () => {
    if (moreSubView === 'feedback') {
      return (
        <div className="space-y-4 p-4 pb-28">
          <div className="flex items-center gap-2">
            <button onClick={() => setMoreSubView(null)} className="rounded-full bg-slate-100 p-2 text-slate-700"><ChevronLeft className="h-4 w-4" /></button>
            <h2 className="text-2xl font-black text-[#173F35]">Feedback</h2>
          </div>

          <div className="rounded-[24px] border border-[#E7DEC8] bg-white p-4 shadow-sm">
            <label className="block text-[10px] uppercase tracking-[0.18em] text-slate-500">Category</label>
            <select value={feedbackCategory} onChange={(e) => setFeedbackCategory(e.target.value)} className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm focus:outline-none">
              <option>Feature suggestion</option>
              <option>Bug report</option>
              <option>General feedback</option>
              <option>Spiritual encouragement</option>
            </select>

            <label className="mt-4 block text-[10px] uppercase tracking-[0.18em] text-slate-500">Rating</label>
            <div className="mt-2 flex gap-2">
              {[1,2,3,4,5].map((value) => (
                <button key={value} onClick={() => setFeedbackRating(value)} className={`h-10 w-10 rounded-full font-black ${feedbackRating >= value ? 'bg-[#173F35] text-[#D5AD59]' : 'bg-slate-100 text-slate-500'}`}>
                  {value}
                </button>
              ))}
            </div>

            <label className="mt-4 block text-[10px] uppercase tracking-[0.18em] text-slate-500">Message</label>
            <textarea value={feedbackMessage} onChange={(e) => setFeedbackMessage(e.target.value)} rows={6} className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm focus:outline-none" placeholder="Tell us what is working well or what could improve." />

            <button onClick={handleFeedbackSubmit} className="mt-4 w-full rounded-2xl bg-[#173F35] px-4 py-3 text-sm font-black text-[#D5AD59]">Send feedback</button>
          </div>
        </div>
      );
    }

    if (moreSubView === 'reminders') {
      return (
        <div className="space-y-4 p-4 pb-28">
          <div className="flex items-center gap-2">
            <button onClick={() => setMoreSubView(null)} className="rounded-full bg-slate-100 p-2 text-slate-700"><ChevronLeft className="h-4 w-4" /></button>
            <h2 className="text-2xl font-black text-[#173F35]">Reminders</h2>
          </div>

          <div className="space-y-3 rounded-[24px] border border-[#E7DEC8] bg-white p-4 shadow-sm">
            {reminders.map((reminder) => (
              <div key={reminder.id} className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3">
                <div>
                  <p className="font-bold text-slate-900">{reminder.title}</p>
                  <p className="text-xs text-slate-500">{reminder.time}</p>
                </div>
                <button onClick={() => setReminders((prev) => prev.map((item) => item.id === reminder.id ? { ...item, enabled: !item.enabled } : item))} className={`rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] ${reminder.enabled ? 'bg-[#173F35] text-[#D5AD59]' : 'bg-slate-200 text-slate-600'}`}>
                  {reminder.enabled ? 'On' : 'Off'}
                </button>
              </div>
            ))}
            <button onClick={enableNotifications} className="mt-2 w-full rounded-2xl bg-[#173F35] px-4 py-3 text-sm font-black text-[#D5AD59]">{notificationsEnabled ? 'Refresh notifications' : 'Enable notifications'}</button>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-4 p-4 pb-28">
        <div>
          <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">More</p>
          <h2 className="text-2xl font-black text-[#173F35]">Personal growth</h2>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {[
            ['Reminders', 'reminders', Bell],
            ['Questions', 'questions', FileText],
            ['Bible', 'bibleBridge', BookOpen],
            ['Principles', 'principles', Compass],
            ['Calendar', 'calendar', CalendarIcon],
            ['Feedback', 'feedback', MessageSquare],
          ].map(([label, view, Icon]) => (
            <button key={view} onClick={() => setMoreSubView(view)} className="rounded-[24px] border border-[#E7DEC8] bg-white p-4 text-left shadow-sm">
              <Icon className="h-5 w-5 text-[#173F35]" />
              <p className="mt-3 text-sm font-black text-slate-900">{label}</p>
            </button>
          ))}
        </div>
      </div>
    );
  };

  const renderMainContent = () => {
    switch (activeTab) {
      case 'home':
        return renderHomeSection();
      case 'tasks':
        return renderTasksSection();
      case 'bible':
        return renderBibleSection();
      case 'principles':
        return renderPrinciplesSection();
      case 'more':
        return renderMoreSection();
      default:
        return renderHomeSection();
    }
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
          <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => { setActiveTab('home'); setMoreSubView(null); }}>
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

        <div className="flex-1 overflow-y-auto no-scrollbar">{renderMainContent()}</div>

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
