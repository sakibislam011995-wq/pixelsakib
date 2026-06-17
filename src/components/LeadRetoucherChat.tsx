import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Sparkles, User, RefreshCw, MessageCircle } from 'lucide-react';

interface Message {
  id: string;
  sender: 'retoucher' | 'user';
  text: string;
  timestamp: string;
  isTyping?: boolean;
}

type ChatStep = 
  | 'GREETING'
  | 'SERVICE_CHOSEN'
  | 'ASK_COMPLEXITY'
  | 'ASK_QUANTITY'
  | 'CALCULATE_OFFER'
  | 'COLLECT_CONTACT'
  | 'FINISHED';

export default function LeadRetoucherChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const [currentStep, setCurrentStep] = useState<ChatStep>('GREETING');
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  // Track parameters of the user's inquiry for smart calculations
  const [formData, setFormData] = useState({
    service: '',
    complexity: '',
    quantity: 0,
    email: ''
  });

  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll on new messages
  useEffect(() => {
    if (chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  // Initial greeting sequence
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      triggerRetoucherMessage(
        "Hi there! 👋 I'm Sakib, Lead Retoucher here. Are you looking to elevate some of your master frames today? Let's quickly plan your retouching requirements!",
        1000
      );
      setHasUnread(false);
    }
  }, [isOpen]);

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const triggerRetoucherMessage = (text: string, delayMs = 1200) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        {
          id: Math.random().toString(),
          sender: 'retoucher',
          text,
          timestamp: getCurrentTime()
        }
      ]);
    }, delayMs);
  };

  const handleUserMessageSend = (text: string) => {
    if (!text.trim()) return;

    // Append user message
    setMessages(prev => [
      ...prev,
      {
        id: Math.random().toString(),
        sender: 'user',
        text,
        timestamp: getCurrentTime()
      }
    ]);

    // Advance the conversation state machine
    advanceStateMachine(text);
  };

  const advanceStateMachine = (userResponse: string) => {
    switch (currentStep) {
      case 'GREETING': {
        // User reports service focus
        const cleaned = userResponse.toLowerCase();
        let detectedService = 'Beauty Portraiture';
        let sysKey = 'beauty';
        
        if (cleaned.includes('fashion') || cleaned.includes('editorial')) {
          detectedService = 'Editorial Fashion';
          sysKey = 'fashion';
        } else if (cleaned.includes('product') || cleaned.includes('luxury')) {
          detectedService = 'Luxury Product & Jewelry';
          sysKey = 'product';
        } else if (cleaned.includes('ghost') || cleaned.includes('mannequin') || cleaned.includes('invisible')) {
          detectedService = 'Ghost Mannequin & Apparel';
          sysKey = 'mannequin';
        } else if (cleaned.includes('creative') || cleaned.includes('custom') || cleaned.includes('mix')) {
          detectedService = 'Custom Retouching Mix';
          sysKey = 'custom';
        }

        setFormData(prev => ({ ...prev, service: sysKey }));
        setCurrentStep('SERVICE_CHOSEN');
        
        triggerRetoucherMessage(
          `Excellent choice! ${detectedService} requires high-precision non-destructive channels. What level of intervention/precision are we targeting? High-End Editorial, or Ultra-Gloss Advertising?`,
          1400
        );
        break;
      }

      case 'SERVICE_CHOSEN': {
        const cleaned = userResponse.toLowerCase();
        let level = 'High-End Masterclass (Manual D&B)';
        let sysComplexity = 'high-end';

        if (cleaned.includes('ultra') || cleaned.includes('gloss') || cleaned.includes('advertising') || cleaned.includes('commercial')) {
          level = 'Ultra High-Gloss Advertising (Compositing & Macro details)';
          sysComplexity = 'ultra';
        }

        setFormData(prev => ({ ...prev, complexity: sysComplexity }));
        setCurrentStep('ASK_QUANTITY');

        triggerRetoucherMessage(
          `Understood. We will employ specialized manual frequency separation and custom Micro Dodge & Burn for that ${level}. Roughly how many master frames are we planning? (e.g., 5 frames, 10, or a batch of 25?)`,
          1500
        );
        break;
      }

      case 'ASK_QUANTITY': {
        const numbers = userResponse.match(/\d+/);
        const count = numbers ? parseInt(numbers[0]) : 5;

        setFormData(prev => ({ ...prev, quantity: count }));
        setCurrentStep('CALCULATE_OFFER');

        // Formulate a smart simulated premium estimate based on categories
        const rates: Record<string, { highEnd: number; ultra: number }> = {
          beauty: { highEnd: 28, ultra: 55 },
          fashion: { highEnd: 25, ultra: 48 },
          product: { highEnd: 35, ultra: 70 },
          mannequin: { highEnd: 20, ultra: 35 },
          custom: { highEnd: 30, ultra: 60 }
        };

        const activeService = formData.service || 'beauty';
        const pricingTier = rates[activeService] || rates.beauty;
        const perImageRate = formData.complexity === 'ultra' ? pricingTier.ultra : pricingTier.highEnd;
        const totalCost = perImageRate * count;

        let discountText = "";
        let finalCost = totalCost;
        if (count >= 10) {
          finalCost = Math.round(totalCost * 0.9); // 10% studio volume discount
          discountText = " (including a 10% volume premium deduction!)";
        }

        triggerRetoucherMessage(
          `Fabulous. For ${count} premium frames, our targeted studio quote is approximately $${perImageRate}/image, coming to about $${finalCost}${discountText}. How does that align with your campaign post-production budget?`,
          1800
        );
        break;
      }

      case 'CALCULATE_OFFER': {
        setCurrentStep('COLLECT_CONTACT');
        triggerRetoucherMessage(
          `Perfect! I can lock in this priority slot on our lead intake board. What's the best professional email address to coordinate raw file delivery and set up our custom non-disclosure agreement (NDA)?`,
          1500
        );
        break;
      }

      case 'COLLECT_CONTACT': {
        const email = userResponse;
        setFormData(prev => ({ ...prev, email }));
        setCurrentStep('FINISHED');

        // Pre-fill the standard reservation info and simulate transfer
        const briefBlock = `--- SIMULATED CHAT RESERVATION ---
Service: ${formData.service.toUpperCase()}
Intervention: ${formData.complexity.toUpperCase()}
Quantity: ${formData.quantity} Frames
Lead Contact: ${email}
Status: Chat Verified Direct Slot`;

        // Update the main document inputs if they are available
        try {
          const contactMessageEl = document.querySelector('textarea[placeholder*="project details"]') as HTMLTextAreaElement;
          const contactEmailEl = document.querySelector('input[type="email"]') as HTMLInputElement;
          if (contactMessageEl) {
            contactMessageEl.value = `Interactive Chat Reservation:\nCategory: ${formData.service}\nComplexity: ${formData.complexity}\nQuantity: ${formData.quantity} images\nEmail: ${email}\n\n"Let's finalize this high-precision set."`;
            // Trigger input events to refresh react states
            contactMessageEl.dispatchEvent(new Event('input', { bubbles: true }));
          }
          if (contactEmailEl) {
            contactEmailEl.value = email;
            contactEmailEl.dispatchEvent(new Event('input', { bubbles: true }));
          }
        } catch (e) {
          console.error("UI link issue", e);
        }

        triggerRetoucherMessage(
          `Brilliant! I've automatically compiled your production parameters and pre-loaded them into our workspace lead deck below. Let's make your images absolutely stunning! Let me know if there is anything else.`,
          1600
        );
        break;
      }

      case 'FINISHED': {
        triggerRetoucherMessage(
          "I'm fully primed and on standby! To restart this interactive brief, click the reset loop button in the chat header.",
          1000
        );
        break;
      }
    }
  };

  const handleReset = () => {
    setMessages([]);
    setCurrentStep('GREETING');
    setFormData({ service: '', complexity: '', quantity: 0, email: '' });
    triggerRetoucherMessage(
      "Conversation reset! 🔄 Select a service below to construct a new high-end production estimate with me.",
      800
    );
  };

  const currentSuggestions = () => {
    switch (currentStep) {
      case 'GREETING':
        return [
          'Beauty Portraiture',
          'Fashion & Editorial',
          'Luxury Product',
          'Ghost Mannequin'
        ];
      case 'SERVICE_CHOSEN':
        return [
          'High-End Masterclass',
          'Ultra-Gloss Advertising'
        ];
      case 'ASK_QUANTITY':
        return [
          '5 Master Frames',
          '10 Portfolio Frames',
          '25 Advertising Targets'
        ];
      case 'CALCULATE_OFFER':
        return [
          'Aligns perfectly, let\'s lock it!',
          'Sounds reasonable, how do we send files?'
        ];
      case 'COLLECT_CONTACT':
        return [
          'test@agency.com',
          'studio@photographer.com'
        ];
      default:
        return [];
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] font-sans">
      <AnimatePresence>
        {/* Floating Chat Trigger Button Stack */}
        {!isOpen && (
          <div className="flex flex-col gap-3.5 items-end">
            {/* WhatsApp Support Direct Button */}
            <motion.a
              href="https://wa.me/8801614356117?text=Hi%20Sakib%2C%20I'm%20visiting%20your%20portfolio%20and%20looking%20for%20some%20high-end%20photo%20retouching!"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ scale: 0, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0, y: 15 }}
              transition={{ delay: 0.1 }}
              className="relative flex items-center justify-center w-14 h-14 rounded-full bg-emerald-600 text-white shadow-[0_4px_24px_rgba(16,185,129,0.35)] hover:scale-105 hover:bg-emerald-500 transition-all cursor-pointer group"
              title="Chat live with Sakib via WhatsApp"
            >
              <MessageCircle className="w-7 h-7 stroke-[2.2]" />
              <span className="absolute -top-1 -right-1 flex h-5 w-5 select-none text-white pointer-events-none">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-80"></span>
                <span className="relative inline-flex rounded-full h-5 w-5 bg-emerald-500 text-[7px] font-extrabold items-center justify-center font-mono leading-none border border-white/20 uppercase">Live</span>
              </span>
              
              {/* Hover tooltip */}
              <span className="absolute right-16 bg-neutral-950 border border-neutral-800 text-neutral-200 text-[10px] font-semibold tracking-wider font-mono py-1.5 px-3 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none uppercase shadow-md flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                WhatsApp Live Support
              </span>
            </motion.a>

            {/* Interactive Planner Button */}
            <motion.button
              id="chat-trigger-btn"
              initial={{ scale: 0, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0, y: 15 }}
              onClick={() => setIsOpen(true)}
              className="relative flex items-center justify-center w-14 h-14 rounded-full bg-brand-gold text-neutral-950 shadow-[0_4px_24px_rgba(var(--brand-accent-rgb),0.35)] hover:scale-105 transition-all cursor-pointer group"
            >
              <MessageSquare className="w-6 h-6 stroke-[2.2]" />
              {hasUnread && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-5 w-5 bg-emerald-500 text-[8px] font-bold text-white items-center justify-center">1</span>
                </span>
              )}
              
              {/* Hover tooltip */}
              <span className="absolute right-16 bg-neutral-950 border border-neutral-800 text-neutral-200 text-[10px] font-semibold tracking-wider font-mono py-1.5 px-3 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none uppercase shadow-md">
                Interactive Brief Planner
              </span>
            </motion.button>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {/* Chat Dialog Window */}
        {isOpen && (
          <motion.div
            id="chat-window-container"
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="w-[360px] md:w-[380px] h-[520px] rounded-2xl bg-neutral-950 border border-neutral-850/90 shadow-[0_12px_40px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-neutral-900 border-b border-neutral-850 p-4 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center text-brand-gold">
                    <User className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-neutral-950 animate-pulse"></span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-neutral-100 tracking-wide flex items-center gap-1 font-mono uppercase">
                    Sakib Islam <Sparkles className="w-3 h-3 text-brand-gold" />
                  </h4>
                  <span className="text-[10px] text-neutral-500 font-medium">Lead Retoucher • Online</span>
                </div>
              </div>
              
              <div className="flex items-center gap-1">
                <button
                  onClick={handleReset}
                  className="p-1.5 text-neutral-500 hover:text-brand-gold rounded-lg hover:bg-neutral-950 transition-all cursor-pointer"
                  title="Reset conversation flow"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 text-neutral-500 hover:text-red-400 rounded-lg hover:bg-neutral-950 transition-all cursor-pointer"
                  title="Minimize chat"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Conversation Flow Banner */}
            <div className="bg-neutral-900/40 px-4 py-1.5 border-b border-neutral-900/60 flex items-center gap-2 text-[9px] font-mono text-neutral-500 uppercase tracking-wider">
              <span className="font-bold text-brand-gold">RETUNE LEVEL:</span>
              <span className="text-neutral-400 truncate">
                {currentStep === 'GREETING' && 'Selecting Project Category'}
                {currentStep === 'SERVICE_CHOSEN' && 'Complexity parameters'}
                {currentStep === 'ASK_QUANTITY' && 'Estimating Image Volume'}
                {currentStep === 'CALCULATE_OFFER' && 'Formulating customized budget'}
                {currentStep === 'COLLECT_CONTACT' && 'Syncing intake desks'}
                {currentStep === 'FINISHED' && 'Manifest exported!'}
              </span>
            </div>

            {/* WhatsApp Live Handover Banner */}
            <div className="bg-emerald-950/40 border-b border-emerald-900/50 px-4 py-2 flex items-center justify-between gap-3 text-xs shrink-0">
              <div className="flex items-center gap-2">
                <div className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </div>
                <p className="text-[10px] sm:text-[11px] text-neutral-300 font-medium font-sans leading-tight">
                  Prefer direct human chat? <span className="text-white font-semibold">WhatsApp is live!</span>
                </p>
              </div>
              <a
                href="https://wa.me/8801614356117?text=Hi%20Sakib%2C%20I'm%20visiting%20your%20portfolio%20and%20need%20some%20images%20retouched!"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-[10px] tracking-wide transition-all font-sans whitespace-nowrap cursor-pointer shadow-sm select-none uppercase hover:scale-[1.02] active:scale-[0.98]"
              >
                <MessageCircle className="w-3.5 h-3.5 stroke-[2.2]" />
                <span>Chat Live</span>
              </a>
            </div>

            {/* Message Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 custom-scrollbar bg-neutral-950/90">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[82%] rounded-2xl p-3 text-xs leading-relaxed transition-all shadow-sm ${
                      msg.sender === 'user'
                        ? 'bg-brand-gold text-neutral-950 font-medium rounded-tr-none'
                        : 'bg-neutral-900 border border-neutral-850/80 text-neutral-300 rounded-tl-none'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                    <span
                      className={`text-[8px] mt-1.5 block text-right font-mono tracking-tighter ${
                        msg.sender === 'user' ? 'text-neutral-950/70' : 'text-neutral-500'
                      }`}
                    >
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              ))}

              {/* Typing simulation */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-neutral-900 border border-neutral-850/80 rounded-2xl rounded-tl-none p-3.5 shadow-sm">
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-brand-gold rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 bg-brand-gold rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 bg-brand-gold rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={chatBottomRef} />
            </div>

            {/* Suggested Chip Inputs */}
            {currentSuggestions().length > 0 && (
              <div className="p-2.5 bg-neutral-900/30 border-t border-neutral-900/70">
                <div className="flex flex-wrap gap-1.5">
                  {currentSuggestions().map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        handleUserMessageSend(suggestion);
                      }}
                      className="text-[10px] py-1 px-2.5 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-brand-gold text-neutral-300 hover:text-brand-gold transition-all cursor-pointer font-sans"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (inputValue.trim()) {
                  handleUserMessageSend(inputValue);
                  setInputValue('');
                }
              }}
              className="p-3 bg-neutral-900 border-t border-neutral-850 flex items-center gap-2"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={
                  currentStep === 'COLLECT_CONTACT' 
                    ? 'Enter email to link briefs...'
                    : 'Type a message to Sakib...'
                }
                className="flex-1 bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2 text-xs text-neutral-100 placeholder-neutral-600 focus:outline-none focus:border-brand-gold/60 transition-all font-sans"
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="p-2 rounded-xl bg-brand-gold text-neutral-950 hover:bg-brand-gold-light transition-all disabled:opacity-40 disabled:hover:bg-brand-gold cursor-pointer"
              >
                <Send className="w-3.5 h-3.5 stroke-[2.2]" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
