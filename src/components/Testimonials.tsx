import React, { useEffect, useState } from 'react';
import { Testimonial04 } from './ui/testimonial-04';
import { normalizeTestimonialText } from '@/lib/testimonialsParser';

type LocalTestimonial = {
  testimonial: string;
  name: string;
  role: string;
  origin: string;
  image: string;
};

const Testimonials = () => {
  // Configurable UI copy defaults
  const defaultTitle = "What Our Community Says";
  const defaultSubtitle = "Real stories from families and individuals whose lives have been transformed through our services";
  const defaultBottomText = "95% client satisfaction rate";
  const defaultBadgeLabel = "Testimonials";

  const defaultTestimonials: LocalTestimonial[] = [
    {
      testimonial: "Mosaic helped my family settle into our new life in Australia. The staff understood our cultural needs and provided support in Tagalog. We couldn't have done it without them.",
      name: "Maria Santos",
      role: "Settlement Support Client",
      origin: "Originally from Philippines",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150"
    },
    {
      testimonial: "The family support programs helped us navigate the challenges of raising children in a new country while maintaining our cultural identity. The counselors were incredibly understanding.",
      name: "Ahmed Hassan",
      role: "Family Support Client",
      origin: "Originally from Sudan",
      image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150"
    },
    {
      testimonial: "My elderly mother receives wonderful care that respects our Chinese traditions. The staff speak Mandarin and understand the importance of family in our culture.",
      name: "Li Wei Chen",
      role: "Aged Care Family Member",
      origin: "Originally from China",
      image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150"
    },
    {
      testimonial: "The community engagement programs helped me connect with other families and feel truly part of the Australian community.",
      name: "Jennifer Kim",
      role: "Community Member",
      origin: "Originally from Korea",
      image: "https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=150"
    },
    {
      testimonial: "Volunteering with Mosaic has been incredibly rewarding. I've helped families navigate their first months in Australia, and seeing their confidence grow is amazing.",
      name: "Sarah Wilson",
      role: "Volunteer",
      origin: "Local community member",
      image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150"
    },
    {
      testimonial: "The aged care services provided by Mosaic allowed my father to maintain his dignity while receiving the care he needed in his final years.",
      name: "David Chen",
      role: "Family Member",
      origin: "Originally from Taiwan",
      image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150"
    }
  ];

  const [testimonials, setTestimonials] = useState<LocalTestimonial[]>(defaultTestimonials);
  const [title, setTitle] = useState<string>(defaultTitle);
  const [subtitle, setSubtitle] = useState<string>(defaultSubtitle);
  const [bottomText, setBottomText] = useState<string>(defaultBottomText);
  const [badgeLabel, setBadgeLabel] = useState<string>(defaultBadgeLabel);

  useEffect(() => {
    let cancelled = false;
    async function loadTestimonials() {
      try {
        const res = await fetch('/testimonials.json', { cache: 'no-store' });
        if (!res.ok) return; // fallback to defaults
        const data = await res.json();

        // Expect either an array or an object with `entries`
        const entries: LocalTestimonial[] = Array.isArray(data)
          ? data
          : Array.isArray(data?.entries)
          ? data.entries
          : [];

        const placeholderImages = new Set([
          '/pexels-yankrukov-8199708.jpg',
        ]);

        const cleaned = entries
          .filter((t) => t && t.testimonial)
          .map((t) => {
            const rawImage = typeof t.image === 'string' ? t.image.trim() : '';
            const useImage = rawImage && !placeholderImages.has(rawImage) ? rawImage : '';
            return {
              testimonial: normalizeTestimonialText(t.testimonial),
              name: t.name || '',
              role: t.role || 'Community Member',
              origin: t.origin || '',
              // If `image` is a known placeholder, prefer role-based avatar icons
              image: useImage,
            };
          });

        if (!cancelled && cleaned.length > 0) {
          setTestimonials(cleaned);
          // Pull optional UI copy overrides from meta if available
          const meta = data?.meta || {};
          if (typeof meta.title === 'string' && meta.title.trim()) setTitle(meta.title.trim());
          if (typeof meta.subtitle === 'string' && meta.subtitle.trim()) setSubtitle(meta.subtitle.trim());
          if (typeof meta.bottomText === 'string' && meta.bottomText.trim()) setBottomText(meta.bottomText.trim());
          if (typeof meta.badgeLabel === 'string' && meta.badgeLabel.trim()) setBadgeLabel(meta.badgeLabel.trim());
        }
      } catch (err) {
        // keep defaults on error
        console.warn('Failed to load testimonials.json, using defaults');
      }
    }
    loadTestimonials();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <Testimonial04 
      testimonials={testimonials}
      title={title}
      subtitle={subtitle}
      bottomText={bottomText}
      badgeLabel={badgeLabel}
    />
  );
};

export default Testimonials;
