# Website Sitemap

Visual representation of all pages and navigation structure.

## 🏠 Homepage
**URL:** `/`
**File:** `app/page.tsx`

**Sections:**
- Hero (service times, location, Watch Live placeholder)
- Quick Links (Give, Calendar, Ministries, Contact)
- Latest Sermons
- Upcoming Events

---

## 🔗 Main Navigation

### 📖 About

#### What We Believe
**URL:** `/about/beliefs`
**Status:** ⏳ Not yet created
**Content:** Church doctrine, statement of faith

#### Leadership & Staff
**URL:** `/about/leadership`
**Status:** ⏳ Not yet created
**Content:** Pastor profiles, staff bios

#### Our History
**URL:** `/about/history`
**Status:** ⏳ Not yet created
**Content:** Church timeline, founding story

#### Visit Us
**URL:** `/about/visit`
**Status:** ⏳ Not yet created
**Content:** What to expect, directions, parking

---

### 👥 Ministries

#### Ministries Hub
**URL:** `/ministries`
**File:** `app/ministries/page.tsx`
**Status:** ✅ Complete
**Content:** Overview of all 7 ministry areas

#### Children's Ministry
**URL:** `/ministries/children`
**File:** `app/ministries/children/page.tsx`
**Status:** ✅ Complete
**Content:**
- Birth - 5th Grade programs
- Nursery, Preschool, Elementary, Upper Elementary
- Special events (VBS, Fall Festival, Christmas Program)
- Parent resources

#### Youth Ministry
**URL:** `/ministries/youth`
**File:** `app/ministries/youth/page.tsx`
**Status:** ✅ Complete
**Content:**
- 6th - 12th Grade programs
- Wednesday night youth group
- Small groups
- Annual trips and camps

#### College/Young Adults
**URL:** `/ministries/young-adults`
**Status:** ⏳ Not yet created
**Content:** 18-29 year old ministry

#### Adults
**URL:** `/ministries/adults`
**Status:** ⏳ Not yet created
**Content:** Small groups, Bible studies for 30+

#### Seniors
**URL:** `/ministries/seniors`
**Status:** ⏳ Not yet created
**Content:** 65+ ministry programs

#### Women's Ministry
**URL:** `/ministries/women`
**Status:** ⏳ Not yet created
**Content:** Women's Bible studies, events

#### Men's Ministry
**URL:** `/ministries/men`
**Status:** ⏳ Not yet created
**Content:** Men's groups, breakfasts, studies

---

### 🤝 Serve

#### Volunteer Opportunities
**URL:** `/serve/volunteer`
**Status:** ⏳ Not yet created
**Content:** Ways to serve, signup forms

#### Mission & Outreach
**URL:** `/serve/missions`
**Status:** ⏳ Not yet created
**Content:** Local and global missions

---

### 📅 Events & Calendar

**URL:** `/events`
**File:** `app/events/page.tsx`
**Status:** ✅ Complete
**Features:**
- Filterable event listings
- Category-based filtering
- Event registration modal
- 8 sample events included

---

### 📚 Resources

#### Sermons
**URL:** `/resources/sermons`
**Status:** ⏳ Not yet created
**Content:** Full sermon archive with search/filter

#### Bulletin
**URL:** `/resources/bulletin`
**Status:** ⏳ Not yet created
**Content:** Weekly bulletins, downloads

---

### 💰 Give

**URL:** `/give`
**File:** `app/give/page.tsx`
**Status:** ✅ Complete (needs Tithe.ly integration)
**Features:**
- Tithe.ly integration area
- Multiple giving methods
- Why we give section
- Security information

---

### 📧 Contact

**URL:** `/contact`
**File:** `app/contact/page.tsx`
**Status:** ✅ Complete
**Features:**
- Contact form
- Office location and hours
- Phone and email
- Google Maps placeholder

---

## 📄 Additional Pages (Suggested)

### Privacy Policy
**URL:** `/privacy`
**Status:** ⏳ Not yet created
**Content:** Privacy policy, data handling

### Terms of Use
**URL:** `/terms`
**Status:** ⏳ Not yet created
**Content:** Website terms and conditions

### Individual Sermon Pages
**URL:** `/resources/sermons/[id]`
**Status:** ⏳ Not yet created
**Content:** Single sermon with audio/video player

### Blog/News
**URL:** `/blog` or `/news`
**Status:** ⏳ Not yet created
**Content:** Church news, announcements

### Member Portal
**URL:** `/members`
**Status:** 💡 Future enhancement
**Content:** Member-only resources, login

---

## 🗂️ File Structure Map

```
app/
├── page.tsx                      ✅ Homepage
├── layout.tsx                    ✅ Root layout
├── globals.css                   ✅ Global styles
│
├── about/
│   ├── beliefs/page.tsx          ⏳ Not created
│   ├── leadership/page.tsx       ⏳ Not created
│   ├── history/page.tsx          ⏳ Not created
│   └── visit/page.tsx            ⏳ Not created
│
├── ministries/
│   ├── page.tsx                  ✅ Ministries hub
│   ├── children/page.tsx         ✅ Children's ministry
│   ├── youth/page.tsx            ✅ Youth ministry
│   ├── young-adults/page.tsx     ⏳ Not created
│   ├── adults/page.tsx           ⏳ Not created
│   ├── seniors/page.tsx          ⏳ Not created
│   ├── women/page.tsx            ⏳ Not created
│   └── men/page.tsx              ⏳ Not created
│
├── serve/
│   ├── volunteer/page.tsx        ⏳ Not created
│   └── missions/page.tsx         ⏳ Not created
│
├── events/
│   └── page.tsx                  ✅ Events calendar
│
├── resources/
│   ├── sermons/
│   │   ├── page.tsx              ⏳ Not created (archive)
│   │   └── [id]/page.tsx         ⏳ Not created (single)
│   └── bulletin/page.tsx         ⏳ Not created
│
├── give/
│   └── page.tsx                  ✅ Online giving
│
├── contact/
│   └── page.tsx                  ✅ Contact form
│
├── privacy/page.tsx              ⏳ Not created
└── terms/page.tsx                ⏳ Not created
```

---

## 📱 Component Map

```
components/
├── Navigation.tsx                ✅ Header navigation
├── Footer.tsx                    ✅ Site footer
├── Hero.tsx                      ✅ Homepage hero
├── QuickLinks.tsx                ✅ Quick link cards
├── LatestSermons.tsx             ✅ Sermons section
├── UpcomingEvents.tsx            ✅ Events section
├── EventRegistrationModal.tsx    ✅ Event registration form
└── MinistryTemplate.tsx          ✅ Ministry page template
```

---

## 🎯 Priority for Next Steps

### High Priority (Complete Core Site)
1. ✅ **Homepage** - Complete
2. ✅ **Navigation** - Complete
3. ✅ **Give Page** - Complete (add Tithe.ly)
4. ✅ **Contact Page** - Complete
5. ✅ **Events Page** - Complete
6. ⏳ **About > Visit Us** - Create this next
7. ⏳ **Resources > Sermons Archive** - Important for content

### Medium Priority (Enhance Content)
8. ⏳ **About > What We Believe** - Statement of faith
9. ⏳ **About > Leadership** - Staff profiles
10. ⏳ **Complete remaining ministry pages** - Use template
11. ⏳ **Serve pages** - Volunteer opportunities
12. ⏳ **Individual sermon pages** - With media player

### Lower Priority (Nice to Have)
13. ⏳ **About > Our History** - Timeline
14. ⏳ **Resources > Bulletin** - Weekly bulletins
15. ⏳ **Privacy Policy** - Legal page
16. ⏳ **Terms of Use** - Legal page
17. 💡 **Blog/News** - Future enhancement
18. 💡 **Member Portal** - Future enhancement

---

## 📊 Page Status Legend

- ✅ **Complete** - Page built and functional
- ⏳ **Not Yet Created** - Needs to be built
- 💡 **Future Enhancement** - Optional addition

---

## 🚀 Creating Missing Pages

### Using MinistryTemplate (Easy)

For any ministry page:

```tsx
// app/ministries/[ministry-name]/page.tsx
import MinistryTemplate from '@/components/MinistryTemplate';

export default function MinistryPage() {
  return (
    <MinistryTemplate
      title="Ministry Name"
      subtitle="Tagline"
      description="Description"
      heroImage="/images/ministry.jpg"
      meetingTime="When"
      location="Where"
      contactPerson={{
        name: "Contact Name",
        email: "email@church.org"
      }}
    />
  );
}
```

### Creating Standard Pages

For other pages:

```tsx
// app/[section]/[page]/page.tsx
export default function PageName() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-700 to-primary-500 text-white py-20">
        <div className="container-custom text-center">
          <h1 className="text-5xl font-bold mb-4">Page Title</h1>
          <p className="text-xl">Subtitle</p>
        </div>
      </section>

      {/* Content Section */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          <h2 className="text-3xl font-bold mb-6">Section Title</h2>
          <p>Your content here</p>
        </div>
      </section>
    </main>
  );
}
```

---

## 🔄 Navigation Auto-Update

When you create a new page, it automatically appears in navigation if the route exists in `Navigation.tsx` (lines 12-59).

To add new navigation items, edit:
```typescript
// components/Navigation.tsx
const menuItems: MenuItem[] = [
  // Add your new menu item here
];
```

---

## 📝 Notes

- All pages use the same `Navigation` and `Footer` components
- Color scheme is consistent across all pages
- All pages are mobile-responsive
- SEO metadata can be added to each page's `metadata` export

---

**Need to create a page?** Copy an existing page structure or use the templates provided!
