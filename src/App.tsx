import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  Layers, 
  Sparkles, 
  Music, 
  History, 
  HelpCircle, 
  Search, 
  Flame, 
  ExternalLink, 
  X, 
  ArrowRight,
  TrendingUp,
  Award,
  Globe,
  Share2,
  Download,
  Image as ImageIcon,
  FileText,
  Check,
  Heart,
  Smile,
  Compass,
  Zap,
  Info
} from 'lucide-react';

import { 
  MEME_GALLERY, 
  TIMELINE, 
  RELATED_MEMES, 
  SLANG_DICTIONARY, 
  FAQS, 
  AI_BUSSIN_CATS, 
  heroImg 
} from './data';
import { RelatedMeme, SlangWord } from './types';
import MemeCard from './components/MemeCard';
import MemeGenerator from './components/MemeGenerator';
import Soundboard from './components/Soundboard';

type ViewType = 'bussin-cat' | 'gallery' | 'origin' | 'templates' | 'interactive' | 'ai-slang' | 'faq-download' | 'privacy' | 'terms';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>(() => {
    const rootEl = document.getElementById('root');
    const dataPage = rootEl?.getAttribute('data-page') as ViewType | null;
    return dataPage && ['bussin-cat', 'gallery', 'origin', 'templates', 'interactive', 'ai-slang', 'faq-download', 'privacy', 'terms'].includes(dataPage)
      ? dataPage
      : 'bussin-cat';
  });
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedMemeModal, setSelectedMemeModal] = useState<RelatedMeme | null>(null);
  const [selectedSlangModal, setSelectedSlangModal] = useState<SlangWord | null>(null);
  const [shareToast, setShareToast] = useState<boolean>(false);

  // Cat Mood Generator States
  const [generatedMood, setGeneratedMood] = useState<{
    id: number;
    title: string;
    mood: string;
    food: string;
    reaction: string;
    emoji: string;
    bussinPercent: number;
  } | null>(null);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);

  // FAQ expanded states
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const navigateTo = (view: ViewType) => {
    const filename = view === 'bussin-cat' ? 'index' : view;
    window.location.href = `./${filename}.html`;
  };

  // Extract all unique tags for filter pills
  const allTags = Array.from(
    new Set(MEME_GALLERY.flatMap((item) => item.tags))
  );

  // Filter gallery based on search query and selected tag
  const filteredGallery = MEME_GALLERY.filter((item) => {
    const matchesSearch = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesTag = selectedTag ? item.tags.includes(selectedTag) : true;
    return matchesSearch && matchesTag;
  });

  const handleShareWiki = () => {
    navigator.clipboard.writeText(window.location.href);
    setShareToast(true);
    setTimeout(() => setShareToast(false), 2500);
  };

  const handleGenerateMood = () => {
    setIsSpinning(true);
    setGeneratedMood(null);

    const catNames = [
      'Garnet the Salmon Lover', 'Whiskers the Swaglord', 'Meowtron 3000', 
      'Princess Buttercup', 'Sir Purr-a-lot', 'DJ Fishbreath', 'Lieutenant Drip', 'Captain Meow'
    ];
    const moods = [
      '🔥 Extremely Bussin', '🍣 Euphoric Fish Bliss', '⚡ Absolute Peak Satisfaction', 
      '🤤 Slang-Certified Satisfied', '🌟 Cosmic Nirvana', '🎧 Totally Vibing'
    ];
    const foods = [
      '🐟 Grilled Salmon Fillet', '🍣 Tuna Nigiri', '🥫 Premium Catnip Pate', 
      '🍕 Rogue Slice of Pepperoni Pizza', '🧀 Liquid Gold Cheese Treat'
    ];
    const reactions = [
      '😸 Dual-tone Ecstatic Chirp', '🤤 Silent mouth-open hum', '⚡ Hyper-dilated pupil gaze', 
      '🐾 Backwards tail wiggle dance', '💤 Happy deep motor-purr'
    ];
    const emojis = ['😸', '😹', '😻', '😼', '🤤', '😎', '🪐', '🍣'];

    setTimeout(() => {
      const randomId = Math.floor(Math.random() * 900) + 100;
      setGeneratedMood({
        id: randomId,
        title: catNames[Math.floor(Math.random() * catNames.length)],
        mood: moods[Math.floor(Math.random() * moods.length)],
        food: foods[Math.floor(Math.random() * foods.length)],
        reaction: reactions[Math.floor(Math.random() * reactions.length)],
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
        bussinPercent: Math.floor(Math.random() * 21) + 80, // 80% to 100%
      });
      setIsSpinning(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#fcfaf7] text-zinc-800 selection:bg-orange-500 selection:text-white font-sans antialiased flex flex-col justify-between">
      {/* Toast Notification for Sharing */}
      <AnimatePresence>
        {shareToast && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 20 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-0 left-1/2 -translate-x-1/2 z-50 bg-zinc-900 text-white text-xs font-mono py-2.5 px-5 rounded-full shadow-xl flex items-center gap-2 border border-zinc-800"
          >
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></span>
            Wiki URL copied to clipboard! Share the Bussin vibes. 🐱✨
          </motion.div>
        )}
      </AnimatePresence>

      <div>
        {/* Top Header */}
        <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-orange-100 px-4 py-3 shadow-sm">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <a className="flex items-center gap-2.5 cursor-pointer" href="./index.html">
              <span className="text-3xl filter drop-shadow">🐱</span>
              <div>
                <h1 className="font-display font-black text-lg text-zinc-900 tracking-tight leading-none flex items-center gap-1.5">
                  BUSSIN CAT <span className="text-[10px] bg-orange-500 text-white font-mono font-bold px-1.5 py-0.5 rounded uppercase">WIKI</span>
                </h1>
                <p className="text-[10px] text-zinc-400 font-mono tracking-wider mt-0.5 uppercase">Know Your Feline Memes</p>
              </div>
            </a>

            {/* Quick URL indicators on page */}
            <div className="hidden lg:flex items-center gap-2 bg-zinc-50 border border-zinc-100 rounded-xl px-3 py-1.5 text-xs font-mono text-zinc-400">
              <Globe className="w-3.5 h-3.5 text-zinc-400 animate-pulse" />
              <span>https://www.bussincat.com/bussin-cat</span>
              <span className="text-orange-500 font-semibold">/{currentView}</span>
            </div>

            <button
              onClick={handleShareWiki}
              className="flex items-center gap-1.5 bg-orange-50 hover:bg-orange-100 text-orange-600 hover:text-orange-700 font-display font-bold text-xs py-2 px-3.5 rounded-full border border-orange-200 transition-all cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              Share Wiki
            </button>
          </div>
        </header>

        {/* View Switcher Navigation Tabs */}
        <div className="bg-white border-b border-orange-50/60 sticky top-[53px] z-30 px-4 overflow-x-auto scrollbar-none">
          <div className="max-w-6xl mx-auto flex gap-1 md:gap-2 py-2">
            {[
              { id: 'bussin-cat', label: '📖 Meaning', desc: 'Lexicon & dictionary', path: './index.html' },
              { id: 'gallery', label: '🍣 Meme Gallery', desc: 'Categorized images', path: './gallery.html' },
              { id: 'origin', label: '⏱️ Origin Story', desc: 'TikTok to reaction', path: './origin.html' },
              { id: 'templates', label: '🎨 Meme Studio', desc: 'Interactive canvas', path: './templates.html' },
              { id: 'interactive', label: '🕹️ Playground', desc: 'Mood spin & sounds', path: './interactive.html' },
              { id: 'ai-slang', label: '🧠 AI & Slang', desc: 'Sci-fi cats & definitions', path: './ai-slang.html' },
              { id: 'faq-download', label: '❔ FAQs & PNGs', desc: 'Downloads & FAQs', path: './faq-download.html' }
            ].map((tab) => {
              const isActive = currentView === tab.id;
              return (
                <a
                  key={tab.id}
                  href={tab.path}
                  className={`px-4 py-2.5 rounded-xl text-xs font-display font-bold transition-all shrink-0 text-left flex flex-col justify-center min-w-[110px] md:min-w-[130px] border ${
                    isActive
                      ? 'bg-orange-500 border-orange-500 text-white shadow-sm'
                      : 'bg-transparent border-transparent hover:bg-zinc-50 hover:border-zinc-100 text-zinc-500 hover:text-zinc-800'
                  }`}
                >
                  <span className="leading-none">{tab.label}</span>
                  <span className={`text-[9px] mt-0.5 font-sans font-medium hidden md:block ${isActive ? 'text-orange-100' : 'text-zinc-400'}`}>
                    {tab.desc}
                  </span>
                </a>
              );
            })}
          </div>
        </div>

        {/* Dynamic View Panel Container */}
        <main className="max-w-6xl mx-auto py-8 px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentView}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {/* VIEW 1: Meaning & Slang Portal */}
              {currentView === 'bussin-cat' && (
                <div className="space-y-8">
                  {/* Hero Jumbotron Section */}
                  <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 text-white min-h-[380px] flex items-center p-6 md:p-12 glow-primary">
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f97316_1px,transparent_1px)] [background-size:16px_16px]"></div>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10 w-full">
                      <div className="lg:col-span-7 flex flex-col items-start text-left">
                        <div className="inline-flex items-center gap-1.5 bg-orange-500/10 border border-orange-500/30 text-orange-400 font-mono text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4">
                          <Flame className="w-3 h-3 animate-bounce" /> SEO Portal Entry
                        </div>
                        <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight mb-4">
                          Bussin Cat Meme <span className="text-orange-400">🐱</span>
                        </h2>
                        <p className="text-zinc-300 text-base sm:text-lg leading-relaxed mb-6 max-w-xl font-sans">
                          Bussin Cat is an internet meme featuring a cat showing extreme happiness, deep satisfaction, or pure excitement. The phrase <strong>"bussin"</strong> means something is extremely good or highly enjoyable.
                        </p>
                        <div className="flex flex-wrap gap-2.5">
                          <a
                            href="./gallery.html"
                            className="bg-orange-500 hover:bg-orange-600 text-white font-display font-bold text-sm px-6 py-3 rounded-2xl shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 transition-all flex items-center gap-2"
                          >
                            Explore Gallery
                            <ArrowRight className="w-4 h-4" />
                          </a>
                        </div>
                      </div>
                      <div className="lg:col-span-5 flex justify-center">
                        <div className="relative rounded-2xl overflow-hidden border-2 border-zinc-700 max-w-sm aspect-video w-full bg-zinc-950 shadow-2xl rotate-1 hover:rotate-0 transition-all duration-500">
                          <img
                            src={heroImg}
                            alt="Bussin Cat main eating fish hero banner"
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Core Definitions & Semantic SEO Breakdown */}
                  <div className="bg-white border border-orange-100 rounded-3xl p-6 md:p-8">
                    <h3 className="font-display font-black text-2xl text-zinc-900 mb-6 flex items-center gap-2">
                      <span className="p-1.5 bg-orange-50 text-orange-500 rounded-lg"><HelpCircle className="w-5 h-5" /></span>
                      What Is Bussin Cat?
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-100">
                        <div className="font-mono text-xs text-orange-500 font-bold mb-1">TERM DEF #1</div>
                        <h4 className="font-display font-bold text-base text-zinc-800 mb-2">bussin cat meaning</h4>
                        <p className="text-xs text-zinc-500 font-sans leading-relaxed">
                          Refers to a specific reaction format where an expressive cat is used to validate a delicious meal, cool streetwear outfit, or top-tier situation.
                        </p>
                      </div>
                      <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-100">
                        <div className="font-mono text-xs text-orange-500 font-bold mb-1">TERM DEF #2</div>
                        <h4 className="font-display font-bold text-base text-zinc-800 mb-2">what is bussin cat</h4>
                        <p className="text-xs text-zinc-500 font-sans leading-relaxed">
                          An internet meme merging high-satisfaction happy cat templates with viral TikTok street vernacular to create humorous validation graphics.
                        </p>
                      </div>
                      <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-100">
                        <div className="font-mono text-xs text-orange-500 font-bold mb-1">TERM DEF #3</div>
                        <h4 className="font-display font-bold text-base text-zinc-800 mb-2">bussin cat definition</h4>
                        <p className="text-xs text-zinc-500 font-sans leading-relaxed">
                          The absolute state of wholesome bliss achieved by felines when devouring grilled fish or showing immense drip (cool pixel sunglasses).
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Related Animal Meme Universe Hub */}
                  <div className="bg-white border border-orange-100 rounded-3xl p-6 md:p-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                      <div>
                        <h3 className="font-display font-black text-2xl text-zinc-900 mb-1 flex items-center gap-2">
                          <span className="p-1.5 bg-orange-50 text-orange-500 rounded-lg"><Compass className="w-5 h-5" /></span>
                          Explore the Feline Meme Universe
                        </h3>
                        <p className="text-sm text-zinc-500 font-sans">
                          Click any related animal variant to access its history, context, and future expansion templates.
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {RELATED_MEMES.map((meme) => (
                        <button
                          key={meme.id}
                          onClick={() => setSelectedMemeModal(meme)}
                          className="group p-5 bg-zinc-50 hover:bg-white rounded-2xl border border-zinc-100 hover:border-orange-200 text-left hover:shadow-md transition-all flex flex-col justify-between h-full"
                        >
                          <div>
                            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${meme.color} text-white flex items-center justify-center text-xl mb-3 shadow`}>
                              {meme.emoji}
                            </div>
                            <h4 className="font-display font-bold text-base text-zinc-800 group-hover:text-orange-500 transition-colors mb-1">
                              {meme.title}
                            </h4>
                            <p className="text-xs text-zinc-500 font-sans leading-relaxed">
                              {meme.description}
                            </p>
                          </div>
                          <div className="mt-4 flex items-center gap-1 text-[11px] font-mono text-zinc-400 group-hover:text-orange-500 transition-colors">
                            <span>Inspect {meme.title}</span>
                            <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* VIEW 2: Classified Meme Gallery */}
              {currentView === 'gallery' && (
                <div className="space-y-6">
                  <div className="bg-white rounded-3xl p-6 md:p-8 border border-orange-100">
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-6">
                      <div>
                        <h3 className="font-display font-black text-2xl text-zinc-900 mb-1 flex items-center gap-2">
                          <span className="p-1.5 bg-orange-50 text-orange-500 rounded-lg"><Layers className="w-5 h-5" /></span>
                          Bussin Cat Gallery
                        </h3>
                        <p className="text-sm text-zinc-500 font-sans">
                          A fully categorized archive of Bussin Cats including food eaters, music vibers, swagged drip-bearers, and extreme reaction portraits.
                        </p>
                      </div>
                      <div className="flex items-center gap-2 bg-zinc-50 border border-zinc-200/60 rounded-2xl py-2 px-3 shadow-sm max-w-sm w-full">
                        <Search className="w-4 h-4 text-zinc-400 shrink-0" />
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Search memes by tag or keyword..."
                          className="text-xs bg-transparent border-none outline-none text-zinc-800 w-full placeholder-zinc-400 font-sans"
                        />
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5 items-center mb-6 border-t border-zinc-50 pt-4">
                      <span className="text-[10px] font-mono text-zinc-400 font-bold uppercase mr-1.5">Collection Filter:</span>
                      <button
                        onClick={() => setSelectedTag(null)}
                        className={`text-xs font-mono px-3 py-1.5 rounded-full border transition-all ${
                          selectedTag === null
                            ? 'bg-orange-500 border-orange-500 text-white font-bold'
                            : 'bg-zinc-50 border-zinc-100 text-zinc-600 hover:border-zinc-300'
                        }`}
                      >
                        All Categories
                      </button>
                      {allTags.map((tag) => (
                        <button
                          key={tag}
                          onClick={() => setSelectedTag(tag)}
                          className={`text-xs font-mono px-3 py-1.5 rounded-full border transition-all ${
                            selectedTag === tag
                              ? 'bg-orange-500 border-orange-500 text-white font-bold'
                              : 'bg-zinc-50 border-zinc-100 text-zinc-600 hover:border-zinc-300'
                          }`}
                        >
                          #{tag}
                        </button>
                      ))}
                    </div>

                    {filteredGallery.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredGallery.map((meme) => (
                          <MemeCard key={meme.id} meme={meme} />
                        ))}
                      </div>
                    ) : (
                      <div className="bg-zinc-50 rounded-2xl p-12 text-center border border-zinc-100 max-w-md mx-auto">
                        <span className="text-3xl">😿</span>
                        <h4 className="font-display font-bold text-base text-zinc-800 mt-2">No matching memes found</h4>
                        <p className="text-zinc-500 text-xs mt-1">Try resetting your keywords or filters.</p>
                        <button
                          onClick={() => { setSearchQuery(''); setSelectedTag(null); }}
                          className="mt-4 text-xs bg-orange-100 text-orange-600 font-bold py-1.5 px-4 rounded-xl"
                        >
                          Clear Filters
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* VIEW 3: Origin Story Timeline */}
              {currentView === 'origin' && (
                <div className="space-y-8 max-w-3xl mx-auto">
                  <div className="bg-white rounded-3xl p-6 md:p-8 border border-orange-100 text-left">
                    <h3 className="font-display font-black text-2xl text-zinc-900 mb-2 flex items-center gap-2">
                      <span className="p-1.5 bg-orange-50 text-orange-500 rounded-lg"><History className="w-5 h-5" /></span>
                      Where Did Bussin Cat Come From?
                    </h3>
                    <p className="text-sm text-zinc-500 font-sans leading-relaxed mb-6">
                      Bussin Cat is a modern internet synthesis representing how slang expands from food appreciation to humorous general-purpose digital reaction culture.
                    </p>

                    {/* Timeline visualization */}
                    <div className="relative border-l-2 border-orange-100 ml-4 space-y-8 pl-6 pt-2">
                      {[
                        { year: '2020', title: 'TikTok Slang Boom', desc: 'The word "bussin" trends massively on TikTok videos as food-reviewers and influencers use it to describe delicious cooking.', icon: '📱' },
                        { year: '2021-2022', title: 'Food Reaction Emergence', desc: 'Creators begin overlaying audio tracks of cats crunching treats, eating salmon, or purring loudly with big text: "this food is bussin".', icon: '🐟' },
                        { year: '2023', title: 'Cat Memes Consolidation', desc: 'A standardized character "Bussin Cat" takes shape: an orange or tabby cat with ultra-dilated pupils, experiencing maximum flavor satisfaction.', icon: '😸' },
                        { year: 'Today', title: 'Reaction Meme Domination', desc: 'Fusing with "drip" elements like sunglasses and gold chains, the meme is now a universal template of cool confidence across online communities.', icon: '🏆' }
                      ].map((step, idx) => (
                        <div key={idx} className="relative group">
                          <div className="absolute -left-[35px] top-0 bg-white border-2 border-orange-500 rounded-full w-6 h-6 flex items-center justify-center text-xs group-hover:bg-orange-500 group-hover:text-white transition-colors">
                            {step.icon}
                          </div>
                          <div>
                            <span className="text-[10px] font-mono font-bold text-orange-500 bg-orange-50 rounded px-2 py-0.5 uppercase tracking-wider">
                              {step.year}
                            </span>
                            <h4 className="font-display font-bold text-lg text-zinc-900 mt-1 mb-1">
                              {step.title}
                            </h4>
                            <p className="text-xs text-zinc-500 leading-relaxed font-sans">
                              {step.desc}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* VIEW 4: Interactive Meme Creator Studio */}
              {currentView === 'templates' && (
                <div className="space-y-6">
                  {/* Embedded Custom Live Meme Studio Component */}
                  <MemeGenerator />

                  {/* SEO-optimized explanation of How to Create a Bussin Cat Meme */}
                  <div className="bg-white rounded-3xl p-6 md:p-8 border border-orange-100">
                    <h3 className="font-display font-black text-xl text-zinc-900 mb-4 flex items-center gap-2">
                      <span className="p-1 bg-orange-50 text-orange-500 rounded"><Info className="w-4 h-4" /></span>
                      How to Make a Bussin Cat Meme
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs font-sans">
                      <div className="bg-zinc-50 p-4 rounded-xl border border-zinc-100">
                        <strong className="block text-zinc-800 mb-1">Step 1: Choose Image</strong>
                        <p className="text-zinc-500">Pick an expressively happy or swagged-out cat template from our direct presets.</p>
                      </div>
                      <div className="bg-zinc-50 p-4 rounded-xl border border-zinc-100">
                        <strong className="block text-zinc-800 mb-1">Step 2: Add Slang Text</strong>
                        <p className="text-zinc-500">Add Gen Z / Alpha slang like "bussin", "rizz", or "sigma" in the top or bottom fields.</p>
                      </div>
                      <div className="bg-zinc-50 p-4 rounded-xl border border-zinc-100">
                        <strong className="block text-zinc-800 mb-1">Step 3: Customize Font</strong>
                        <p className="text-zinc-500">Increase font sizes, toggle UPPERCASE mode, or position text precisely on the canvas.</p>
                      </div>
                      <div className="bg-zinc-50 p-4 rounded-xl border border-zinc-100">
                        <strong className="block text-zinc-800 mb-1">Step 4: Click Download</strong>
                        <p className="text-zinc-500">The browser will instantly compile your canvas to a standard JPEG download file!</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* VIEW 5: Interactive Playground & Soundboard */}
              {currentView === 'interactive' && (
                <div className="space-y-8">
                  {/* Cat Mood Generator Slot Machine (Pure JS, pure fun!) */}
                  <div className="bg-white rounded-3xl p-6 md:p-8 border border-orange-100 text-center flex flex-col items-center">
                    <div className="max-w-md w-full">
                      <div className="inline-flex items-center gap-1.5 bg-orange-50 rounded-full px-3 py-1 text-xs text-orange-600 font-mono font-bold mb-4">
                        <Zap className="w-3.5 h-3.5 animate-bounce" /> PURE JS INTERACTIVE ENGAGEMENT
                      </div>
                      <h3 className="font-display font-black text-2xl text-zinc-900 mb-2">
                        Bussin Cat Mood Generator
                      </h3>
                      <p className="text-xs text-zinc-500 font-sans leading-relaxed mb-6">
                        Spin our fully client-side slot wheel to synthesize a completely randomized Bussin Cat personality!
                      </p>

                      <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800 relative min-h-[180px] flex flex-col justify-center items-center overflow-hidden">
                        {isSpinning ? (
                          <div className="flex flex-col items-center gap-3">
                            <span className="text-4xl animate-spin">😼</span>
                            <div className="text-xs text-zinc-400 font-mono uppercase tracking-widest animate-pulse">
                              Generating cat dna...
                            </div>
                          </div>
                        ) : generatedMood ? (
                          <div className="w-full text-left space-y-3 relative z-10">
                            <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                              <span className="text-2xl filter drop-shadow">{generatedMood.emoji}</span>
                              <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                                {generatedMood.bussinPercent}% BUSSIN RATING
                              </span>
                            </div>
                            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                              <div>
                                <span className="text-zinc-500 block">Feline Variant</span>
                                <strong className="text-white text-sm">{generatedMood.title}</strong>
                              </div>
                              <div>
                                <span className="text-zinc-500 block">Identified Mood</span>
                                <strong className="text-orange-400 text-sm">{generatedMood.mood}</strong>
                              </div>
                              <div>
                                <span className="text-zinc-500 block">Desired Delicacy</span>
                                <strong className="text-pink-400 text-sm">{generatedMood.food}</strong>
                              </div>
                              <div>
                                <span className="text-zinc-500 block">Feline Response</span>
                                <strong className="text-cyan-400 text-sm">{generatedMood.reaction}</strong>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center text-center">
                            <span className="text-4xl mb-2">🎰</span>
                            <div className="text-xs text-zinc-500 font-mono">Ready to spin the reels</div>
                          </div>
                        )}

                        {/* background decorative glowing circle */}
                        <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-orange-500/20 rounded-full blur-2xl"></div>
                      </div>

                      <button
                        onClick={handleGenerateMood}
                        disabled={isSpinning}
                        className="mt-6 w-full bg-orange-500 hover:bg-orange-600 disabled:bg-zinc-300 text-white font-display font-bold py-3 px-6 rounded-2xl shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        {isSpinning ? 'Analyzing...' : 'Generate Bussin Cat'}
                      </button>
                    </div>
                  </div>

                  {/* Soundboard Component */}
                  <Soundboard />
                </div>
              )}

              {/* VIEW 6: AI Content & Slang Dictionary */}
              {currentView === 'ai-slang' && (
                <div className="space-y-8">
                  {/* Slang Dictionary Table */}
                  <div className="bg-white rounded-3xl p-6 md:p-8 border border-orange-100">
                    <h3 className="font-display font-black text-2xl text-zinc-900 mb-2 flex items-center gap-2">
                      <span className="p-1.5 bg-orange-50 text-orange-500 rounded-lg"><BookOpen className="w-5 h-5" /></span>
                      Meme Slang Dictionary
                    </h3>
                    <p className="text-sm text-zinc-500 font-sans mb-6">
                      Expand your internet vocabulary. Click on any row to open the complete deep dive analyzer about the term.
                    </p>

                    <div className="overflow-x-auto rounded-xl border border-zinc-100 bg-zinc-50">
                      <table className="w-full text-left border-collapse text-xs md:text-sm font-sans">
                        <thead>
                          <tr className="bg-zinc-100/80 font-mono text-[11px] text-zinc-500 uppercase border-b border-zinc-200">
                            <th className="p-4">Word</th>
                            <th className="p-4">Category</th>
                            <th className="p-4">Definition</th>
                            <th className="p-4">Example Usage</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-200/50 bg-white">
                          {SLANG_DICTIONARY.map((slang, idx) => (
                            <tr
                              key={idx}
                              onClick={() => setSelectedSlangModal(slang)}
                              className="hover:bg-orange-50/20 transition-colors cursor-pointer group"
                            >
                              <td className="p-4 font-display font-extrabold text-zinc-800 text-sm flex items-center gap-1.5 group-hover:text-orange-500">
                                <span>{slang.emoji}</span>
                                <span>/{slang.word}</span>
                              </td>
                              <td className="p-4 font-mono text-xs text-zinc-400 font-medium">
                                {slang.category}
                              </td>
                              <td className="p-4 text-zinc-500">
                                {slang.definition}
                              </td>
                              <td className="p-4 italic text-zinc-500">
                                "{slang.example}"
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* AI Generated Bussin Cats Display */}
                  <div className="bg-white rounded-3xl p-6 md:p-8 border border-orange-100">
                    <h3 className="font-display font-black text-2xl text-zinc-900 mb-2 flex items-center gap-2">
                      <span className="p-1.5 bg-orange-50 text-orange-500 rounded-lg"><Sparkles className="w-5 h-5" /></span>
                      AI Generated Bussin Cats
                    </h3>
                    <p className="text-sm text-zinc-500 font-sans mb-6">
                      Meet futuristic sci-fi felines living in high-tech universes, fully synthesized using state-of-the-art AI design pipelines.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {AI_BUSSIN_CATS.map((aiCat) => (
                        <div
                          key={aiCat.id}
                          className="bg-zinc-50 rounded-2xl overflow-hidden border border-zinc-100 hover:border-orange-100 hover:shadow-md transition-all flex flex-col sm:flex-row gap-4 p-4"
                        >
                          {/* Image Box */}
                          <div className="w-full sm:w-40 aspect-square bg-zinc-900 rounded-xl overflow-hidden shrink-0">
                            <img
                              src={aiCat.url}
                              alt={aiCat.alt}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover"
                            />
                          </div>

                          {/* Info panel */}
                          <div className="flex-1 flex flex-col justify-between">
                            <div>
                              <span className="text-[10px] font-mono font-bold text-orange-500 uppercase tracking-widest bg-orange-50 px-2 py-0.5 rounded">
                                {aiCat.role}
                              </span>
                              <h4 className="font-display font-bold text-base text-zinc-800 mt-1.5 mb-1">
                                {aiCat.title}
                              </h4>
                              <p className="text-xs text-zinc-500 font-sans leading-relaxed">
                                {aiCat.description}
                              </p>
                            </div>

                            {/* Power rating scale */}
                            <div className="mt-3 pt-3 border-t border-zinc-200/50">
                              <div className="flex justify-between items-center text-[10px] font-mono text-zinc-400 mb-1">
                                <span>BUSSIN POWER LEVEL</span>
                                <span className="font-bold text-orange-500">{aiCat.powerRating}/100</span>
                              </div>
                              <div className="w-full h-1.5 bg-zinc-200 rounded-full overflow-hidden">
                                <div
                                  className="bg-orange-500 h-full rounded-full"
                                  style={{ width: `${aiCat.powerRating}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* VIEW 7: FAQs & Downloads portal */}
              {currentView === 'faq-download' && (
                <div className="space-y-8">
                  {/* Download SEO search query answers section */}
                  <div className="bg-white rounded-3xl p-6 md:p-8 border border-orange-100">
                    <h3 className="font-display font-black text-2xl text-zinc-900 mb-2 flex items-center gap-2">
                      <span className="p-1.5 bg-orange-50 text-orange-500 rounded-lg"><Download className="w-5 h-5" /></span>
                      Download Bussin Cat Assets
                    </h3>
                    <p className="text-sm text-zinc-500 font-sans mb-6">
                      Looking to download specific formats for message reactions or wallpapers? Quick grab free files directly.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-sans">
                      <div className="bg-zinc-50 hover:bg-zinc-100 border border-zinc-100 rounded-2xl p-4 transition-all flex flex-col justify-between">
                        <div>
                          <strong className="text-zinc-800 text-sm block mb-1">Bussin Cat PNG</strong>
                          <span className="text-zinc-400 block mb-3">Transparent cut-out background sticker file</span>
                        </div>
                        <a
                          href={MEME_GALLERY[0].url}
                          download="bussin-cat-transparent.png"
                          className="bg-white hover:bg-orange-50 text-orange-500 border border-orange-200 hover:border-orange-400 text-center font-display font-bold py-2 px-3 rounded-xl transition-all"
                        >
                          Download PNG File
                        </a>
                      </div>

                      <div className="bg-zinc-50 hover:bg-zinc-100 border border-zinc-100 rounded-2xl p-4 transition-all flex flex-col justify-between">
                        <div>
                          <strong className="text-zinc-800 text-sm block mb-1">Bussin Cat GIF</strong>
                          <span className="text-zinc-400 block mb-3">Animated reaction loop preset for Discord chat</span>
                        </div>
                        <a
                          href={MEME_GALLERY[2].url}
                          download="bussin-cat-vibing.gif"
                          className="bg-white hover:bg-orange-50 text-orange-500 border border-orange-200 hover:border-orange-400 text-center font-display font-bold py-2 px-3 rounded-xl transition-all"
                        >
                          Download GIF File
                        </a>
                      </div>

                      <div className="bg-zinc-50 hover:bg-zinc-100 border border-zinc-100 rounded-2xl p-4 transition-all flex flex-col justify-between">
                        <div>
                          <strong className="text-zinc-800 text-sm block mb-1">Bussin Cat Wallpaper</strong>
                          <span className="text-zinc-400 block mb-3">High-definition 1080p desktop background artwork</span>
                        </div>
                        <a
                          href={heroImg}
                          download="bussin-cat-wallpaper-hd.jpg"
                          className="bg-white hover:bg-orange-50 text-orange-500 border border-orange-200 hover:border-orange-400 text-center font-display font-bold py-2 px-3 rounded-xl transition-all"
                        >
                          Download Wallpaper
                        </a>
                      </div>

                      <div className="bg-zinc-50 hover:bg-zinc-100 border border-zinc-100 rounded-2xl p-4 transition-all flex flex-col justify-between">
                        <div>
                          <strong className="text-zinc-800 text-sm block mb-1">WhatsApp Sticker Pack</strong>
                          <span className="text-zinc-400 block mb-3">Instant sticker integration bundle setup</span>
                        </div>
                        <a
                          href={MEME_GALLERY[3].url}
                          download="bussin-cat-stickers.webp"
                          className="bg-white hover:bg-orange-50 text-orange-500 border border-orange-200 hover:border-orange-400 text-center font-display font-bold py-2 px-3 rounded-xl transition-all"
                        >
                          Download Stickers
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* FAQ SEO accordion layout */}
                  <div className="bg-white rounded-3xl p-6 md:p-8 border border-orange-100">
                    <h3 className="font-display font-black text-2xl text-zinc-900 mb-2 flex items-center gap-2">
                      <span className="p-1.5 bg-orange-50 text-orange-500 rounded-lg"><HelpCircle className="w-5 h-5" /></span>
                      Wiki FAQ Section
                    </h3>
                    <p className="text-sm text-zinc-500 font-sans mb-6">
                      Highly structured answers addressing common search-engine questions about Bussin Cat's origins and usage guidelines.
                    </p>

                    <div className="space-y-3 font-sans">
                      {FAQS.map((faq, idx) => {
                        const isExpanded = expandedFaq === idx;
                        return (
                          <div
                            key={idx}
                            className="border border-zinc-100 rounded-2xl overflow-hidden transition-all duration-300 hover:border-orange-100"
                          >
                            <button
                              onClick={() => setExpandedFaq(isExpanded ? null : idx)}
                              className="w-full text-left p-4 bg-zinc-50/50 hover:bg-orange-50/10 flex justify-between items-center transition-colors"
                            >
                              <div className="flex items-center gap-2.5">
                                <span className="text-[10px] font-mono font-bold text-orange-500 bg-orange-50 border border-orange-100 rounded px-1.5 py-0.5">
                                  {faq.tag}
                                </span>
                                <strong className="text-sm text-zinc-800">{faq.question}</strong>
                              </div>
                              <span className="text-zinc-400 text-sm font-mono font-bold">
                                {isExpanded ? '−' : '+'}
                              </span>
                            </button>

                            <AnimatePresence>
                              {isExpanded && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  className="bg-white text-xs text-zinc-500 leading-relaxed p-4 border-t border-zinc-100"
                                >
                                  {faq.answer}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* VIEW 8: Privacy Policy */}
              {currentView === 'privacy' && (
                <div className="bg-white rounded-3xl p-6 md:p-10 border border-orange-100 max-w-4xl mx-auto font-sans text-zinc-600 leading-relaxed space-y-6">
                  <div className="border-b border-zinc-100 pb-6">
                    <h2 className="font-display font-black text-3xl text-zinc-900 mb-2 flex items-center gap-2.5">
                      <span className="text-4xl">🛡️</span> Privacy Policy
                    </h2>
                    <p className="text-xs font-mono text-zinc-400">Last updated: July 14, 2026</p>
                  </div>

                  <p className="text-sm">
                    At <strong>Bussin Cat</strong>, we take your privacy very seriously. This policy documents how we treat your data (or lack thereof, since we do not store anything!).
                  </p>

                  <div className="space-y-4">
                    <section>
                      <h3 className="font-display font-bold text-lg text-zinc-800 mb-2">1. Data We Collect</h3>
                      <p className="text-sm">
                        At Bussin Cat, we believe in complete privacy. We do not collect, store, or share any of your personal data. All interactive features (like our Meme Creator Studio, Soundboard, and slot machine) run entirely client-side inside your own browser window.
                      </p>
                    </section>

                    <section>
                      <h3 className="font-display font-bold text-lg text-zinc-800 mb-2">2. Cookies and Local Storage</h3>
                      <p className="text-sm">
                        We do not use tracking cookies to identify you. We use standard browser <code>localStorage</code> to maintain preferences (like keeping track of sound settings or intermediate meme creator drafts), but this information is held strictly on your local device and is never uploaded.
                      </p>
                    </section>

                    <section>
                      <h3 className="font-display font-bold text-lg text-zinc-800 mb-2">3. Third-Party Web Analytics</h3>
                      <p className="text-sm">
                        To understand overall traffic patterns and optimize page load speeds, we integrate Microsoft Clarity for anonymous, aggregated web analytics. No personally identifiable details are collected or passed to external servers.
                      </p>
                    </section>

                    <section>
                      <h3 className="font-display font-bold text-lg text-zinc-800 mb-2">4. Changes to This Policy</h3>
                      <p className="text-sm">
                        We may update this Privacy Policy from time to time. Any changes will be published here with an updated modification date at the top of the page.
                      </p>
                    </section>
                  </div>
                </div>
              )}

              {/* VIEW 9: Terms of Use */}
              {currentView === 'terms' && (
                <div className="bg-white rounded-3xl p-6 md:p-10 border border-orange-100 max-w-4xl mx-auto font-sans text-zinc-600 leading-relaxed space-y-6">
                  <div className="border-b border-zinc-100 pb-6">
                    <h2 className="font-display font-black text-3xl text-zinc-900 mb-2 flex items-center gap-2.5">
                      <span className="text-4xl">📜</span> Terms of Use
                    </h2>
                    <p className="text-xs font-mono text-zinc-400">Last updated: July 14, 2026</p>
                  </div>

                  <p className="text-sm">
                    Welcome to <strong>Bussin Cat</strong>. By using this website, you agree to comply with and be bound by the following terms of use.
                  </p>

                  <div className="space-y-4">
                    <section>
                      <h3 className="font-display font-bold text-lg text-zinc-800 mb-2">1. Agreement to Terms</h3>
                      <p className="text-sm">
                        By accessing or using our pages at <span className="font-mono text-xs text-orange-600 bg-orange-50 px-1.5 py-0.5 rounded">https://www.bussincat.com/</span>, you agree to these Terms of Use and comply with all applicable local laws. If you do not agree with any of these terms, you are prohibited from using this site.
                      </p>
                    </section>

                    <section>
                      <h3 className="font-display font-bold text-lg text-zinc-800 mb-2">2. Creative Asset Usage</h3>
                      <p className="text-sm">
                        All customized meme graphics, download packages, transparent PNG stickers, sound clips, and timelines provided on this platform are free to use for personal, educational, creative, and non-commercial social media sharing purposes. Please do not hotlink direct audio assets or distribute them maliciously.
                      </p>
                    </section>

                    <section>
                      <h3 className="font-display font-bold text-lg text-zinc-800 mb-2">3. Disclaimer and No Warranty</h3>
                      <p className="text-sm">
                        The materials on this website are provided on an "as is" basis. Bussin Cat makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties, including without limitation, implied warranties of merchantability or fitness for a particular purpose.
                      </p>
                    </section>

                    <section>
                      <h3 className="font-display font-bold text-lg text-zinc-800 mb-2">4. Limitations</h3>
                      <p className="text-sm">
                        In no event shall Bussin Cat or its creators be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the interactive tools or assets on our website.
                      </p>
                    </section>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-zinc-900 text-white border-t border-zinc-800 py-12 px-4 mt-12 shrink-0">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="text-3xl filter drop-shadow">🐱</span>
            <div>
              <div className="font-display font-black text-sm tracking-tight text-white flex items-center gap-1.5">
                BUSSIN CAT MEME WIKI
              </div>
              <p className="text-xs text-zinc-400 font-sans mt-1">
                BussinCat is a website about funny cats, cat memes and AI-generated cat content.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-4 text-[10px] md:text-xs font-mono text-zinc-500">
            <a href="./privacy.html" className="hover:text-zinc-300 underline transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="./terms.html" className="hover:text-zinc-300 underline transition-colors">Terms of Use</a>
            <span>•</span>
            <span className="text-zinc-400">© 2026 bussincat.com All rights reserved.</span>
          </div>
        </div>
      </footer>

      {/* Related Meme Modal */}
      <AnimatePresence>
        {selectedMemeModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-6 md:p-8 max-w-sm w-full relative border border-orange-100 shadow-2xl"
            >
              <button
                onClick={() => setSelectedMemeModal(null)}
                className="absolute top-4 right-4 p-1.5 bg-zinc-50 hover:bg-zinc-100 text-zinc-400 hover:text-zinc-800 rounded-full border border-zinc-100 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex flex-col items-center text-center mt-2">
                <span className="text-5xl mb-4 p-4 bg-orange-50 rounded-full">{selectedMemeModal.emoji}</span>
                <h4 className="font-display font-black text-2xl text-zinc-900 mb-2">
                  {selectedMemeModal.title}
                </h4>
                <div className="inline-block bg-orange-50 text-orange-600 font-mono text-[10px] px-2.5 py-0.5 rounded-full font-bold mb-4 uppercase">
                  Future Expansion Area
                </div>
                
                <p className="text-sm text-zinc-500 leading-relaxed font-sans mb-6">
                  {selectedMemeModal.description} This page is currently under construction, but it will explore {selectedMemeModal.title} with complete history and generators in the next release!
                </p>

                <div className="w-full flex gap-2">
                  <button
                    onClick={() => setSelectedMemeModal(null)}
                    className="flex-1 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-display font-bold py-3 rounded-2xl transition-colors text-sm"
                  >
                    Got It, Nice!
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Slang Word Modal */}
      <AnimatePresence>
        {selectedSlangModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-6 md:p-8 max-w-sm w-full relative border border-orange-100 shadow-2xl"
            >
              <button
                onClick={() => setSelectedSlangModal(null)}
                className="absolute top-4 right-4 p-1.5 bg-zinc-50 hover:bg-zinc-100 text-zinc-400 hover:text-zinc-800 rounded-full border border-zinc-100 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="mt-2 text-left">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-4xl p-2.5 bg-orange-50 rounded-xl">{selectedSlangModal.emoji}</span>
                  <div>
                    <h4 className="font-display font-black text-2xl text-zinc-900 leading-none">
                      /{selectedSlangModal.word}
                    </h4>
                    <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block mt-1">
                      Origin: {selectedSlangModal.originYear}
                    </span>
                  </div>
                </div>

                <div className="space-y-4 text-xs font-sans">
                  <div>
                    <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block mb-1">Classification</span>
                    <strong className="text-zinc-700 text-sm block font-medium">{selectedSlangModal.category}</strong>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block mb-1">Lexical Definition</span>
                    <p className="text-zinc-600 text-sm leading-relaxed">{selectedSlangModal.definition}</p>
                  </div>

                  <div className="bg-zinc-50 p-3.5 rounded-xl border border-zinc-100">
                    <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block mb-1">Standard Example</span>
                    <p className="text-zinc-600 font-sans italic text-xs">
                      "{selectedSlangModal.example}"
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedSlangModal(null)}
                  className="mt-6 w-full bg-orange-500 hover:bg-orange-600 text-white font-display font-bold py-3 rounded-xl transition-all text-sm"
                >
                  Close Lexicon
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
