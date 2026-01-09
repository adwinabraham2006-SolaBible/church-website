# Deployment Guide

This guide will help you deploy your church website to production.

## Pre-Deployment Checklist

Before deploying, make sure you've completed the following:

### 1. Content Customization
- [ ] Updated church name and logo in Navigation component
- [ ] Changed service times in Hero and Footer components
- [ ] Updated address and contact information
- [ ] Replaced placeholder images with your church photos
- [ ] Customized ministry pages with your content
- [ ] Added your events to the calendar
- [ ] Updated sermon data with real content

### 2. Integration Setup
- [ ] Configured Tithe.ly integration (if using online giving)
- [ ] Added Google Maps embed to contact page
- [ ] Set up form submission handling (email service)
- [ ] Configured social media links in footer

### 3. Technical Requirements
- [ ] Tested website locally
- [ ] Verified all links work
- [ ] Checked mobile responsiveness
- [ ] Tested forms (contact, event registration)
- [ ] Optimized images for web
- [ ] Set up environment variables

## Deployment Options

### Option 1: Vercel (Recommended - Free for most churches)

Vercel is the easiest way to deploy Next.js applications and offers excellent performance.

#### Steps:

1. **Create a Vercel Account**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub, GitLab, or Bitbucket

2. **Push Your Code to Git**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_REPOSITORY_URL
   git push -u origin main
   ```

3. **Import Your Repository**
   - Click "New Project" in Vercel dashboard
   - Import your Git repository
   - Vercel will auto-detect Next.js settings

4. **Configure Environment Variables**
   - In Vercel project settings, go to "Environment Variables"
   - Add your variables from `.env.example`:
     - `NEXT_PUBLIC_TITHE_LY_CHURCH_ID`
     - `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`
     - Any other sensitive keys

5. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy your site
   - You'll get a free `.vercel.app` domain

6. **Add Custom Domain** (Optional)
   - Go to Project Settings > Domains
   - Add your church's domain (e.g., faithcommunity.org)
   - Follow DNS configuration instructions
   - Vercel provides free SSL certificates

#### Automatic Deployments
- Every push to your main branch automatically deploys
- Preview deployments for pull requests
- Instant rollbacks if needed

### Option 2: Netlify

Another excellent free hosting option with similar features to Vercel.

#### Steps:

1. **Create Netlify Account**
   - Go to [netlify.com](https://netlify.com)
   - Sign up with Git provider

2. **Deploy from Git**
   - Click "Add new site" > "Import an existing project"
   - Connect your repository
   - Build settings:
     - Build command: `npm run build`
     - Publish directory: `.next`

3. **Add Environment Variables**
   - Go to Site settings > Build & deploy > Environment
   - Add your variables

4. **Custom Domain**
   - Site settings > Domain management
   - Add custom domain and configure DNS

### Option 3: Self-Hosting (VPS/Dedicated Server)

For complete control, host on your own server.

#### Requirements:
- VPS or dedicated server (DigitalOcean, Linode, AWS EC2, etc.)
- Node.js 18+ installed
- Domain name pointed to your server
- SSL certificate (use Let's Encrypt)

#### Steps:

1. **Build the Application**
   ```bash
   npm run build
   ```

2. **Upload to Server**
   ```bash
   # Using SCP
   scp -r .next node_modules package.json server:/path/to/app

   # Or use Git
   ssh server
   git clone YOUR_REPOSITORY
   cd church-website
   npm install
   npm run build
   ```

3. **Run with PM2** (Process Manager)
   ```bash
   npm install -g pm2
   pm2 start npm --name "church-website" -- start
   pm2 save
   pm2 startup
   ```

4. **Configure Nginx** (Reverse Proxy)
   ```nginx
   server {
       listen 80;
       server_name faithcommunity.org www.faithcommunity.org;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

5. **Install SSL Certificate**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d faithcommunity.org -d www.faithcommunity.org
   ```

### Option 4: AWS Amplify

Good for organizations already using AWS services.

#### Steps:

1. **Create AWS Account**
   - Go to [aws.amazon.com](https://aws.amazon.com)
   - Navigate to AWS Amplify

2. **Deploy from Git**
   - Choose "Host web app"
   - Connect your repository
   - AWS auto-detects Next.js

3. **Configure Build Settings**
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm install
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: .next
       files:
         - '**/*'
     cache:
       paths:
         - node_modules/**/*
   ```

4. **Add Environment Variables**
   - App settings > Environment variables

5. **Custom Domain**
   - Domain management > Add domain
   - Configure DNS or use Route 53

## Post-Deployment

### 1. Testing
- [ ] Visit your deployed site
- [ ] Test all navigation links
- [ ] Submit test forms (contact, event registration)
- [ ] Verify Tithe.ly integration works
- [ ] Check mobile responsiveness
- [ ] Test on different browsers (Chrome, Safari, Firefox)

### 2. SEO Setup
- [ ] Submit sitemap to Google Search Console
- [ ] Add Google Analytics (optional)
- [ ] Set up Google Business Profile
- [ ] Create social media preview images

### 3. Monitoring
- [ ] Set up uptime monitoring (UptimeRobot, Pingdom)
- [ ] Configure error tracking (Sentry)
- [ ] Monitor form submissions
- [ ] Check analytics regularly

### 4. Backup Strategy
- [ ] Regular database backups (if using CMS)
- [ ] Git repository backups
- [ ] Document any custom configurations

## Domain Configuration

### DNS Records

Configure these DNS records for your domain:

```
Type    Name    Value                       TTL
A       @       [Your server IP/hosting IP] 3600
A       www     [Your server IP/hosting IP] 3600
CNAME   www     yourdomain.com              3600
```

For Vercel/Netlify, they'll provide specific DNS instructions.

### SSL Certificate

All recommended hosting providers offer free SSL certificates via Let's Encrypt. Make sure:
- [ ] SSL is enabled
- [ ] HTTP redirects to HTTPS
- [ ] www redirects to non-www (or vice versa)

## Updating Your Site

### After Deployment

To make changes after deployment:

1. **Make changes locally**
   ```bash
   # Edit files
   npm run dev  # Test locally
   ```

2. **Commit and push**
   ```bash
   git add .
   git commit -m "Description of changes"
   git push
   ```

3. **Auto-deploy** (Vercel/Netlify)
   - Site automatically rebuilds and deploys

4. **Manual deploy** (Self-hosted)
   ```bash
   ssh server
   cd church-website
   git pull
   npm install  # If dependencies changed
   npm run build
   pm2 restart church-website
   ```

## Troubleshooting

### Build Fails

**Issue:** Build fails during deployment

**Solutions:**
- Check error logs in deployment platform
- Verify all dependencies are in `package.json`
- Ensure environment variables are set
- Test `npm run build` locally first

### Images Not Loading

**Issue:** Images don't appear on deployed site

**Solutions:**
- Use relative paths (`/images/...`) not absolute
- Verify images are in `public/` directory
- Check Next.js image optimization settings
- For external images, add domains to `next.config.mjs`

### Forms Not Working

**Issue:** Forms submit but nothing happens

**Solutions:**
- Forms currently log to console only
- Set up backend integration (see README)
- Configure email service API
- Test with actual API endpoints

### Slow Performance

**Solutions:**
- Enable caching in Vercel/Netlify
- Optimize images (use WebP format)
- Enable compression
- Use Next.js Image component for all images
- Minimize JavaScript bundle size

## Security Best Practices

- [ ] Keep dependencies updated (`npm update`)
- [ ] Never commit `.env` files to Git
- [ ] Use environment variables for sensitive data
- [ ] Enable HTTPS only
- [ ] Set up security headers
- [ ] Regular security audits (`npm audit`)

## Cost Estimates

### Free Tier (Most Small Churches)
- **Vercel Free:** Up to 100GB bandwidth/month
- **Netlify Free:** Up to 100GB bandwidth/month
- **Domain:** $10-15/year

### Paid Plans (Large Churches)
- **Vercel Pro:** $20/month - Unlimited bandwidth
- **Netlify Pro:** $19/month - Unlimited bandwidth
- **VPS Hosting:** $5-20/month

## Support

If you need help with deployment:

1. Check the hosting provider's documentation
2. Review Next.js deployment docs
3. Contact your web development team
4. Hire a developer for one-time setup

---

**Ready to Deploy?** Start with Vercel for the easiest, fastest deployment experience!
