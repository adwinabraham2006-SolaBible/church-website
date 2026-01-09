# Quick Start Guide

Welcome! This guide will help you get your church website up and running quickly.

## 🚀 5-Minute Setup

### Step 1: Install Dependencies (2 minutes)

Open Terminal/Command Prompt and navigate to the project folder:

```bash
cd church-website
npm install
```

Wait for installation to complete.

### Step 2: Start Development Server (1 minute)

```bash
npm run dev
```

Open your browser and visit: **http://localhost:3000**

You should see your church website running locally!

### Step 3: Customize Your Information (2 minutes)

#### Quick Edits - Open these files and update:

**1. Church Name & Logo**
- File: `components/Navigation.tsx`
- Line 62-69: Change "Faith Community Church" to your church name

**2. Service Times**
- File: `components/Hero.tsx`
- Lines 28-44: Update your service times

**3. Contact Information**
- File: `components/Footer.tsx`
- Lines 59-79: Update phone, email, address

**4. Hero Text**
- File: `components/Hero.tsx`
- Lines 21-26: Change headline and tagline

Save the files and your browser will automatically refresh!

## 📋 Essential Customizations

### Update Church Details (15 minutes)

#### 1. Homepage Hero Section
**File:** [`components/Hero.tsx`](components/Hero.tsx)

```typescript
// Change these:
- Church name headline (line 21-23)
- Tagline (line 24-26)
- Service times (lines 30-55)
- Address (line 59-67)
```

#### 2. Navigation
**File:** [`components/Navigation.tsx`](components/Navigation.tsx)

```typescript
// Change church name (line 63-67)
// Logo placeholder (line 61-63)
// Menu items are configured in lines 12-59
```

#### 3. Footer
**File:** [`components/Footer.tsx`](components/Footer.tsx)

```typescript
// Update:
- Contact information (lines 59-87)
- Service times (lines 46-57)
- Social media links (lines 30-57)
- Office hours (lines 89-95)
```

### Replace Placeholder Content (30 minutes)

#### Events
**File:** [`components/UpcomingEvents.tsx`](components/UpcomingEvents.tsx)

Lines 16-61: Replace example events with your actual events:

```typescript
const events: Event[] = [
  {
    id: 1,
    title: 'Your Event Name',
    date: '2024-02-10',
    time: '9:00 AM - 3:00 PM',
    location: 'Your Location',
    description: 'Your description',
    imageUrl: 'your-image-url',
    category: 'Category',
  },
  // Add more events...
];
```

#### Sermons
**File:** [`components/LatestSermons.tsx`](components/LatestSermons.tsx)

Lines 14-42: Replace example sermons:

```typescript
const sermons: Sermon[] = [
  {
    id: 1,
    title: 'Your Sermon Title',
    date: '2024-01-14',
    speaker: 'Pastor Name',
    scripture: 'Bible Reference',
    series: 'Series Name',
    description: 'Short description',
    thumbnailUrl: 'image-url',
  },
  // Add more sermons...
];
```

## 🎨 Customize Colors (10 minutes)

**File:** [`tailwind.config.ts`](tailwind.config.ts)

The website uses three main colors:
- **Primary** (orange) - Main brand color
- **Secondary** (blue) - Accent color
- **Accent** (red) - Call-to-action color

### Want different colors?

1. Choose your colors at [coolors.co](https://coolors.co) or [tailwindcss.com/docs/customizing-colors](https://tailwindcss.com/docs/customizing-colors)

2. Generate shades at [uicolors.app](https://uicolors.app)

3. Replace the color values in `tailwind.config.ts` (lines 12-44)

## 🖼️ Add Your Images (20 minutes)

### Step 1: Prepare Your Images

Recommended image sizes:
- **Hero background:** 1920x1080px
- **Event images:** 800x600px
- **Sermon thumbnails:** 800x600px
- **Ministry photos:** 800x600px

### Step 2: Add Images

1. Place images in `public/images/` folder
2. Create subfolders: `events/`, `sermons/`, `ministries/`

### Step 3: Update Image URLs

Replace Unsplash URLs with your images:

**Hero Background** - `components/Hero.tsx` line 14:
```typescript
backgroundImage: "url('/images/hero-background.jpg')"
```

**Event Images** - `components/UpcomingEvents.tsx`:
```typescript
imageUrl: '/images/events/your-event.jpg'
```

**Sermon Thumbnails** - `components/LatestSermons.tsx`:
```typescript
thumbnailUrl: '/images/sermons/sermon-thumb.jpg'
```

## 💳 Tithe.ly Setup (15 minutes)

### Step 1: Create Tithe.ly Account

1. Go to [get.tithe.ly](https://get.tithe.ly)
2. Sign up for an account
3. Complete church profile

### Step 2: Get Your Church ID

1. Login to Tithe.ly dashboard
2. Go to Settings
3. Find your Church ID

### Step 3: Add to Website

**File:** [`app/give/page.tsx`](app/give/page.tsx)

1. Find the placeholder section (lines 75-110)
2. Replace with Tithe.ly embed code:

```tsx
<script src="https://tithe.ly/widget/v3/give.js?3"></script>
<tithe-ly-widget church-id="YOUR_CHURCH_ID"></tithe-ly-widget>
```

Or use the iFrame option provided by Tithe.ly.

## 📧 Connect Forms to Email (Advanced)

Forms currently show success messages but don't send emails. To connect:

### Option 1: Use Formspree (Easiest)

1. Sign up at [formspree.io](https://formspree.io)
2. Create a form
3. Get your form endpoint
4. Update form submission code (see README)

### Option 2: Use SendGrid/Mailgun

1. Sign up for email service
2. Get API key
3. Create API route in Next.js
4. Update form handlers (see README for details)

## 📱 Test Mobile View

1. In your browser, press `F12` (Windows) or `Cmd+Option+I` (Mac)
2. Click the mobile device icon
3. Test different screen sizes
4. Check the hamburger menu works

## ✅ Pre-Launch Checklist

Before showing the website to others:

- [ ] Changed church name everywhere
- [ ] Updated all service times
- [ ] Updated contact information (phone, email, address)
- [ ] Replaced at least the hero image
- [ ] Added 2-3 real events
- [ ] Added 2-3 real sermons
- [ ] Tested contact form
- [ ] Tested event registration
- [ ] Checked mobile responsiveness
- [ ] Set up Tithe.ly (if using)
- [ ] Updated social media links

## 🆘 Common Questions

### "I can't see my changes"

**Solution:** Hard refresh your browser:
- Windows: `Ctrl + Shift + R`
- Mac: `Cmd + Shift + R`

### "The site looks broken"

**Solution:**
1. Stop the dev server (`Ctrl + C`)
2. Run `npm install` again
3. Run `npm run dev`

### "Images aren't showing"

**Solution:**
- Images in `public/` folder? ✓
- Using correct path? `/images/name.jpg` ✓
- Image file name spelled correctly? ✓

### "How do I change [X]?"

1. Search the project for the text you want to change
2. Update it in the file
3. Save and refresh

## 📚 Next Steps

Once you're comfortable with basic edits:

1. **Read the [README.md](README.md)** - Full documentation
2. **Read [DEPLOYMENT.md](DEPLOYMENT.md)** - How to put site online
3. **Customize ministry pages** - Add your ministry information
4. **Add more events** - Keep calendar updated
5. **Upload sermon archives** - Build your library

## 🎓 Learning Resources

New to web development? These resources help:

- [Next.js Tutorial](https://nextjs.org/learn)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [TypeScript Basics](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)

## 💡 Tips

1. **Make small changes** - Test one thing at a time
2. **Save often** - Changes apply immediately in dev mode
3. **Use Search** - Find text by searching all files (`Ctrl/Cmd + Shift + F` in VS Code)
4. **Keep backups** - Save copies before major changes
5. **Ask for help** - Don't hesitate to contact a developer

## 🎉 You're Ready!

Your church website is now set up and ready to customize. Take it step by step, and don't worry about making mistakes—you can always undo changes!

**Happy building! 🙏**

---

**Need Help?** Refer to [README.md](README.md) for detailed documentation or contact your web developer.
