import React, { useState } from 'react';
import { Sparkles, Calendar, Layers, Image as ImageIcon, Send, Copy, AlertCircle, CheckCircle2 } from 'lucide-react';

interface BriefPlannerProps {
  onInsertBriefIntoContact: (briefText: string) => void;
}

export default function BriefPlanner({ onInsertBriefIntoContact }: BriefPlannerProps) {
  const [serviceType, setServiceType] = useState<'beauty' | 'fashion' | 'product' | 'mannequin'>('beauty');
  const [complexity, setComplexity] = useState<'standard' | 'high-end' | 'ultra-advertising'>('high-end');
  const [imageCount, setImageCount] = useState<number>(5);
  const [turnaround, setTurnaround] = useState<'standard' | 'express'>('standard');
  
  // Custom checklist states
  const [includePSD, setIncludePSD] = useState(false);
  const [backdropReplacement, setBackdropReplacement] = useState(false);
  const [focusStacking, setFocusStacking] = useState(false);
  const [confidentialNDA, setConfidentialNDA] = useState(true);

  const [copied, setCopied] = useState(false);
  const [applied, setApplied] = useState(false);

  // Define pricing constants
  const basePrices = {
    beauty: { standard: 18, 'high-end': 28, 'ultra-advertising': 55 },
    fashion: { standard: 15, 'high-end': 25, 'ultra-advertising': 48 },
    product: { standard: 20, 'high-end': 35, 'ultra-advertising': 70 },
    mannequin: { standard: 12, 'high-end': 20, 'ultra-advertising': 35 }
  };

  const getPricePerImage = () => {
    let price = basePrices[serviceType][complexity];
    if (includePSD) price += 10;
    if (backdropReplacement) price += 15;
    if (focusStacking) price += 12;
    return price;
  };

  const calculateTotal = () => {
    const pricePerImage = getPricePerImage();
    let total = pricePerImage * imageCount;
    if (turnaround === 'express') {
      total = total * 1.5; // +50% rush fee
    }
    return Math.round(total * 100) / 100;
  };

  const pricePerImage = getPricePerImage();
  const totalPrice = calculateTotal();

  const getBriefText = () => {
    const servicesMap = {
      beauty: 'High-End Beauty Retouching (Portrait/Commercial)',
      fashion: 'Fashion & Structural Editorial Retouching',
      product: 'Luxury Product & E-commerce Advertising',
      mannequin: 'Ghost Mannequin & Apparel Retouching'
    };
    const complexityMap = {
      standard: 'Standard Clean (Global balancing, simple skin/cleaning)',
      'high-end': 'High-End Portfolio (Frequency Separation, dodge & burn, custom grading)',
      'ultra-advertising': 'Ultra Advertising Campaign (Compositing, pixel-perfect rebuilds)'
    };

    return `=== PORTFOLIO RETOUCHING SPECIFICATION ===
Service: ${servicesMap[serviceType]}
Complexity Mode: ${complexityMap[complexity]}
Image Volume: ${imageCount} raw images
Timeline: ${turnaround === 'express' ? 'Express Rush (24-48 hr delivery)' : 'Standard Delivery (3-5 business days)'}

Additive Options:
- Organized Multi-Layer PSD Source: ${includePSD ? 'YES (+$10/im)' : 'No (TIFF/JPG default)'}
- Architectural Backdrop/Composite Replacement: ${backdropReplacement ? 'YES (+$15/im)' : 'No'}
- Focus Stacking Macro Blending: ${focusStacking ? 'YES (+$12/im)' : 'No'}
- NDA / Complete Client Privacy Required: ${confidentialNDA ? 'YES (Enforced)' : 'No'}

Pricing Estimate:
- Rate per image: $${pricePerImage.toFixed(2)}
- Total Project Investment: $${totalPrice.toFixed(2)}
==========================================`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getBriefText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleApply = () => {
    onInsertBriefIntoContact(getBriefText());
    setApplied(true);
    setTimeout(() => setApplied(false), 2500);
  };

  return (
    <div className="bg-neutral-900 border border-neutral-800/80 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden backdrop-blur-md">
      {/* Decorative Warm Backlight */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-brand-gold/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Left Interactive Panel */}
        <div className="w-full md:w-3/5 space-y-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-gold/10 border border-brand-gold/20 rounded-full mb-3 text-brand-gold font-sans text-xs uppercase tracking-widest font-medium">
              <Sparkles className="w-3 h-3" /> Step-by-Step Estimator
            </div>
            <h3 className="text-2xl md:text-3xl font-serif text-brand-light tracking-wide">
              Calculate Post-Production
            </h3>
            <p className="text-sm text-neutral-400 mt-1.5 font-sans leading-relaxed">
              Tailor PixelSakib's focus parameters to match your dynamic photography workflow.
            </p>
          </div>

          {/* 1. Category selector */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-neutral-400 uppercase tracking-widest font-mono">
              1. Project Category
            </label>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
              {(['beauty', 'fashion', 'product', 'mannequin'] as const).map((category) => (
                <button
                  key={category}
                  onClick={() => setServiceType(category)}
                  className={`py-3 px-1 text-center rounded-xl font-sans text-[11px] md:text-xs border transition-all duration-300 font-medium capitalize ${
                    serviceType === category
                      ? 'bg-brand-gold text-neutral-950 border-brand-gold shadow-[0_0_15px_rgba(var(--brand-accent-rgb),0.25)] font-bold'
                      : 'bg-neutral-950 text-neutral-400 border-neutral-800 hover:border-neutral-700 hover:text-neutral-200'
                  }`}
                >
                  {category === 'mannequin' ? 'Ghost Mannequin' : category}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Complexity selector */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-neutral-400 uppercase tracking-widest font-mono flex justify-between">
              <span>2. Level of Intervention</span>
              <span className="text-[10px] text-brand-gold normal-case">D&B density variations</span>
            </label>
            <div className="space-y-2.5">
              {[
                {
                  id: 'high-end',
                  title: 'High-End Masterclass Portfolio',
                  desc: 'Manual frequency separation, extensive dodge-and-burn, hair sculpt, precise grading.'
                },
                {
                  id: 'ultra-advertising',
                  title: 'Ultra High-Gloss Advertising',
                  desc: 'Major high-resolution compositing, extreme jewel/texture sharpening, master grading.'
                }
              ].map((lvl) => (
                <div
                  key={lvl.id}
                  onClick={() => setComplexity(lvl.id as any)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all duration-300 flex items-start gap-3 ${
                    complexity === lvl.id
                      ? 'bg-neutral-950/80 border-brand-gold/60 text-brand-light shadow-md'
                      : 'bg-neutral-950/30 border-neutral-800/80 hover:border-neutral-700 text-neutral-400'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full border mt-0.5 flex items-center justify-center ${
                    complexity === lvl.id ? 'border-brand-gold' : 'border-neutral-700'
                  }`}>
                    {complexity === lvl.id && <div className="w-2 h-2 rounded-full bg-brand-gold" />}
                  </div>
                  <div className="flex flex-col">
                    <span className={`text-xs md:text-sm font-semibold ${complexity === lvl.id ? 'text-brand-gold-light' : 'text-neutral-300'}`}>
                      {lvl.title}
                    </span>
                    <span className="text-[11px] text-neutral-500 mt-0.5 font-sans leading-tight">
                      {lvl.desc}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Slider quantity */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold text-neutral-400 uppercase tracking-widest font-mono">
                3. High-Res Image Count
              </label>
              <span className="font-mono text-sm font-bold text-brand-gold bg-brand-gold/10 px-3 py-1 rounded-md border border-brand-gold/20">
                {imageCount} {imageCount === 1 ? 'Frame' : 'Frames'}
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="50"
              value={imageCount}
              onChange={(e) => setImageCount(parseInt(e.target.value))}
              className="w-full accent-brand-gold h-1.5 bg-neutral-950 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-neutral-600 font-mono">
              <span>1 FRAME</span>
              <span>10 FRAMES</span>
              <span>25 FRAMES</span>
              <span>50+ FRAMES</span>
            </div>
          </div>

          {/* 4. Additives checklist */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-neutral-400 uppercase tracking-widest font-mono">
              4. Deliverable Formatting & Assets
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {[
                {
                  id: 'psd',
                  title: 'Layered PSD Files',
                  price: '+$10 / img',
                  active: includePSD,
                  toggle: () => setIncludePSD(!includePSD),
                  desc: 'Includes retouch/D&B layers intact.'
                },
                {
                  id: 'backdrop',
                  title: 'Backdrop Composite',
                  price: '+$15 / img',
                  active: backdropReplacement,
                  toggle: () => setBackdropReplacement(!backdropReplacement),
                  desc: 'Sky/backdrop clean substitution.'
                },
                {
                  id: 'stack',
                  title: 'Macro Focus Stack',
                  price: '+$12 / img',
                  active: focusStacking,
                  toggle: () => setFocusStacking(!focusStacking),
                  desc: 'Dynamic alignment of multi-exposures.'
                },
                {
                  id: 'nda',
                  title: 'Secure Client NDA',
                  price: 'Complimentary',
                  active: confidentialNDA,
                  toggle: () => setConfidentialNDA(!confidentialNDA),
                  desc: 'Images never used in portfolio logs.'
                }
              ].map((item) => (
                <div
                  key={item.id}
                  onClick={item.toggle}
                  className={`p-3 rounded-xl border cursor-pointer select-none transition-all duration-300 flex items-start gap-2.5 ${
                    item.active
                      ? 'bg-neutral-950/60 border-brand-gold/40 text-neutral-200'
                      : 'bg-neutral-950/20 border-neutral-800/60 text-neutral-500 hover:border-neutral-700'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={item.active}
                    onChange={() => {}} // handled by div click
                    className="mt-0.5 accent-brand-gold"
                  />
                  <div className="flex flex-col">
                    <div className="flex justify-between gap-1 items-center">
                      <span className={`text-xs font-semibold ${item.active ? 'text-brand-gold-light' : 'text-neutral-400'}`}>
                        {item.title}
                      </span>
                      <span className="text-[9px] font-mono font-semibold text-brand-gold">
                        {item.price}
                      </span>
                    </div>
                    <span className="text-[10px] text-neutral-500 mt-0.5 font-sans leading-tight">
                      {item.desc}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Estimation Breakdown Panel */}
        <div className="w-full md:w-2/5 md:sticky md:top-24 bg-neutral-950 rounded-xl p-6 border border-neutral-800 flex flex-col justify-between self-stretch">
          <div className="space-y-6">
            <h4 className="text-xs font-semibold text-neutral-400 uppercase tracking-widest font-mono text-center border-b border-neutral-900 pb-3">
              Investment Breakdown
            </h4>

            {/* Calculations table */}
            <div className="space-y-3 font-sans text-xs">
              <div className="flex justify-between text-neutral-400">
                <span>Base Image Cost:</span>
                <span className="font-mono text-neutral-200">
                  ${basePrices[serviceType][complexity].toFixed(2)} / frame
                </span>
              </div>

              {includePSD && (
                <div className="flex justify-between text-brand-gold-light">
                  <span>Layered PSD source addon:</span>
                  <span className="font-mono text-neutral-300">+$10.00 / frame</span>
                </div>
              )}
              {backdropReplacement && (
                <div className="flex justify-between text-brand-gold-light">
                  <span>Backdrop Composite replacement:</span>
                  <span className="font-mono text-neutral-300">+$15.00 / frame</span>
                </div>
              )}
              {focusStacking && (
                <div className="flex justify-between text-brand-gold-light">
                  <span>Focus-staked composite:</span>
                  <span className="font-mono text-neutral-300">+$12.00 / frame</span>
                </div>
              )}

              <div className="border-t border-neutral-800 my-2 pt-2 flex justify-between font-medium text-neutral-300">
                <span>Rate per retouched photo:</span>
                <span className="font-mono text-brand-gold text-sm">${pricePerImage.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-neutral-400">
                <span>Volume Premium multiplier:</span>
                <span className="font-mono text-neutral-200">x {imageCount} frames</span>
              </div>

              {/* Turnaround speed */}
              <div className="border-t border-neutral-900 pt-3">
                <span className="text-[10px] text-neutral-500 font-mono uppercase tracking-widest block mb-2">
                  5. Post-Production Timeline
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setTurnaround('standard')}
                    className={`py-2 px-1 text-center rounded-lg font-sans text-xs transition-all duration-300 border ${
                      turnaround === 'standard'
                        ? 'bg-neutral-900 text-brand-gold border-brand-gold/60'
                        : 'bg-transparent text-neutral-500 border-neutral-900 hover:text-neutral-300'
                    }`}
                  >
                    Standard (3-5 days)
                  </button>
                  <button
                    onClick={() => setTurnaround('express')}
                    className={`py-2 px-1 text-center rounded-lg font-sans text-xs transition-all duration-300 border ${
                      turnaround === 'express'
                        ? 'bg-rose-950/20 text-rose-400 border-rose-500/50 shadow-md'
                        : 'bg-transparent text-neutral-500 border-neutral-900 hover:text-neutral-300'
                    }`}
                  >
                    Express Rush (+50%)
                  </button>
                </div>
              </div>
            </div>

            {/* Total value callout */}
            <div className="bg-gradient-to-br from-neutral-900 to-neutral-950 p-4 rounded-xl border border-brand-gold/15 text-center mt-4">
              <span className="text-[10px] text-neutral-500 font-mono uppercase tracking-widest block">
                Estimated Investment Total
              </span>
              <span className="text-4xl font-serif font-semibold text-brand-gold tracking-tighter inline-block mt-1">
                ${totalPrice.toFixed(2)}
              </span>
              <span className="text-[10px] text-neutral-500 block mt-1 font-sans">
                *Subject to sample check and briefing details.
              </span>
            </div>
          </div>

          <div className="space-y-2 mt-6">
            <button
              onClick={handleApply}
              className="w-full py-3 bg-brand-gold hover:bg-brand-gold-light text-neutral-950 font-semibold rounded-xl text-xs md:text-sm font-sans tracking-wide transition-all duration-300 shadow-[0_5px_15px_rgba(var(--brand-accent-rgb),0.25)] flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              {applied ? 'Brief Sent to Form!' : 'Add Brief Details to Inquiry Form'}
            </button>

            <button
              onClick={handleCopy}
              className="w-full py-2 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white rounded-xl text-xs font-mono transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer border border-neutral-800"
            >
              {copied ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-400 animate-pulse" />
                  Copied Specifications!
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-neutral-500" />
                  Copy Structured Brief Code
                </>
              )}
            </button>
            <div className="flex items-start gap-1 justify-center mt-2">
              <AlertCircle className="w-3 h-3 text-neutral-600 mt-0.5" />
              <p className="text-[9px] text-neutral-500 font-sans max-w-[200px] text-center">
                We accept TIFF, PSD, raw exports, and DNG formats. Retouch parameters are fully non-destructive.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
