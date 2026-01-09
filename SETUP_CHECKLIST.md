# Setup Checklist

Use this checklist to track your progress setting up the website.

## ✅ Installation & Setup

### Initial Setup
- [ ] Node.js installed (version 18.17 or later)
- [ ] Project files downloaded/copied
- [ ] Opened terminal in project directory
- [ ] Ran `npm install` successfully
- [ ] Ran `npm run dev` successfully
- [ ] Website loads at http://localhost:3000

**Time:** ~5 minutes

---

## 📝 Content Customization

### Phase 1: Essential Information (15-30 minutes)

#### Church Identity
- [ ] Updated church name in `components/Navigation.tsx` (line 64)
- [ ] Updated church tagline in `components/Navigation.tsx` (line 65)
- [ ] Changed hero headline in `components/Hero.tsx` (line 21)
- [ ] Changed hero subtitle in `components/Hero.tsx` (line 24)

#### Service Times
- [ ] Updated Sunday morning services in `components/Hero.tsx` (lines 30-44)
- [ ] Updated Wednesday service in `components/Hero.tsx` (lines 45-51)
- [ ] Updated service times in `components/Footer.tsx` (lines 46-57)

#### Contact Information
- [ ] Updated phone number in `components/Footer.tsx` (line 72)
- [ ] Updated email in `components/Footer.tsx` (line 78)
- [ ] Updated address in `components/Footer.tsx` (lines 63-69)
- [ ] Updated phone in `app/contact/page.tsx` (line 81)
- [ ] Updated email in `app/contact/page.tsx` (line 92)
- [ ] Updated address in `app/contact/page.tsx` (lines 60-70)

#### Office Hours
- [ ] Updated office hours in `components/Footer.tsx` (lines 91-94)
- [ ] Updated office hours in `app/contact/page.tsx` (lines 102-107)

**Progress:** ___/15 tasks complete

---

### Phase 2: Images (30-60 minutes)

#### Prepare Images
- [ ] Created `public/images/` subdirectories (hero, events, sermons, ministries)
- [ ] Optimized all images for web (compressed, proper size)
- [ ] Renamed images with descriptive names

#### Update Image References
- [ ] Hero background in `components/Hero.tsx` (line 14)
- [ ] Event images in `components/UpcomingEvents.tsx` (lines 24, 33, 42, 51)
- [ ] Sermon thumbnails in `components/LatestSermons.tsx` (lines 18, 27, 36)
- [ ] Ministry images in `app/ministries/page.tsx` (lines 9, 17, 25, 33, 41, 49, 57)
- [ ] Children's ministry images in `app/ministries/children/page.tsx` (lines 39-45)
- [ ] Youth ministry images in `app/ministries/youth/page.tsx` (lines 38-44)

**Progress:** ___/12 tasks complete

---

### Phase 3: Events & Content (1-2 hours)

#### Events
- [ ] Updated event 1 in `components/UpcomingEvents.tsx` (lines 21-31)
- [ ] Updated event 2 (lines 32-42)
- [ ] Updated event 3 (lines 43-53)
- [ ] Updated event 4 (lines 54-64)
- [ ] Added more events if needed
- [ ] Updated events in `app/events/page.tsx` (lines 22-95)
- [ ] Modified event categories if needed (line 98)

#### Sermons
- [ ] Updated sermon 1 in `components/LatestSermons.tsx` (lines 14-24)
- [ ] Updated sermon 2 (lines 25-35)
- [ ] Updated sermon 3 (lines 36-46)
- [ ] Added more sermons if desired

**Progress:** ___/11 tasks complete

---

### Phase 4: Ministry Pages (2-3 hours)

#### Children's Ministry
- [ ] Updated contact person in `app/ministries/children/page.tsx` (lines 11-15)
- [ ] Updated meeting times (line 9)
- [ ] Updated location (line 10)
- [ ] Modified age groups if needed (lines 50-85)
- [ ] Updated special events (lines 89-103)

#### Youth Ministry
- [ ] Updated contact person in `app/ministries/youth/page.tsx` (lines 11-15)
- [ ] Updated meeting times (line 9)
- [ ] Updated location (line 10)
- [ ] Modified programs if needed (lines 50-85)
- [ ] Updated annual events (lines 91-129)

#### Other Ministries
- [ ] Created young adults page (use template)
- [ ] Created adults page (use template)
- [ ] Created seniors page (use template)
- [ ] Created women's page (use template)
- [ ] Created men's page (use template)

**Progress:** ___/15 tasks complete

---

## 🔌 Integrations

### Phase 5: Tithe.ly Setup (15-30 minutes)

- [ ] Created Tithe.ly account at get.tithe.ly
- [ ] Completed church profile in Tithe.ly
- [ ] Obtained Church ID from Tithe.ly dashboard
- [ ] Got embed code from Tithe.ly
- [ ] Updated `app/give/page.tsx` with embed code (lines 75-110)
- [ ] Tested giving process
- [ ] Updated text-to-give number if applicable (line 223)

**Progress:** ___/7 tasks complete

---

### Phase 6: Google Maps (10 minutes)

- [ ] Found church location on Google Maps
- [ ] Clicked "Share" → "Embed a map"
- [ ] Copied iframe code
- [ ] Pasted into `app/contact/page.tsx` (line 255+)
- [ ] Tested map display

**Progress:** ___/5 tasks complete

---

### Phase 7: Form Handling (30-60 minutes)

#### Option A: Formspree (Easiest)
- [ ] Created account at formspree.io
- [ ] Created form endpoint
- [ ] Updated contact form handler
- [ ] Updated event registration handler
- [ ] Tested form submissions

#### Option B: Email Service (SendGrid/Mailgun)
- [ ] Created account with email service
- [ ] Obtained API key
- [ ] Created `.env.local` file
- [ ] Added API key to environment variables
- [ ] Created API route in `app/api/`
- [ ] Updated form handlers
- [ ] Tested form submissions

#### Option C: Custom Backend
- [ ] Set up backend server/service
- [ ] Created API endpoints
- [ ] Updated form submission handlers
- [ ] Tested end-to-end

**Progress:** ___/5-8 tasks complete (depending on option)

---

### Phase 8: Social Media (5 minutes)

- [ ] Updated Facebook link in `components/Footer.tsx` (line 35)
- [ ] Updated Instagram link (line 44)
- [ ] Updated YouTube link (line 53)
- [ ] Added other social media if needed
- [ ] Removed social icons if not using

**Progress:** ___/5 tasks complete

---

## 🎨 Optional Customization

### Phase 9: Colors & Branding (30 minutes)

- [ ] Decided on color scheme
- [ ] Generated color shades at uicolors.app
- [ ] Updated primary colors in `tailwind.config.ts` (lines 14-22)
- [ ] Updated secondary colors (lines 23-31)
- [ ] Updated accent colors (lines 32-40)
- [ ] Tested color contrast for accessibility
- [ ] Adjusted if needed

**Progress:** ___/7 tasks complete

---

### Phase 10: Logo (30 minutes)

- [ ] Created or obtained church logo
- [ ] Exported logo in SVG or PNG format
- [ ] Added logo to `public/images/`
- [ ] Updated logo placeholder in `components/Navigation.tsx` (lines 61-63)
- [ ] Adjusted logo size if needed
- [ ] Added favicon (logo in `public/` folder)

**Progress:** ___/6 tasks complete

---

## 🧪 Testing

### Phase 11: Functionality Testing (30 minutes)

#### Desktop Testing
- [ ] Tested all navigation links
- [ ] Tested dropdown menus
- [ ] Submitted contact form
- [ ] Registered for an event
- [ ] Clicked Give button
- [ ] Tested all Quick Links
- [ ] Verified external links (map, social media)

#### Mobile Testing
- [ ] Opened site on phone/tablet
- [ ] Tested hamburger menu
- [ ] Tested forms on mobile
- [ ] Checked text readability
- [ ] Verified images load
- [ ] Tested touch interactions

#### Browser Testing
- [ ] Tested in Chrome
- [ ] Tested in Safari
- [ ] Tested in Firefox
- [ ] Tested in Edge (if applicable)

**Progress:** ___/18 tasks complete

---

## 🚀 Pre-Deployment

### Phase 12: Final Preparations (1 hour)

#### Content Review
- [ ] Proofread all text
- [ ] Spell-checked content
- [ ] Verified all links work
- [ ] Checked for placeholder text
- [ ] Ensured images load correctly

#### Technical Review
- [ ] Ran `npm run build` successfully
- [ ] No console errors
- [ ] Lighthouse audit passed (70+ scores)
- [ ] Images optimized (under 500KB each)
- [ ] Forms tested and working

#### Legal & Privacy
- [ ] Created privacy policy page (if needed)
- [ ] Created terms of use page (if needed)
- [ ] Added copyright year to footer
- [ ] Verified 501(c)(3) info is correct

**Progress:** ___/13 tasks complete

---

## 🌐 Deployment

### Phase 13: Going Live (30-60 minutes)

#### Vercel Deployment
- [ ] Created Vercel account
- [ ] Pushed code to GitHub
- [ ] Imported project in Vercel
- [ ] Added environment variables
- [ ] Deployed successfully
- [ ] Tested deployed site
- [ ] Added custom domain (if ready)
- [ ] Configured DNS settings
- [ ] Verified SSL certificate

#### OR Self-Hosting
- [ ] Set up server
- [ ] Installed Node.js
- [ ] Uploaded project files
- [ ] Ran build command
- [ ] Configured process manager
- [ ] Set up Nginx/Apache
- [ ] Configured SSL certificate
- [ ] Pointed domain to server
- [ ] Tested live site

**Progress:** ___/9 tasks complete

---

## 📊 Post-Launch

### Phase 14: After Launch (Ongoing)

#### Week 1
- [ ] Monitored for errors
- [ ] Gathered feedback from staff
- [ ] Fixed any issues found
- [ ] Announced launch to congregation

#### Month 1
- [ ] Updated events calendar
- [ ] Added new sermons
- [ ] Responded to contact form submissions
- [ ] Reviewed analytics (if set up)

#### Ongoing
- [ ] Weekly: Update events
- [ ] Weekly: Add new sermons
- [ ] Monthly: Review content freshness
- [ ] Quarterly: Update ministry information
- [ ] Annually: Review entire site

**Progress:** ___/9 tasks complete

---

## 📈 Progress Summary

### Overall Completion

| Phase | Tasks | Status |
|-------|-------|--------|
| Installation | 6 | ⬜ |
| Essential Info | 15 | ⬜ |
| Images | 12 | ⬜ |
| Events & Content | 11 | ⬜ |
| Ministry Pages | 15 | ⬜ |
| Tithe.ly | 7 | ⬜ |
| Google Maps | 5 | ⬜ |
| Form Handling | 5-8 | ⬜ |
| Social Media | 5 | ⬜ |
| Colors | 7 | ⬜ |
| Logo | 6 | ⬜ |
| Testing | 18 | ⬜ |
| Pre-Deployment | 13 | ⬜ |
| Deployment | 9 | ⬜ |
| Post-Launch | 9 | ⬜ |

**Total Tasks:** ~143
**Completed:** ___
**Percentage:** ___%

---

## 🎯 Quick Launch Path

If you need to launch quickly, focus on these essentials:

### Minimum Viable Launch (2-3 hours)
1. ✅ Update church name and contact info
2. ✅ Update service times
3. ✅ Replace hero background image
4. ✅ Add 2-3 real events
5. ✅ Test contact form
6. ✅ Deploy to Vercel

Everything else can be added after launch!

---

## 📞 Need Help?

Stuck on something? Check these resources:

1. **[QUICKSTART.md](QUICKSTART.md)** - Quick setup guide
2. **[README.md](README.md)** - Full documentation
3. **[COMPONENTS.md](COMPONENTS.md)** - Component reference
4. **[DEPLOYMENT.md](DEPLOYMENT.md)** - Deployment guide

---

**Keep this checklist handy and check off items as you complete them!**

**Good luck with your launch! 🚀**
