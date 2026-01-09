# Faith Community Church Website

A modern, responsive church website built with Next.js 14, TypeScript, and Tailwind CSS. Features include event registration, online giving integration, ministry pages, sermon archive, and more.

## Features

### Homepage
- **Hero Section** with service times, location, and "Watch Live" button placeholder
- **Quick Links** for Give, Calendar, Ministries, and Contact
- **Latest Sermons** section with placeholder for future audio/video integration
- **Upcoming Events** with registration capability
- **Responsive Footer** with contact information and service times

### Key Pages
- **Give Page** - Ready for Tithe.ly integration
- **Ministries** - Template-based pages for all ministry groups
- **Events & Calendar** - Filterable event listings with registration
- **Contact** - Form with office hours and location information

### Features
- ✅ Mobile-responsive design with hamburger menu
- ✅ Event registration modal with form handling
- ✅ Tithe.ly giving integration ready
- ✅ Warm, welcoming color palette
- ✅ Accessible (WCAG AA compliant)
- ✅ SEO optimized
- ✅ Fast loading times

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Fonts:** Inter (sans-serif), Merriweather (serif)

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm

### Installation

1. Clone the repository or navigate to the project directory:
```bash
cd church-website
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the website.

### Build for Production

```bash
npm run build
npm run start
```

## Configuration

### 1. Customize Church Information

Update the following files with your church's information:

#### Navigation & Branding
- [`components/Navigation.tsx`](components/Navigation.tsx) - Church name and logo
- [`components/Footer.tsx`](components/Footer.tsx) - Contact info, service times, social media links

#### Homepage Hero
- [`components/Hero.tsx`](components/Hero.tsx) - Service times, address, church tagline

#### Contact Information
- [`app/contact/page.tsx`](app/contact/page.tsx) - Phone, email, office hours, address

### 2. Tithe.ly Integration

To integrate Tithe.ly for online giving:

1. Sign up at [get.tithe.ly](https://get.tithe.ly)
2. Get your Church ID from your Tithe.ly dashboard
3. Open [`app/give/page.tsx`](app/give/page.tsx)
4. Replace the placeholder section with your Tithe.ly embed code:

```tsx
// Option 1: Tithe.ly Widget
<script src="https://tithe.ly/widget/v3/give.js?3"></script>
<tithe-ly-widget church-id="YOUR_CHURCH_ID"></tithe-ly-widget>

// Option 2: Tithe.ly iFrame
// Get the iframe code from your Tithe.ly dashboard
```

5. Update text-to-give phone number if applicable

### 3. Add Your Images

Replace placeholder images with your own:

1. Add images to [`public/images/`](public/images/)
2. Update image URLs in components:
   - Hero backgrounds
   - Ministry photos
   - Event images
   - Sermon thumbnails

### 4. Color Scheme Customization

The default color scheme uses warm oranges and blues. To customize:

Edit [`tailwind.config.ts`](tailwind.config.ts):

```typescript
colors: {
  primary: { /* Your primary color shades */ },
  secondary: { /* Your secondary color shades */ },
  accent: { /* Your accent color shades */ },
}
```

### 5. Google Maps Integration

Add your Google Maps embed to the contact page:

1. Get your embed code from [Google Maps](https://www.google.com/maps)
2. Open [`app/contact/page.tsx`](app/contact/page.tsx)
3. Replace the placeholder in the Map Section with your iframe

### 6. Form Submission Handling

Currently, forms log to console. To connect to a backend:

#### Event Registration ([`components/EventRegistrationModal.tsx`](components/EventRegistrationModal.tsx))
#### Contact Form ([`app/contact/page.tsx`](app/contact/page.tsx))

Replace the simulated API calls with actual backend endpoints:

```typescript
// Replace this:
await new Promise((resolve) => setTimeout(resolve, 1500));
console.log('Form Data:', formData);

// With this:
const response = await fetch('/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData),
});
```

Recommended services for form handling:
- **Formspree** - Simple form backend
- **SendGrid** - Email API
- **Mailgun** - Email service
- **Custom API** - Build your own with Next.js API routes

## Project Structure

```
church-website/
├── app/
│   ├── about/
│   │   └── visit/
│   ├── contact/
│   ├── events/
│   ├── give/
│   ├── ministries/
│   │   ├── children/
│   │   ├── youth/
│   │   └── [other ministries]/
│   ├── resources/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx (homepage)
├── components/
│   ├── Navigation.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── QuickLinks.tsx
│   ├── LatestSermons.tsx
│   ├── UpcomingEvents.tsx
│   ├── EventRegistrationModal.tsx
│   └── MinistryTemplate.tsx
├── public/
│   └── images/
├── lib/
├── tailwind.config.ts
├── tsconfig.json
├── next.config.mjs
└── package.json
```

## Adding New Pages

### Ministry Pages

Use the `MinistryTemplate` component for consistent ministry pages:

```typescript
import MinistryTemplate from '@/components/MinistryTemplate';

export default function NewMinistryPage() {
  return (
    <MinistryTemplate
      title="Ministry Name"
      subtitle="Tagline"
      description="Description"
      heroImage="URL"
      meetingTime="When"
      location="Where"
      contactPerson={{
        name: "Name",
        email: "email@example.com",
        phone: "(555) 123-4567"
      }}
      // Add custom content as children
    >
      {/* Custom sections */}
    </MinistryTemplate>
  );
}
```

### Content Pages

Create new pages in the `app/` directory following Next.js 14 App Router conventions.

## Future Enhancements

- [ ] Live streaming integration
- [ ] Sermon audio/video player
- [ ] Member portal/login
- [ ] Event calendar view
- [ ] Newsletter signup
- [ ] Blog/news section
- [ ] Photo gallery with lightbox
- [ ] Prayer request submission
- [ ] Volunteer signup system
- [ ] CMS integration (Sanity, Contentful, etc.)

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository at [vercel.com](https://vercel.com)
3. Vercel will automatically detect Next.js and deploy

### Other Platforms

- **Netlify** - Connect your Git repository
- **AWS Amplify** - Deploy with AWS infrastructure
- **DigitalOcean App Platform** - Simple deployment
- **Self-hosted** - Run `npm run build` and serve the `.next` folder

## Environment Variables

Create a `.env.local` file for sensitive information:

```env
NEXT_PUBLIC_TITHE_LY_CHURCH_ID=your_church_id
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key
EMAIL_SERVICE_API_KEY=your_email_api_key
```

## Support & Customization

### Customization Needs

For extensive customization or feature additions, consider hiring a web developer familiar with:
- Next.js / React
- TypeScript
- Tailwind CSS

### Maintenance

Regularly update dependencies:

```bash
npm update
```

Check for security vulnerabilities:

```bash
npm audit
```

## License

This project is created for Faith Community Church. Customize and use as needed for your church.

## Credits

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [Lucide](https://lucide.dev/)
- Images from [Unsplash](https://unsplash.com/)

---

**Need Help?** Contact your web development team or refer to the [Next.js Documentation](https://nextjs.org/docs).
