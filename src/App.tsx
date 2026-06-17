import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Camera,
  Layers,
  Image as ImageIcon,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Phone,
  Mail,
  Shield,
  Clock,
  X,
  Upload,
  User,
  Eye,
  Download,
  Loader2,
  Terminal,
  FileText,
  ArrowLeft,
  Search,
  Database,
  Sun,
  Moon,
  Play,
  Pause,
  Instagram,
  Facebook,
  Linkedin,
  Folder,
  FolderArchive,
  Award,
  MapPin,
  Target,
  Quote,
  Palette
} from 'lucide-react';

import { SERVICES, GALLERY_ITEMS, TESTIMONIALS, FAQS, GalleryItem, STUDIO_IMAGES } from './data';
import BeforeAfterSlider from './components/BeforeAfterSlider';
import BriefPlanner from './components/BriefPlanner';
import StudioStats from './components/StudioStats';
import Helmet from './components/Helmet';
import LeadRetoucherChat from './components/LeadRetoucherChat';

export default function App() {
  const [activeCategory, setActiveCategory] = useState<'All' | 'Beauty' | 'Fashion' | 'Product'>('All');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  // Day / Night toggler state (defaults to Night/Dark mode, as is accurate for high-end studio)
  const [isNight, setIsNight] = useState<boolean>(() => {
    const saved = localStorage.getItem('pixel-sakib-theme');
    if (saved) return saved === 'night';
    return true; // Night default
  });

  useEffect(() => {
    if (isNight) {
      document.documentElement.classList.remove('light');
      localStorage.setItem('pixel-sakib-theme', 'night');
    } else {
      document.documentElement.classList.add('light');
      localStorage.setItem('pixel-sakib-theme', 'day');
    }
  }, [isNight]);
  
  // Auto-load portfolio item if shared in URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const projectId = params.get('project');
    if (projectId) {
      const match = GALLERY_ITEMS.find(item => item.id === projectId);
      if (match) {
        setSelectedItem(match);
      }
    }
  }, []);
  
  // Hi-Res high-fidelity simulated download state
  const [isSlideshowActive, setIsSlideshowActive] = useState<boolean>(false);
  const [downloadingItemId, setDownloadingItemId] = useState<string | null>(null);
  const [downloadProgress, setDownloadProgress] = useState<number>(0);
  const [downloadStep, setDownloadStep] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    if (!selectedItem) {
      setIsSlideshowActive(false);
    }
  }, [selectedItem]);

  const handleDownloadHiRes = (item: GalleryItem) => {
    if (downloadingItemId) return;
    
    setDownloadingItemId(item.id);
    setDownloadProgress(0);
    setDownloadStep('Establishing secure handshake with storage-node-03...');

    const steps = [
      { progress: 15, text: 'Acquiring uncompressed 16-bit TIFF source...' },
      { progress: 38, text: 'Applying ProPhoto RGB profile calibration...' },
      { progress: 62, text: 'Verifying frequency separation detail scales...' },
      { progress: 85, text: 'Exporting 100% quality JPEG container...' },
      { progress: 100, text: 'Releasing file for browser download...' }
    ];

    let currentStepIdx = 0;
    
    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        const increment = Math.floor(Math.random() * 12) + 6;
        const nextProgress = Math.min(prev + increment, 100);
        
        if (currentStepIdx < steps.length && nextProgress >= steps[currentStepIdx].progress) {
          setDownloadStep(steps[currentStepIdx].text);
          currentStepIdx++;
        }

        if (nextProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            const link = document.createElement('a');
            link.href = item.imageUrl;
            const cleanName = item.title.toLowerCase().replace(/[^a-z0-9]+/g, '_');
            link.download = `${cleanName}_pixelsakib_hq.jpg`;
            link.setAttribute('target', '_blank');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            setTimeout(() => {
              setDownloadingItemId(null);
              setDownloadProgress(0);
              setDownloadStep('');
            }, 1000);
          }, 600);
          return 100;
        }
        return nextProgress;
      });
    }, 150);
  };
  
  // Technical Logs states & helpers
  interface LogEntry {
    timestamp: string;
    tool: string;
    action: string;
    intensity?: string;
    status: 'SUCCESS' | 'CALIBRATED' | 'COMPLETED' | 'APPLIED';
  }

  const [showLogs, setShowLogs] = useState<boolean>(false);
  const [logSearchQuery, setLogSearchQuery] = useState<string>('');

  const getProcessingLogs = (item: GalleryItem): LogEntry[] => {
    const statuses: ('SUCCESS' | 'CALIBRATED' | 'COMPLETED' | 'APPLIED')[] = [
      'SUCCESS', 'CALIBRATED', 'COMPLETED', 'APPLIED'
    ];

    const logs: LogEntry[] = [
      {
        timestamp: "09:02:14 AM",
        tool: "RAW Ingest Engine",
        action: `Decoded raw 16-bit digital master file successfully (ProPhoto RGB color profile).`,
        intensity: "98.4 MB source",
        status: "SUCCESS"
      },
      {
        timestamp: "09:05:40 AM",
        tool: "Chromatic Deck",
        action: `Calibrated ambient white balance parameters; neutralized stray thermal noise.`,
        intensity: "Delta-E < 0.6",
        status: "CALIBRATED"
      }
    ];

    item.retouchSteps.forEach((step, idx) => {
      const minutes = 15 + idx * 14;
      const seconds = Math.floor(Math.sin(idx) * 20) + 30;
      const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
      const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
      
      let toolName = "Detail Brush";
      if (step.toLowerCase().includes("separation") || step.toLowerCase().includes("texture")) {
        toolName = "Freq Separation (16-bit)";
      } else if (step.toLowerCase().includes("dodge") || step.toLowerCase().includes("burn")) {
        toolName = "Curves Dodge & Burn";
      } else if (step.toLowerCase().includes("blemish") || step.toLowerCase().includes("spot") || step.toLowerCase().includes("dust") || step.toLowerCase().includes("stray")) {
        toolName = "Spot Healing Tool";
      } else if (step.toLowerCase().includes("iris") || step.toLowerCase().includes("eye") || step.toLowerCase().includes("whiten")) {
        toolName = "Channel Mask Radial";
      } else if (step.toLowerCase().includes("lip") || step.toLowerCase().includes("gloss") || step.toLowerCase().includes("mouth")) {
        toolName = "Fine Polish Pen";
      } else if (step.toLowerCase().includes("background") || step.toLowerCase().includes("backdrop") || step.toLowerCase().includes("floor")) {
        toolName = "Backdrop Grad Mask";
      } else if (step.toLowerCase().includes("color") || step.toLowerCase().includes("grading") || step.toLowerCase().includes("tone")) {
        toolName = "3D Lookup Table (LUT)";
      } else if (step.toLowerCase().includes("liquif") || step.toLowerCase().includes("sculpt") || step.toLowerCase().includes("shape")) {
        toolName = "Liquify Vector Sculpt";
      }

      logs.push({
        timestamp: `09:${formattedMinutes}:${formattedSeconds} AM`,
        tool: toolName,
        action: step,
        intensity: idx % 2 === 0 ? "Opacity: 12%" : "Hardness: 0%",
        status: statuses[idx % statuses.length]
      });
    });

    logs.push({
      timestamp: `10:55:12 AM`,
      tool: "Quality Audit Engine",
      action: `Exquisite pixel integrity checking passed. Released uncompressed TIFF master.`,
      intensity: "Lossless / Passed",
      status: "SUCCESS"
    });

    return logs;
  };

  const handleExportLOG = (item: GalleryItem, logs: LogEntry[]) => {
    const header = [
      `================================================================`,
      `  PIXELSAKIB STUDIO OPERATOR TERMINAL - PROCESSING LOG REPORT   `,
      `================================================================`,
      `Generated At:  ${new Date().toISOString()}`,
      `File ID:       ${item.id}`,
      `Work Title:    ${item.title}`,
      `Photographer:  ${item.photographer}`,
      `Color Model:   ProPhoto RGB (16-bit / Channel)`,
      `DPI / Ratio:   300 DPI / High-End Commercial Master`,
      `================================================================\n`,
      `STEP-BY-STEP AUDIT CHRONOLOGY:`
    ].join('\n');

    const body = logs.map(l => 
      `[${l.timestamp}] [${l.status}] Tool: ${l.tool.padEnd(25)} | Action: ${l.action}`
    ).join('\n');

    const footer = `\n======================= END OF LOG REPORT =======================`;
    
    const fileContent = `${header}\n${body}\n${footer}`;
    const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${item.id}_${item.title.toLowerCase().replace(/[^a-z0-9]+/g, '_')}_processing_audit.log`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleExportJSON = (item: GalleryItem, logs: LogEntry[]) => {
    const reportData = {
      studio: "PixelSakib Studio",
      reportType: "Detailed Retouching & Post-Production Audit Logs",
      exportTimestamp: new Date().toISOString(),
      sessionMetadata: {
        fileId: item.id,
        workTitle: item.title,
        photographer: item.photographer,
        colorModel: "ProPhoto RGB (16-bit / Channel)",
        dpi: 300,
        dimensions: "Commercial High-Resolution Master"
      },
      equipmentSpecs: {
        camera: item.specs.camera,
        lens: item.specs.lens,
        lighting: item.specs.lighting
      },
      chronicleHistory: logs.map(l => ({
        timestamp: l.timestamp,
        operatorStatus: l.status,
        toolUsed: l.tool,
        actionExecuted: l.action,
        intensitySettings: l.intensity || null
      }))
    };

    const jsonString = JSON.stringify(reportData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${item.id}_${item.title.toLowerCase().replace(/[^a-z0-9]+/g, '_')}_audit_full_history.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };
  
  // Lead Inquiry form state
  const [briefText, setBriefText] = useState<string>('');
  const [clientName, setClientName] = useState<string>('');
  const [clientEmail, setClientEmail] = useState<string>('');
  const [serviceRequirement, setServiceRequirement] = useState<string>('beauty');
  const [uploadedFiles, setUploadedFiles] = useState<Array<{ name: string; size: string; status: 'Ready' | 'Uploading' | 'Verified' | 'Zipping'; zipProgress?: number; fileCount?: number }>>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const [submissionId, setSubmissionId] = useState<string>('');
  const [isDraggingFile, setIsDraggingFile] = useState<boolean>(false);

  // FAQ Accordion open keys
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(1); // Default keep second FAQ open

  // Refs for smooth navigation scrolling
  const aboutRef = useRef<HTMLElement>(null);
  const portfolioRef = useRef<HTMLElement>(null);
  const plannerRef = useRef<HTMLElement>(null);
  const servicesRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  const scrollToSection = (elementRef: React.RefObject<HTMLElement | null>) => {
    if (elementRef.current) {
      elementRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Callback to insert structured brief text into form
  const handleInsertBrief = (text: string) => {
    setBriefText(text);
    // Smoothly scroll down to contact form
    if (contactRef.current) {
      contactRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Filter gallery items
  const filteredGallery = GALLERY_ITEMS.filter(
    (item) => activeCategory === 'All' || item.category === activeCategory
  );

  // Add Keyboard Navigation to Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedItem) return;

      const activeEl = document.activeElement;
      if (activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA')) {
        return;
      }

      if (e.key === 'Escape') {
        setSelectedItem(null);
      } else if (e.key === 'ArrowRight' || e.key === 'Right') {
        const idx = filteredGallery.findIndex((item) => item.id === selectedItem.id);
        if (idx !== -1) {
          const nextIdx = (idx + 1) % filteredGallery.length;
          setSelectedItem(filteredGallery[nextIdx]);
          setShowLogs(false);
          setLogSearchQuery('');
        }
      } else if (e.key === 'ArrowLeft' || e.key === 'Left') {
        const idx = filteredGallery.findIndex((item) => item.id === selectedItem.id);
        if (idx !== -1) {
          const prevIdx = (idx - 1 + filteredGallery.length) % filteredGallery.length;
          setSelectedItem(filteredGallery[prevIdx]);
          setShowLogs(false);
          setLogSearchQuery('');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedItem, filteredGallery]);

  // Automated Slideshow progression effect
  useEffect(() => {
    if (!isSlideshowActive || !selectedItem || filteredGallery.length <= 1) {
      return;
    }

    const timer = setInterval(() => {
      setSelectedItem((curr) => {
        if (!curr) return null;
        const idx = filteredGallery.findIndex((item) => item.id === curr.id);
        if (idx !== -1) {
          const nextIdx = (idx + 1) % filteredGallery.length;
          return filteredGallery[nextIdx];
        }
        return curr;
      });
      setShowLogs(false);
      setLogSearchQuery('');
    }, 5000);

    return () => clearInterval(timer);
  }, [isSlideshowActive, selectedItem, filteredGallery]);

  // Helper to recursively traverse browser entries when actual folders are dropped
  const traverseFileTree = (item: any, path = ""): Promise<File[]> => {
    return new Promise((resolve) => {
      if (item.isFile) {
        item.file((file: File) => {
          resolve([file]);
        });
      } else if (item.isDirectory) {
        const dirReader = item.createReader();
        const allFiles: File[] = [];
        const readEntries = () => {
          dirReader.readEntries(async (entries: any[]) => {
            if (entries.length === 0) {
              resolve(allFiles);
            } else {
              const promises = entries.map(entry => traverseFileTree(entry, path + item.name + "/"));
              const results = await Promise.all(promises);
              results.forEach(files => allFiles.push(...files));
              readEntries();
            }
          });
        };
        readEntries();
      } else {
        resolve([]);
      }
    });
  };

  // Triggers simulated zipping countdown for dropped directory structures
  const triggerFolderZipSimulation = (files: any[], folderName: string) => {
    const archiveName = `${folderName.replace(/[^a-zA-Z0-9_-]/g, '_')}_raw_bundle.zip`;
    const totalSize = files.reduce((acc, f: any) => acc + (f?.size || 0), 0);
    const sizeMb = totalSize > 0 ? (totalSize / (1024 * 1024)) : (25 + Math.random() * 85);
    const compressedSize = (sizeMb * 0.88).toFixed(1); // simulated 12% space saving

    // Append to attached list as "Zipping"
    setUploadedFiles(prev => [...prev, {
      name: archiveName,
      size: `${compressedSize} MB`,
      status: 'Zipping' as const,
      zipProgress: 0,
      fileCount: files.length
    }]);

    // Fast status progress simulation
    let currentProg = 0;
    const timer = setInterval(() => {
      currentProg += Math.floor(Math.random() * 15) + 8;
      if (currentProg >= 100) {
        currentProg = 100;
        clearInterval(timer);
        setUploadedFiles(prev => 
          prev.map(item => 
            item.name === archiveName 
              ? { ...item, status: 'Verified' as const, zipProgress: 100 }
              : item
          )
        );
      } else {
        setUploadedFiles(prev => 
          prev.map(item => 
            item.name === archiveName 
              ? { ...item, zipProgress: currentProg }
              : item
          )
        );
      }
    }, 150);
  };

  // Handle mock file selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      addMockFiles(Array.from(e.target.files));
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingFile(true);
  };

  const handleDragLeave = () => {
    setIsDraggingFile(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingFile(false);

    const items = e.dataTransfer.items;
    if (items && items.length > 0) {
      const entries = Array.from(items)
        .map(item => (item as any).webkitGetAsEntry())
        .filter((entry): entry is any => entry !== null);

      if (entries.some(entry => entry.isDirectory)) {
        // Folder drop detected! Read files recursively
        let folderFiles: File[] = [];
        const promises = entries.map(entry => traverseFileTree(entry));
        const fileBatches = await Promise.all(promises);
        fileBatches.forEach((batch: any) => {
          folderFiles.push(...batch);
        });

        if (folderFiles.length > 0) {
          triggerFolderZipSimulation(folderFiles, entries[0].name);
        }
      } else {
        // Normal files drop
        const files = Array.from(e.dataTransfer.files) as File[];
        if (files.length >= 4) {
          // If 4 or more files are dropped, pack them into a simulated bundle automatically
          triggerFolderZipSimulation(files, "Direct_RAW_Drop");
        } else {
          addMockFiles(files);
        }
      }
    } else if (e.dataTransfer.files) {
      const files = Array.from(e.dataTransfer.files) as File[];
      if (files.length >= 4) {
        triggerFolderZipSimulation(files, "Direct_RAW_Drop");
      } else {
        addMockFiles(files);
      }
    }
  };

  const addMockFiles = (files: File[]) => {
    const newFiles = files.map(file => ({
      name: file.name,
      size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      status: 'Verified' as const
    }));
    setUploadedFiles(prev => [...prev, ...newFiles]);
  };

  const addPresetDemoFile = (type: 'Beauty' | 'Fashion' | 'Product') => {
    const presets = {
      Beauty: { name: 'DSC_4901_RAW_beauty_editorial.CR3', size: '38.4 MB' },
      Fashion: { name: 'IMG_8820_fashion_lookbook.ARW', size: '42.1 MB' },
      Product: { name: 'PhaseOne_9912_cosmetics_bottle.IIQ', size: '102.5 MB' }
    };
    const sel = presets[type];
    setUploadedFiles(prev => [...prev, { name: sel.name, size: sel.size, status: 'Verified' }]);
  };

  const handleRemoveFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  // Handle lead submission
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail) return;

    setIsSubmitting(true);
    // Simulate API pipeline delay
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setSubmissionId(`PX-${Math.floor(100000 + Math.random() * 900000)}`);
    }, 1800);
  };

  const handleResetForm = () => {
    setClientName('');
    setClientEmail('');
    setBriefText('');
    setUploadedFiles([]);
    setSubmitSuccess(false);
    setSubmissionId('');
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans antialiased overflow-x-hidden selection:bg-brand-gold selection:text-neutral-950">
      <Helmet />
      
      {/* 1. NAVIGATION BAR */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-neutral-950/85 backdrop-blur-md border-b border-neutral-900/80 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-brand-gold to-brand-gold-dark flex items-center justify-center font-serif text-lg font-bold text-neutral-950 shadow-[0_0_15px_rgba(var(--brand-accent-rgb),0.3)]">
              PS
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold tracking-[0.25em] text-white uppercase font-sans">
                PixelSakib
              </span>
              <span className="text-[9px] font-mono tracking-widest text-brand-gold uppercase">
                High-End Retouching
              </span>
            </div>
          </div>

          {/* Desktop Menu links */}
          <div className="hidden md:flex items-center gap-8 text-xs font-semibold tracking-wider text-neutral-300 uppercase">
            <button
              onClick={() => scrollToSection(aboutRef)}
              className="hover:text-brand-gold transition-colors duration-200 cursor-pointer"
            >
              About Studio
            </button>
            <span className="text-neutral-800 select-none">/</span>
            <button
              onClick={() => scrollToSection(portfolioRef)}
              className="hover:text-brand-gold transition-colors duration-200 cursor-pointer"
            >
              Gallery Portfolio
            </button>
            <span className="text-neutral-800 select-none">/</span>
            <button
              onClick={() => scrollToSection(servicesRef)}
              className="hover:text-brand-gold transition-colors duration-200 cursor-pointer"
            >
              Pricing
            </button>
            <span className="text-neutral-800 select-none">/</span>
            <button
              onClick={() => scrollToSection(plannerRef)}
              className="hover:text-brand-gold transition-colors duration-200 cursor-pointer"
            >
              Brief Planner
            </button>
            <span className="text-neutral-800 select-none">/</span>
            <button
              onClick={() => scrollToSection(contactRef)}
              className="hover:text-brand-gold transition-colors duration-200 cursor-pointer"
            >
              Contact
            </button>
          </div>

          {/* Book test CTA */}
          <div className="flex items-center gap-3">
            {/* Elegant Day / Night Theme Toggler */}
            <button
              onClick={() => setIsNight(!isNight)}
              className="p-2.5 rounded-lg border border-neutral-800 bg-neutral-900/60 text-neutral-300 hover:text-brand-gold hover:border-brand-gold/30 transition-all duration-300 cursor-pointer flex items-center justify-center relative overflow-hidden group shadow-md"
              title={isNight ? "Switch to Day Mode (Light Theme)" : "Switch to Night Mode (Dark Theme)"}
            >
              <AnimatePresence mode="wait">
                {isNight ? (
                  <motion.div
                    key="moon"
                    initial={{ y: 15, opacity: 0, rotate: -30 }}
                    animate={{ y: 0, opacity: 1, rotate: 0 }}
                    exit={{ y: -15, opacity: 0, rotate: 30 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="flex items-center gap-1.5"
                  >
                    <Moon className="w-4 h-4 text-brand-gold" />
                    <span className="hidden sm:inline text-[9px] font-mono tracking-widest uppercase font-bold text-neutral-400 group-hover:text-brand-gold transition-colors">Night</span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="sun"
                    initial={{ y: 15, opacity: 0, rotate: 30 }}
                    animate={{ y: 0, opacity: 1, rotate: 0 }}
                    exit={{ y: -15, opacity: 0, rotate: -30 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="flex items-center gap-1.5"
                  >
                    <Sun className="w-4 h-4 text-amber-500" />
                    <span className="hidden sm:inline text-[9px] font-mono tracking-widest uppercase font-bold text-neutral-500 group-hover:text-amber-600 transition-colors">Day</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </button>

            <button
              onClick={() => scrollToSection(contactRef)}
              className="px-4 py-2 bg-gradient-to-r from-brand-gold to-brand-gold-dark hover:from-brand-gold-light hover:to-brand-gold text-neutral-950 text-xs font-bold font-sans tracking-wide rounded-lg transition-all duration-300 shadow-[0_3px_12px_rgba(var(--brand-accent-rgb),0.25)] hover:scale-[1.02] cursor-pointer"
            >
              Book Free Test
            </button>
          </div>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <header className="relative pt-32 pb-20 md:py-36 overflow-hidden">
        {/* Background glow graphics */}
        <div className="absolute top-[20%] left-[10%] w-[400px] h-[400px] bg-brand-gold/5 blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute top-[30%] right-[5%] w-[450px] h-[450px] bg-amber-600/5 blur-[150px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Left Content */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="lg:col-span-5 space-y-6 md:space-y-8"
            >
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3 py-1 bg-brand-gold/10 border border-brand-gold/20 rounded-full text-brand-gold font-sans text-xs uppercase tracking-widest font-medium"
              >
                <Sparkles className="w-3.5 h-3.5" /> High-End Post-Production Studio
              </motion.div>

              <div className="space-y-4">
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="text-4xl md:text-5xl lg:text-6xl font-serif text-white tracking-tight leading-[1.1]"
                >
                  Pristine. <br className="hidden md:inline" />
                  <span className="italic font-normal text-brand-gold-light font-serif">Symmetrical.</span> <br />
                  Flawless Retouch.
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="text-sm md:text-base text-neutral-400 font-sans leading-relaxed max-w-lg"
                >
                  PixelSakib provides exquisite skin texture retention, tailored editorial wardrobe sculpting, and hyper-balanced product reflections. Specifically designed for top-tier beauty, high-fashion, and luxury brand photographers.
                </motion.p>
              </div>

              {/* Action Buttons */}
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="flex flex-wrap gap-4 items-center"
              >
                <button
                  onClick={() => scrollToSection(portfolioRef)}
                  className="px-6 py-3.5 bg-neutral-900 hover:bg-neutral-800 text-brand-light font-semibold rounded-xl text-xs md:text-sm tracking-widest uppercase border border-neutral-800 hover:border-neutral-700 transition-all duration-300 flex items-center gap-2 cursor-pointer"
                >
                  Explore Modern Gallery
                  <ArrowRight className="w-4 h-4 text-brand-gold" />
                </button>
                <button
                  onClick={() => scrollToSection(plannerRef)}
                  className="px-5 py-3.5 text-neutral-400 hover:text-brand-gold font-medium text-xs md:text-sm tracking-wider transition-colors duration-300 cursor-pointer flex items-center gap-1.5"
                >
                  <Clock className="w-4 h-4" /> Try Turnaround Estimator
                </button>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="grid grid-cols-2 gap-4 pt-4 border-t border-neutral-900"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-gold flex-shrink-0" />
                  <span className="text-xs text-neutral-300 font-mono">100% Real Pores Retained</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-gold flex-shrink-0" />
                  <span className="text-xs text-neutral-300 font-mono">Layered PSD Deliveries</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-gold flex-shrink-0" />
                  <span className="text-xs text-neutral-300 font-mono">Strict Professional NDA</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-gold flex-shrink-0" />
                  <span className="text-xs text-neutral-300 font-mono">24h Express Available</span>
                </div>
              </motion.div>

            </motion.div>

            {/* Hero Right Interactive Slider */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, x: 25 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.9, cubicBezier: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="lg:col-span-7"
            >
              <div className="relative">
                {/* Decorative border outline accent */}
                <div className="absolute -inset-1.5 bg-gradient-to-r from-brand-gold/10 to-transparent rounded-2xl blur-lg opacity-40 pointer-events-none" />
                
                <BeforeAfterSlider
                  imageUrl={STUDIO_IMAGES.beauty}
                  title="Interactive Highlight Showcase"
                  interactiveHint={true}
                  beforeEffects={{
                    brightness: 1.05,
                    contrast: 0.85,
                    saturation: 0.72,
                    blur: 1.2,
                    warmth: -6
                  }}
                />
              </div>
            </motion.div>

          </div>
        </div>
      </header>

      {/* 3. OUR CORE PHILOSOPHY / HOW WE WORK */}
      <section className="py-20 bg-neutral-950 border-t border-b border-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <span className="text-xs font-bold tracking-[0.2em] text-brand-gold uppercase font-mono">
              Craftsmanship Over Algorithms
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-white tracking-wide leading-tight">
              Genuine Texture. Manual Execution.
            </h2>
            <div className="w-16 h-[2px] bg-brand-gold mx-auto my-3" />
            <p className="text-sm md:text-base text-neutral-400 leading-relaxed font-sans mt-3">
              We do not use cheap automated filters, AI skin-smoothers, or artificial plastic paint tools. Our senior retouchers work pixel-by-pixel under heavy magnification to elevate, refine, and harmonize your captures.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Tech 1 */}
            <div className="bg-neutral-900/40 border border-neutral-800/80 rounded-xl p-6 hover:border-brand-gold/20 transition-all duration-300">
              <div className="w-10 h-10 rounded-lg bg-brand-gold/10 flex items-center justify-center mb-5 text-brand-gold">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-brand-light font-sans tracking-wide">
                Frequency Separation
              </h3>
              <p className="text-xs text-neutral-500 font-mono uppercase mt-1">Non-Destructive Splitting</p>
              <p className="text-sm text-neutral-400 mt-3 leading-relaxed font-sans">
                We separate the high-frequency surface details (pores, hairs, fabric weave) from low-frequency color waves and shadows. This allows us to balance color blemishes without ever smoothing away skin micro-structures.
              </p>
            </div>

            {/* Tech 2 */}
            <div className="bg-neutral-900/40 border border-neutral-800/80 rounded-xl p-6 hover:border-brand-gold/20 transition-all duration-300">
              <div className="w-10 h-10 rounded-lg bg-brand-gold/10 flex items-center justify-center mb-5 text-brand-gold">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-brand-light font-sans tracking-wide">
                Micro Dodge & Burn
              </h3>
              <p className="text-xs text-neutral-500 font-mono uppercase mt-1">Manual Shade Sculpting</p>
              <p className="text-sm text-neutral-400 mt-3 leading-relaxed font-sans">
                Using gentle, tablet-painted curves, we balance local illumination transitions. By meticulously lightening dark skin folds and darkening specular peaks, we contour faces with physical, cinematic dimensions.
              </p>
            </div>

            {/* Tech 3 */}
            <div className="bg-neutral-900/40 border border-neutral-800/80 rounded-xl p-6 hover:border-brand-gold/20 transition-all duration-300">
              <div className="w-10 h-10 rounded-lg bg-brand-gold/10 flex items-center justify-center mb-5 text-brand-gold">
                <Camera className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-brand-light font-sans tracking-wide">
                Chromatic Harmony
              </h3>
              <p className="text-xs text-neutral-500 font-mono uppercase mt-1">Precision Color Standardization</p>
              <p className="text-sm text-neutral-400 mt-3 leading-relaxed font-sans">
                Skin tones can quickly gather red blotches or green cast in natural lighting. We map and unify target hue intervals in 16-bit color-spaces, matching your customized mood LUTs and maintaining camera profile integrity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* D3 STUDIO STATISTICS TICKER */}
      <StudioStats isNight={isNight} />

      {/* 4. ABOUT THE STUDIO */}
      <section id="about" ref={aboutRef} className="py-20 bg-neutral-950 relative overflow-hidden">
        <div className="absolute top-[40%] right-[-10%] w-[500px] h-[500px] bg-brand-gold/5 blur-[180px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[10%] left-[-5%] w-[300px] h-[300px] bg-amber-600/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center space-y-4 mb-16">
            <span className="text-xs font-bold tracking-[0.25em] text-brand-gold uppercase font-mono">
              About the Studio
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-white tracking-tight leading-tight">
              Crafted by Sakib Islam
            </h2>
            <div className="w-16 h-[2px] bg-brand-gold mx-auto my-3" />
            <p className="text-sm md:text-base text-neutral-400 font-sans max-w-2xl mx-auto leading-relaxed">
              PixelSakib is a precision photo retouching studio founded by Sakib Islam, 
              a senior retoucher with over 8 years of experience serving global fashion 
              houses, luxury brands, and editorial photographers.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-5"
            >
              <h3 className="text-2xl md:text-3xl font-serif text-white tracking-wide leading-tight">
                Every pixel tells a <span className="text-brand-gold-light italic">story</span>
              </h3>
              <div className="space-y-4 text-sm text-neutral-400 font-sans leading-relaxed">
                <p>
                  What started as a meticulous passion for color science and skin 
                  micro-texture has grown into a full-spectrum post-production studio. 
                  Sakib has personally retouched thousands of frames for international 
                  advertising campaigns, magazine editorials, and e-commerce giants.
                </p>
                <p>
                  Every image that leaves PixelSakib passes through a rigorous 
                  8-point quality matrix — from raw frequency separation analysis 
                  to final chromatic certification. We never outsource, never 
                  automate skin, and never compromise on texture integrity.
                </p>
              </div>

              <div className="flex flex-wrap gap-4 pt-2">
                <div className="flex items-center gap-2 bg-neutral-900/60 border border-neutral-800/80 px-4 py-2.5 rounded-xl">
                  <Award className="w-4 h-4 text-brand-gold" />
                  <div>
                    <span className="text-xs font-bold text-white block">8+ Years</span>
                    <span className="text-[9px] text-neutral-400 font-mono">Professional Retouching</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-neutral-900/60 border border-neutral-800/80 px-4 py-2.5 rounded-xl">
                  <Target className="w-4 h-4 text-brand-gold" />
                  <div>
                    <span className="text-xs font-bold text-white block">18K+</span>
                    <span className="text-[9px] text-neutral-400 font-mono">Images Retouched</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-neutral-900/60 border border-neutral-800/80 px-4 py-2.5 rounded-xl">
                  <MapPin className="w-4 h-4 text-brand-gold" />
                  <div>
                    <span className="text-xs font-bold text-white block">Global</span>
                    <span className="text-[9px] text-neutral-400 font-mono">Clients Worldwide</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="relative"
            >
              <div className="absolute -inset-3 bg-gradient-to-r from-brand-gold/10 to-transparent rounded-2xl blur-xl opacity-40 pointer-events-none" />
              <div className="bg-neutral-900/80 border border-neutral-800/80 rounded-2xl p-6 md:p-8 backdrop-blur-sm">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-gold to-brand-gold-dark flex items-center justify-center font-serif text-2xl font-bold text-neutral-950 shadow-lg shrink-0">
                    SI
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white font-sans">Sakib Islam</h4>
                    <p className="text-xs text-brand-gold font-mono uppercase tracking-wider">Lead Retoucher & Founder</p>
                  </div>
                </div>

                <blockquote className="relative pl-5 border-l-2 border-brand-gold/40">
                  <Quote className="absolute -top-1 -left-1 w-4 h-4 text-brand-gold/20" />
                  <p className="text-sm text-neutral-300 italic font-sans leading-relaxed">
                    "Retouching is not about removing flaws — it's about revealing the 
                    photograph's full potential while keeping every pore, fiber, and 
                    reflection exactly as nature and the photographer intended."
                  </p>
                </blockquote>

                <div className="mt-6 pt-5 border-t border-neutral-800/80">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 block mb-2">Certified Workflow</span>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-[9px] font-mono bg-neutral-950 border border-neutral-800 text-neutral-400 px-2.5 py-1 rounded-md">ProPhoto RGB</span>
                    <span className="text-[9px] font-mono bg-neutral-950 border border-neutral-800 text-neutral-400 px-2.5 py-1 rounded-md">Frequency Separation</span>
                    <span className="text-[9px] font-mono bg-neutral-950 border border-neutral-800 text-neutral-400 px-2.5 py-1 rounded-md">16-Bit Editing</span>
                    <span className="text-[9px] font-mono bg-neutral-950 border border-neutral-800 text-neutral-400 px-2.5 py-1 rounded-md">Dodge & Burn</span>
                    <span className="text-[9px] font-mono bg-neutral-950 border border-neutral-800 text-neutral-400 px-2.5 py-1 rounded-md">NDA Protected</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Values Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="bg-neutral-900/40 border border-neutral-800/80 rounded-xl p-6 hover:border-brand-gold/20 transition-all duration-300 group"
            >
              <Palette className="w-6 h-6 text-brand-gold mb-4" />
              <h4 className="text-sm font-bold text-white font-sans tracking-wide mb-2">Manual Precision</h4>
              <p className="text-xs text-neutral-400 font-sans leading-relaxed">
                Zero automated skin smoothing. Every frequency layer, dodge stroke, and 
                color grade is applied by hand with calibrated Wacom precision.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="bg-neutral-900/40 border border-neutral-800/80 rounded-xl p-6 hover:border-brand-gold/20 transition-all duration-300 group"
            >
              <Shield className="w-6 h-6 text-brand-gold mb-4" />
              <h4 className="text-sm font-bold text-white font-sans tracking-wide mb-2">Absolute Confidentiality</h4>
              <p className="text-xs text-neutral-400 font-sans leading-relaxed">
                All client campaigns are protected by strict NDAs. Your assets 
                are never shared, published, or reused without explicit permission.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="bg-neutral-900/40 border border-neutral-800/80 rounded-xl p-6 hover:border-brand-gold/20 transition-all duration-300 group"
            >
              <Clock className="w-6 h-6 text-brand-gold mb-4" />
              <h4 className="text-sm font-bold text-white font-sans tracking-wide mb-2">Reliable Turnaround</h4>
              <p className="text-xs text-neutral-400 font-sans leading-relaxed">
                Standard 3-5 business day delivery with 24-48 hour express options. 
                We respect deadlines as much as you respect your clients.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. MODERN, CLEAN GALLERY LAYOUT */}
      <section id="portfolio" ref={portfolioRef} className="py-24 bg-neutral-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="space-y-2">
              <span className="text-xs font-bold tracking-[0.25em] text-brand-gold uppercase font-mono">
                Interactive Showcase
              </span>
              <h2 className="text-3xl md:text-4xl font-serif text-white tracking-wide">
                The Master Retouch Gallery
              </h2>
              <p className="text-sm text-neutral-400 font-sans max-w-lg mt-1">
                Filter our portfolio by focus category, then click any image block to open an immersive comparison lightbox.
              </p>
            </div>

            {/* Category tabs */}
            <div className="flex flex-wrap gap-2 pt-2 border-b border-neutral-900 md:border-none">
              {(['All', 'Beauty', 'Fashion', 'Product'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 text-xs font-bold tracking-widest uppercase transition-all duration-300 relative rounded-lg border cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-brand-gold text-neutral-950 border-brand-gold font-sans'
                      : 'bg-neutral-900/60 text-neutral-400 hover:text-white border-neutral-800/80 hover:border-neutral-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Staggered Masonry Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredGallery.map((item, index) => (
                <motion.div
                  layout
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  onClick={() => { setSelectedItem(item); setShowLogs(false); setLogSearchQuery(''); }}
                  className="group relative cursor-pointer overflow-hidden rounded-xl bg-neutral-900 border border-neutral-800/80 hover:border-brand-gold/30 transition-all duration-300 flex flex-col"
                >
                  {/* Thumbnail stage */}
                  <div className="relative aspect-[3/4] overflow-hidden bg-neutral-950">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                      loading={index < 2 ? 'eager' : 'lazy'}
                      decoding="async"
                      referrerPolicy="no-referrer"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent opacity-60 group-hover:opacity-85 transition-opacity duration-300" />
                    
                    {/* Hover Inspect Indicator */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="px-4 py-2 bg-neutral-950/90 border border-brand-gold/40 text-brand-gold text-xs font-bold font-sans tracking-widest uppercase rounded-full shadow-xl flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <Eye className="w-3.5 h-3.5" /> Compare Retouch
                      </div>
                    </div>

                    {/* Quick Labels inside card */}
                    <span className="absolute top-4 left-4 z-10 px-2.5 py-1 bg-neutral-950/85 text-[9px] font-mono font-bold tracking-widest text-brand-gold rounded-md border border-brand-gold/15 uppercase">
                      {item.category}
                    </span>
                  </div>

                  {/* Card description details */}
                  <div className="p-4 bg-neutral-900 flex flex-col justify-between flex-grow">
                    <div>
                      <h3 className="text-sm font-semibold text-neutral-100 font-sans tracking-wide">
                        {item.title}
                      </h3>
                      <div className="flex items-center gap-1.5 mt-1">
                        <span className="text-[10px] text-neutral-500 font-sans">Photographer:</span>
                        <span className="text-[10px] text-brand-gold-light font-medium font-sans">{item.photographer}</span>
                      </div>
                    </div>

                    <div className="border-t border-neutral-850/80 mt-3 pt-2.5 flex items-center justify-between text-[11px] text-neutral-400 font-mono">
                      <span>{item.retouchSteps.length} Action Layers</span>
                      <span className="text-brand-gold hover:underline flex items-center gap-0.5 font-sans font-semibold">
                        Inspect
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredGallery.length === 0 && (
            <div className="text-center py-24 bg-neutral-900/20 border border-neutral-900 rounded-2xl">
              <ImageIcon className="w-12 h-12 text-neutral-600 mx-auto mb-4" />
              <p className="text-neutral-400 font-sans">No portfolio items in this category yet.</p>
            </div>
          )}

        </div>
      </section>

      {/* 5. PORTFOLIO LIGHTBOX MODAL */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-50 bg-neutral-950/95 flex items-center justify-center p-4 overflow-y-auto backdrop-blur-md">
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="bg-neutral-950 border border-neutral-800 rounded-2xl w-full max-w-5xl overflow-hidden shadow-2xl relative my-8"
            >
              
              {/* Top control bar */}
              <div className="sticky top-0 z-50 bg-neutral-950 border-b border-neutral-900 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-brand-gold uppercase block">
                    {selectedItem.category} Focus Case Study
                  </span>
                  <h3 className="text-lg md:text-xl font-serif text-white tracking-wide mt-0.5">
                    {selectedItem.title}
                  </h3>
                </div>
                
                <div className="flex items-center gap-3 self-end sm:self-auto">
                  {/* Share Panel */}
                  <div className="flex items-center gap-1.5 bg-neutral-900 border border-neutral-800/80 px-2.5 py-1.5 rounded-lg">
                    <span className="text-[9px] font-mono uppercase text-neutral-500 mr-1.5 hidden md:inline">Share:</span>
                    
                    {/* Twitter/X Share */}
                    <button
                      onClick={() => {
                        const shareUrl = `${window.location.origin}${window.location.pathname}?project=${selectedItem.id}`;
                        const shareText = `Check out this incredible ${selectedItem.category.toLowerCase()} editing & retouching project: ${selectedItem.title} by PixelSakib`;
                        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`, '_blank', 'noopener,noreferrer');
                      }}
                      className="p-1.5 text-neutral-400 hover:text-brand-gold hover:bg-neutral-950 rounded-md transition-colors cursor-pointer"
                      title="Share to Twitter / X"
                    >
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </button>

                    {/* LinkedIn Share */}
                    <button
                      onClick={() => {
                        const shareUrl = `${window.location.origin}${window.location.pathname}?project=${selectedItem.id}`;
                        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank', 'noopener,noreferrer');
                      }}
                      className="p-1.5 text-neutral-400 hover:text-brand-gold hover:bg-neutral-950 rounded-md transition-colors cursor-pointer"
                      title="Share to LinkedIn"
                    >
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                      </svg>
                    </button>

                    {/* Pinterest Share */}
                    <button
                      onClick={() => {
                        const shareUrl = `${window.location.origin}${window.location.pathname}?project=${selectedItem.id}`;
                        const imageUrl = `${window.location.origin}${selectedItem.imageUrl}`;
                        const shareText = `Incredible ${selectedItem.category.toLowerCase()} editing by PixelSakib - ${selectedItem.title}`;
                        window.open(`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(shareUrl)}&media=${encodeURIComponent(imageUrl)}&description=${encodeURIComponent(shareText)}`, '_blank', 'noopener,noreferrer');
                      }}
                      className="p-1.5 text-neutral-400 hover:text-brand-gold hover:bg-neutral-950 rounded-md transition-colors cursor-pointer"
                      title="Pin on Pinterest"
                    >
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.41 7.61 11.175-.105-.945-.199-2.399.041-3.431.218-.937 1.4-5.965 1.4-5.965s-.358-.711-.358-1.763c0-1.653.959-2.885 2.152-2.885 1.015 0 1.505.762 1.505 1.676 0 1.02-.65 2.547-.983 3.96-.28.1.18.52.22.56.24.423.95 2.381 2.22 2.381 3.65 0 6.457-3.851 6.457-9.417 0-4.922-3.534-8.364-8.586-8.364-5.855 0-9.293 4.393-9.293 8.932 0 1.768.681 3.666 1.53 4.697.168.203.193.381.127.643-.14.583-.45 1.833-.51 2.083-.082.327-.27.396-.62.23-2.3-1.069-3.733-4.425-3.733-7.143 0-5.811 4.225-11.147 12.186-11.147 6.402 0 11.378 4.563 11.378 10.66 0 6.362-4.01 11.481-9.584 11.481-1.871 0-3.63-.972-4.233-2.126l-1.151 4.385c-.415 1.583-1.538 3.565-2.289 4.79C10.74 23.924 11.37 24 12.017 24c6.62 0 11.986-5.367 11.986-11.987c0-6.62-5.366-12-11.986-12z" />
                      </svg>
                    </button>

                    {/* Copy Link Share */}
                    <button
                      onClick={() => {
                        const shareUrl = `${window.location.origin}${window.location.pathname}?project=${selectedItem.id}`;
                        navigator.clipboard.writeText(shareUrl).then(() => {
                          setCopied(true);
                          setTimeout(() => setCopied(false), 2000);
                        });
                      }}
                      className="p-1.5 text-neutral-400 hover:text-brand-gold hover:bg-neutral-950 rounded-md transition-colors cursor-pointer font-mono text-[9px] flex items-center gap-1"
                      title="Copy Project Direct Link"
                    >
                      {copied ? (
                        <span className="text-emerald-400 font-bold transition-all animate-pulse">Copied!</span>
                      ) : (
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path>
                        </svg>
                      )}
                    </button>
                  </div>

                  {/* Slideshow Button */}
                  <button
                    onClick={() => setIsSlideshowActive(!isSlideshowActive)}
                    className={`p-1 px-3 rounded-lg border text-xs font-semibold h-[38px] transition-all flex items-center gap-1.5 cursor-pointer ${
                      isSlideshowActive
                        ? 'border-brand-gold text-brand-gold bg-brand-gold/10'
                        : 'border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700 bg-neutral-900'
                    }`}
                    title={isSlideshowActive ? "Pause hands-free slideshow" : "Start hands-free slideshow (5s intervals)"}
                  >
                    {isSlideshowActive ? (
                      <>
                        <Pause className="w-3.5 h-3.5 animate-pulse text-brand-gold" />
                        <span>Playing</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5" />
                        <span>Slideshow</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => setSelectedItem(null)}
                    className="p-1 px-3 rounded-lg border border-neutral-800 text-neutral-400 hover:text-white bg-neutral-900 transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-semibold h-[38px]"
                  >
                    <X className="w-4 h-4" /> Close
                  </button>
                </div>

                {/* Slideshow countdown progress bar */}
                {isSlideshowActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-neutral-900 overflow-hidden z-[60]">
                    <motion.div
                      key={selectedItem.id}
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 5, ease: 'linear' }}
                      className="h-full bg-brand-accent"
                    />
                  </div>
                )}
              </div>

              {/* Grid content */}
              <div className="grid grid-cols-1 lg:grid-cols-12">
                
                {/* Left block slider */}
                <div className="lg:col-span-7 bg-neutral-950 p-6 flex flex-col justify-center relative">
                  <div className="relative group/slider">
                    <div className="rounded-xl overflow-hidden border border-neutral-900 bg-neutral-900/60 p-2">
                      <BeforeAfterSlider
                        imageUrl={selectedItem.imageUrl}
                        beforeEffects={selectedItem.beforeEffects}
                        heightClass="h-[350px] md:h-[450px]"
                        interactiveHint={true}
                      />
                    </div>

                    {/* Next and Previous Arrow buttons overlay (desktop visible / touch accessible) */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        const idx = filteredGallery.findIndex((item) => item.id === selectedItem.id);
                        if (idx !== -1) {
                          const prevIdx = (idx - 1 + filteredGallery.length) % filteredGallery.length;
                          setSelectedItem(filteredGallery[prevIdx]);
                          setShowLogs(false);
                          setLogSearchQuery('');
                        }
                      }}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-neutral-950/90 hover:bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-brand-gold transition-all duration-300 opacity-80 hover:opacity-100 cursor-pointer shadow-lg"
                      title="Previous Work (Left Arrow Key)"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        const idx = filteredGallery.findIndex((item) => item.id === selectedItem.id);
                        if (idx !== -1) {
                          const nextIdx = (idx + 1) % filteredGallery.length;
                          setSelectedItem(filteredGallery[nextIdx]);
                          setShowLogs(false);
                          setLogSearchQuery('');
                        }
                      }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-neutral-950/90 hover:bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-brand-gold transition-all duration-300 opacity-80 hover:opacity-100 cursor-pointer shadow-lg"
                      title="Next Work (Right Arrow Key)"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Keyboard Shortcuts Hint Bar */}
                  <div className="flex items-center justify-center gap-4 mt-3 text-[10px] font-mono text-neutral-500 uppercase tracking-widest bg-neutral-950/50 py-1.5 px-3 rounded-lg border border-neutral-900/40 w-fit mx-auto">
                    <span className="flex items-center gap-1">
                      <kbd className="px-1.5 py-0.5 bg-neutral-900 border border-neutral-800 rounded text-neutral-300 font-mono">Esc</kbd> Close
                    </span>
                    <span className="h-2 w-[1px] bg-neutral-850" />
                    <span className="flex items-center gap-1">
                      <kbd className="px-1.5 py-0.5 bg-neutral-900 border border-neutral-800 rounded text-neutral-300 font-mono">←</kbd>
                      <kbd className="px-1.5 py-0.5 bg-neutral-900 border border-neutral-800 rounded text-neutral-300 font-mono">→</kbd> Navigate
                    </span>
                  </div>
                </div>

                {/* Right metadata profile sidebar */}
                <div className="lg:col-span-5 bg-neutral-900/40 border-t lg:border-t-0 lg:border-l border-neutral-900 p-6 flex flex-col justify-between min-h-[500px]">
                  
                  {!showLogs ? (
                    <div className="space-y-6 flex-grow flex flex-col justify-between">
                      <div className="space-y-6">
                        {/* Retouch actions list */}
                        <div className="space-y-2.5">
                          <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-widest font-mono flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-brand-gold" />
                            Specific Retouch Tasks
                          </h4>
                          <div className="bg-neutral-950 rounded-xl p-4 border border-neutral-850/80 space-y-2">
                            {selectedItem.retouchSteps.map((step, idx) => (
                              <div key={idx} className="flex items-start gap-2.5 text-xs text-neutral-300 font-sans">
                                <span className="font-mono text-[10px] text-brand-gold bg-brand-gold/10 px-1.5 py-0.5 rounded mt-0.5">
                                  {idx + 1}
                                </span>
                                <span className="leading-relaxed">{step}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Camera spec profiles */}
                        <div className="space-y-2">
                          <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-widest font-mono flex items-center gap-1.5">
                            <Camera className="w-4 h-4 text-brand-gold" />
                            Capture Metadata
                          </h4>
                          <div className="grid grid-cols-2 gap-3 font-mono text-[10px]">
                            <div className="bg-neutral-950 p-2.5 rounded-lg border border-neutral-900">
                              <span className="text-neutral-500 uppercase tracking-wider block">Camera Body</span>
                              <span className="text-neutral-300 block mt-1 font-semibold">{selectedItem.specs.camera}</span>
                            </div>
                            <div className="bg-neutral-950 p-2.5 rounded-lg border border-neutral-900">
                              <span className="text-neutral-500 uppercase tracking-wider block">Lens Optic</span>
                              <span className="text-neutral-300 block mt-1 font-semibold">{selectedItem.specs.lens}</span>
                            </div>
                            <div className="bg-neutral-950 p-2.5 rounded-lg border border-neutral-900 col-span-2">
                              <span className="text-neutral-500 uppercase tracking-wider block">Lighting System Layout</span>
                              <span className="text-neutral-300 block mt-1 font-sans">{selectedItem.specs.lighting}</span>
                            </div>
                          </div>
                        </div>

                        {/* Description contextual report */}
                        <div className="space-y-1.5">
                          <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-widest font-mono">
                            Brief & Retouch Approach
                          </h4>
                          <p className="text-xs text-neutral-400 leading-relaxed font-sans bg-neutral-950/60 p-3.5 rounded-xl border border-neutral-900/60">
                            "{selectedItem.description}"
                          </p>
                        </div>

                        {/* Simulated processing progress indicator bar if downloading */}
                        {downloadingItemId === selectedItem.id && (
                          <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="bg-neutral-950 p-3 rounded-xl border border-neutral-900 space-y-2"
                          >
                            <div className="flex justify-between text-[9px] font-mono uppercase text-neutral-500">
                              <span>Post-prod compiler [HQ output]</span>
                              <span className="text-brand-gold font-bold">{downloadProgress}%</span>
                            </div>
                            <div className="w-full bg-neutral-900 rounded-full h-1 overflow-hidden">
                              <div
                                className="bg-brand-gold h-1 rounded-full transition-all duration-150"
                                style={{ width: `${downloadProgress}%` }}
                              />
                            </div>
                            <p className="text-[9px] font-mono text-neutral-400 truncate flex items-center gap-1">
                              <span className="inline-block w-1.5 h-1.5 rounded-full bg-brand-gold animate-ping" />
                              <span>Status:</span>
                              <span className="text-neutral-200">{downloadStep}</span>
                            </p>
                          </motion.div>
                        )}
                      </div>

                      {/* Footer actions block */}
                      <div className="border-t border-neutral-900 pt-4 mt-4 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <User className="w-3.5 h-3.5 text-brand-gold" />
                          <span className="text-neutral-400">By</span>
                          <span className="font-semibold text-neutral-200">{selectedItem.photographer}</span>
                        </div>
                        <div className="flex items-center gap-2 flex-wrap justify-end">
                          <button
                            onClick={() => handleDownloadHiRes(selectedItem)}
                            disabled={downloadingItemId !== null}
                            className={`px-3 py-1.5 rounded-lg text-[10px] font-bold tracking-widest uppercase transition-all duration-300 cursor-pointer flex items-center gap-1.5 ${
                              downloadingItemId === selectedItem.id
                                ? 'bg-neutral-900 text-brand-gold border border-neutral-800'
                                : downloadingItemId !== null
                                ? 'bg-neutral-950 text-neutral-600 border border-neutral-900 pointer-events-none'
                                : 'bg-brand-gold/10 text-brand-gold border border-brand-gold/20 hover:bg-brand-gold hover:text-neutral-950'
                            }`}
                          >
                            {downloadingItemId === selectedItem.id ? (
                              <>
                                <Loader2 className="w-3 h-3 animate-spin text-brand-gold" />
                                <span>Compiling {downloadProgress}%</span>
                              </>
                            ) : (
                              <>
                                <Download className="w-3 h-3" />
                                <span>Download</span>
                              </>
                            )}
                          </button>

                          <button
                            onClick={() => {
                              setShowLogs(true);
                              setLogSearchQuery('');
                            }}
                            className="px-3 py-1.5 bg-neutral-950 hover:bg-neutral-900 text-neutral-300 hover:text-brand-gold border border-neutral-800 hover:border-brand-gold/20 rounded-lg text-[10px] font-bold tracking-widest uppercase transition-all duration-300 cursor-pointer flex items-center gap-1"
                          >
                            <Terminal className="w-3 h-3" />
                            <span>View Logs</span>
                          </button>

                          <button
                            onClick={() => {
                              setServiceRequirement(selectedItem.category.toLowerCase());
                              setBriefText(`Inquiring about focus parameters styled similarly to portfolio item: ${selectedItem.title}`);
                              setSelectedItem(null);
                              scrollToSection(contactRef);
                            }}
                            className="px-3 py-1.5 bg-neutral-950 text-brand-gold border border-brand-gold/30 rounded-lg text-[10px] font-bold tracking-widest uppercase hover:bg-brand-gold hover:text-neutral-950 transition-all duration-300 cursor-pointer"
                          >
                            Inquire Look
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <motion.div 
                      initial={{ opacity: 0, x: 15 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -15 }}
                      className="space-y-4 flex-grow flex flex-col justify-between min-h-[460px]"
                    >
                      <div className="space-y-4 flex-grow flex flex-col">
                        {/* Title Terminal Header */}
                        <div className="flex items-center justify-between border-b border-neutral-900 pb-3">
                          <button
                            onClick={() => setShowLogs(false)}
                            className="flex items-center gap-1 text-[10px] text-neutral-400 hover:text-brand-gold transition-colors font-mono font-bold uppercase tracking-wider"
                          >
                            <ArrowLeft className="w-3.5 h-3.5" /> Specs View
                          </button>
                          <span className="text-[8px] bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded font-mono uppercase font-bold tracking-widest flex items-center gap-1 animate-pulse">
                            <span className="w-1 h-1 bg-emerald-400 rounded-full inline-block animate-[ping_1.5s_infinite]" /> Terminal Active
                          </span>
                        </div>

                        {/* File details banner */}
                        <div className="bg-neutral-950 p-2.5 rounded-lg border border-neutral-900/60 space-y-1 font-mono text-[9px]">
                          <div className="flex justify-between">
                            <span className="text-neutral-500">Source Asset:</span>
                            <span className="text-neutral-300 font-semibold">{selectedItem.id.toUpperCase()}_HQ_MASTER.TIFF</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-neutral-500">Workspace Profile:</span>
                            <span className="text-neutral-300 font-semibold text-brand-gold-light">ProPhoto 16-Bit RGB</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-neutral-500">Output Standard:</span>
                            <span className="text-neutral-300 font-semibold">Exceeds DCI-P3 Commercial Target</span>
                          </div>
                        </div>

                        {/* Logs Search Input */}
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
                            <Search className="h-3 w-3 text-neutral-500" />
                          </span>
                          <input
                            type="text"
                            placeholder="Filter timeline (e.g. dodge, raw, mask...)"
                            value={logSearchQuery}
                            onChange={(e) => setLogSearchQuery(e.target.value)}
                            className="w-full pl-7 pr-3 py-1 bg-neutral-950 border border-neutral-850 rounded-lg text-[10px] text-neutral-300 placeholder-neutral-600 focus:outline-none focus:border-brand-gold/40 font-mono transition-all"
                          />
                          {logSearchQuery && (
                            <button 
                              onClick={() => setLogSearchQuery('')}
                              className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-neutral-500 hover:text-neutral-300 text-[9px] font-mono cursor-pointer"
                            >
                              CLEAR
                            </button>
                          )}
                        </div>

                        {/* The interactive scrolling logs console list */}
                        <div className="bg-neutral-950 border border-neutral-900 rounded-xl p-3 font-mono text-[9px] space-y-2.5 max-h-[200px] lg:max-h-[230px] overflow-y-auto custom-scrollbar flex-grow">
                          {getProcessingLogs(selectedItem)
                            .filter(log => 
                              log.tool.toLowerCase().includes(logSearchQuery.toLowerCase()) || 
                              log.action.toLowerCase().includes(logSearchQuery.toLowerCase()) ||
                              log.status.toLowerCase().includes(logSearchQuery.toLowerCase())
                            )
                            .map((log, index) => (
                              <div key={index} className="space-y-1 border-b border-neutral-900/30 pb-2 last:border-0 last:pb-0">
                                <div className="flex justify-between text-[8px] text-neutral-500">
                                  <span className="flex items-center gap-1 text-neutral-500">
                                    <Clock className="w-2.5 h-2.5 opacity-60 text-brand-gold" />
                                    {log.timestamp}
                                  </span>
                                  <span className={`px-1 py-0.2 rounded text-[7px] font-bold uppercase tracking-wider ${
                                    log.status === 'SUCCESS' ? 'text-emerald-400 bg-emerald-500/10' :
                                    log.status === 'CALIBRATED' ? 'text-sky-400 bg-sky-500/10' :
                                    log.status === 'APPLIED' ? 'text-amber-400 bg-amber-500/10' :
                                    'text-brand-gold bg-brand-gold/10'
                                  }`}>
                                    {log.status}
                                  </span>
                                </div>
                                <div className="text-neutral-300 leading-relaxed text-[10px] pl-1 font-sans font-medium">
                                  <span className="text-brand-gold font-mono text-[9px] mr-1 font-normal opacity-90">{log.tool}:</span>
                                  {log.action}
                                </div>
                                {log.intensity && (
                                  <div className="text-[8px] text-neutral-500 flex justify-end tracking-wider">
                                    <span>{log.intensity}</span>
                                  </div>
                                )}
                              </div>
                            ))}
                            
                            {getProcessingLogs(selectedItem).filter(log => 
                              log.tool.toLowerCase().includes(logSearchQuery.toLowerCase()) || 
                              log.action.toLowerCase().includes(logSearchQuery.toLowerCase()) ||
                              log.status.toLowerCase().includes(logSearchQuery.toLowerCase())
                            ).length === 0 && (
                              <div className="text-center py-8 text-neutral-600 italic">
                                No matching log tags found for "{logSearchQuery}"
                              </div>
                            )}
                        </div>

                        {/* CMD terminal helper */}
                        <div className="flex items-center gap-1 text-[8px] text-neutral-600 font-mono">
                          <Terminal className="w-2.5 h-2.5 text-brand-gold/40" />
                          <span>operator_mode: interactive_inspector // host_active</span>
                        </div>
                      </div>

                      {/* Footer Actions Row for Logs View */}
                      <div className="border-t border-neutral-900 pt-4 mt-4 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <User className="w-3.5 h-3.5 text-brand-gold" />
                          <span className="text-neutral-400">By</span>
                          <span className="font-semibold text-neutral-200">{selectedItem.photographer}</span>
                        </div>
                        <div className="flex items-center gap-2 flex-wrap justify-end">
                          <button
                            onClick={() => handleExportLOG(selectedItem, getProcessingLogs(selectedItem))}
                            className="px-3 py-1.5 bg-neutral-950 border border-neutral-800 hover:bg-neutral-900 text-neutral-300 rounded-lg text-[10px] font-bold tracking-widest uppercase transition-all duration-300 cursor-pointer flex items-center gap-1.5"
                            title="Export plain text logs file"
                          >
                            <FileText className="w-3.5 h-3.5" />
                            <span>Export TXT</span>
                          </button>

                          <button
                            onClick={() => handleExportJSON(selectedItem, getProcessingLogs(selectedItem))}
                            className="px-3 py-1.5 bg-brand-gold/10 border border-brand-gold/20 hover:bg-brand-gold hover:text-neutral-950 text-brand-gold rounded-lg text-[10px] font-bold tracking-widest uppercase transition-all duration-300 cursor-pointer flex items-center gap-1.5"
                            title="Export full log history in structured JSON format"
                          >
                            <Database className="w-3.5 h-3.5" />
                            <span>Export All Logs</span>
                          </button>

                          <button
                            onClick={() => setShowLogs(false)}
                            className="px-3 py-1.5 bg-neutral-950 text-neutral-400 border border-neutral-800 rounded-lg text-[10px] font-bold tracking-widest uppercase hover:bg-neutral-900 hover:text-white transition-all duration-300 cursor-pointer flex items-center gap-1"
                          >
                            <ArrowLeft className="w-3 h-3" />
                            <span>Back Specs</span>
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}

                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 6. INTERACTIVE REVENUE / BUDGET ESTIMATOR BRIEF PLANNER */}
      <section id="brief-planner" ref={plannerRef} className="py-24 bg-neutral-900/20 border-t border-b border-neutral-900 relative">
        <div className="absolute top-[10%] left-[5%] w-[350px] h-[350px] bg-brand-gold/5 blur-[130px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <span className="text-xs font-bold tracking-[0.25em] text-brand-gold uppercase font-mono">
              Creative Agency Workflow
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-white tracking-wide">
              The Interactive Brief Planner
            </h2>
            <p className="text-sm text-neutral-400 font-sans leading-relaxed max-w-xl mx-auto">
              Construct a custom production manifest by toggle parameters below. Copy the calculated briefing block or feed it directly to our lead intake desk!
            </p>
          </div>

          <BriefPlanner onInsertBriefIntoContact={handleInsertBrief} />
        </div>
      </section>

      {/* 7. DETAILED CAPABILITIES & SERVICES SHOWCASE */}
      <section id="services" ref={servicesRef} className="py-24 bg-neutral-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-4 mb-16 max-w-xl mx-auto">
            <span className="text-xs font-bold tracking-[0.2em] text-brand-gold uppercase font-mono">
              Retouch Pricing Metrics
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-white tracking-tight">
              Capabilities & Pricing Structures
            </h2>
            <div className="w-12 h-[2px] bg-brand-gold mx-auto mt-2" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {SERVICES.map((serv) => (
              <div
                key={serv.id}
                className="bg-neutral-900 border border-neutral-800/80 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-brand-gold/25 transition-all duration-300 shadow-xl group"
              >
                <div>
                  {/* Photo header of card */}
                  <div className="h-48 relative overflow-hidden bg-neutral-950">
                    <img
                      src={serv.image}
                      alt={serv.title}
                      className="w-full h-full object-cover opacity-60 group-hover:opacity-75 transition-opacity duration-300"
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent" />
                    
                    <div className="absolute bottom-4 left-6">
                      <span className="text-[10px] text-brand-gold font-mono uppercase tracking-widest">
                        {serv.subtitle}
                      </span>
                      <h3 className="text-base font-serif text-white font-semibold">
                        {serv.title}
                      </h3>
                    </div>
                  </div>

                  {/* Body description */}
                  <div className="p-6 space-y-6">
                    <p className="text-xs md:text-sm text-neutral-400 leading-relaxed font-sans">
                      {serv.description}
                    </p>

                    <div className="space-y-2.5">
                      <span className="text-[10px] text-neutral-500 font-mono uppercase tracking-wider block">
                        Included Deliverables:
                      </span>
                      {serv.deliverables.map((deliv, index) => (
                        <div key={index} className="flex items-start gap-2 text-xs text-neutral-300 font-sans leading-tight">
                          <CheckCircle2 className="w-3.5 h-3.5 text-brand-gold mt-0.5 flex-shrink-0" />
                          <span>{deliv}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-neutral-900/60 border-t border-neutral-850 flex items-center justify-between">
                  <div>
                    <span className="text-[9px] text-neutral-500 font-mono uppercase block">Base Investment</span>
                    <span className="text-xl font-mono font-bold text-brand-gold">from {serv.priceFrom}</span>
                    <span className="text-[9px] text-neutral-500 font-sans inline-block ml-1">/ frame</span>
                  </div>
                  <button
                    onClick={() => {
                      setServiceRequirement(serv.id);
                      setBriefText(`Requesting info regarding the: ${serv.title} package.`);
                      scrollToSection(contactRef);
                    }}
                    className="px-4 py-2 bg-neutral-950 hover:bg-brand-gold text-brand-gold hover:text-neutral-950 border border-brand-gold/30 rounded-xl text-xs font-semibold tracking-wide transition-all duration-300 cursor-pointer"
                  >
                    Select Package
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 8. TESTIMONIALS SECTION */}
      <section className="py-20 bg-neutral-900/20 border-t border-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <span className="text-xs font-bold tracking-[0.2em] text-brand-gold uppercase font-mono">
              Photographer feedback
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-white tracking-wide">
              Resonating Client Impressions
            </h2>
            <p className="text-xs md:text-sm text-neutral-400 font-sans max-w-lg mx-auto">
              Read how PixelSakib photo-compositing, frequency balancing, and color LUT maps support global campaigns.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, idx) => (
              <div
                key={idx}
                className="bg-neutral-900 border border-neutral-800/80 rounded-2xl p-6 relative flex flex-col justify-between"
              >
                {/* Large quote mark */}
                <span className="absolute top-4 right-6 font-serif text-6xl text-brand-gold/5 pointer-events-none select-none">
                  “
                </span>

                <div className="space-y-4">
                  {/* Star row */}
                  <div className="flex gap-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <span key={i} className="text-brand-gold text-sm">★</span>
                    ))}
                  </div>
                  <p className="text-xs md:text-sm text-neutral-300 leading-relaxed italic font-sans">
                    "{t.quote}"
                  </p>
                </div>

                <div className="flex items-center gap-3 border-t border-neutral-850/80 pt-4 mt-6">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover border border-neutral-800"
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-neutral-200 font-sans">{t.name}</span>
                    <span className="text-[10px] text-neutral-500 font-mono tracking-wider">{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. CONTACT US & SUBMIT BRIEF */}
      <section id="contact" ref={contactRef} className="py-24 bg-neutral-950 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <span className="text-xs font-bold tracking-[0.2em] text-brand-gold uppercase font-mono">
              Get in Touch
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-white tracking-tight leading-tight">
              Start Your <span className="italic text-brand-gold-light">Retouch Project</span>
            </h2>
            <div className="w-12 h-[2px] bg-brand-gold mx-auto mt-2" />
            <p className="text-sm text-neutral-400 font-sans max-w-xl mx-auto leading-relaxed">
              Submit your project brief below, and we'll respond with a custom quote 
              within 2 hours during studio hours. New clients receive one complimentary 
              test retouch to evaluate our quality standards.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            
            {/* Contact left info */}
            <div className="lg:col-span-5 space-y-8 flex flex-col justify-between self-stretch">
              <div className="space-y-6">
                <div className="bg-neutral-900/40 border border-neutral-800/80 rounded-xl p-6 space-y-4 font-sans text-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-850 flex items-center justify-center text-brand-gold">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[9px] text-neutral-500 font-mono uppercase block">Studio Direct Inbox</span>
                      <a href="mailto:sakibislam011995@gmail.com" className="text-neutral-200 hover:text-brand-gold font-semibold">
                        sakibislam011995@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-850 flex items-center justify-center text-brand-gold">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[9px] text-neutral-500 font-mono uppercase block">Secure Whatsapp Direct</span>
                      <a href="https://wa.me/8801614356117" target="_blank" rel="noopener noreferrer" className="text-neutral-300 hover:text-brand-gold font-semibold">
                        +8801614356117
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-850 flex items-center justify-center text-brand-gold">
                      <Shield className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[9px] text-neutral-500 font-mono uppercase block">Confidentiality Guarantee</span>
                      <span className="text-neutral-500 font-sans leading-tight block">All content protected under full digital NDAs.</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Secure note */}
              <div className="bg-neutral-900 border border-neutral-850/80 p-4 rounded-xl text-xs space-y-1 mt-6">
                <span className="font-mono text-[9px] text-emerald-400 uppercase tracking-widest block font-bold">
                  ● Server Securing Encryption
                </span>
                <p className="text-neutral-400 font-sans leading-relaxed">
                  Your captured raw images and creative designs remain local-cached and secure. We store client catalog links on protected storage blocks.
                </p>
              </div>
            </div>

            {/* Contact Right lead form inside card */}
            <div className="lg:col-span-7 bg-neutral-900 border border-neutral-800 rounded-2xl p-6 md:p-8 shadow-2xl relative">
              
              <AnimatePresence mode="wait">
                {submitSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full flex flex-col justify-center items-center text-center py-12 space-y-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-900/30 border border-emerald-500 flex items-center justify-center text-emerald-400">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-2xl font-serif text-white">Project Brief Registered</h3>
                      <p className="text-xs font-mono text-brand-gold uppercase tracking-widest mt-1">
                        Tracking ID: {submissionId}
                      </p>
                    </div>
                    <p className="text-xs text-neutral-400 max-w-sm font-sans leading-relaxed">
                      Thank you, {clientName}. PixelSakib post-production team has received your RAW image brief. We will email you in 1-2 hours with delivery links and free test details.
                    </p>
                    <button
                      onClick={handleResetForm}
                      className="px-4 py-2 bg-neutral-950 hover:bg-neutral-800 text-neutral-300 font-semibold rounded-lg text-xs font-mono transition-colors border border-neutral-800"
                    >
                      Submit Another Brief
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleFormSubmit}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest font-mono">
                          Photographer/Studio Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g., Marcus Vance"
                          value={clientName}
                          onChange={(e) => setClientName(e.target.value)}
                          className="w-full bg-neutral-950 border border-neutral-800/80 rounded-xl px-4 py-3 text-xs md:text-sm text-neutral-100 focus:outline-none focus:border-brand-gold font-sans"
                        />
                      </div>

                      {/* Email */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest font-mono">
                          Direct Email *
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="e.g., marcus@vancestudios.com"
                          value={clientEmail}
                          onChange={(e) => setClientEmail(e.target.value)}
                          className="w-full bg-neutral-950 border border-neutral-800/80 rounded-xl px-4 py-3 text-xs md:text-sm text-neutral-100 focus:outline-none focus:border-brand-gold font-sans"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Category Requirement */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest font-mono">
                          Core Service Focus
                        </label>
                        <select
                          value={serviceRequirement}
                          onChange={(e) => setServiceRequirement(e.target.value)}
                          className="w-full bg-neutral-950 border border-neutral-800/80 rounded-xl px-4 py-3 text-xs text-neutral-300 focus:outline-none focus:border-brand-gold font-sans"
                        >
                          <option value="beauty">High-End Beauty Retouch</option>
                          <option value="fashion">Fashion Editorial Retouch</option>
                          <option value="product">Luxury Product Retouching</option>
                          <option value="mannequin">Ghost Mannequin & Apparel</option>
                          <option value="custom">Multiple / Creative Mix</option>
                        </select>
                      </div>

                      {/* Timeline option */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest font-mono">
                          Project Timeline Scope
                        </label>
                        <select className="w-full bg-neutral-950 border border-neutral-800/80 rounded-xl px-4 py-3 text-xs text-neutral-300 focus:outline-none focus:border-brand-gold font-sans">
                          <option value="standard">Standard Studio Cycle (3-5 days)</option>
                          <option value="express">Express Rush (24-48 hours guaranteed)</option>
                          <option value="scheduled">Scheduled Recurring Monthly Volume</option>
                        </select>
                      </div>
                    </div>

                    {/* Drag-and-drop RAW files */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest font-mono flex justify-between">
                        <span>Attach Raw Test Images OR Campaign Specs</span>
                        <span className="text-[9px] text-brand-gold normal-case">RAW, TIFF, PSD up to 250MB</span>
                      </label>
                      
                      <div
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        className={`border-2 border-dashed rounded-xl p-6 text-center transition-all duration-300 flex flex-col items-center justify-center gap-2 ${
                          isDraggingFile
                            ? 'bg-brand-gold/5 border-brand-gold'
                            : 'bg-neutral-950/80 border-neutral-800 hover:border-neutral-700'
                        }`}
                      >
                        <Upload className="w-6 h-6 text-neutral-500" />
                        <div>
                          <p className="text-xs font-semibold text-neutral-300 font-sans">
                            Drag & drop your photography archives here
                          </p>
                          <p className="text-[10px] text-neutral-500 font-mono mt-0.5">
                            or click to browse local files
                          </p>
                        </div>
                        
                        <input
                          type="file"
                          multiple
                          onChange={handleFileSelect}
                          className="hidden"
                          id="raw-file-picker"
                        />
                        <button
                          type="button"
                          onClick={() => document.getElementById('raw-file-picker')?.click()}
                          className="mt-1.5 px-3 py-1 bg-neutral-900 border border-neutral-800 text-brand-gold-light rounded-lg text-[10px] font-bold font-sans tracking-wide uppercase hover:bg-neutral-850 cursor-pointer"
                        >
                          Manual Locate
                        </button>

                        <div className="flex flex-wrap items-center justify-center gap-2.5 mt-3 border-t border-neutral-900 pt-3 w-full">
                          <span className="text-[9px] text-neutral-500 font-mono uppercase block w-full text-center">
                            Or try quick simulator presets:
                          </span>
                          <button
                            type="button"
                            onClick={() => addPresetDemoFile('Beauty')}
                            className="bg-neutral-900 border border-neutral-850 text-neutral-300 text-[10px] py-1 px-2.5 rounded-md hover:text-white hover:border-neutral-700 font-mono cursor-pointer"
                          >
                            + Demo Beauty RAW
                          </button>
                          <button
                            type="button"
                            onClick={() => addPresetDemoFile('Product')}
                            className="bg-neutral-900 border border-neutral-850 text-neutral-300 text-[10px] py-1 px-2.5 rounded-md hover:text-white hover:border-neutral-700 font-mono cursor-pointer"
                          >
                            + Demo Product RAW
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              const mockFiles = [
                                { name: 'DSC_001_raw_capture.CR3', size: 36.2 * 1024 * 1024 },
                                { name: 'DSC_002_raw_capture.CR3', size: 38.5 * 1024 * 1024 },
                                { name: 'DSC_003_raw_capture.CR3', size: 34.1 * 1024 * 1024 },
                                { name: 'DSC_004_raw_capture.CR3', size: 37.8 * 1024 * 1024 },
                                { name: 'session_lighting_setup.psd', size: 104.2 * 1024 * 1024 }
                              ];
                              triggerFolderZipSimulation(mockFiles, 'Lookbook_Autumn_Session');
                            }}
                            className="bg-brand-gold/15 border border-brand-gold/30 text-brand-gold text-[10px] py-1 px-2.5 rounded-md hover:bg-brand-gold/25 hover:border-brand-gold/50 font-mono flex items-center gap-1.5 cursor-pointer transition-colors"
                          >
                            <FolderArchive className="w-3.5 h-3.5 text-brand-gold" />
                            + Drop Studio Folder (Simulated Zip)
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* List of uploaded files */}
                    {uploadedFiles.length > 0 && (
                      <div className="bg-neutral-950/70 border border-neutral-850 rounded-xl p-3.5 space-y-2 max-h-[180px] overflow-y-auto">
                        <span className="text-[9px] font-mono uppercase text-brand-gold tracking-widest block font-bold">
                          Attached Materials ({uploadedFiles.length})
                        </span>
                        {uploadedFiles.map((f, i) => {
                          if (f.status === 'Zipping') {
                            return (
                              <div key={i} className="flex flex-col gap-1.5 bg-brand-gold/5 border border-brand-gold/30 p-2.5 rounded-lg font-mono text-neutral-300 text-xs">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-1.5 truncate max-w-[200px] sm:max-w-xs">
                                    <Loader2 className="w-3 h-3 text-brand-gold animate-spin" />
                                    <span className="truncate text-brand-gold text-[11px]">{f.name}</span>
                                  </div>
                                  <span className="text-[8px] text-brand-gold font-bold bg-brand-gold/10 px-1.5 py-0.5 rounded uppercase tracking-wider animate-pulse">
                                    Zipping ({f.zipProgress}%)
                                  </span>
                                </div>
                                <div className="w-full h-1 bg-neutral-900 rounded-full overflow-hidden">
                                  <div className="h-full bg-brand-gold transition-all duration-150" style={{ width: `${f.zipProgress}%` }} />
                                </div>
                                <span className="text-[8px] text-neutral-500 block">
                                  Grouping & compressing {f.fileCount || 5} RAW files with studio LZW lossless compression...
                                </span>
                              </div>
                            );
                          }

                          return (
                            <div key={i} className={`flex items-center justify-between text-xs p-2 rounded-lg border font-mono text-neutral-300 ${f.name.endsWith('.zip') ? 'bg-brand-gold/10 border-brand-gold/30' : 'bg-neutral-900/60 border-neutral-850'}`}>
                              <div className="flex items-center gap-1.5 truncate max-w-[200px] sm:max-w-xs">
                                {f.name.endsWith('.zip') ? (
                                  <FolderArchive className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                                ) : (
                                  <Folder className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                                )}
                                <span className="truncate">{f.name}</span>
                              </div>
                              <div className="flex items-center gap-2.5 shrink-0">
                                <span className="text-neutral-500 text-[10px]">{f.size}</span>
                                {f.name.endsWith('.zip') ? (
                                  <span className="text-brand-gold text-[8px] font-sans font-semibold flex items-center gap-1 bg-brand-gold/10 px-1.5 py-0.5 rounded border border-brand-gold/30 uppercase tracking-widest">
                                    ZIP Pack (-12%)
                                  </span>
                                ) : (
                                  <span className="text-emerald-400 text-[10px] font-sans font-medium flex items-center gap-1 bg-emerald-950/40 px-1.5 py-0.5 rounded border border-emerald-900">
                                    <CheckCircle2 className="w-3 h-3" /> Ready
                                  </span>
                                )}
                                <button
                                  type="button"
                                  onClick={() => handleRemoveFile(i)}
                                  className="text-neutral-500 hover:text-rose-400 cursor-pointer p-0.5 text-base font-bold font-sans transition-colors leading-none"
                                >
                                  &times;
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Retouch briefs / Specification instructions */}
                    <div className="space-y-1">
                      <div className="flex justify-between items-center text-[10px] font-bold text-neutral-400 uppercase tracking-widest font-mono">
                        <label>Retouch Specs & Instructions</label>
                        <span className="text-brand-gold select-none font-medium normal-case flex items-center gap-0.5">
                          Filled from Step Planner
                        </span>
                      </div>
                      <textarea
                        rows={4}
                        placeholder="Detail which blemishes, clothing wrinkles, flyaways, skin tones, or reflections are core priorities, or paste estimates from the planner..."
                        value={briefText}
                        onChange={(e) => setBriefText(e.target.value)}
                        className="w-full bg-neutral-950 border border-neutral-800/80 rounded-xl px-4 py-3 text-xs md:text-sm text-neutral-100 focus:outline-none focus:border-brand-gold font-mono tracking-tight leading-relaxed placeholder:font-sans"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-brand-gold hover:bg-brand-gold-light text-neutral-950 font-bold rounded-xl text-xs sm:text-sm uppercase tracking-widest transition-all duration-300 disabled:opacity-50 hover:scale-[1.01] cursor-pointer shadow-lg"
                    >
                      {isSubmitting ? 'Registering Campaign Directives...' : 'Submit Post-Production Brief'}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>

            </div>

          </div>

          {/* FAQS Accordion row */}
          <div className="mt-28 max-w-4xl mx-auto space-y-6">
            <div className="text-center space-y-2">
              <span className="text-xs font-bold tracking-[0.2em] text-brand-gold uppercase font-mono">
                Common Concerns
              </span>
              <h3 className="text-2xl md:text-3xl font-serif text-white tracking-wide">
                Frequently Addressed Subjects
              </h3>
              <div className="w-10 h-[1.5px] bg-brand-gold mx-auto" />
            </div>

            <div className="space-y-3.5 pt-4">
              {FAQS.map((faq, idx) => (
                <div
                  key={idx}
                  className="bg-neutral-900 border border-neutral-800/80 rounded-xl overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left font-sans text-xs sm:text-sm sm:font-semibold text-neutral-300 cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown className={`w-4 h-4 text-brand-gold transition-transform duration-300 ${
                      openFaqIndex === idx ? 'transform rotate-180' : ''
                    }`} />
                  </button>

                  <AnimatePresence>
                    {openFaqIndex === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-5 text-xs md:text-sm text-neutral-400 leading-relaxed font-sans border-t border-neutral-900 pt-3">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 10. CREATIVE AGENCY FOOTER */}
      <footer className="bg-neutral-950 border-t border-neutral-900 py-16 text-neutral-500 text-xs font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Col 1 */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-gold to-brand-gold-dark flex items-center justify-center font-serif text-base font-bold text-neutral-950">
                PS
              </div>
              <span className="text-sm font-bold tracking-[0.2em] text-white uppercase font-sans">
                PixelSakib
              </span>
            </div>
            <p className="text-[11px] text-neutral-400 font-sans leading-relaxed">
              Exquisite beauty, fashion and editorial post-production. Serving professional campaign photographers, catalogs, and luxurious commercial brands since 2018.
            </p>
          </div>

          {/* Col 2 */}
          <div className="space-y-3">
            <h4 className="text-white text-xs font-bold tracking-wider font-mono uppercase">
              Our Foundations
            </h4>
            <ul className="space-y-2 text-[11px] text-neutral-400 font-sans">
              <li>Manual Frequency Separation</li>
              <li>Symmetrical Liquid Sculpting</li>
              <li>16-bit ProPhoto Color Grids</li>
              <li>Macro Jewels Specular Reflection</li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="space-y-3">
            <h4 className="text-white text-xs font-bold tracking-wider font-mono uppercase">
              Client Protection
            </h4>
            <ul className="space-y-2 text-[11px] text-neutral-400 font-sans">
              <li>Automatic NDA Agreements</li>
              <li>Secure Offline Vault Storage</li>
              <li>Metadata EXIF Cleansing option</li>
              <li>No Automated Blur Filters</li>
            </ul>
          </div>

          {/* Col 4 */}
          <div className="space-y-3">
            <h4 className="text-white text-xs font-bold tracking-wider font-mono uppercase">
              Contact Desk
            </h4>
            <p className="text-[11px] text-neutral-400 font-sans leading-relaxed">
              Based in San Francisco Creative District. <br />
              Email: <a href="mailto:sakibislam011995@gmail.com" className="hover:text-brand-gold">sakibislam011995@gmail.com</a> <br />
              Call / WhatsApp: <a href="https://wa.me/8801614356117" target="_blank" rel="noopener noreferrer" className="hover:text-brand-gold">+8801614356117</a>
            </p>
            
            <div className="pt-4 border-t border-neutral-900 space-y-2.5">
              <h5 className="text-[10px] text-neutral-300 font-bold tracking-widest font-mono uppercase">
                Hire & Connect Direct
              </h5>
              <div className="flex flex-wrap gap-2.5">
                <a
                  href="https://linkedin.com/in/sakib-islam-editor"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-neutral-900 border border-neutral-850 text-neutral-400 hover:text-[#0A66C2] hover:border-[#0A66C2]/40 hover:bg-[#0A66C2]/5 transition-all duration-300 flex items-center justify-center cursor-pointer"
                  title="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href="https://instagram.com/pixelsakib"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-neutral-900 border border-neutral-850 text-neutral-400 hover:text-[#E4405F] hover:border-[#E4405F]/40 hover:bg-[#E4405F]/5 transition-all duration-300 flex items-center justify-center cursor-pointer"
                  title="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://facebook.com/sakibislam.retoucher"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-neutral-900 border border-neutral-850 text-neutral-400 hover:text-[#1877F2] hover:border-[#1877F2]/40 hover:bg-[#1877F2]/5 transition-all duration-300 flex items-center justify-center cursor-pointer"
                  title="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="https://fiverr.com/sakib_islam"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-neutral-900 border border-neutral-850 text-neutral-400 hover:text-[#1DBF73] hover:border-[#1DBF73]/40 hover:bg-[#1DBF73]/5 transition-all duration-300 flex items-center justify-center cursor-pointer"
                  title="Fiverr Studio"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M17.15 0c-2.45 0-4.04 1.48-4.5 3.48H9.37V1.15H5.43v2.33H2.33v3.48H5.40v13l.03 3.48H9.4v-3.48v-13h3.25c.08 1.73 1.08 3.5 3.2 3.5h1.3V3.48h-1.3c-1.34 0-1.89-.6-2.03-1.14-.07-.37.08-1.14 2.1-1.14h1.23V0h-1.2ZM24 7.2v3.48h-3.07V23.4h-3.9v-12.7h-1.25V7.2h6.22Z" />
                  </svg>
                </a>
                <a
                  href="https://upwork.com/freelancers/~01777b7ccb253ba6f7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-neutral-900 border border-neutral-850 text-neutral-400 hover:text-[#14A800] hover:border-[#14A800]/40 hover:bg-[#14A800]/5 transition-all duration-300 flex items-center justify-center cursor-pointer"
                  title="Upwork Profile"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M15.933 6.942c-1.455 0-2.733 1.054-3.378 2.617-.611-1.078-1.122-2.311-1.489-3.589H7.667v4.628c0 1.25-.867 2.228-1.933 2.228-1.072 0-1.933-.978-1.933-2.228V5.97H0v4.628c0 3.133 2.15 5.683 4.8 5.683 2.217 0 4.094-1.783 4.639-4.228.378 1.15.983 2.261 1.772 3.256L9.617 21h3.989l1.45-3.111c1.556.967 3.306 1.556 5.217 1.556C21.75 19.444 24 17.067 24 13.911V6.94h-3.411V13.8c0 1.639-1.106 2.55-2.244 2.55s-2.033-.911-2.033-2.55V6.942h-.379z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 mt-12 border-t border-neutral-900/80 flex flex-col sm:flex-row items-center justify-between gap-6 text-[11px]">
          <p>© 2026 PixelSakib Photo Editing & Retouching Co. All rights reserved.</p>
          <div className="flex gap-4 font-mono text-neutral-600">
            <a href="#" className="hover:text-brand-gold">Terms of Service</a>
            <span>•</span>
            <a href="#" className="hover:text-brand-gold">Confidential NDA</a>
            <span>•</span>
            <a href="#" className="hover:text-brand-gold">Sitemap</a>
          </div>
        </div>
      </footer>

      {/* Floating Interactive Chat Widget with simulated state machine */}
      <LeadRetoucherChat />

    </div>
  );
}
