// Base Cosmic object interface
interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

// Service type
export interface Service extends CosmicObject {
  type: 'services';
  metadata: {
    service_name?: string;
    description?: string;
    pricing_info?: string;
    service_image?: {
      url: string;
      imgix_url: string;
    };
    featured?: boolean;
  };
}

// Team Member type
export interface TeamMember extends CosmicObject {
  type: 'team-members';
  metadata: {
    full_name?: string;
    role?: string;
    bio?: string;
    photo?: {
      url: string;
      imgix_url: string;
    };
    instagram_handle?: string | null;
  };
}

// Testimonial type
export interface Testimonial extends CosmicObject {
  type: 'testimonials';
  metadata: {
    quote?: string;
    author_name?: string;
    author_title?: string;
    location?: string;
    featured_homepage?: boolean;
  };
}

// Case Study type
export interface CaseStudy extends CosmicObject {
  type: 'case-studies';
  metadata: {
    project_name?: string;
    client_context?: string;
    overview?: string;
    challenge?: string;
    solution?: string;
    results?: string;
    featured_image?: {
      url: string;
      imgix_url: string;
    };
    project_gallery?: Array<{
      url: string;
      imgix_url: string;
    }>;
    project_date?: string;
  };
}

// First Light Payment type
export interface FirstLightPayment extends CosmicObject {
  type: 'first-light-payments';
  metadata: {
    artist_name?: string;
    email?: string;
    phone?: string;
    exhibition_tier?: string;
    addons?: string; // JSON string
    total_amount?: number;
    payment_proof?: {
      url: string;
      imgix_url: string;
    };
    payment_status?: string;
    submission_date?: string;
  };
}

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit?: number;
  skip?: number;
}

// Exhibition tier interface
export interface ExhibitionTier {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
}

// Add-on interface
export interface AddOn {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
}

// Package interface
export interface Package {
  id: string;
  name: string;
  price: number;
  description: string;
  includes: string[];
  savings?: number;
}