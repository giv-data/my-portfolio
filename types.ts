import { LucideIcon } from 'lucide-react';

export type Language = 'en' | 'fa';

export interface SocialLink {
  id: string; // unique id for translation lookup
  url: string;
  icon: LucideIcon;
  color: string;
}

export interface Skill {
  name: string;
  link?: string;      // Optional link (e.g., for Resume)
  highlight?: boolean; // If true, applies distinct styling
}

export interface PersonalityTrait {
  label: string;
  value: string;
  subValue?: string; // For things like "High", "Moderate"
}

export interface PersonalityCategory {
  title: string;
  traits: PersonalityTrait[];
}

export interface Translation {
  name: string;
  role: string;
  aboutTitle: string;
  aboutText: string;
  skillsTitle: string;
  skills: Skill[]; // Added skills here
  socialsTitle: string;
  personalityTitle: string;
  socialNames: Record<string, string>; // Map id to localized name
  copyright: string;
  changeLang: string;
  personality: PersonalityCategory[];
  menu: {
    home: string;
    about: string;
    skills: string;
    personality: string;
    contact: string;
  }
}