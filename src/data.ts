// Portfolio item interface
export interface GalleryItem {
  id: string;
  title: string;
  category: 'Beauty' | 'Fashion' | 'Product';
  imageUrl: string;
  beforeEffects: {
    brightness: number;
    contrast: number;
    saturation: number;
    blur: number;
    warmth: number;
  };
  retouchSteps: string[];
  specs: {
    camera: string;
    lens: string;
    lighting: string;
    focus: string;
  };
  photographer: string;
  description: string;
}

export const STUDIO_IMAGES = {
  beauty: '/assets/images/beauty_retouch_1781482107895.jpg',
  fashion: '/assets/images/fashion_retouch_1781482141099.jpg',
  product: '/assets/images/product_retouch_1781482123916.jpg'
} as const;

export const SERVICES = [
  {
    id: 'beauty',
    title: 'High-End Beauty Retouching',
    subtitle: 'Commercial, Editorial & Portrait',
    description: 'Flawless skin retouching using professional non-destructive methods. We preserve natural skin texture while achieving perfection.',
    deliverables: [
      'Frequency Separation & Micro Dodge & Burn',
      'Realistic skin texture & hair details preservation',
      'Makeup correction & digital cosmetic enhancement',
      'Eye and teeth whitening with iris color enhancement',
      'Flawless stray hair removal & styling cleanups'
    ],
    priceFrom: '$18',
    image: STUDIO_IMAGES.beauty
  },
  {
    id: 'fashion',
    title: 'Fashion & Editorial Retouching',
    subtitle: 'Lookbooks, Backdrops & Geometry',
    description: 'Polished body sculpting, clothing wrinkle removal, and background cleanups designed to capture the vision of the designer.',
    deliverables: [
      'Proportional body liquified adjustments',
      'Clothing crease, wrinkle, and lint cleanups',
      'Backdrop replacement, extension, and color correction',
      'Atmospheric color grading and custom mood tone profiles',
      'High-contrast shade and specular highlight balancing'
    ],
    priceFrom: '$22',
    image: STUDIO_IMAGES.fashion
  },
  {
    id: 'product',
    title: 'Luxury Product Retouching',
    subtitle: 'Jewelry, Cosmetics & Advertising',
    description: 'Impeccable metal reflection shaping, scratch and dust removal, and composite imagery that drives premium e-commerce conversions.',
    deliverables: [
      'Dust, scratch, and reflection flaw eradication',
      'Symmetrical balancing and shape correction',
      'Metal reflection enhancement and studio lighting shape',
      'Perfect white backdrop rendering or shadow extraction',
      'Extreme macro depth-compositing and focus-staking prep'
    ],
    priceFrom: '$25',
    image: STUDIO_IMAGES.product
  },
  {
    id: 'mannequin',
    title: 'Ghost Mannequin & Apparel',
    subtitle: 'Invisible Mannequin, Collar Joint & Symmetry',
    description: 'Professional 3D invisible mannequin compositing, collar insertions, tag removal, and precision crease leveling for luxury apparel brands.',
    deliverables: [
      'Digital mannequin extraction and neck/collar compositing',
      'Fabric symmetry alignment & silhouette structural adjustments',
      'Crease, wrinkle, lint, and sticker eradication',
      'Realistic textile grain preservation and color matching',
      'Consistent flat-lay shadow pathways or reflection extraction'
    ],
    priceFrom: '$12',
    image: STUDIO_IMAGES.fashion
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g-beauty-1',
    title: 'Priscilla Close-up Beauty',
    category: 'Beauty',
    imageUrl: STUDIO_IMAGES.beauty,
    beforeEffects: {
      brightness: 1.05,
      contrast: 0.9,
      saturation: 0.8,
      blur: 0.9,
      warmth: -5
    },
    retouchSteps: [
      'Skin micro-blemish removal',
      'Frequency separation skin texture evening',
      'Dodge & burn dimension contouring',
      'Iris enhancement & catchlight sculpting',
      'Lip gloss shine amplification & edge-cleanup',
      'Fine stray hair removal'
    ],
    specs: {
      camera: 'Phase One XF 100MP',
      lens: 'Schneider Kreuznach 120mm Macro f/4.0',
      lighting: 'Profoto D2 with 3ft Octabox & Silver Reflector',
      focus: 'Pinpoint manual focus on left iris'
    },
    photographer: 'Marcus Vance',
    description: 'An editorial beauty campaign requiring absolutely perfect, high-resolution skin texture. We preserved genuine pores while fixing dynamic specular glare and evening out blemishes.'
  },
  {
    id: 'g-product-1',
    title: 'Nectar Noir Eau de Parfum',
    category: 'Product',
    imageUrl: STUDIO_IMAGES.product,
    beforeEffects: {
      brightness: 0.95,
      contrast: 0.85,
      saturation: 0.7,
      blur: 1.2,
      warmth: 10
    },
    retouchSteps: [
      'Bottle seam line and mold line extraction',
      'Precision micro dust & airborne lint removal',
      'Reflection symmetrizing & highlight sharpening',
      'Liquid transparency and depth lighting composite',
      'Golden background smoke contrast enhancement',
      'Logo typing sharpening'
    ],
    specs: {
      camera: 'Fujifilm GFX 100S',
      lens: 'GF 120mm f/4 Macro R LM OIS WR',
      lighting: 'Dual rim lights, soft bounce overhead, dark snoots',
      focus: '6-shot focus stack for front-to-back sharpness'
    },
    photographer: 'Elena Rostova',
    description: 'Luxury perfume brand asset presenting high-contrast metal borders and reflective fluid layers. Cleaned up micro mold seams and introduced stunning volumetric reflections.'
  },
  {
    id: 'g-fashion-1',
    title: 'Sand Architecture Editorial',
    category: 'Fashion',
    imageUrl: STUDIO_IMAGES.fashion,
    beforeEffects: {
      brightness: 1.1,
      contrast: 0.88,
      saturation: 0.9,
      blur: 1.0,
      warmth: -8
    },
    retouchSteps: [
      'Oversized jacket structural lines symmetry correction',
      'Fabric crease reduction on key joint seams',
      'Minimalist concrete backdrop texture smoothing',
      'Warm earthy tone-mapping and highlights split',
      'Model shape alignment & leg line correction',
      'Floor shadow cleaning and gradient falloff control'
    ],
    specs: {
      camera: 'Sony A7R V',
      lens: 'FE 85mm f/1.2 GM',
      lighting: 'Natural window shadow split + bounced polyboard',
      focus: 'Eye-AF autofocus, continuous tracking'
    },
    photographer: 'Julien Dubois',
    description: 'High-fashion editorial exploring neutral tones, heavy silhouettes, and architectural drop-shadows. Corrected the line flow of the designer jacket and leveled the floor backdrop noise.'
  },
  {
    id: 'g-beauty-2',
    title: 'Luminous Glow Portrait',
    category: 'Beauty',
    imageUrl: STUDIO_IMAGES.beauty,
    beforeEffects: {
      brightness: 1.02,
      contrast: 0.95,
      saturation: 0.85,
      blur: 0.5,
      warmth: -4
    },
    retouchSteps: [
      'Even out high-key studio lighting hot spots',
      'Soft neck crease smoothing',
      'Lip wrinkle filling and satin color matching',
      'Eyebrow hairline sculpting and stray clean up',
      'Eye white cleaning & red vein mitigation'
    ],
    specs: {
      camera: 'Hasselblad H6D-100c',
      lens: 'HC 100mm f/2.2',
      lighting: 'Para 133 with Broncolor Scoro, key-front setup',
      focus: 'Face-lock manual macro precision'
    },
    photographer: 'Siddharth Sen',
    description: 'Luminous skin study requiring deep detail extraction. Retouched with custom skin brushing techniques maintaining the natural pore distribution without any artificial blurring.'
  },
  {
    id: 'g-product-2',
    title: 'Chronoguard Chronograph',
    category: 'Product',
    imageUrl: STUDIO_IMAGES.product,
    beforeEffects: {
      brightness: 0.9,
      contrast: 0.8,
      saturation: 0.6,
      blur: 1.5,
      warmth: 12
    },
    retouchSteps: [
      'Sapphire glass circular reflection neutralization',
      'Bezel polish and micro-scratch elimination',
      'Dial typography contrast enhancement',
      'Leather watch-strap crease softening',
      'Chrono sub-dial reflection match-up'
    ],
    specs: {
      camera: 'Canon EOS R5',
      lens: 'RF 100mm f/2.8L Macro IS USM',
      lighting: 'Custom light tents, acrylic reflectors, fiber-optic tips',
      focus: '12-frame focus stacking utilizing Helicon Focus'
    },
    photographer: 'Jean-Pierre G.',
    description: 'Precision luxury timepiece retouched to meet premium print ad standards. Erased minute dust particles under 10x magnification and balanced complex watch glass reflections.'
  },
  {
    id: 'g-fashion-2',
    title: 'Neon Urban Nocturne',
    category: 'Fashion',
    imageUrl: STUDIO_IMAGES.fashion,
    beforeEffects: {
      brightness: 0.95,
      contrast: 0.9,
      saturation: 0.75,
      blur: 0.8,
      warmth: -10
    },
    retouchSteps: [
      'Neon street lamp colored tint correction on skin',
      'Wet asphalt reflection glare balance',
      'Fabric coat sheen restoration',
      'Cyberpunk teal-magenta complementary grading',
      'Distant pedestrian & warning sign cleanup'
    ],
    specs: {
      camera: 'Leica SL2-S',
      lens: 'Summilux-SL 50mm f/1.4 ASPH',
      lighting: 'Available ambient neon lights + handheld ice light fill',
      focus: 'Manual focus utilizing red peaking highlight'
    },
    photographer: 'Vince Stark',
    description: 'A cinematic nighttime street fashion shot. Standardizing neon highlights on skin tone and separating the dark coat silhouette from the shadowed city alleys.'
  }
];

export const TESTIMONIALS = [
  {
    name: 'Sarah Jenkins',
    role: 'Editorial Director, Luxe Magazine',
    quote: 'Finding a retouching partner who respects the integrity of skin texture while delivering flawless magazine-ready results is extremely rare. PixelSakib is a master of their craft. Our editorial workflow has never been faster.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150'
  },
  {
    name: 'Christian Martinez',
    role: 'Commercial Fashion Photographer',
    quote: 'My campaign clients are incredibly demanding about colors and details. PixelSakib handles my natural lighting portrait and high-fashion backdrops with incredible precision. The delivery is always on time, and revisions are almost never needed!',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150'
  },
  {
    name: 'Amiya Vance',
    role: 'Product Director, Vesper Jewelry',
    quote: 'Metal and gemstones are notoriously difficult to retouch without looking fake. PixelSakib produces the most stunning, crisp, reflective product images. Our e-commerce conversion rates spiked by 18% after updating our hero shots with their retouched masters.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=150'
  }
];

export const FAQS = [
  {
    question: 'What is your standard turnaround time?',
    answer: 'Our standard turnaround time is 3 to 5 business days depending on project size and beauty complexity. For urgent campaigns, we offer an Express Service with guaranteed 24 to 48-hour delivery for a 50% rush fee.'
  },
  {
    question: 'How do you handle skin texture preservation?',
    answer: 'We strictly practice non-destructive, high-end retouching. We primarily use advanced, manual Frequency Separation (separating color from texture) and detailed Dodge & Burn (local light and shadow adjustments) under extreme zoom. We do not use any artificial blur, skin-smoothing plugins, or automated AI filters that destroy natural pore grids.'
  },
  {
    question: 'What file formats do you accept and deliver?',
    answer: 'We highly prefer original RAW camera files (CR3, NEF, ARW, DNG, or Phase One IIQ) or uncompressed 16-bit TIFF files for maximum dynamic range. We deliver fully organized, multi-layered PSD files (if selected), flat 16-bit TIFFs, or web-optimized high-quality JPEGs based on your requirements.'
  },
  {
    question: 'Do you offer test retouching for new clients?',
    answer: 'Yes! We want you to feel fully confident in our skill and chemistry. We offer one complimentary test retouching image (Beauty, Fashion, or Product) for established professional photographers and agencies. Contact us with your portfolio link and a raw file to start.'
  },
  {
    question: 'How do we submit files and communicate briefs?',
    answer: 'You can upload your RAW images and reference mood boards directly through our website, or send us dry links via Dropbox, WeTransfer, or Frame.io. For briefs, we provide an interactive Brief Planner online, or you can attach detailed annotation mockups.'
  },
  {
    question: 'Is client confidentiality guaranteed?',
    answer: 'Absolutely. We work with major global brands and top-tier agencies. We never share, publish, or showcase your "before" or "after" images in our portfolio without your explicit written permission. We are happy to sign standard NDAs before handling your campaign resources.'
  }
];
