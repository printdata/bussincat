import { useState, useEffect } from 'react';
import { MemeImage } from '../types';
import { Heart, MessageSquare, Copy, Download, X, Check, Award } from 'lucide-react';

interface MemeCardProps {
  meme: MemeImage;
}

export default function MemeCard({ meme }: MemeCardProps) {
  const [likes, setLikes] = useState<number>(meme.initialLikes);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [showLightbox, setShowLightbox] = useState<boolean>(false);
  const [myReaction, setMyReaction] = useState<string | null>(null);

  // Simulated reactions state
  const [reactionsCount, setReactionsCount] = useState<{ [key: string]: number }>({
    '😂': Math.floor(Math.random() * 500) + 120,
    '🔥': Math.floor(Math.random() * 600) + 200,
    '😍': Math.floor(Math.random() * 300) + 80,
    '😮': Math.floor(Math.random() * 200) + 30
  });

  // Local storage caching for upvotes
  useEffect(() => {
    const savedLikes = localStorage.getItem(`bussin_cat_likes_${meme.id}`);
    const savedLikedStatus = localStorage.getItem(`bussin_cat_liked_${meme.id}`);
    const savedReaction = localStorage.getItem(`bussin_cat_reaction_${meme.id}`);

    if (savedLikes) setLikes(parseInt(savedLikes));
    if (savedLikedStatus) setIsLiked(savedLikedStatus === 'true');
    if (savedReaction) setMyReaction(savedReaction);
  }, [meme.id]);

  const handleLike = () => {
    let newLikes = likes;
    let newLikedStatus = !isLiked;

    if (isLiked) {
      newLikes -= 1;
    } else {
      newLikes += 1;
    }

    setLikes(newLikes);
    setIsLiked(newLikedStatus);
    localStorage.setItem(`bussin_cat_likes_${meme.id}`, newLikes.toString());
    localStorage.setItem(`bussin_cat_liked_${meme.id}`, newLikedStatus.toString());
  };

  const handleReaction = (emoji: string) => {
    const updatedCount = { ...reactionsCount };
    
    // If clicked the same one, remove it
    if (myReaction === emoji) {
      updatedCount[emoji] = Math.max(0, updatedCount[emoji] - 1);
      setMyReaction(null);
      localStorage.removeItem(`bussin_cat_reaction_${meme.id}`);
    } else {
      // If clicked a different one while having another active reaction
      if (myReaction) {
        updatedCount[myReaction] = Math.max(0, updatedCount[myReaction] - 1);
      }
      updatedCount[emoji] += 1;
      setMyReaction(emoji);
      localStorage.setItem(`bussin_cat_reaction_${meme.id}`, emoji);
    }
    
    setReactionsCount(updatedCount);
  };

  const copyUrl = () => {
    // Resolve full path URL
    const fullUrl = `${window.location.origin}${meme.url}`;
    navigator.clipboard.writeText(fullUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const downloadImage = () => {
    const link = document.createElement('a');
    link.href = meme.url;
    link.download = `${meme.id}.jpg`;
    link.click();
  };

  return (
    <>
      <div className="bg-white rounded-3xl overflow-hidden border border-zinc-100 hover:border-orange-200 hover:shadow-lg transition-all duration-300 flex flex-col group h-full">
        {/* Card Thumbnail Area with Hover FX */}
        <div className="relative overflow-hidden aspect-[4/3] bg-zinc-100 cursor-zoom-in" onClick={() => setShowLightbox(true)}>
          <img
            src={meme.url}
            alt={meme.alt}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {/* Tag Overlays */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1">
            <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-mono font-medium px-2 py-0.5 rounded-md flex items-center gap-1 border border-white/10 uppercase">
              <Award className="w-3 h-3 text-orange-400" />
              BUSSIN ORIGIN
            </span>
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
            <p className="text-white text-xs font-sans line-clamp-2">{meme.description}</p>
          </div>
        </div>

        {/* Info & Description */}
        <div className="p-5 flex-1 flex flex-col justify-between">
          <div>
            <h4 className="font-display font-bold text-lg text-zinc-900 group-hover:text-orange-500 transition-colors mb-1">
              {meme.title}
            </h4>
            <p className="text-xs text-zinc-500 font-sans leading-relaxed mb-4">
              {meme.description}
            </p>

            {/* Tags list */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {meme.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-orange-50 text-orange-600 font-mono text-[10px] px-2 py-0.5 rounded-full font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-zinc-50 flex flex-col gap-3">
            {/* Reactions Panel */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-zinc-400 font-medium uppercase">Reactions:</span>
              <div className="flex items-center gap-1">
                {Object.keys(reactionsCount).map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => handleReaction(emoji)}
                    className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-mono border transition-all ${
                      myReaction === emoji
                        ? 'bg-orange-50 border-orange-200 text-orange-600 scale-105 font-bold shadow-sm'
                        : 'bg-zinc-50 border-zinc-100 text-zinc-600 hover:bg-white hover:border-zinc-200'
                    }`}
                  >
                    <span>{emoji}</span>
                    <span className="text-[10px] text-zinc-400">{reactionsCount[emoji]}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Social Stats and copy links */}
            <div className="flex items-center justify-between mt-1">
              {/* Upvote Button */}
              <button
                onClick={handleLike}
                className={`flex items-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-mono font-bold border transition-all ${
                  isLiked
                    ? 'bg-red-50 border-red-100 text-red-500 ring-4 ring-red-50'
                    : 'bg-zinc-50 border-zinc-100 text-zinc-600 hover:bg-white hover:border-zinc-200'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-current text-red-500' : ''}`} />
                <span>{likes}</span>
              </button>

              {/* Utility shortcuts */}
              <div className="flex items-center gap-2">
                <button
                  onClick={copyUrl}
                  className="p-1.5 bg-zinc-50 hover:bg-zinc-100 text-zinc-500 hover:text-zinc-800 rounded-lg border border-zinc-100 transition-colors"
                  title="Copy Direct Image Link"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={downloadImage}
                  className="p-1.5 bg-zinc-50 hover:bg-zinc-100 text-zinc-500 hover:text-zinc-800 rounded-lg border border-zinc-100 transition-colors"
                  title="Download Image"
                >
                  <Download className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox / Overlay Modal */}
      {showLightbox && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <button
              onClick={copyUrl}
              className="p-3 bg-zinc-800/80 hover:bg-zinc-700/80 text-white rounded-full transition-colors flex items-center gap-2 text-sm"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied!' : 'Copy Link'}</span>
            </button>
            <button
              onClick={downloadImage}
              className="p-3 bg-zinc-800/80 hover:bg-zinc-700/80 text-white rounded-full transition-colors flex items-center gap-2 text-sm"
            >
              <Download className="w-4 h-4" />
              <span>Download</span>
            </button>
            <button
              onClick={() => setShowLightbox(false)}
              className="p-3 bg-zinc-800/80 hover:bg-zinc-700/80 text-white rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="max-w-4xl w-full flex flex-col md:flex-row gap-6 bg-zinc-950/40 rounded-3xl overflow-hidden border border-zinc-800/50 p-4 backdrop-blur-2xl">
            {/* Img frame */}
            <div className="flex-1 flex items-center justify-center aspect-[4/3] bg-zinc-900 rounded-2xl overflow-hidden">
              <img
                src={meme.url}
                alt={meme.alt}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Info pane */}
            <div className="w-full md:w-80 flex flex-col justify-between text-white p-4">
              <div>
                <span className="text-[10px] font-mono text-orange-400 font-bold uppercase tracking-widest mb-1.5 block">
                  BUSSIN CAT ARCHIVE
                </span>
                <h3 className="font-display font-extrabold text-2xl text-white mb-2">
                  {meme.title}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                  {meme.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-6">
                  {meme.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-zinc-900 border border-zinc-800 text-zinc-300 font-mono text-[10px] px-2.5 py-1 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="space-y-3">
                  <div className="text-xs font-mono text-zinc-500 uppercase">Meme Metadata</div>
                  <div className="grid grid-cols-2 gap-3 text-xs font-mono bg-zinc-900/50 p-3 rounded-xl border border-zinc-800/40">
                    <div>
                      <div className="text-zinc-500">Meme ID</div>
                      <div className="text-zinc-300 font-bold">{meme.id}</div>
                    </div>
                    <div>
                      <div className="text-zinc-500">Slang Grade</div>
                      <div className="text-emerald-400 font-bold">100% Bussin</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Close button inside panel for mobile */}
              <button
                onClick={() => setShowLightbox(false)}
                className="mt-6 w-full bg-white hover:bg-zinc-100 text-black font-display font-semibold py-3 px-4 rounded-xl transition-all"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
