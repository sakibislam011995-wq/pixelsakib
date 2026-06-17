import React, { useEffect } from 'react';

interface HelmetProps {
  title?: string;
  description?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  keywords?: string;
}

export default function Helmet({
  title = "PixelSakib | High-End Photo Retouching & Post-Production Studio",
  description = "PixelSakib offers exquisite beauty, fashion, and product retouching services for professional photographers using frequency separation and manual dodge & burn.",
  ogTitle,
  ogDescription,
  ogImage = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800",
  ogUrl = "https://pixelsakib.com",
  keywords = "retouching, photo editing, high-end beauty, fashion retouch, product retouching, dodge and burn, frequency separation, professional photography"
}: HelmetProps) {
  
  // Use React 19 metadata hoisting to head, with an effect fallback to guarantee client-side updates 
  useEffect(() => {
    if (title) {
      document.title = title;
    }

    const setOrCreateMeta = (attrName: string, attrValue: string, contentValue: string) => {
      let element = document.querySelector(`meta[${attrName}="${attrValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', contentValue);
    };

    if (description) {
      setOrCreateMeta('name', 'description', description);
    }
    if (keywords) {
      setOrCreateMeta('name', 'keywords', keywords);
    }

    const effectiveOgTitle = ogTitle || title;
    const effectiveOgDesc = ogDescription || description;

    setOrCreateMeta('property', 'og:title', effectiveOgTitle);
    setOrCreateMeta('property', 'og:description', effectiveOgDesc);
    setOrCreateMeta('property', 'og:image', ogImage);
    setOrCreateMeta('property', 'og:url', ogUrl);
    setOrCreateMeta('property', 'og:type', 'website');
    
    setOrCreateMeta('name', 'twitter:card', 'summary_large_image');
    setOrCreateMeta('name', 'twitter:title', effectiveOgTitle);
    setOrCreateMeta('name', 'twitter:description', effectiveOgDesc);
    setOrCreateMeta('name', 'twitter:image', ogImage);

  }, [title, description, ogTitle, ogDescription, ogImage, ogUrl, keywords]);

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta property="og:title" content={ogTitle || title} />
      <meta property="og:description" content={ogDescription || description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
    </>
  );
}
