# AVA Lite Creative Studio

![App Preview](https://imgix.cosmicjs.com/7abe8680-a7f8-11f0-936e-dbe343b25d95-photo-1513001900722-370f803f498d-1760334608305.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A modern, responsive website for AVA Lite - documenting and empowering Africa's creative generation through editorial features, creative services, and authentic storytelling.

## Features

- 🎨 **Dynamic Services Showcase** - Display creative services with detailed descriptions, pricing, and imagery
- 👥 **Team Member Profiles** - Individual profiles with bios, photos, and social links
- 💬 **Client Testimonials** - Featured testimonials from artists and photographers
- 📂 **Case Study Gallery** - Detailed project breakdowns with image galleries
- 📱 **Fully Responsive** - Optimized for all devices and screen sizes
- 🎯 **SEO Optimized** - Proper meta tags and semantic HTML
- ⚡ **Performance Focused** - Fast loading with Next.js 15 and imgix optimization
- 🌐 **Modern Design** - Contemporary UI with smooth animations and transitions

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=68ec8d343393cb29a918507e&clone_repository=68ec943c3393cb29a91850ca)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create a content model for a company website with services, team members, testimonials, and case studies"

### Code Generation Prompt

> Based on the content model I created for "Create a content model for a company website with services, team members, testimonials, and case studies", now build a complete web application that showcases this content. Include a modern, responsive design with proper navigation, content display, and user-friendly interface.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Cosmic CMS** - Headless content management
- **React** - UI component library
- **Bun** - Fast JavaScript runtime and package manager

## Getting Started

### Prerequisites

- Bun installed on your machine
- A Cosmic account with your bucket set up
- Node.js 18+ (if not using Bun)

### Installation

1. Clone this repository
```bash
git clone <your-repo-url>
cd avalite-creative-studio
```

2. Install dependencies
```bash
bun install
```

3. Set up environment variables

Create a `.env.local` file in the root directory:

```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
```

4. Run the development server
```bash
bun run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Cosmic SDK Examples

### Fetching Services

```typescript
import { cosmic } from '@/lib/cosmic'

export async function getServices() {
  try {
    const response = await cosmic.objects
      .find({ type: 'services' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects as Service[]
  } catch (error) {
    if (error.status === 404) {
      return []
    }
    throw error
  }
}
```

### Fetching Team Members

```typescript
export async function getTeamMembers() {
  try {
    const response = await cosmic.objects
      .find({ type: 'team-members' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects as TeamMember[]
  } catch (error) {
    if (error.status === 404) {
      return []
    }
    throw error
  }
}
```

### Fetching Single Case Study

```typescript
export async function getCaseStudy(slug: string) {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'case-studies', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.object as CaseStudy
  } catch (error) {
    if (error.status === 404) {
      return null
    }
    throw error
  }
}
```

## Cosmic CMS Integration

This application uses Cosmic CMS to manage all content dynamically. The content model includes:

- **Services** - Creative services offered (media production, direction, editorial)
- **Team Members** - Staff profiles with photos and bios
- **Testimonials** - Client feedback and reviews
- **Case Studies** - Detailed project showcases with galleries

All content is fetched server-side for optimal SEO and performance, with proper error handling for empty results.

## Deployment Options

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables in Vercel dashboard:
   - `COSMIC_BUCKET_SLUG`
   - `COSMIC_READ_KEY`
4. Deploy!

### Deploy to Netlify

1. Push your code to GitHub
2. Connect your repository in Netlify
3. Add environment variables in Netlify dashboard
4. Set build command: `bun run build`
5. Set publish directory: `.next`
6. Deploy!

### Environment Variables for Production

Make sure to set these environment variables in your hosting platform:

```env
COSMIC_BUCKET_SLUG=ava-lite-production
COSMIC_READ_KEY=your-production-read-key
```

## Project Structure

```
├── app/
│   ├── page.tsx                 # Homepage
│   ├── layout.tsx              # Root layout
│   ├── services/               # Services section
│   ├── team/                   # Team section
│   ├── case-studies/           # Case studies section
│   └── globals.css             # Global styles
├── components/
│   ├── Header.tsx              # Navigation header
│   ├── Footer.tsx              # Site footer
│   ├── ServiceCard.tsx         # Service display
│   ├── TeamMemberCard.tsx      # Team member display
│   ├── TestimonialCard.tsx     # Testimonial display
│   └── CaseStudyCard.tsx       # Case study display
├── lib/
│   └── cosmic.ts               # Cosmic SDK setup
└── types.ts                    # TypeScript definitions
```

## License

MIT License - feel free to use this project for your own purposes.

<!-- README_END -->