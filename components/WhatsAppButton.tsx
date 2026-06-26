'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Custom lightweight SVG path for WhatsApp logo to avoid additional dependencies
const WhatsAppIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    aria-hidden="true"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

export interface WhatsAppButtonProps {
  phone?: string;
  message?: string;
  label?: string;
  variant?: 'primary' | 'secondary' | 'text' | 'floating';
  size?: 'sm' | 'md' | 'lg';
  icon?: boolean;
  floating?: boolean;
  service?: string;
  page?: string;
  className?: string;
  trackEvent?: (event: string, properties?: Record<string, any>) => void;
}

const defaultContexts: Record<string, { label: string; message: string }> = {
  home: {
    label: 'Chat with us',
    message: "Hello!\n\nI'm interested in learning more about Arka Design Group. I'd like to request a free estimate."
  },
  kitchen: {
    label: 'Ask about your kitchen project',
    message: "Hello!\n\nI'm interested in your Kitchen Remodeling service. I'd like to schedule a free consultation."
  },
  bathroom: {
    label: 'Start your bathroom project',
    message: "Hello!\n\nI'm interested in your Bathroom Remodeling service. I'd like more information."
  },
  cabinets: {
    label: 'Discuss your custom cabinets',
    message: "Hello!\n\nI'm interested in your Custom Cabinet services. Could someone assist me?"
  },
  closets: {
    label: 'Design my custom closet',
    message: "Hello!\n\nI'd like more information about your custom closets."
  },
  panels: {
    label: 'Ask about wall panels',
    message: "Hello!\n\nI'd like more information about your wall panel solutions."
  },
  commercial: {
    label: "Let's discuss your commercial project",
    message: "Hello!\n\nI'm interested in remodeling a commercial space. I'd like to receive a consultation."
  },
  portfolio: {
    label: 'Request a similar project',
    message: "Hello!\n\nI saw one of your projects and I'd like something similar."
  },
  contact: {
    label: 'Chat with our team',
    message: "Hello!\n\nI'd like to speak with your team regarding my remodeling project."
  },
  'thank-you': {
    label: 'Continue on WhatsApp',
    message: "Hello!\n\nI just submitted my request through your website. I'd like to continue the conversation."
  }
};

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  phone = '18136109309',
  message,
  label,
  variant = 'primary',
  size = 'md',
  icon = true,
  floating = false,
  service,
  page,
  className = '',
  trackEvent
}) => {
  const [activeContext, setActiveContext] = useState({ label: '', message: '' });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let resolvedKey = 'home';
    if (page) {
      resolvedKey = page.toLowerCase();
    } else if (service) {
      resolvedKey = service.toLowerCase();
    } else if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      if (path.includes('portfolio')) resolvedKey = 'portfolio';
      else if (path.includes('contact')) resolvedKey = 'contact';
      else if (path.includes('services')) resolvedKey = 'services';
      else if (path.includes('thank-you')) resolvedKey = 'thank-you';
    }

    // Attempt matching specific variants
    if (resolvedKey.includes('kitchen')) resolvedKey = 'kitchen';
    else if (resolvedKey.includes('bathroom')) resolvedKey = 'bathroom';
    else if (resolvedKey.includes('cabinet')) resolvedKey = 'cabinets';
    else if (resolvedKey.includes('closet') || resolvedKey.includes('wardrobe')) resolvedKey = 'closets';
    else if (resolvedKey.includes('panel')) resolvedKey = 'panels';
    else if (resolvedKey.includes('commercial')) resolvedKey = 'commercial';

    const context = defaultContexts[resolvedKey] || defaultContexts['home'];
    setActiveContext({
      label: label || context.label,
      message: message || context.message
    });

    if (floating) {
      const timer = setTimeout(() => setIsVisible(true), 800);
      return () => clearTimeout(timer);
    }
  }, [page, service, label, message, floating]);

  const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(activeContext.message)}`;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.stopPropagation();
    if (trackEvent) {
      trackEvent('WhatsApp Clicked', {
        phone,
        page: page || 'dynamic',
        service: service || 'none',
        position: floating ? 'floating' : 'inline',
        message: activeContext.message,
        url: whatsappUrl
      });
    }
  };

  useEffect(() => {
    if (trackEvent) {
      trackEvent('WhatsApp Button Viewed', {
        page: page || 'dynamic',
        service: service || 'none',
        position: floating ? 'floating' : 'inline'
      });
    }
  }, [trackEvent, page, service, floating]);

  const baseStyle = "inline-flex items-center justify-center font-mono uppercase tracking-wider transition-all duration-300 ease-out cursor-pointer border border-transparent rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] focus-visible:ring-offset-2";
  
  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs gap-1.5",
    md: "px-6 py-3 text-sm gap-2",
    lg: "px-8 py-4 text-base gap-3"
  };

  const variantStyles = {
    primary: "bg-[#C5A880] text-[#111111] border-[#C5A880] hover:bg-transparent hover:text-[#C5A880] hover:border-[#C5A880] hover:scale-[1.02] shadow-md",
    secondary: "bg-transparent text-[#C5A880] border-[#C5A880] hover:bg-[#C5A880] hover:text-[#111111] hover:scale-[1.02] shadow-sm",
    text: "bg-transparent text-white border-b border-[#C5A880] rounded-none px-0 py-1 hover:text-[#C5A880] hover:border-white",
    floating: ""
  };

  if (floating) {
    return (
      <AnimatePresence>
        {isVisible && (
          <motion.a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClick}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 20, stiffness: 100 }}
            className={`fixed bottom-6 right-6 z-[1000] flex items-center justify-center gap-2 bg-[#1E1E1E] text-white border border-[#C5A880]/30 rounded-full px-5 py-3 hover:bg-[#C5A880] hover:text-[#111111] hover:border-[#C5A880] shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-300 ease-out hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] focus-visible:ring-offset-2 ${className}`}
            aria-label={`Chat with Arka Design Group on WhatsApp: ${activeContext.label}`}
          >
            {icon && <WhatsAppIcon className="w-5 h-5" />}
            <span className="text-xs font-mono uppercase tracking-widest hidden sm:inline">
              {activeContext.label}
            </span>
          </motion.a>
        )}
      </AnimatePresence>
    );
  }

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={`${baseStyle} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      aria-label={activeContext.label}
    >
      {icon && <WhatsAppIcon className={size === 'sm' ? 'w-4 h-4' : 'w-5 h-5'} />}
      <span>{activeContext.label}</span>
    </a>
  );
};

export default WhatsAppButton;
