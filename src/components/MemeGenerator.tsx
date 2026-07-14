import { useState, useEffect, useRef } from 'react';
import { MEME_GALLERY } from '../data';
import { MemeImage } from '../types';
import { Download, Sparkles, RefreshCw, Type, AlignCenter } from 'lucide-react';

export default function MemeGenerator() {
  const [selectedMeme, setSelectedMeme] = useState<MemeImage>(MEME_GALLERY[0]);
  const [topText, setTopText] = useState<string>('WHEN THE FISH');
  const [bottomText, setBottomText] = useState<string>('IS ACTUALLY BUSSIN');
  const [fontSize, setFontSize] = useState<number>(36);
  const [isUppercase, setIsUppercase] = useState<boolean>(true);
  const [canvasWidth, setCanvasWidth] = useState<number>(500);
  const [canvasHeight, setCanvasHeight] = useState<number>(375);
  
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imageCacheRef = useRef<{ [url: string]: HTMLImageElement }>({});

  useEffect(() => {
    drawMeme();
  }, [selectedMeme, topText, bottomText, fontSize, isUppercase, canvasWidth, canvasHeight]);

  const drawMeme = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const renderImage = (img: HTMLImageElement) => {
      // Set canvas size to match the image ratio or set dimensions
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Setup Text Style
      ctx.fillStyle = 'white';
      ctx.strokeStyle = 'black';
      ctx.lineWidth = Math.max(3, fontSize / 8);
      ctx.textAlign = 'center';
      // Use Impact font or falling back to custom display font
      ctx.font = `bold ${fontSize}px "Space Grotesk", "Impact", sans-serif`;

      const drawText = (text: string, x: number, y: number) => {
        const displayText = isUppercase ? text.toUpperCase() : text;
        ctx.strokeText(displayText, x, y);
        ctx.fillText(displayText, x, y);
      };

      // Draw Top Text (centered slightly below the top)
      if (topText.trim()) {
        ctx.textBaseline = 'top';
        // Wrap text if too long
        const words = topText.split(' ');
        let line = '';
        let y = 15;
        const maxWidth = canvas.width - 30;

        for (let i = 0; i < words.length; i++) {
          const testLine = line + words[i] + ' ';
          const metrics = ctx.measureText(testLine);
          if (metrics.width > maxWidth && i > 0) {
            drawText(line.trim(), canvas.width / 2, y);
            line = words[i] + ' ';
            y += fontSize + 5;
          } else {
            line = testLine;
          }
        }
        drawText(line.trim(), canvas.width / 2, y);
      }

      // Draw Bottom Text (centered slightly above the bottom)
      if (bottomText.trim()) {
        ctx.textBaseline = 'bottom';
        const words = bottomText.split(' ');
        let line = '';
        const lines: string[] = [];
        const maxWidth = canvas.width - 30;

        for (let i = 0; i < words.length; i++) {
          const testLine = line + words[i] + ' ';
          const metrics = ctx.measureText(testLine);
          if (metrics.width > maxWidth && i > 0) {
            lines.push(line.trim());
            line = words[i] + ' ';
          } else {
            line = testLine;
          }
        }
        lines.push(line.trim());

        let y = canvas.height - 15 - (lines.length - 1) * (fontSize + 5);
        for (let i = 0; i < lines.length; i++) {
          drawText(lines[i], canvas.width / 2, y);
          y += fontSize + 5;
        }
      }
    };

    // Use cached image or load new
    if (imageCacheRef.current[selectedMeme.url]) {
      renderImage(imageCacheRef.current[selectedMeme.url]);
    } else {
      const img = new Image();
      // Required to prevent taint error on cross-origin if serving from CDNs, 
      // although here we are local
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        imageCacheRef.current[selectedMeme.url] = img;
        renderImage(img);
      };
      img.src = selectedMeme.url;
    }
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Trigger image download
    const link = document.createElement('a');
    link.download = `bussin-cat-meme-${selectedMeme.id}.jpg`;
    link.href = canvas.toDataURL('image/jpeg', 0.9);
    link.click();
  };

  const handleReset = () => {
    setTopText('WHEN THE FISH');
    setBottomText('IS ACTUALLY BUSSIN');
    setFontSize(36);
    setIsUppercase(true);
  };

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 border border-orange-100 shadow-md transition-all hover:shadow-lg">
      <div className="flex items-center gap-2 mb-6">
        <span className="p-1.5 bg-orange-50 rounded-lg text-orange-500">
          <Sparkles className="w-5 h-5 animate-pulse" />
        </span>
        <h3 className="font-display font-bold text-xl text-zinc-900">Interactive Meme Studio</h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side: Controls (5 columns) */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          {/* Pick Image Slider/Selector */}
          <div>
            <label className="text-xs font-mono font-medium text-zinc-400 uppercase tracking-wider mb-2 block">
              1. Select Template Cat
            </label>
            <div className="grid grid-cols-5 gap-2">
              {MEME_GALLERY.map((meme) => (
                <button
                  key={meme.id}
                  onClick={() => setSelectedMeme(meme)}
                  className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    selectedMeme.id === meme.id
                      ? 'border-orange-500 ring-2 ring-orange-100 scale-95 shadow'
                      : 'border-zinc-100 opacity-60 hover:opacity-100 hover:border-zinc-300'
                  }`}
                >
                  <img
                    src={meme.url}
                    alt={meme.alt}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
            <div className="mt-1.5 text-xs text-zinc-400 font-sans italic">
              Current: {selectedMeme.title}
            </div>
          </div>

          {/* Texts inputs */}
          <div className="flex flex-col gap-3">
            <div>
              <label className="text-xs font-mono font-medium text-zinc-400 uppercase tracking-wider mb-1 block">
                2. Top Text
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={topText}
                  onChange={(e) => setTopText(e.target.value)}
                  placeholder="Enter top caption..."
                  className="w-full bg-zinc-50 border border-zinc-100 hover:border-zinc-200 focus:border-orange-300 focus:bg-white rounded-xl py-2.5 px-4 text-sm text-zinc-800 transition-all outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-mono font-medium text-zinc-400 uppercase tracking-wider mb-1 block">
                3. Bottom Text
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={bottomText}
                  onChange={(e) => setBottomText(e.target.value)}
                  placeholder="Enter bottom caption..."
                  className="w-full bg-zinc-50 border border-zinc-100 hover:border-zinc-200 focus:border-orange-300 focus:bg-white rounded-xl py-2.5 px-4 text-sm text-zinc-800 transition-all outline-none"
                />
              </div>
            </div>
          </div>

          {/* Custom Settings */}
          <div className="bg-zinc-50 rounded-2xl p-4 border border-zinc-100 flex flex-col gap-4">
            {/* Font Size */}
            <div className="flex flex-col gap-1">
              <div className="flex justify-between items-center text-xs">
                <span className="font-mono font-medium text-zinc-400 uppercase tracking-wider">Font Size</span>
                <span className="font-bold text-zinc-600">{fontSize}px</span>
              </div>
              <input
                type="range"
                min="16"
                max="60"
                step="2"
                value={fontSize}
                onChange={(e) => setFontSize(parseInt(e.target.value))}
                className="w-full accent-orange-500 cursor-pointer h-1 bg-zinc-200 rounded-lg"
              />
            </div>

            {/* Letter formatting flags */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-medium text-zinc-400 uppercase tracking-wider">Auto CAPITALIZE</span>
              <button
                onClick={() => setIsUppercase(!isUppercase)}
                className={`w-11 h-6 rounded-full transition-colors relative ${
                  isUppercase ? 'bg-orange-500' : 'bg-zinc-200'
                }`}
              >
                <span
                  className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
                    isUppercase ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-2">
            <button
              onClick={handleDownload}
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-display font-semibold rounded-2xl py-3 px-4 shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download Meme
            </button>
            <button
              onClick={handleReset}
              className="bg-zinc-100 hover:bg-zinc-200 text-zinc-600 font-semibold rounded-2xl p-3 transition-colors"
              title="Reset Settings"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Side: Interactive Live Preview (7 columns) */}
        <div className="lg:col-span-7 flex items-center justify-center bg-zinc-900 rounded-2xl p-4 border border-zinc-800 relative group overflow-hidden">
          {/* Frame decorative overlay */}
          <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md border border-zinc-700/50 rounded-lg px-2.5 py-1 text-[10px] font-mono font-medium text-zinc-400 z-10 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></span>
            LIVE CANVAS PREVIEW
          </div>

          {/* The canvas itself, scaled dynamically with responsive max width */}
          <div className="w-full max-w-lg aspect-[4/3] relative flex items-center justify-center">
            <canvas
              ref={canvasRef}
              width={500}
              height={375}
              className="w-full h-auto rounded-xl shadow-2xl bg-zinc-950 border border-zinc-800"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
