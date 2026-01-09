# Component Reference Guide

This guide explains each component in the website and how to customize it.

## Navigation Components

### Navigation.tsx

**Location:** `components/Navigation.tsx`

**Purpose:** Main site navigation with dropdowns

**Customization:**

```typescript
// Change church name (lines 63-67)
<div className="text-xl font-bold text-neutral-900">Faith Community Church</div>
<div className="text-xs text-neutral-600">Growing Together in Faith</div>

// Update menu items (lines 12-59)
const menuItems: MenuItem[] = [
  {
    name: 'About',
    href: '/about',
    submenu: [ /* ... */ ]
  },
  // Add or remove items
];
```

**Features:**
- Desktop dropdown menus
- Mobile hamburger menu
- Sticky header
- Logo placeholder
- Give button in header

### Footer.tsx

**Location:** `components/Footer.tsx`

**Purpose:** Site footer with contact info and links

**Customization:**

```typescript
// Update contact info (lines 59-87)
<Phone /> (555) 123-4567
<Mail /> info@faithcommunity.org
<MapPin /> 123 Faith Avenue...

// Update service times (lines 46-57)
// Update social media (lines 30-57)
// Update office hours (lines 89-95)
```

**Features:**
- Contact information
- Service times
- Quick links
- Social media icons
- Office hours
- Copyright

## Homepage Components

### Hero.tsx

**Location:** `components/Hero.tsx`

**Purpose:** Homepage hero section with service times

**Customization:**

```typescript
// Change background image (line 14)
backgroundImage: "url('/images/your-hero.jpg')"

// Update headline (lines 21-26)
<h1>Welcome Home</h1>
<p>A community of faith...</p>

// Update service times (lines 30-55)
<div className="text-3xl font-bold">9:00 AM</div>

// Update address (lines 59-67)
123 Faith Avenue, Cityville, ST 12345
```

**Features:**
- Full-screen hero
- Background image with overlay
- Service times in cards
- Address with map link
- CTA buttons
- "Watch Live" placeholder

### QuickLinks.tsx

**Location:** `components/QuickLinks.tsx`

**Purpose:** Quick access cards to key pages

**Customization:**

```typescript
// Modify links (lines 5-38)
const quickLinks = [
  {
    icon: Heart,
    title: 'Give',
    description: 'Support our ministry...',
    href: '/give',
    color: 'bg-primary-600',
  },
  // Add or modify links
];
```

**Features:**
- Card-based layout
- Icons from Lucide
- Hover effects
- Responsive grid
- Color customization

### LatestSermons.tsx

**Location:** `components/LatestSermons.tsx`

**Purpose:** Display recent sermons

**Customization:**

```typescript
// Update sermon data (lines 14-42)
const sermons: Sermon[] = [
  {
    id: 1,
    title: 'Walking in Faith',
    date: '2024-01-14',
    speaker: 'Pastor John Smith',
    scripture: 'Hebrews 11:1-6',
    series: 'Faith That Moves Mountains',
    description: '...',
    thumbnailUrl: '/images/sermon1.jpg',
  },
  // Add more sermons
];
```

**Features:**
- Grid layout
- Sermon cards with metadata
- Play button placeholder
- Series badges
- Link to full archive
- Responsive design

### UpcomingEvents.tsx

**Location:** `components/UpcomingEvents.tsx`

**Purpose:** Display upcoming events with registration

**Customization:**

```typescript
// Update events (lines 21-71)
const events: Event[] = [
  {
    id: 1,
    title: 'Community Outreach Day',
    date: '2024-02-10',
    time: '9:00 AM - 3:00 PM',
    location: 'City Community Center',
    description: '...',
    imageUrl: '/images/event1.jpg',
    category: 'Outreach',
  },
  // Add more events
];
```

**Features:**
- Event cards with images
- Category badges
- Date display
- Register button
- Opens registration modal
- Responsive grid

### EventRegistrationModal.tsx

**Location:** `components/EventRegistrationModal.tsx`

**Purpose:** Modal form for event registration

**Customization:**

```typescript
// Form fields (lines 55-140)
// Modify fields as needed
// Update submission handler (lines 28-44)

// Connect to backend:
const response = await fetch('/api/register', {
  method: 'POST',
  body: JSON.stringify(formData)
});
```

**Features:**
- Modal overlay
- Form validation
- Success animation
- Attendee selection
- Notes field
- Auto-close after success

## Page Templates

### MinistryTemplate.tsx

**Location:** `components/MinistryTemplate.tsx`

**Purpose:** Reusable template for ministry pages

**Usage:**

```typescript
import MinistryTemplate from '@/components/MinistryTemplate';

export default function YourMinistryPage() {
  return (
    <MinistryTemplate
      title="Ministry Name"
      subtitle="Tagline here"
      description="Full description"
      heroImage="/images/ministry-hero.jpg"
      ageGroup="Ages 6-12"
      meetingTime="Sundays 9:00 AM"
      location="Room 101"
      contactPerson={{
        name: "Jane Doe",
        email: "jane@church.org",
        phone: "(555) 123-4567"
      }}
      callToAction={{
        text: "Register Now",
        href: "/contact"
      }}
      resources={[
        {
          title: "Parent Handbook",
          description: "Info for parents",
          downloadUrl: "/downloads/handbook.pdf"
        }
      ]}
      gallery={[
        { url: "/images/1.jpg", alt: "Photo 1" },
        { url: "/images/2.jpg", alt: "Photo 2" }
      ]}
    >
      {/* Custom content here */}
      <div>
        <h2>Custom Section</h2>
        <p>Your custom content</p>
      </div>
    </MinistryTemplate>
  );
}
```

**Props:**
- `title` - Ministry name (required)
- `subtitle` - Short description (required)
- `description` - Long description (required)
- `heroImage` - Background image URL (required)
- `ageGroup` - Target age group (optional)
- `meetingTime` - When meetings occur (optional)
- `location` - Where meetings occur (optional)
- `contactPerson` - Contact info object (optional)
- `callToAction` - CTA button config (optional)
- `resources` - Downloadable files array (optional)
- `gallery` - Photo array (optional)
- `children` - Custom content (optional)

**Features:**
- Hero section
- Info cards (time, location, contact)
- Custom content area
- Resources section
- Photo gallery
- Fully responsive

## Page Components

### Give Page

**Location:** `app/give/page.tsx`

**Purpose:** Online giving with Tithe.ly integration

**Customization:**

```typescript
// Replace Tithe.ly placeholder (lines 75-110)
<tithe-ly-widget church-id="YOUR_CHURCH_ID"></tithe-ly-widget>

// Update giving methods (lines 145-185)
// Modify why we give section (lines 30-75)
```

**Features:**
- Tithe.ly integration area
- Multiple giving methods
- Security information
- 501(c)(3) notice
- Why we give section

### Contact Page

**Location:** `app/contact/page.tsx`

**Purpose:** Contact form and information

**Customization:**

```typescript
// Update contact info (lines 30-90)
<Phone /> (555) 123-4567
<Mail /> info@church.org
<MapPin /> 123 Faith Avenue

// Modify form fields (lines 95-200)
// Add Google Maps (lines 250+)
```

**Features:**
- Contact information cards
- Full contact form
- Subject dropdown
- Form validation
- Success message
- Google Maps placeholder
- Office hours

### Events Page

**Location:** `app/events/page.tsx`

**Purpose:** Event calendar with filtering

**Customization:**

```typescript
// Update events (lines 22-90)
const allEvents: Event[] = [
  { /* event data */ }
];

// Modify categories (line 93)
const categories = ['All', 'Worship', 'Youth', ...];
```

**Features:**
- Category filtering
- Event grid
- Registration buttons
- Date badges
- Search/filter
- Registration modal

### Ministries Hub

**Location:** `app/ministries/page.tsx`

**Purpose:** Overview of all ministries

**Customization:**

```typescript
// Update ministries list (lines 5-58)
const ministries = [
  {
    title: 'Children',
    description: '...',
    ageGroup: 'Birth - 5th Grade',
    icon: Users,
    href: '/ministries/children',
    color: 'from-primary-500 to-primary-600',
    image: '/images/children.jpg',
  },
  // Add or modify ministries
];
```

**Features:**
- Ministry cards
- Age group badges
- Icons
- Images
- Links to ministry pages
- Responsive grid

## Styling System

### Utility Classes

**Location:** `app/globals.css`

Pre-defined utility classes:

```css
.btn-primary       /* Primary button style */
.btn-secondary     /* Secondary button style */
.btn-outline       /* Outline button style */
.section-padding   /* Consistent section spacing */
.container-custom  /* Container with padding */
```

**Usage:**

```tsx
<button className="btn-primary">Click Me</button>
<section className="section-padding bg-white">
  <div className="container-custom">
    Content here
  </div>
</section>
```

### Color Classes

**Tailwind Classes:**

```
Primary: text-primary-600, bg-primary-600, border-primary-600
Secondary: text-secondary-600, bg-secondary-600, border-secondary-600
Accent: text-accent-600, bg-accent-600, border-accent-600
Neutral: text-neutral-600, bg-neutral-600, border-neutral-600
```

**Shades:** 50, 100, 200, 300, 400, 500, 600, 700, 800, 900

## Icons

### Lucide React Icons

**Usage:**

```tsx
import { Heart, Calendar, Users } from 'lucide-react';

<Heart className="w-6 h-6 text-primary-600" />
<Calendar className="w-5 h-5" />
<Users className="w-8 h-8" />
```

**Common Icons:**
- `Heart` - Love, giving
- `Calendar` - Events
- `Users` - Community
- `Mail` - Email
- `Phone` - Phone
- `MapPin` - Location
- `Clock` - Time
- `BookOpen` - Bible, learning
- `Play` - Media
- `ChevronDown` - Dropdown

**Find more:** [lucide.dev](https://lucide.dev)

## Responsive Breakpoints

**Tailwind Breakpoints:**

```
sm: 640px    /* Small tablets */
md: 768px    /* Tablets */
lg: 1024px   /* Laptops */
xl: 1280px   /* Desktops */
2xl: 1536px  /* Large screens */
```

**Usage:**

```tsx
<div className="text-sm md:text-base lg:text-lg">
  Responsive text
</div>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  Responsive grid
</div>
```

## Common Patterns

### Adding a New Page

1. Create file in `app/` directory:
```
app/new-page/page.tsx
```

2. Use this template:
```tsx
export default function NewPage() {
  return (
    <main>
      <section className="section-padding bg-white">
        <div className="container-custom">
          <h1 className="text-4xl font-bold mb-6">Page Title</h1>
          <p>Your content here</p>
        </div>
      </section>
    </main>
  );
}
```

3. Add to navigation menu in `Navigation.tsx`

### Adding Images

1. Place in `public/images/` folder
2. Reference with `/images/filename.jpg`
3. Use Next.js Image component (optional):

```tsx
import Image from 'next/image';

<Image
  src="/images/photo.jpg"
  alt="Description"
  width={800}
  height={600}
/>
```

### Creating Forms

1. Use controlled components:
```tsx
const [formData, setFormData] = useState({
  name: '',
  email: ''
});

const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value
  });
};
```

2. Handle submission:
```tsx
const handleSubmit = async (e) => {
  e.preventDefault();
  // Send to backend
};
```

3. Add validation and success states

## Tips & Best Practices

### Performance
- Optimize images before uploading
- Use WebP format when possible
- Lazy load images below the fold
- Minimize custom CSS

### Accessibility
- Always add alt text to images
- Use semantic HTML
- Ensure sufficient color contrast
- Test keyboard navigation

### Code Organization
- One component per file
- Keep components small and focused
- Reuse common patterns
- Comment complex logic

### Content
- Keep text concise
- Use high-quality images
- Update content regularly
- Test on multiple devices

## Need Help?

- **Component not working?** Check browser console for errors
- **Styling issues?** Verify Tailwind classes
- **Can't find something?** Use search (Ctrl/Cmd + F)
- **Still stuck?** Refer to [README.md](README.md) or contact developer

---

**Happy Customizing! 🎨**
